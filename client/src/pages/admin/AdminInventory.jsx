import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AlertTriangle, Package, RefreshCw, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminInventory() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState({})   // { [id]: newStockValue }

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('inventory').select('*').order('product_name')
    setItems(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const updateStock = async (id, stock) => {
    const { error } = await supabase.from('inventory')
      .update({ stock: Number(stock), updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Stock updated'); setEditing(p => ({ ...p, [id]: undefined })); load() }
  }

  const lowStock  = items.filter(i => i.stock <= i.minimum_stock)
  const totalItems = items.reduce((sum, i) => sum + i.stock, 0)

  return (
    <div>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold text-brand-brownDark">Inventory Management</h2>
        <p className="text-brand-brown/55 text-sm">Track consumable stock levels and get low-stock alerts</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <Package size={20} className="text-blue-600" />
          </div>
          <div className="font-display text-3xl font-bold text-brand-brownDark">{items.length}</div>
          <div className="text-brand-brown/50 text-xs mt-1">Total Products Tracked</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <div className="font-display text-3xl font-bold text-brand-brownDark">{totalItems}</div>
          <div className="text-brand-brown/50 text-xs mt-1">Total Units in Stock</div>
        </div>
        <div className={`rounded-2xl p-5 border shadow-sm ${lowStock.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${lowStock.length > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
            <AlertTriangle size={20} className={lowStock.length > 0 ? 'text-red-500' : 'text-gray-400'} />
          </div>
          <div className={`font-display text-3xl font-bold ${lowStock.length > 0 ? 'text-red-600' : 'text-brand-brownDark'}`}>{lowStock.length}</div>
          <div className={`text-xs mt-1 ${lowStock.length > 0 ? 'text-red-500 font-semibold' : 'text-brand-brown/50'}`}>Low Stock Alerts</div>
        </div>
      </div>

      {/* Low stock banner */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 text-sm mb-1">⚠️ Low Stock Alert</p>
            <p className="text-red-600 text-xs">
              {lowStock.map(i => i.product_name).join(', ')} — need restocking
            </p>
          </div>
        </div>
      )}

      {/* Inventory table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Product','Category','Current Stock','Min. Stock','Status','Update Stock'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => {
                const isLow = item.stock <= item.minimum_stock
                return (
                  <tr key={item.id} className={`transition-colors ${isLow ? 'bg-red-50/40' : 'hover:bg-brand-cream/20'}`}>
                    <td className="px-5 py-3 font-medium text-brand-brownDark text-sm">{item.product_name}</td>
                    <td className="px-5 py-3 text-xs text-brand-brown/60 capitalize">{item.category}</td>
                    <td className="px-5 py-3">
                      <span className={`font-bold text-sm ${isLow ? 'text-red-600' : 'text-brand-brownDark'}`}>
                        {item.stock} {item.unit}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-brand-brown/60">{item.minimum_stock} {item.unit}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isLow ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {isLow ? '⚠ Low Stock' : '✓ In Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          defaultValue={item.stock}
                          onChange={e => setEditing(p => ({ ...p, [item.id]: e.target.value }))}
                          className="w-20 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold"
                        />
                        <button
                          onClick={() => updateStock(item.id, editing[item.id] ?? item.stock)}
                          className="flex items-center gap-1 bg-brand-gold text-brand-brownDark text-xs font-semibold
                                     px-3 py-1.5 rounded-lg hover:bg-brand-goldLight transition-colors"
                        >
                          <RefreshCw size={11} /> Update
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
