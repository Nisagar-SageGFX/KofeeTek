import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

/* ─────────────────────────────────────────────
   CLIENT DATA
   logo: null  →  shows branded letter avatar
   logo: '/assets/client-logo/xxx.png' → real image
───────────────────────────────────────────── */
const clients = [
  { name: 'Pegatron',        logo: '/assets/client-logo/Pegatron.png',  bg: '#f5f5f5' },
  { name: 'Microsense',      logo: '/assets/client-logo/microsense.png', bg: '#f0f7ff' },
  { name: 'ResMed',          logo: '/assets/client-logo/Resmed.png',    bg: '#fff'    },
  { name: 'Uber India',      logo: '/assets/client-logo/Uber.png',      bg: '#fff'    },
  { name: 'UPS India',       logo: '/assets/client-logo/ups.svg',       bg: '#351C15' },
  { name: 'Tesa Tapes',      logo: '/assets/client-logo/Tesa tapes.png',      bg: '#fff'    },
  { name: 'Antares Vision',  logo: '/assets/client-logo/antares.png',   bg: '#fff'    },
  { name: 'SRM',             logo: '/assets/client-logo/SRM.png',       bg: '#fff'    },
  { name: 'Botree',          logo: '/assets/client-logo/botree.png',    bg: '#fff'    },
  { name: 'PAIX',            logo: '/assets/client-logo/paix.png',      bg: '#0a1628' },
  { name: 'Ajmera',          logo: '/assets/client-logo/Ajmera.png',    bg: '#fff5ee' },
  { name: 'Novel Office',    logo: null, avatarBg: '#0055A4', avatarText: '#fff' },
  { name: 'Triumph',         logo: null, avatarBg: '#c00',    avatarText: '#fff' },
  { name: 'Infotech',        logo: null, avatarBg: '#0066cc', avatarText: '#fff' },
  { name: 'Kanini',          logo: null, avatarBg: '#009900', avatarText: '#fff' },
  { name: 'LifeCell',        logo: null, avatarBg: '#006633', avatarText: '#fff' },
  { name: 'Situs AMC',       logo: null, avatarBg: '#333',    avatarText: '#fff' },
  { name: 'SmartPoint',      logo: null, avatarBg: '#0055cc', avatarText: '#fff' },
  { name: 'TCI',             logo: null, avatarBg: '#003087', avatarText: '#fff' },
  { name: 'Pro 1 Health',    logo: null, avatarBg: '#111',    avatarText: '#fff' },
  { name: 'V Dart',          logo: null, avatarBg: '#003087', avatarText: '#fff' },
  { name: '4D Global',       logo: null, avatarBg: '#0033cc', avatarText: '#fff' },
  { name: 'Innoppl',         logo: null, avatarBg: '#444',    avatarText: '#fff' },
  { name: 'Tata Electronics',logo: null, avatarBg: '#1c3f7c', avatarText: '#fff' },
  { name: 'Wall Street English', logo: null, avatarBg: '#c00', avatarText: '#fff' },
  { name: 'Phoenix Business',logo: null, avatarBg: '#b35c00', avatarText: '#fff' },
  { name: 'ProPhoenix',      logo: null, avatarBg: '#333',    avatarText: '#fff' },
  { name: 'Swift Cargo',     logo: null, avatarBg: '#003087', avatarText: '#fff' },
  { name: 'TechSoC',         logo: null, avatarBg: '#222',    avatarText: '#fff' },
  { name: 'Getronics',       logo: null, avatarBg: '#0066cc', avatarText: '#fff' },
  { name: 'True ValueHub',   logo: null, avatarBg: '#2d6a2d', avatarText: '#fff' },
  { name: 'NetAccess',       logo: null, avatarBg: '#0055a5', avatarText: '#fff' },
  { name: 'Muffin Group',    logo: null, avatarBg: '#c0392b', avatarText: '#fff' },
  { name: 'Spree Hotels',    logo: null, avatarBg: '#e91e8c', avatarText: '#fff' },
  { name: 'CBRE',            logo: null, avatarBg: '#006747', avatarText: '#fff' },
  { name: 'Heat & Control',  logo: null, avatarBg: '#cc0000', avatarText: '#fff' },
]

const INITIAL_COUNT = 15

/* ── Testimonials ── */
const testimonials = [
  { name:'Rajesh Kumar',       role:'Facilities Manager', company:'Tata Electronics, Chennai',    text:'KofeeTek has been our beverage partner for 3 years. 1,200 employees, zero machine downtime. Their 24-hr response promise is real.',                              rating:5, initial:'R', bg:'bg-brand-brown'  },
  { name:'Priya Venkataraman', role:'Admin Head',          company:'Pegatron Technology, Chennai', text:'We have machines across 3 floors. KofeeTek refills every 2 days without a single reminder. Excellent professional service.',                                    rating:5, initial:'P', bg:'bg-amber-700'    },
  { name:'Suresh Natarajan',   role:'Operations Manager',  company:'UPS India, Bangalore',         text:'Migrated from a competitor. The quality difference is massive. Our team actually looks forward to the coffee break now.',                                        rating:5, initial:'S', bg:'bg-brand-gold'   },
  { name:'Dr. Anitha Krishnan',role:'Hospital Admin',      company:'LifeCell International',       text:'Healthcare requires impeccable hygiene. KofeeTek maintains machines to hospital standards. The health mix options are a huge hit.',                              rating:5, initial:'A', bg:'bg-green-700'    },
  { name:'Mohammed Farhan',    role:'Facility Lead',       company:'CBRE India, Bangalore',        text:'Managing large corporate campuses means needing reliable vendors. KofeeTek delivers on every count — taste, uptime, service.',                                  rating:5, initial:'M', bg:'bg-slate-700'    },
  { name:'Kavitha Sundaram',   role:'HR Director',         company:'Microsense Networks, Chennai', text:"Our 400 engineers demand good coffee. KofeeTek's filter coffee machine is now central to our office culture. Can't imagine without it.", rating:5, initial:'K', bg:'bg-purple-700'   },
]

/* ── Category breakdown ── */
const categories = [
  { label:'IT & Software',          clients:['Pegatron','Kanini','Innoppl','Microsense','SmartPoint','TechSoC','Getronics','NetAccess','4D Global','V Dart'], color:'bg-blue-50 border-blue-200',    badge:'bg-blue-100 text-blue-700'   },
  { label:'Manufacturing',          clients:['Tata Electronics','Tesa Tapes','TCI','Antares Vision','Heat & Control','Swift Cargo'],                          color:'bg-orange-50 border-orange-200', badge:'bg-orange-100 text-orange-700'},
  { label:'Healthcare',             clients:['LifeCell','ResMed','Pro 1 Health','Situs AMC'],                                                                 color:'bg-green-50 border-green-200',   badge:'bg-green-100 text-green-700' },
  { label:'Corporate & Services',   clients:['Novel Office','UPS India','Uber India','CBRE','Wall Street English','ProPhoenix','Botree','Ajmera','True ValueHub','SRM'], color:'bg-purple-50 border-purple-200', badge:'bg-purple-100 text-purple-700'},
  { label:'Hospitality & Retail',   clients:['Spree Hotels','Muffin Group','PAIX','Phoenix Business','Triumph'],                                              color:'bg-yellow-50 border-yellow-200', badge:'bg-yellow-100 text-yellow-700'},
]

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: 'easeOut' } },
  exit:   { opacity: 0, y: 16, scale: 0.94, transition: { duration: 0.25, ease: 'easeIn'  } },
}

/* ── Single client card ── */
function ClientCard({ client, index }) {
  const [imgError, setImgError] = useState(false)
  const initial = client.name.charAt(0).toUpperCase()

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm
                 hover:shadow-xl hover:shadow-brand-gold/10 hover:border-brand-gold/30
                 transition-shadow duration-300 cursor-default overflow-hidden
                 flex flex-col items-center justify-center p-5 gap-3"
      style={{ minHeight: '130px' }}
    >
      {/* Gold shimmer line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Logo / Avatar */}
      <div className="w-full flex items-center justify-center"
           style={{ height: '60px' }}>
        {client.logo && !imgError ? (
          <img
            src={client.logo}
            alt={client.name}
            onError={() => setImgError(true)}
            className="max-h-[52px] max-w-[120px] w-auto object-contain
                       group-hover:scale-110 transition-transform duration-350"
            style={{
              filter: client.bg === '#351C15' || client.bg === '#0a1628'
                ? 'brightness(0) invert(1)'
                : 'none',
            }}
          />
        ) : (
          /* Branded letter avatar fallback */
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center
                       font-bold text-xl group-hover:scale-110 transition-transform duration-300 shrink-0"
            style={{
              background: client.avatarBg || '#4A2C1D',
              color:      client.avatarText || '#fff',
            }}
          >
            {initial}
          </div>
        )}
      </div>

      {/* Company name */}
      <p className="text-center text-[12px] font-semibold text-brand-brownDark/80
                    group-hover:text-brand-gold transition-colors duration-200 leading-tight px-1">
        {client.name}
      </p>
    </motion.div>
  )
}

/* ── Main page ── */
export default function Clients() {
  const [showAll, setShowAll]   = useState(false)
  const gridRef                 = useRef(null)

  const displayed = showAll ? clients : clients.slice(0, INITIAL_COUNT)

  const handleToggle = () => {
    if (showAll) {
      // Collapse — scroll back to grid top
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => setShowAll(false), 300)
    } else {
      setShowAll(true)
    }
  }

  return (
    <>
      <Helmet>
        <title>Our Clients | KofeeTek – Trusted by 500+ Companies</title>
        <meta name="description"
          content="KofeeTek serves 500+ corporate clients including Tata Electronics, Pegatron, UPS India, CBRE, LifeCell across Chennai, Coimbatore and Bangalore." />
      </Helmet>

      {/* ── Page hero ── */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:'radial-gradient(circle,rgba(245,184,0,.6) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Our Clients</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-brand-gold">500+ Companies</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            From Chennai tech parks to Bangalore campuses — South India's best companies choose KofeeTek.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[['500+','Corporate Clients'],['7+','Years Serving'],['6','Cities Covered'],['36+','Major Brands']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-display text-3xl font-bold text-brand-gold">{val}</div>
                <div className="text-white/50 text-xs mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGO GRID ── */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Our Valued Clients</span>
            <h2 className="section-heading">Companies That Trust KofeeTek</h2>
            <p className="section-subheading mx-auto text-center mt-3">
              Leading corporates, manufacturers and healthcare providers across South India.
            </p>
          </div>

          {/* Scroll anchor */}
          <div ref={gridRef} />

          {/* Grid */}
          <motion.div
            key={showAll ? 'expanded' : 'collapsed'}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10"
          >
            {displayed.map((client, i) => (
              <ClientCard key={`${client.name}-${i}`} client={client} index={i} />
            ))}
          </motion.div>

          {/* Show More / Less button */}
          {clients.length > INITIAL_COUNT && (
            <div className="flex justify-center">
              <motion.button
                onClick={handleToggle}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 bg-white border-2 border-brand-gold/40
                           text-brand-brown font-semibold text-sm px-8 py-3.5 rounded-full
                           hover:bg-brand-gold hover:text-brand-brownDark hover:border-brand-gold
                           transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-brand-gold/20"
              >
                {showAll ? (
                  <>
                    Show Less
                    <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    Show All {clients.length} Clients
                    <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* ── Category breakdown ── */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">By Industry</span>
            <h2 className="section-heading">Clients Across Every Sector</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.1 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border-2 ${cat.color} p-6`}
              >
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${cat.badge}
                                  mb-4 inline-block uppercase tracking-wider`}>
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.clients.map(c => (
                    <span key={c}
                      className="text-xs bg-white text-brand-brownDark px-2.5 py-1
                                 rounded-full border border-brand-beige font-medium shadow-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">What They Say</span>
            <h2 className="section-heading">Client Testimonials</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.1 }}
                transition={{ delay: i * 0.09 }}
                className="card-premium p-6 group hover:border-brand-gold/30"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-brown/70 text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.bg} rounded-full flex items-center
                                  justify-center text-white font-bold text-sm shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-brownDark text-sm">{t.name}</div>
                    <div className="text-brand-brown/50 text-xs">{t.role}</div>
                    <div className="text-brand-brown/35 text-xs">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl font-bold text-brand-brownDark mb-3">
            Join 500+ Companies Across South India
          </h3>
          <p className="text-brand-brown/60 mb-7 text-sm">
            Get a free demo today. No commitment required.
          </p>
          <Link to="/contact" className="btn-brown gap-2">
            Schedule Free Demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
