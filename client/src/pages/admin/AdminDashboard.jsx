import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, ShoppingBag, ClipboardList, Package, TrendingUp, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusColors = {
  new:              'bg-blue-100 text-blue-700',
  contacted:        'bg-yellow-100 text-yellow-700',
  qualified:        'bg-purple-100 text-purple-700',
  demo_scheduled:   'bg-brand-gold/20 text-amber-700',
  closed:           'bg-green-100 text-green-700',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, newLeads: 0, rentals: 0, products: 0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [leadsRes, newLeadsRes, rentalsRes, productsRes, recentRes] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('rentals').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8),
      ])
      setStats({
        leads:    leadsRes.count || 0,
        newLeads: newLeadsRes.count || 0,
        rentals:  rentalsRes.count || 0,
        products: productsRes.count || 0,
      })
      setRecentLeads(recentRes.data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Leads',   value: stats.leads,    icon: Users,         color: 'bg-blue-500',   link: '/admin/leads' },
    { label: 'New Leads',     value: stats.newLeads,  icon: TrendingUp,    color: 'bg-brand-gold', link: '/admin/leads' },
    { label: 'Active Rentals',value: stats.rentals,  icon: ClipboardList, color: 'bg-green-500',  link: '/admin/rentals' },
    { label: 'Products',      value: stats.products, icon: Package,       color: 'bg-purple-500', link: '/admin/products' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold text-brand-brownDark">Dashboard</h2>
        <p className="text-brand-brown/60 text-sm">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => (
          <Link key={i} to={s.link} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className="text-white" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-brand-brownDark">{s.value}</div>
            <div className="text-brand-brown/60 text-xs mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-brand-brownDark">Recent Leads</h3>
          <Link to="/admin/leads" className="text-xs text-brand-gold hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Name', 'Company', 'Phone', 'Location', 'Industry', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentLeads.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-brand-brown/40 text-sm">No leads yet. They'll appear here once people fill your contact form.</td></tr>
              ) : recentLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-brand-cream/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-brand-brownDark">{lead.name}</td>
                  <td className="px-5 py-3 text-sm text-brand-brown/70">{lead.company_name}</td>
                  <td className="px-5 py-3 text-sm">
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-brand-gold hover:underline">
                      <Phone size={12} />{lead.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-sm text-brand-brown/70">{lead.location}</td>
                  <td className="px-5 py-3 text-sm text-brand-brown/70">{lead.industry}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                      {lead.status?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-brand-brown/50">
                    {new Date(lead.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
