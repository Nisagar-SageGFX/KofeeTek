import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { CheckCircle2, X, Wrench, RefreshCw, HeartHandshake, Shield, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '₹2,200',
    period: '/month',
    machine: 'Economy Coffee Machine',
    highlight: false,
    included: ['1 machine installation', 'Monthly consumable refill', 'Quarterly maintenance', 'Phone support', 'Up to 300 cups/day'],
    notIncluded: ['Emergency visit', 'Machine replacement', 'IoT monitoring']
  },
  {
    name: 'Business',
    price: '₹5,500',
    period: '/month',
    machine: 'Combo Machine (Coffee + Tea)',
    highlight: true,
    badge: 'Most Popular',
    included: ['1 combo machine', 'Bi-weekly refill', 'Monthly maintenance', '24-hr support', 'Up to 800 cups/day', 'Emergency visit included', 'IoT remote monitoring'],
    notIncluded: []
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    machine: 'Multiple Machines',
    highlight: false,
    included: ['2–10 machines', 'Weekly refill schedule', 'Dedicated service engineer', 'SLA-backed support', 'Unlimited capacity', 'All machine types', 'Annual contract discount'],
    notIncluded: []
  }
]

const process = [
  { step: '01', title: 'Share Requirements', desc: 'Tell us your office size, employee count, and preferred beverages.' },
  { step: '02', title: 'Free Site Visit',     desc: 'Our engineer visits your workplace to recommend the right machine.' },
  { step: '03', title: 'Installation',        desc: 'We install and configure the machine. Usually done in 2 hours.' },
  { step: '04', title: 'Training & Handover', desc: 'We train your facility team and hand over the machine.' },
  { step: '05', title: 'Ongoing Support',     desc: 'Regular refills, maintenance, and 24-hr support — all handled by us.' },
]

export default function Rental() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Helmet>
        <title>Coffee Machine Rental Plans | KofeeTek – From ₹2,200/month</title>
        <meta name="description" content="Rent a coffee or tea vending machine for your office. KofeeTek rental plans start at ₹2,200/month with full service support, refilling, and maintenance included." />
      </Helmet>

      <section className="pt-32 pb-20 bg-gradient-to-br from-brand-dark to-brand-brownDark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Rental Plans</span>
          <h1 className="font-display text-5xl font-bold text-white mb-5">
            Zero Investment. <span className="text-brand-gold">100% Convenience.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get premium vending machines without capital expenditure. Rent, refill, relax — we handle everything else.
          </p>
        </div>
      </section>

      {/* Benefits bar */}
      <div className="bg-brand-gold py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          {[
            [Wrench, 'Full AMC Included'],
            [RefreshCw, 'Regular Refills'],
            [Shield, 'Machine Insurance'],
            [HeartHandshake, '30-Day Cancel Policy'],
          ].map(([Icon, label], i) => (
            <div key={i} className="flex items-center gap-2 text-brand-brownDark font-semibold text-sm">
              <Icon size={16} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <section ref={ref} className="py-20 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-7 mb-20">
            {plans.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  p.highlight
                    ? 'border-brand-gold shadow-2xl shadow-brand-gold/20 scale-105'
                    : 'border-brand-beige bg-white'
                }`}>
                {p.badge && (
                  <div className="bg-brand-gold py-2 text-center text-brand-brownDark text-xs font-bold uppercase tracking-widest">
                    {p.badge}
                  </div>
                )}
                <div className={`p-7 ${p.highlight ? 'bg-brand-brown' : 'bg-white'}`}>
                  <div className={`text-sm font-semibold uppercase tracking-wider mb-1 ${p.highlight ? 'text-brand-gold' : 'text-brand-gold'}`}>
                    {p.name}
                  </div>
                  <div className={`font-display text-4xl font-bold mb-1 ${p.highlight ? 'text-white' : 'text-brand-brownDark'}`}>
                    {p.price}<span className={`text-lg font-normal ${p.highlight ? 'text-white/60' : 'text-brand-brown/60'}`}>{p.period}</span>
                  </div>
                  <div className={`text-sm mb-6 ${p.highlight ? 'text-white/60' : 'text-brand-brown/60'}`}>{p.machine}</div>
                  <Link to="/contact" className={`w-full justify-center block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    p.highlight ? 'bg-brand-gold text-brand-brownDark hover:bg-brand-goldLight' : 'bg-brand-brown text-white hover:bg-brand-brownLight'
                  }`}>
                    Get Started
                  </Link>
                </div>
                <div className={`px-7 pb-7 ${p.highlight ? 'bg-brand-brownDark' : 'bg-white'}`}>
                  <div className={`text-xs uppercase tracking-wider font-semibold mb-4 pt-5 ${p.highlight ? 'text-white/40' : 'text-brand-brown/40'}`}>
                    What's included
                  </div>
                  <ul className="space-y-2.5">
                    {p.included.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                        <span className={`text-sm ${p.highlight ? 'text-white/80' : 'text-brand-brown/80'}`}>{item}</span>
                      </li>
                    ))}
                    {p.notIncluded.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <X size={14} className="text-red-400 shrink-0" />
                        <span className={`text-sm line-through ${p.highlight ? 'text-white/30' : 'text-brand-brown/30'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <div>
            <h2 className="section-heading text-center mb-12">How It Works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {process.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                  className="text-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4
                                  font-display font-bold text-brand-brownDark text-lg">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-brand-brownDark mb-2 text-sm">{s.title}</h3>
                  <p className="text-brand-brown/60 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
