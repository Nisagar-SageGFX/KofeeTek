import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function ContactCTA() {
  const ref = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal-scale">
          <div className="bg-gradient-to-br from-brand-brown to-brand-brownDark rounded-3xl
                          overflow-hidden relative p-10 md:p-14">
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle,rgba(245,184,0,.8) 1px,transparent 1px)', backgroundSize:'22px 22px' }} />

            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-brand-gold/20 text-brand-gold text-[10px] font-semibold
                                 px-4 py-1.5 rounded-full uppercase tracking-[3px] mb-5">
                  Get In Touch
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Let's Brew Something<br />
                  <span className="text-brand-gold">Great Together</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 text-[15px]">
                  Get a free consultation, machine demo, and customised beverage plan for your workplace.
                  No pressure. Just great coffee conversations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contact" className="btn-primary gap-2">
                    Schedule Free Demo <ArrowRight size={16} />
                  </Link>
                  <a href="tel:+919962242499" className="btn-outline gap-2">
                    <Phone size={15} /> Call Now
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Phone, label:'Call / WhatsApp', value:'+91 99622 42499', href:'tel:+919962242499' },
                  { icon: Phone, label:'Alternate',       value:'+91 80728 47972', href:'tel:+918072847972' },
                  { icon: Mail,  label:'Email Us',        value:'sales@kofeetek.in', href:'mailto:sales@kofeetek.in' },
                  { icon: MapPin,label:'Head Office',     value:'Urapakkam, Chennai – 603210', href:'#' },
                ].map((c, i) => (
                  <a key={i} href={c.href}
                    className="glass-card p-4 flex items-center gap-4 hover:bg-white/20 transition-colors group block">
                    <div className="w-9 h-9 bg-brand-gold/20 rounded-xl flex items-center justify-center shrink-0
                                    group-hover:bg-brand-gold/30 transition-colors">
                      <c.icon size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <div className="text-white/45 text-[11px]">{c.label}</div>
                      <div className="text-white font-medium text-sm">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
