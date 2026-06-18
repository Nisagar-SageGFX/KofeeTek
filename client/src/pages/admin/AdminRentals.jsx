import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminRentals() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const tableMap = {
    AdminProducts:  'products',
    AdminInventory: 'inventory',
    AdminRentals:   'rentals',
    AdminCustomers: 'customers',
    AdminAnalytics: 'leads',
  }
  const table = tableMap['AdminRentals'] || 'leads'

  useEffect(() => {
    supabase.from(table).select('*').order('id', { ascending: false }).limit(50)
      .then(({ data }) => { setData(data || []); setLoading(false) })
  }, [])

  const titleMap = {
    AdminProducts:  'Product Management',
    AdminInventory: 'Inventory Management',
    AdminRentals:   'Rental Management',
    AdminCustomers: 'Customer Management',
    AdminAnalytics: 'Analytics',
  }

  return (
    <div>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold text-brand-brownDark">{titleMap['AdminRentals']}</h2>
        <p className="text-brand-brown/60 text-sm">{loading ? 'Loading...' : data.length + ' records'}</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="text-brand-brown/40 text-sm">No records yet in <strong>{table}</strong> table.</div>
          <p className="text-brand-brown/30 text-xs mt-2">Records will appear here once added via the website or Supabase.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {Object.keys(data[0] || {}).slice(0, 8).map(k => (
                  <th key={k} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-brand-cream/20">
                  {Object.values(row).slice(0, 8).map((v, j) => (
                    <td key={j} className="px-5 py-3 text-xs text-brand-brown/80 max-w-[200px] truncate">{String(v ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
