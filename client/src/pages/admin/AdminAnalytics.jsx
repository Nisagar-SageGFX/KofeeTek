import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { TrendingUp, Users, Coffee, MapPin } from 'lucide-react'

const COLORS = ['#F5B800','#4A2C1D','#22c55e','#3b82f6','#a855f7','#ef4444']

export default function AdminAnalytics() {
  const [leads,    setLeads]    = useState([])
  const [rentals,  setRentals]  = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: true }),
      supabase.from('rentals').select('*')
    ]).then(([l, r]) => {
      setLeads(l.data || [])
      setRentals(r.data || [])
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  /* ── Derived data ── */
  const statusCount = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1; return acc
  }, {})
  const statusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }))

  const industryCount = leads.reduce((acc, l) => {
    if (l.industry) { acc[l.industry] = (acc[l.industry] || 0) + 1 } return acc
  }, {})
  const industryData = Object.entries(industryCount)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([name, count]) => ({ name: name.replace(' Company','').replace(' Institution',''), count }))

  const cityCount = leads.reduce((acc, l) => {
    if (l.location) { acc[l.location] = (acc[l.location] || 0) + 1 } return acc
  }, {})
  const cityData = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([name, count]) => ({ name, count }))

  // Monthly leads (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i))
    const month = d.toLocaleString('default', { month: 'short' })
    const year  = d.getFullYear()
    const count = leads.filter(l => {
      const ld = new Date(l.created_at)
      return ld.getMonth() === d.getMonth() && ld.getFullYear() === year
    }).length
    return { month, count }
  })

  const totalRevenue = rentals
    .filter(r => r.rental_status === 'active')
    .reduce((s, r) => s + Number(r.monthly_rent || 0), 0)

  const conversionRate = leads.length > 0
    ? Math.round((leads.filter(l => l.status === 'closed').length / leads.length) * 100)
    : 0

  const statCards = [
    { icon: Users,     label:'Total Leads',      value: leads.length,                    color:'bg-blue-500'   },
    { icon: TrendingUp,label:'Conversion Rate',  value: `${conversionRate}%`,            color:'bg-green-500'  },
    { icon: Coffee,    label:'Active Rentals',   value: rentals.filter(r=>r.rental_status==='active').length, color:'bg-brand-gold' },
    { icon: MapPin,    label:'Monthly Revenue',  value: `₹${(totalRevenue/1000).toFixed(0)}K`, color:'bg-purple-500' },
  ]

  return (
    <div>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold text-brand-brownDark">Analytics</h2>
        <p className="text-brand-brown/55 text-sm">Business performance overview</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div className="font-display text-3xl font-bold text-brand-brownDark">{s.value}</div>
            <div className="text-brand-brown/50 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly leads trend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-brand-brownDark text-sm mb-5">Monthly Leads (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5ede0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B3F2A' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B3F2A' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F5EDE0', fontSize: 12 }} />
              <Line type="monotone" dataKey="count" stroke="#F5B800" strokeWidth={2.5} dot={{ fill: '#F5B800', r: 4 }} name="Leads" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead status breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-brand-brownDark text-sm mb-5">Lead Status Breakdown</h3>
          {statusData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-brand-brown/35 text-sm">No data yet</div>
          ) : (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v, n) => [v, n.replace('_',' ')]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {statusData.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-brand-brown/70 capitalize">{s.name.replace('_',' ')}</span>
                    <span className="text-xs font-bold text-brand-brownDark ml-auto">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads by industry */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-brand-brownDark text-sm mb-5">Leads by Industry</h3>
          {industryData.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-brand-brown/35 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={industryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f5ede0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6B3F2A' }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6B3F2A' }} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" fill="#F5B800" radius={[0, 6, 6, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Leads by city */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-brand-brownDark text-sm mb-5">Leads by City</h3>
          {cityData.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-brand-brown/35 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5ede0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B3F2A' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6B3F2A' }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" fill="#4A2C1D" radius={[6, 6, 0, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
