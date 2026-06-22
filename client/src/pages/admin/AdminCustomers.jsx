import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, X, Check, Phone, Mail, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const empty = { company_name:'', contact_person:'', phone:'', email:'', address:'', city:'', industry:'', machines_count:0 }
const CITIES = ['Chennai','Coimbatore','Bangalore','Madurai','Hosur','Salem','Tirupur','Other']
const INDUSTRIES = ['IT Company','Manufacturing','Hospital','Educational','Corporate','Warehouse','Hospitality','Other']

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')
  const [form,      setForm]      = useState(null)
  const [saving,    setSaving]    = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false })
    setCustomers(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.company_name) return toast.error('Company name is required')
    setSaving(true)
    const { id, ...payload } = form
    const { error } = id
      ? await supabase.from('customers').update(payload).eq('id', id)
      : await supabase.from('customers').insert([payload])
    if (error) toast.error(error.message)
    else { toast.success(id ? 'Customer updated' : 'Customer added'); setForm(null); load() }
    setSaving(false)
  }

  const filtered = customers.filter(c =>
    c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_person?.toLowerCase().includes(search.toLowerCase()) ||
    c.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-brownDark">Customer Management</h2>
          <p className="text-brand-brown/55 text-sm">{customers.length} customers registered</p>
        </div>
        <button onClick={() => setForm({ ...empty })} className="btn-primary gap-2 text-sm">
          <Plus size={16} />Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-brown/40" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by company, contact or city..."
          className="input-field pl-10 text-sm" />
      </div>

      {/* Form modal */}
      {form && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-brand-brownDark">{form.id ? 'Edit Customer' : 'Add Customer'}</h3>
              <button onClick={() => setForm(null)}><X size={20} className="text-brand-brown/50" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Company Name *</label>
                  <input value={form.company_name || ''} onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))} className="input-field" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Contact Person</label>
                  <input value={form.contact_person || ''} onChange={e => setForm(p => ({ ...p, contact_person: e.target.value }))} className="input-field" placeholder="Name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Phone</label>
                  <input value={form.phone || ''} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Email</label>
                  <input type="email" value={form.email || ''} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" placeholder="email@company.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">City</label>
                  <select value={form.city || ''} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="input-field">
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Industry</label>
                  <select value={form.industry || ''} onChange={e => setForm(p => ({ ...p, industry: e.target.value }))} className="input-field">
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">No. of Machines</label>
                  <input type="number" value={form.machines_count || 0} onChange={e => setForm(p => ({ ...p, machines_count: Number(e.target.value) }))} className="input-field" min={0} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1.5">Address</label>
                <textarea value={form.address || ''} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} rows={2} className="input-field resize-none" placeholder="Full address..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                <Check size={16} />{saving ? 'Saving...' : 'Save Customer'}
              </button>
              <button onClick={() => setForm(null)} className="btn-brown px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-4xl mb-4">🏢</div>
          <p className="text-brand-brown/50 text-sm">{search ? `No results for "${search}"` : 'No customers yet.'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Company','Contact','City','Industry','Machines','Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-brand-cream/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-brand-brownDark text-sm">{c.company_name}</td>
                  <td className="px-5 py-3">
                    <div className="text-sm text-brand-brown/80">{c.contact_person}</div>
                    {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-xs text-brand-gold hover:underline"><Phone size={10}/>{c.phone}</a>}
                    {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-brand-brown/50 hover:text-brand-gold"><Mail size={10}/>{c.email}</a>}
                  </td>
                  <td className="px-5 py-3 text-sm text-brand-brown/70">{c.city || '—'}</td>
                  <td className="px-5 py-3 text-xs text-brand-brown/60">{c.industry || '—'}</td>
                  <td className="px-5 py-3">
                    <span className="bg-brand-gold/15 text-brand-brown font-bold text-sm px-3 py-1 rounded-full">{c.machines_count || 0}</span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => setForm(c)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Pencil size={13} />
                    </button>
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
