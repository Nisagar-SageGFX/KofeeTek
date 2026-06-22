import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'

const inquiryTypes = ['Schedule a Demo', 'Request Quote', 'Machine Rental', 'Consumables Order', 'Service Request', 'Other']
const industries = ['IT Company', 'Manufacturing', 'Hospital', 'Educational Institution', 'Corporate Office', 'Warehouse', 'Other']

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('leads').insert([{
        name: data.name, company_name: data.company, phone: data.phone,
        email: data.email, location: data.location, industry: data.industry,
        employees: data.employees, inquiry_type: data.inquiry_type, status: 'new',
        notes: data.message
      }])
      if (error) throw error
      setSubmitted(true)
      reset()
      toast.success('Inquiry submitted! We\'ll respond within 24 hours.')
    } catch (err) {
      toast.error('Submission failed. Please WhatsApp us directly.')
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Contact KofeeTek – Book a Free Demo | +91 63691 96624</title>
        <meta name="description" content="Contact KofeeTek to schedule a free vending machine demo, request a quote, or inquire about rental plans. Serving Chennai, Coimbatore, Bangalore." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-label">Get In Touch</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Let's Talk <span className="text-brand-gold">Coffee</span>
          </h1>
          <p className="text-white/70 text-lg">Book a free demo, request a quote, or just say hello. Our team responds within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          {/* Contact info sidebar */}
          <div className="space-y-5">
            <div className="card-premium p-6">
              <h2 className="font-semibold text-brand-brownDark mb-5">Contact Details</h2>
              {[
                { icon: Phone, label: 'Phone / WhatsApp', value: '+91 63691 96624', href: 'tel:+916369196624' },
                { icon: Mail,  label: 'Email',            value: 'sales@kofeetek.in', href: 'mailto:sales@kofeetek.in' },
                { icon: MapPin,label: 'Head Office',      value: 'Block-C, G3, Kalpatharu Garden, Plot No:10, Priya Nagar, Urapakkam. Chennai – 603210', href: '#' },
                { icon: Clock, label: 'Service Hours',    value: 'Mon–Sat: 8AM–8PM\nSunday: Emergency only', href: '#' },
              ].map((c, i) => (
                <a key={i} href={c.href} className="flex items-start gap-3 mb-5 last:mb-0 group">
                  <div className="w-9 h-9 bg-brand-gold/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20">
                    <c.icon size={16} className="text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-brown/50 mb-0.5">{c.label}</div>
                    <div className="text-brand-brownDark font-medium text-sm whitespace-pre-line transition-colors duration-300 group-hover:text-brand-gold">
                      {c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="card-premium p-6 bg-brand-brown text-white">
              <h3 className="font-semibold mb-3">Quick WhatsApp</h3>
              <p className="text-white/70 text-sm mb-4">Chat with us directly for faster response</p>
              <a
                href="https://wa.me/916369196624?text=Hi%20KofeeTek%2C%20I%20would%20like%20to%20schedule%20a%20demo."
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm"
              >
                Open WhatsApp Chat
              </a>
            </div>

            <div className="card-premium p-5">
              <div className="text-xs text-brand-brown/50 uppercase tracking-wider mb-3">Service Cities</div>
              <div className="flex flex-wrap gap-2">
                {['Chennai', 'Coimbatore', 'Bangalore', 'Madurai', 'Hosur', 'Salem', 'Tirupur', 'Erode'].map(c => (
                  <span key={c} className="text-xs bg-brand-beige text-brand-brown px-3 py-1.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card-premium p-8">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-5" />
                  <h2 className="font-display text-3xl font-bold text-brand-brownDark mb-3">Inquiry Received!</h2>
                  <p className="text-brand-brown/70 mb-6 max-w-md mx-auto">
                    Our B2B specialist will contact you within 24 hours to discuss your requirements and schedule a demo.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-brown">Submit Another</button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-brand-brownDark mb-7">Send Us a Message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Full Name *</label>
                        <input {...register('name', { required: true })} placeholder="Your name"
                          className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Company Name *</label>
                        <input {...register('company', { required: true })} placeholder="Your company"
                          className={`input-field ${errors.company ? 'border-red-400' : ''}`} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Mobile Number *</label>
                        <input {...register('phone', { required: true })} type="tel" placeholder="+91 XXXXX XXXXX"
                          className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Email Address *</label>
                        <input {...register('email', { required: true })} type="email" placeholder="you@company.com"
                          className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">City / Location *</label>
                        <input {...register('location', { required: true })} placeholder="Chennai"
                          className={`input-field ${errors.location ? 'border-red-400' : ''}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">No. of Employees</label>
                        <select {...register('employees')} className="input-field text-brand-brown/80">
                          <option value="">Select range</option>
                          {['1-50', '51-200', '201-500', '501-1000', '1000+'].map(r => <option key={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Industry Type</label>
                        <select {...register('industry')} className="input-field text-brand-brown/80">
                          <option value="">Select industry</option>
                          {industries.map(i => <option key={i}>{i}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1.5">Inquiry Type</label>
                        <select {...register('inquiry_type')} className="input-field text-brand-brown/80">
                          <option value="">Select type</option>
                          {inquiryTypes.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-brown mb-1.5">Message</label>
                      <textarea {...register('message')} rows={4} placeholder="Tell us about your requirements..."
                        className="input-field resize-none" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-primary w-full justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                      {loading ? 'Sending...' : <><Send size={16} /> Send Inquiry</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map embed */}
      <section className="h-80 bg-brand-beige">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0849955849043!2d80.2005!3d13.0094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzMzLjgiTiA4MMKwMTInMTkuNSJF!5e0!3m2!1sen!2sin!4v1000000000000"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" title="KofeeTek Location"
        />
      </section>
    </>
  )
}


