import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = ['machine', 'consumable', 'accessory']

const empty = { name: '', category: 'machine', description: '', image: '', stock: 0 }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [form,     setForm]     = useState(null)   // null = closed, {} = new, {id} = edit
  const [saving,   setSaving]   = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.name || !form.category) return toast.error('Name and category are required')
    setSaving(true)
    const { id, ...payload } = form
    const { error } = id
      ? await supabase.from('products').update(payload).eq('id', id)
      : await supabase.from('products').insert([payload])
    if (error) { toast.error(error.message) }
    else       { toast.success(id ? 'Product updated' : 'Product added'); setForm(null); load() }
    setSaving(false)
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Deleted'); load() }
  }

  const catColors = { machine:'bg-blue-100 text-blue-700', consumable:'bg-green-100 text-green-700', accessory:'bg-purple-100 text-purple-700' }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-brownDark">Product Management</h2>
          <p className="text-brand-brown/55 text-sm">{products.length} products listed</p>
        </div>
        <button onClick={() => setForm({ ...empty })}
          className="btn-primary gap-2 text-sm"><Plus size={16} />Add Product</button>
      </div>

      {/* Form modal */}
      {form && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-brand-brownDark">
                {form.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setForm(null)}><X size={20} className="text-brand-brown/50 hover:text-brand-brown" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Product Name *</label>
                  <input value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. KT 3-in-1 COMBO" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Category *</label>
                  <select value={form.category || 'machine'} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="input-field">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1.5">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={3} className="input-field resize-none" placeholder="Product description..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Image URL</label>
                  <input value={form.image || ''} onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                    placeholder="https://..." className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Stock Count</label>
                  <input type="number" value={form.stock || 0} onChange={e => setForm(p => ({ ...p, stock: Number(e.target.value) }))}
                    className="input-field" min={0} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving}
                className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                <Check size={16} />{saving ? 'Saving...' : 'Save Product'}
              </button>
              <button onClick={() => setForm(null)} className="btn-brown px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-4xl mb-4">📦</div>
          <p className="text-brand-brown/50 text-sm">No products yet. Add your first product.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Product','Category','Description','Stock','Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-brand-cream/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" onError={e => e.target.style.display='none'} />}
                      <span className="font-medium text-brand-brownDark text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${catColors[p.category] || 'bg-gray-100 text-gray-600'}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-brand-brown/60 max-w-[200px] truncate">{p.description}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-brand-brownDark">{p.stock}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setForm(p)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => remove(p.id)}
                        className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}
