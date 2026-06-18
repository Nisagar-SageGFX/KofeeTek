import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Phone, Mail, StickyNote, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUSES = ['new', 'contacted', 'qualified', 'demo_scheduled', 'closed']
const statusColors = {
  new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700', demo_scheduled: 'bg-amber-100 text-amber-700',
  closed: 'bg-green-100 text-green-700',
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [editNote, setEditNote] = useState({})

  const fetchLeads = async () => {
    setLoading(true)
    let q = supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [filter])

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (!error) { toast.success('Status updated'); fetchLeads() }
  }

  const saveNote = async (id) => {
    const { error } = await supabase.from('leads').update({ notes: editNote[id] }).eq('id', id)
    if (!error) { toast.success('Note saved'); setEditNote(prev => ({ ...prev, [id]: undefined })) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-brownDark">Lead Management</h2>
          <p className="text-brand-brown/60 text-sm">{leads.length} leads found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                filter === s ? 'bg-brand-gold text-brand-brownDark' : 'bg-white text-brand-brown border border-gray-200 hover:border-brand-gold'
              }`}>
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-brand-brown/40">No leads found for this filter.</div>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Name</div>
                  <div className="font-semibold text-brand-brownDark text-sm">{lead.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Company</div>
                  <div className="text-sm text-brand-brown">{lead.company_name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Contact</div>
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-brand-gold hover:underline">
                    <Phone size={11} />{lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-brand-brown/60 hover:text-brand-gold mt-0.5">
                    <Mail size={10} />{lead.email}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Location / Industry</div>
                  <div className="text-sm text-brand-brown">{lead.location}</div>
                  <div className="text-xs text-brand-brown/50">{lead.industry}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  defaultValue={lead.status}
                  onChange={e => updateStatus(lead.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-gold capitalize"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                  {lead.status?.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              {/* Note */}
              <div className="mt-3 flex gap-2">
                <input
                  placeholder="Add a follow-up note..."
                  defaultValue={lead.notes || ''}
                  onChange={e => setEditNote(prev => ({ ...prev, [lead.id]: e.target.value }))}
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-gold"
                />
                {editNote[lead.id] !== undefined && (
                  <button onClick={() => saveNote(lead.id)}
                    className="px-3 py-1.5 bg-brand-gold text-brand-brownDark text-xs font-semibold rounded-lg hover:bg-brand-goldLight">
                    Save
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
