import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const industries = [
  'IT Company', 'Manufacturing', 'Hospital / Healthcare',
  'Educational Institution', 'Corporate Office',
  'Warehouse / Industrial Park', 'Hotel / Hospitality', 'Other'
]

export default function LeadPopup() {
  const [open,      setOpen]      = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (sessionStorage.getItem('popup_seen')) return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('popup_seen', '1')
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('leads').insert([{
        name:         data.name,
        company_name: data.company,
        phone:        data.phone,
        email:        data.email,
        location:     data.location,
        industry:     data.industry,
        employees:    data.employees,
        inquiry_type: data.type || 'demo',
        status:       'new',
      }])
      if (error) throw error
      setSubmitted(true)
      toast.success('We\'ll contact you within 24 hours!')
    } catch (err) {
      console.error(err)
      toast.error('Submission failed. Please WhatsApp +91 99622 42499')
    }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownLight px-7 py-5 relative">
              <button onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white/55 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center text-lg">☕</div>
                <div>
                  <p className="text-brand-gold text-[10px] font-bold tracking-[2px] uppercase">Free Offer</p>
                  <h2 className="font-display text-[18px] font-bold text-white leading-tight">
                    Get a Free Workplace Beverage Consultation
                  </h2>
                </div>
              </div>
              <p className="text-white/65 text-[12px] pl-[52px]">
                Our B2B specialist will personally visit your office — no cost, no commitment.
              </p>
            </div>

            {/* Body */}
            <div className="px-7 py-5">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-brand-brownDark mb-2">You're All Set!</h3>
                  <p className="text-brand-brown/65 text-sm mb-5">
                    Our specialist will call you within 24 hours to confirm your demo slot.
                  </p>
                  <button onClick={() => setOpen(false)} className="btn-brown">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input {...register('name', { required: true })}
                        placeholder="Your Name *"
                        className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                    </div>
                    <div>
                      <input {...register('company', { required: true })}
                        placeholder="Company Name *"
                        className={`input-field ${errors.company ? 'border-red-400' : ''}`} />
                    </div>
                    <div>
                      <input {...register('phone', { required: true, pattern: /^[6-9]\d{9}$/ })}
                        placeholder="Mobile Number *" type="tel"
                        className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
                    </div>
                    <div>
                      <input {...register('email', { required: true })}
                        placeholder="Work Email *" type="email"
                        className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                    </div>
                    <div>
                      <input {...register('location', { required: true })}
                        placeholder="City / Location *"
                        className={`input-field ${errors.location ? 'border-red-400' : ''}`} />
                    </div>
                    <div>
                      <select {...register('employees')} className="input-field text-brand-brown/70">
                        <option value="">No. of Employees</option>
                        {['1–50','51–200','201–500','501–1000','1000+'].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <select {...register('industry', { required: true })}
                    className={`input-field ${errors.industry ? 'border-red-400' : ''}`}>
                    <option value="">Select Industry Type *</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button type="submit" disabled={loading}
                      className="btn-primary justify-center gap-2 disabled:opacity-65 disabled:cursor-not-allowed text-sm">
                      {loading ? 'Sending...' : <><Send size={14} /> Schedule Demo</>}
                    </button>
                    <button type="button"
                      onClick={() => window.open('https://wa.me/919962242499?text=Hi%20KofeeTek%2C%20I%20want%20a%20quote', '_blank')}
                      className="btn-brown justify-center text-sm">
                      Request Quote
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-brand-brown/38">🔒 Your data is safe. No spam, ever.</p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
