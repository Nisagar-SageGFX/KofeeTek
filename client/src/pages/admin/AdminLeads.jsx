import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Phone, Mail, Search, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUSES = ['new', 'contacted', 'qualified', 'demo_scheduled', 'closed']
const statusColors = {
  new:            'bg-blue-100 text-blue-700',
  contacted:      'bg-yellow-100 text-yellow-700',
  qualified:      'bg-purple-100 text-purple-700',
  demo_scheduled: 'bg-amber-100 text-amber-700',
  closed:         'bg-green-100 text-green-700',
}

export default function AdminLeads() {
  const [leads,    setLeads]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [notes,    setNotes]    = useState({})  // { [id]: string }

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      let q = supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (filter !== 'all') q = q.eq('status', filter)
      const { data, error: err } = await q
      if (err) throw err
      setLeads(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id, status) => {
    const { error: err } = await supabase.from('leads').update({ status }).eq('id', id)
    if (err) { toast.error(err.message); return }
    toast.success('Status updated')
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const saveNote = async (id) => {
    const note = notes[id]
    if (note === undefined) return
    const { error: err } = await supabase.from('leads').update({ notes: note }).eq('id', id)
    if (err) { toast.error(err.message); return }
    toast.success('Note saved')
    setNotes(prev => { const n = { ...prev }; delete n[id]; return n })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: note } : l))
  }

  const filtered = leads.filter(l =>
    !search ||
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    l.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-brownDark">Lead Management</h2>
          <p className="text-brand-brown/55 text-sm mt-0.5">{leads.length} total leads</p>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-brown/40" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name, company, city..."
            className="input-field pl-9 text-sm w-64" />
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              filter === s
                ? 'bg-brand-gold text-brand-brownDark shadow-sm'
                : 'bg-white text-brand-brown border border-gray-200 hover:border-brand-gold'
            }`}>
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex gap-3">
          <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 text-sm">Error loading leads</p>
            <p className="text-red-600 text-xs mt-1 font-mono">{error}</p>
            <p className="text-red-500 text-xs mt-2">Run <strong>supabase/fix_rls.sql</strong> in your Supabase SQL Editor to fix permissions.</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-brand-brown/50 text-sm">
            {search ? `No results for "${search}"` : `No ${filter !== 'all' ? filter : ''} leads yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lead => (
            <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Name + Company */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Name</div>
                  <div className="font-semibold text-brand-brownDark text-sm">{lead.name}</div>
                  <div className="text-brand-brown/60 text-xs mt-0.5">{lead.company_name}</div>
                </div>
                {/* Contact */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Contact</div>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-brand-gold hover:underline mb-0.5">
                      <Phone size={11} />{lead.phone}
                    </a>
                  )}
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-brand-brown/50 hover:text-brand-gold">
                      <Mail size={11} />{lead.email}
                    </a>
                  )}
                </div>
                {/* Details */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Details</div>
                  <div className="text-xs text-brand-brown/70">{lead.location}</div>
                  <div className="text-xs text-brand-brown/50 mt-0.5">{lead.industry}</div>
                  <div className="text-xs text-brand-brown/40 mt-0.5 capitalize">{lead.employees} employees</div>
                </div>
                {/* Date + Type */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Received</div>
                  <div className="text-xs text-brand-brown/70">
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                  </div>
                  <div className="text-xs text-brand-brown/45 mt-0.5 capitalize">{lead.inquiry_type}</div>
                </div>
              </div>

              {/* Status + Note row */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                {/* Current status badge */}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                  {(lead.status || 'new').replace('_', ' ')}
                </span>

                {/* Status selector */}
                <select
                  value={lead.status || 'new'}
                  onChange={e => updateStatus(lead.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none
                             focus:border-brand-gold text-brand-brown bg-white capitalize cursor-pointer"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>

                {/* Note input */}
                <div className="flex gap-2 flex-1 min-w-[200px]">
                  <input
                    placeholder={lead.notes || 'Add follow-up note...'}
                    value={notes[lead.id] ?? ''}
                    onChange={e => setNotes(prev => ({ ...prev, [lead.id]: e.target.value }))}
                    className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5
                               focus:outline-none focus:border-brand-gold text-brand-brownDark"
                  />
                  {notes[lead.id] !== undefined && notes[lead.id] !== '' && (
                    <button onClick={() => saveNote(lead.id)}
                      className="px-3 py-1.5 bg-brand-gold text-brand-brownDark text-xs font-semibold
                                 rounded-lg hover:bg-brand-goldLight transition-colors whitespace-nowrap">
                      Save Note
                    </button>
                  )}
                </div>

                {/* Existing note display */}
                {lead.notes && notes[lead.id] === undefined && (
                  <div className="text-xs text-brand-brown/50 italic max-w-xs truncate">
                    📝 {lead.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
