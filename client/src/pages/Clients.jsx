import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Star, ArrowRight } from 'lucide-react'

// Real clients from brochure page 9
const clients = [
  'Novel Office', 'Pegatron', 'Triumph', 'Infotech', 'Kanini', 'LifeCell',
  'Uber India', 'Situs AMC', 'ResMed', 'Microsense', 'Tesa Tapes', 'SmartPoint',
  'Antares Vision', 'TCI', 'Pro 1 Health', 'V Dart', '4D Global', 'Innoppl',
  'Tata Electronics', 'Wall Street English', 'SRM', 'PAIX', 'Phoenix Business',
  'UPS India', 'ProPhoenix', 'Swift Cargo', 'Botree', 'TechSoC', 'Getronics',
  'True ValueHub', 'NetAccess', 'Ajmera', 'Muffin Group', 'Spree Hotels',
  'CBRE', 'Heat & Control',
]

const categories = [
  {
    label: 'IT & Software',
    clients: ['Pegatron', 'Kanini', 'Innoppl', 'Microsense', 'SmartPoint', 'TechSoC', 'Getronics', 'NetAccess', '4D Global', 'V Dart'],
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700' 
    
  },
  {
    label: 'Manufacturing & Industry',
    clients: ['Tata Electronics', 'Tesa Tapes', 'TCI', 'Antares Vision', 'Heat & Control', 'Swift Cargo'],
    color: 'bg-orange-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-700'
  },
  {
    label: 'Healthcare',
    clients: ['LifeCell', 'ResMed', 'Pro 1 Health', 'Situs AMC'],
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700'
  },
  {
    label: 'Corporate & Services',
    clients: ['Novel Office', 'UPS India', 'Uber India', 'CBRE', 'Wall Street English', 'ProPhoenix', 'Botree', 'Ajmera', 'True ValueHub', 'SRM'],
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700'
  },
  {
    label: 'Hospitality & Retail',
    clients: ['Spree Hotels', 'Muffin Group', 'PAIX', 'Phoenix Business', 'Triumph'],
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700' ,
    image: 'assets'
  },
]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Facilities Manager',
    company: 'Tata Electronics, Chennai',
    text: 'KofeeTek has been our beverage partner for 3 years. 1,200 employees, zero machine downtime. Their 24-hr response promise is real.',
    rating: 5, initial: 'R', bg: 'bg-brand-brown'
  },
  {
    name: 'Priya Venkataraman',
    role: 'Admin Head',
    company: 'Pegatron Technology, Chennai',
    text: 'We have machines across 3 floors. KofeeTek refills every 2 days without a single reminder. Excellent professional service.',
    rating: 5, initial: 'P', bg: 'bg-amber-700'
  },
  {
    name: 'Suresh Natarajan',
    role: 'Operations Manager',
    company: 'UPS India, Bangalore',
    text: 'Migrated from a competitor. The quality difference is massive. Our team actually looks forward to the coffee break now.',
    rating: 5, initial: 'S', bg: 'bg-brand-gold'
  },
  {
    name: 'Dr. Anitha Krishnan',
    role: 'Hospital Administrator',
    company: 'LifeCell International, Chennai',
    text: 'Healthcare requires impeccable hygiene. KofeeTek maintains machines to hospital standards. The health mix options are a hit.',
    rating: 5, initial: 'A', bg: 'bg-green-700'
  },
  {
    name: 'Mohammed Farhan',
    role: 'Facility Lead',
    company: 'CBRE India, Bangalore',
    text: 'Managing large corporate campuses means needing reliable vendors. KofeeTek delivers on every count — taste, uptime, service.',
    rating: 5, initial: 'M', bg: 'bg-slate-700'
  },
  {
    name: 'Kavitha Sundaram',
    role: 'HR Director',
    company: 'Microsense Networks, Chennai',
    text: 'Our 400 engineers demand good coffee. KofeeTek\'s filter coffee machine is now central to our office culture. Can\'t imagine without it.',
    rating: 5, initial: 'K', bg: 'bg-purple-700'
  },
]

export default function Clients() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <>
      <Helmet>
        <title>Our Clients | KofeeTek – Trusted by 500+ Companies</title>
        <meta name="description" content="KofeeTek serves 500+ corporate clients including Tata Electronics, Pegatron, UPS India, CBRE, LifeCell across Chennai, Coimbatore, Bangalore and South India." />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,184,0,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Our Clients</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-brand-gold">500+ Companies</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            From Chennai tech parks to Bangalore campuses — India's best companies choose KofeeTek.
          </p>
        </div>
      </section>

      {/* All clients marquee */}
      <section className="py-10 bg-brand-gold/10 border-y border-brand-gold/20 overflow-hidden">
        <div className="relative flex">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-cream to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-cream to-transparent z-10" />
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="min-w-[170px] mx-4">
                <div className="bg-white border border-brand-beige rounded-xl px-5 py-3 text-brand-brown/70
                                font-semibold text-sm text-center hover:border-brand-gold hover:text-brand-gold
                                transition-all duration-200 cursor-default shadow-sm">
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Industry breakdown */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="section-label">By Industry</span>
              <h2 className="section-heading">Clients Across Every Sector</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border-2 ${cat.color} p-6`}
                >
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.badge} mb-4 inline-block uppercase tracking-wider`}>
                    {cat.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.clients.map(c => (
                      <span key={c} className="text-xs bg-white text-brand-brownDark px-2.5 py-1 rounded-full
                                               border border-brand-beige font-medium shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="text-center mb-12">
              <span className="section-label">What They Say</span>
              <h2 className="section-heading">Client Testimonials</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="card-premium p-7"
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={13} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-brand-brown/75 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${t.bg} rounded-full flex items-center justify-center
                                    text-white font-bold text-sm shrink-0`}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-brownDark text-sm">{t.name}</div>
                      <div className="text-brand-brown/50 text-xs">{t.role}</div>
                      <div className="text-brand-brown/40 text-xs">{t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="mt-14 text-center">
            <h3 className="font-display text-2xl font-bold text-brand-brownDark mb-3">
              Join 500+ Companies Across South India
            </h3>
            <p className="text-brand-brown/60 mb-6">Get a free demo today. No commitment required.</p>
            <Link to="/contact" className="btn-brown gap-2">
              Schedule Free Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
