import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Building2, Factory, Building, GraduationCap, Laptop, Warehouse, Utensils, CheckCircle2, ArrowRight } from 'lucide-react'

const industries = [
  {
    icon: Laptop,
    title: 'IT & Software Companies',
    count: '120+',
    desc: 'Tech parks, BPOs, software product companies across Chennai and Bangalore.',
    clients: ['Pegatron', 'Kanini', 'Microsense', 'Innoppl', '4D Global', 'V Dart'],
    benefits: ['24-hr uptime for round shifts', 'Multiple floors covered', 'Premium filter coffee', 'Energy efficient machines']
  },
  {
    icon: Factory,
    title: 'Manufacturing & Factories',
    count: '80+',
    desc: 'Automobile, textile, pharma, electronics manufacturing plants.',
    clients: ['Tata Electronics', 'Tesa Tapes', 'TCI', 'Heat & Control'],
    benefits: ['High-capacity machines', 'Shift-based refill schedule', 'Rugged stainless body', 'Low maintenance']
  },
  {
    icon: Building,
    title: 'Hospitals & Healthcare',
    count: '50+',
    desc: 'Multi-specialty hospitals, diagnostic labs, healthcare facilities.',
    clients: ['LifeCell', 'ResMed', 'Pro 1 Health', 'Situs AMC'],
    benefits: ['Hygienic enclosed dispensing', 'Health drink options', 'Sugar-free alternatives', 'Quiet operation']
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    count: '40+',
    desc: 'Engineering colleges, MBA institutes, coaching centres.',
    clients: ['SRM', 'Wall Street English'],
    benefits: ['Affordable pricing', 'Compact machines', 'Multiple hot beverages', 'Easy student operation']
  },
  {
    icon: Building2,
    title: 'Corporate Offices',
    count: '180+',
    desc: 'MNC campuses, co-working spaces, banks, NBFC offices.',
    clients: ['Novel Office', 'UPS India', 'CBRE', 'Uber India', 'Ajmera'],
    benefits: ['Branded machine wraps', 'Smart IoT monitoring', 'Premium coffee experience', 'Dedicated account manager']
  },
  {
    icon: Warehouse,
    title: 'Warehouses & Logistics',
    count: '30+',
    desc: 'Logistics hubs, cold storage facilities, e-commerce fulfilment centres.',
    clients: ['Swift Cargo', 'ProPhoenix'],
    benefits: ['24x7 hot beverage access', 'Durable for warehouse environment', 'Minimal training needed', 'Bulk consumable supply']
  },
  {
    icon: Utensils,
    title: 'Hospitality & Hotels',
    count: '20+',
    desc: 'Hotels, resorts, cafeterias, event venues.',
    clients: ['Spree Hotels', 'Muffin Group', 'PAIX'],
    benefits: ['Premium barista-quality drinks', 'Bean-to-cup options', 'Aesthetic machine designs', 'Guest satisfaction']
  },
]

export default function Industries() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <>
      <Helmet>
        <title>Industries We Serve | KofeeTek – IT, Manufacturing, Hospitals, Corporate</title>
        <meta name="description" content="KofeeTek serves IT companies, manufacturing plants, hospitals, educational institutions and corporate offices across Tamil Nadu and Karnataka with premium vending machines." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,184,0,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Industries</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Serving Every <span className="text-brand-gold">Industry</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            From IT parks to factory floors — KofeeTek's machines are built for every workplace environment.
          </p>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-7">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-7 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-13 h-13 bg-brand-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors w-12 h-12">
                    <ind.icon size={24} className="text-brand-gold" />
                  </div>
                  <span className="font-display text-4xl font-bold text-brand-gold/30 group-hover:text-brand-gold/50 transition-colors">
                    {ind.count}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-brownDark mb-2">{ind.title}</h3>
                <p className="text-brand-brown/65 text-sm mb-5">{ind.desc}</p>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {ind.benefits.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-brand-brown/80">
                      <CheckCircle2 size={12} className="text-brand-gold shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs text-brand-brown/40 uppercase tracking-wider mb-2">Key Clients</div>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.clients.map(c => (
                      <span key={c} className="text-xs bg-brand-beige text-brand-brown px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="font-display text-2xl font-bold text-brand-brownDark mb-3">
              Don't see your industry?
            </h3>
            <p className="text-brand-brown/60 mb-6 text-sm">We serve any workplace with 20+ employees. Let's talk.</p>
            <Link to="/contact" className="btn-brown gap-2">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
