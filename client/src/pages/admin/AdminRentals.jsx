import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, X, Check, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUSES   = ['active', 'paused', 'terminated']
const statusColor = { active:'bg-green-100 text-green-700', paused:'bg-yellow-100 text-yellow-700', terminated:'bg-red-100 text-red-600' }
const empty = { company_name:'', contact_person:'', phone:'', machine_name:'', installation_date:'', next_service_date:'', monthly_rent:'', rental_status:'active', notes:'' }

export default function AdminRentals() {
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all')
  const [form,    setForm]    = useState(null)
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    setLoading(true)
    let q = supabase.from('rentals').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('rental_status', filter)
    const { data } = await q
    setRentals(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [filter])

  const save = async () => {
    if (!form.company_name || !form.machine_name) return toast.error('Company and machine name required')
    setSaving(true)
    const { id, ...payload } = form
    const { error } = id
      ? await supabase.from('rentals').update(payload).eq('id', id)
      : await supabase.from('rentals').insert([payload])
    if (error) toast.error(error.message)
    else { toast.success(id ? 'Rental updated' : 'Rental added'); setForm(null); load() }
    setSaving(false)
  }

  const active    = rentals.filter(r => r.rental_status === 'active').length
  const revenue   = rentals.filter(r => r.rental_status === 'active').reduce((s, r) => s + Number(r.monthly_rent || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-brownDark">Rental Management</h2>
          <p className="text-brand-brown/55 text-sm">{rentals.length} rental contracts</p>
        </div>
        <button onClick={() => setForm({ ...empty })} className="btn-primary gap-2 text-sm">
          <Plus size={16} />Add Rental
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {[
          { label:'Active Rentals', value: active, color:'text-green-600', bg:'bg-green-50 border-green-200' },
          { label:'Monthly Revenue', value:`₹${revenue.toLocaleString('en-IN')}`, color:'text-brand-gold', bg:'bg-brand-cream border-brand-beige' },
          { label:'Total Contracts', value: rentals.length, color:'text-blue-600', bg:'bg-blue-50 border-blue-200' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl p-5 border ${s.bg}`}>
            <div className={`font-display text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-brand-brown/55 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['all', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              filter === s ? 'bg-brand-gold text-brand-brownDark' : 'bg-white text-brand-brown border border-gray-200 hover:border-brand-gold'
            }`}>{s}</button>
        ))}
      </div>

      {/* Form modal */}
      {form && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-brand-brownDark">{form.id ? 'Edit Rental' : 'Add Rental'}</h3>
              <button onClick={() => setForm(null)}><X size={20} className="text-brand-brown/50" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Machine Name *</label>
                  <input value={form.machine_name || ''} onChange={e => setForm(p => ({ ...p, machine_name: e.target.value }))} className="input-field" placeholder="e.g. KT 3-in-1 COMBO" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Installation Date</label>
                  <input type="date" value={form.installation_date || ''} onChange={e => setForm(p => ({ ...p, installation_date: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Next Service Date</label>
                  <input type="date" value={form.next_service_date || ''} onChange={e => setForm(p => ({ ...p, next_service_date: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Monthly Rent (₹)</label>
                  <input type="number" value={form.monthly_rent || ''} onChange={e => setForm(p => ({ ...p, monthly_rent: e.target.value }))} className="input-field" placeholder="3500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1.5">Status</label>
                  <select value={form.rental_status || 'active'} onChange={e => setForm(p => ({ ...p, rental_status: e.target.value }))} className="input-field">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1.5">Notes</label>
                <textarea value={form.notes || ''} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="input-field resize-none" placeholder="Any additional notes..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                <Check size={16} />{saving ? 'Saving...' : 'Save Rental'}
              </button>
              <button onClick={() => setForm(null)} className="btn-brown px-5">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : rentals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-brand-brown/50 text-sm">No rentals found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Company','Machine','Contact','Monthly Rent','Installation','Next Service','Status','Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rentals.map(r => (
                <tr key={r.id} className="hover:bg-brand-cream/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-brand-brownDark text-sm whitespace-nowrap">{r.company_name}</td>
                  <td className="px-4 py-3 text-sm text-brand-brown/70 whitespace-nowrap">{r.machine_name}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-brand-brown/70">{r.contact_person}</div>
                    {r.phone && <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-xs text-brand-gold hover:underline"><Phone size={10} />{r.phone}</a>}
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-gold text-sm">₹{Number(r.monthly_rent || 0).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-xs text-brand-brown/60 whitespace-nowrap">{r.installation_date || '—'}</td>
                  <td className="px-4 py-3 text-xs text-brand-brown/60 whitespace-nowrap">{r.next_service_date || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor[r.rental_status] || 'bg-gray-100 text-gray-600'}`}>
                      {r.rental_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setForm(r)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Pencil size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
