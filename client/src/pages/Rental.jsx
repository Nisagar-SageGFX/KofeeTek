import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  CheckCircle2, Wrench, RefreshCw, HeartHandshake, Shield,
  MapPin, Coffee, Phone, Star
} from 'lucide-react'

const plans = [
  {
    name: 'Starter Plan',
    price: '₹2,500',
    period: '/Month',
    badge: null,
    accent: 'brand-brown',
    headerBg: 'bg-brand-brown',
    image: '/assets/machines/Starter plan.png',
    bestFor: '40 – 80 Employees',
    billing: '₹12,000 – ₹15,000',
    features: [
      'Coffee & Tea Vending Machine',
      'Fresh Filter Coffee & Tea',
      'Free Installation',
      'Preventive Maintenance',
      'Technical Support',
      '1-Year Contract',
      'Live Demo Available',
    ],
    cta: 'Get Quote',
    ctaStyle: 'bg-brand-brown text-white hover:bg-brand-brownLight',
  },
  {
    name: 'Business Plan',
    price: '₹3,000',
    period: '/Month',
    badge: null,
    accent: 'green-700',
    headerBg: 'bg-green-700',
    image: '/assets/machines/KT Capacitive Touch Brew.jpeg',
    bestFor: '80 – 150 Employees',
    billing: '₹18,000 – ₹20,000',
    features: [
      'Premium Coffee & Tea Machine',
      'Fresh Filter Coffee',
      'Premium Tea & Flavoured Tea',
      'Free Installation',
      'Scheduled Maintenance',
      'Priority Service Support',
      '1-Year Contract',
    ],
    cta: 'Get Quote',
    ctaStyle: 'bg-green-700 text-white hover:bg-green-600',
  },
  {
    name: 'Bean-to-Cup Plan',
    price: '₹3,500',
    period: '/Month',
    badge: null,
    accent: 'brand-brownDark',
    headerBg: 'bg-brand-brownDark',
    image: '/assets/machines/Bean to cup.png',
    bestFor: '50 – 120 Employees',
    billing: '₹20,000+',
    features: [
      'Bean-to-Cup Coffee Machine',
      'Premium Coffee Beans',
      'Fresh Milk Compatible',
      'Tea & Hot Water Options',
      'Free Installation',
      'AMC Support',
      '1-Year Contract',
    ],
    cta: 'Get Quote',
    ctaStyle: 'bg-brand-brownDark text-white hover:bg-brand-brown',
  },
  {
    name: 'Enterprise Plan',
    price: 'FREE',
    period: 'Machine Rental',
    badge: 'Best Value',
    accent: 'brand-gold',
    headerBg: 'bg-brand-gold',
    headerText: 'text-brand-brownDark',
    image: '/assets/machines/KT FreshMilk Pro 8.jpeg',
    bestFor: '150 – 500+ Employees',
    billing: '₹40,000+',
    highlight: true,
    features: [
      'Zero Machine Rental',
      'Premium Coffee & Tea Machine',
      'Free Installation',
      'Unlimited Preventive Maintenance',
      'Priority Breakdown Support',
      'Dedicated Account Manager',
      '1-Year Contract',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'bg-brand-gold text-brand-brownDark hover:bg-brand-goldLight',
  },
]

const infoBar = [
  {
    icon: MapPin,
    title: 'Available In',
    desc: 'Chennai • Bengaluru • Hyderabad • Coimbatore',
  },
  {
    icon: Coffee,
    title: 'Demo Available',
    desc: 'Book a FREE live demo & coffee tasting for your office today!',
  },
  {
    icon: Phone,
    title: 'Need Help?',
    desc: 'Our experts are here to help you choose the perfect plan.',
  },
]

export default function Rental() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Helmet>
        <title>Coffee Machine Rental Plans | KofeeTek – From ₹2,500/month</title>
        <meta name="description" content="Rent a coffee or tea vending machine for your office. KofeeTek rental plans start at ₹2,500/month with full service support, refilling, and maintenance included." />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-20 bg-gradient-to-br from-brand-dark to-brand-brownDark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-label">Rental Plans</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            KofeeTek Coffee Machine <span className="text-brand-gold">Rental Plans</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Premium coffee experience for your workplace — zero investment, full service support included.
          </p>
        </div>
      </section>

      {/* Benefits bar */}
      <div className="bg-brand-gold py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {[
            [Wrench, 'Full AMC Included'],
            [RefreshCw, 'Regular Refills'],
            [Shield, 'Machine Insurance'],
            [HeartHandshake, '30-Day Cancel Policy'],
          ].map(([Icon, label], i) => (
            <div key={i} className="flex items-center gap-2 text-brand-brownDark font-semibold text-xs sm:text-sm">
              <Icon size={15} className="shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <section ref={ref} className="py-14 sm:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden bg-white flex flex-col transition-all duration-300 ${
                  p.highlight
                    ? 'border-2 border-brand-gold shadow-2xl shadow-brand-gold/25 lg:-translate-y-2'
                    : 'border border-brand-beige shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Badge ribbon */}
                {p.badge && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1
                                  bg-brand-brownDark text-brand-gold text-[10px] font-bold uppercase
                                  tracking-wider px-2.5 py-1.5 rounded-full shadow-md">
                    <Star size={10} className="fill-brand-gold" />
                    {p.badge}
                  </div>
                )}

                

                {/* Header */}
                <div className={`${p.headerBg} ${p.headerText || 'text-white'} py-3 text-center text-sm font-bold uppercase tracking-wide`}>
                  {p.name}
                </div>

                {/* Price */}
                <div className="px-5 sm:px-6 pt-6 pb-5 text-center border-b border-brand-beige">
                  <div className={`font-display text-3xl sm:text-4xl font-bold mb-0.5 ${
                    p.highlight ? 'text-brand-gold' : 'text-brand-brownDark'
                  }`}>
                    {p.price}
                  </div>
                  <div className="text-brand-brown/55 text-xs sm:text-sm font-medium mb-4">{p.period}</div>
                  
                  {/* Machine image */}
                <div className="relative bg-white pt-4 px-4">
                  <img
                    src={p.image}
                    alt={`${p.name} – ${p.name === 'Bean-to-Cup Plan' ? 'Bean-to-Cup' : p.name.replace(' Plan', '')} vending machine`}
                    loading="lazy"
                    className="w-full h-32 sm:h-36 lg:h-40 object-contain"
                  />
                </div>
                
                  <div className="bg-brand-cream rounded-xl py-2.5 px-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-brown/50 mb-1">Best For</div>
                    <div className="text-brand-brownDark text-sm font-semibold">{p.bestFor}</div>
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-brown/50 mb-1">
                      Minimum Monthly Billing
                    </div>
                    <div className="text-brand-brown font-bold text-sm">{p.billing}</div>
                  </div>
                </div>

                {/* Features */}
                <ul className="px-5 sm:px-6 py-5 space-y-2.5 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-brand-brown/75 text-xs sm:text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-5 sm:px-6 pb-6">
                  <Link
                    to="/contact"
                    className={`w-full block text-center py-3 rounded-xl font-bold text-sm uppercase tracking-wide
                                transition-colors duration-200 ${p.ctaStyle}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar — availability, demo, help */}
      <section className="bg-white border-t border-brand-beige py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center sm:text-left">
            {infoBar.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="w-11 h-11 rounded-full border-2 border-brand-gold flex items-center
                                justify-center text-brand-gold shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-brownDark text-sm mb-1">{title}</h3>
                  <p className="text-brand-brown/60 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
