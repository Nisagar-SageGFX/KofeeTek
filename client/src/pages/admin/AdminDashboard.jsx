import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Users, ClipboardList, Package, TrendingUp, Phone, AlertTriangle } from 'lucide-react'

const statusColors = {
  new:            'bg-blue-100 text-blue-700',
  contacted:      'bg-yellow-100 text-yellow-700',
  qualified:      'bg-purple-100 text-purple-700',
  demo_scheduled: 'bg-amber-100 text-amber-700',
  closed:         'bg-green-100 text-green-700',
}

export default function AdminDashboard() {
  const [stats,       setStats]       = useState({ leads:0, newLeads:0, rentals:0, products:0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [lowStock,    setLowStock]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        // Run queries one by one to isolate any errors
        const { count: totalLeads, error: e1 } = await supabase
          .from('leads').select('*', { count: 'exact', head: true })
        if (e1) throw new Error(`leads count: ${e1.message}`)

        const { count: newLeads, error: e2 } = await supabase
          .from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new')
        if (e2) throw new Error(`new leads: ${e2.message}`)

        const { count: rentals, error: e3 } = await supabase
          .from('rentals').select('*', { count: 'exact', head: true }).eq('rental_status', 'active')
        if (e3) throw new Error(`rentals: ${e3.message}`)

        const { count: products, error: e4 } = await supabase
          .from('products').select('*', { count: 'exact', head: true })
        if (e4) throw new Error(`products: ${e4.message}`)

        const { data: recent, error: e5 } = await supabase
          .from('leads').select('*').order('created_at', { ascending: false }).limit(8)
        if (e5) throw new Error(`recent leads: ${e5.message}`)

        const { data: inventory, error: e6 } = await supabase
          .from('inventory').select('*').order('product_name')
        if (e6) throw new Error(`inventory: ${e6.message}`)

        setStats({
          leads:    totalLeads || 0,
          newLeads: newLeads   || 0,
          rentals:  rentals    || 0,
          products: products   || 0,
        })
        setRecentLeads(recent || [])
        setLowStock((inventory || []).filter(i => Number(i.stock) <= Number(i.minimum_stock)))
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const statCards = [
    { label:'Total Leads',    value: stats.leads,    icon: Users,         color:'bg-blue-500',   link:'/admin/leads'    },
    { label:'New Leads',      value: stats.newLeads, icon: TrendingUp,    color:'bg-brand-gold', link:'/admin/leads'    },
    { label:'Active Rentals', value: stats.rentals,  icon: ClipboardList, color:'bg-green-500',  link:'/admin/rentals'  },
    { label:'Products',       value: stats.products, icon: Package,       color:'bg-purple-500', link:'/admin/products' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-brand-brown/50 text-sm">Loading dashboard...</span>
      </div>
    </div>
  )

  // Show error with helpful instructions
  if (error) return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <AlertTriangle size={24} className="text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-700 text-lg mb-2">Database Connection Error</h3>
            <p className="text-red-600 text-sm mb-4 font-mono bg-red-100 px-3 py-2 rounded-lg">{error}</p>
            <div className="space-y-3 text-sm text-red-700">
              <p className="font-semibold">How to fix this:</p>
              <ol className="list-decimal list-inside space-y-2 text-red-600">
                <li>Go to <strong>Supabase Dashboard → SQL Editor</strong></li>
                <li>Run the file: <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">supabase/fix_rls.sql</code></li>
                <li>Make sure <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">supabase/schema.sql</code> was run first</li>
                <li>Check your <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">client/.env</code> has correct Supabase URL and anon key</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-brand-brownDark">Dashboard</h2>
        <p className="text-brand-brown/55 text-sm mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-700 text-sm">Low Stock Alert</p>
            <p className="text-amber-600 text-xs mt-0.5">
              {lowStock.map(i => i.product_name).join(', ')} — need restocking
            </p>
          </div>
          <Link to="/admin/inventory" className="ml-auto text-xs text-amber-600 font-semibold hover:underline shrink-0">
            View →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => (
          <Link key={i} to={s.link}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm
                       hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div className="font-display text-3xl font-bold text-brand-brownDark">{s.value}</div>
            <div className="text-brand-brown/50 text-xs mt-1 group-hover:text-brand-gold transition-colors">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent leads table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-brand-brownDark">Recent Leads</h3>
            <p className="text-brand-brown/45 text-xs mt-0.5">Latest enquiries from your website</p>
          </div>
          <Link to="/admin/leads" className="text-xs text-brand-gold font-semibold hover:underline">
            View all →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-brand-brown/40 text-sm">No leads yet.</p>
            <p className="text-brand-brown/30 text-xs mt-1">They'll appear here when people fill your contact form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Name', 'Company', 'Phone', 'Location', 'Industry', 'Type', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-brand-cream/20 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-brand-brownDark whitespace-nowrap">{lead.name}</td>
                    <td className="px-5 py-3 text-sm text-brand-brown/70 whitespace-nowrap">{lead.company_name}</td>
                    <td className="px-5 py-3">
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-xs text-brand-gold hover:underline whitespace-nowrap">
                          <Phone size={11} />{lead.phone}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-brown/60 whitespace-nowrap">{lead.location}</td>
                    <td className="px-5 py-3 text-xs text-brand-brown/60 whitespace-nowrap max-w-[120px] truncate">{lead.industry}</td>
                    <td className="px-5 py-3 text-xs text-brand-brown/60 whitespace-nowrap capitalize">{lead.inquiry_type}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                        {(lead.status || 'new').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-brown/40 whitespace-nowrap">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
