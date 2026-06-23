import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react'

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
  { name: 'UPS India',       logo: '/assets/client-logo/UPS.png',      bg: '#fff'    },
  { name: 'Tesa Tapes',      logo: '/assets/client-logo/Tesa tapes.png',      bg: '#fff'    },
  { name: 'Antares Vision',  logo: '/assets/client-logo/antares.png',   bg: '#fff'    },
  { name: 'SRM',             logo: '/assets/client-logo/SRM.png',       bg: '#fff'    },
  { name: 'Botree',          logo: '/assets/client-logo/botree.png',    bg: '#fff'    },
  { name: 'PAIX',            logo: '/assets/client-logo/paix.png',      bg: '#ffffff' },
  { name: 'Ajmera',          logo: '/assets/client-logo/Ajmera.png',    bg: '#fff5ee' },
  { name: 'Novel Office',    logo:'/assets/client-logo/Novel Office.png', bg: '#fff'    },
  { name: 'Triumph',         logo: '/assets/client-logo/Triumph.png',   bg: '#fff'    },
  { name: 'Infotech',        logo: '/assets/client-logo/Infotech.png', bg: '#fff' },
  { name: 'Kanini',          logo: '/assets/client-logo/Kanini.png', bg: '#fff' },
  { name: 'LifeCell',        logo: '/assets/client-logo/Lifecell.png', bg: '#fff' },
  { name: 'Situs AMC',       logo: '/assets/client-logo/Situs AMC.png', bg: '#fff' },
  { name: 'SmartPoint',      logo: '/assets/client-logo/Smartpoint.png', bg: '#fff' },
  { name: 'TCI',             logo: '/assets/client-logo/TCI.png', bg: '#003087' },
  { name: 'Pro 1 Health',    logo: '/assets/client-logo/pro 1.png', bg: '#111' },
  { name: 'V Dart',          logo: '/assets/client-logo/Vdart.png', bg: '#003087' },
  { name: '4D Global',       logo: '/assets/client-logo/4d global.png', bg: '#0033cc' },
  { name: 'Innoppl',         logo: '/assets/client-logo/innoppl.png', bg: '#444' },
  { name: 'Tata Electronics',logo: '/assets/client-logo/Tata_Electronics.png', bg: '#1c3f7c' },
  { name: 'Wall Street English', logo: '/assets/client-logo/wall-street-english.png', bg: '#c00' },
  { name: 'Phoenix Business',logo: '/assets/client-logo/Phoenix.png', bg: '#b35c00' },
  { name: 'ProPhoenix',      logo: '/assets/client-logo/pro phoenix.png', bg: '#333' },
  { name: 'Swift Cargo',     logo: '/assets/client-logo/swift cargo.png', bg: '#003087' },
  { name: 'TechSoC',         logo: '/assets/client-logo/Techsoc.png', bg: '#222' },
  { name: 'Getronics',       logo: '/assets/client-logo/Getronics.png', bg: '#0066cc' },
  { name: 'True ValueHub',   logo: '/assets/client-logo/truevaluehub.png', bg: '#2d6a2d' },
  { name: 'NetAccess',       logo: '/assets/client-logo/Netaccess.png', bg: '#0055a5' },
  { name: 'Muffin Group',    logo: '/assets/client-logo/Muffin group.png', bg: '#c0392b' },
  { name: 'Spree Hotels',    logo: '/assets/client-logo/Spree.png', bg: '#e91e8c' },
  { name: 'CBRE',            logo: '/assets/client-logo/Cbre.png', bg: '#006747' },
  { name: 'Heat & Control',  logo: '/assets/client-logo/HAC.png', bg: '#cc0000' },
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

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 50

/** Returns 1 (mobile) / 2 (tablet) / 3 (desktop) based on viewport width */
function useCardsPerView() {
  const getPerView = (w) => (w < 640 ? 1 : w < 1024 ? 2 : 3)
  const [perView, setPerView] = useState(
    typeof window === 'undefined' ? 3 : getPerView(window.innerWidth)
  )

  useEffect(() => {
    let frame
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setPerView(getPerView(window.innerWidth)))
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return perView
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

  /* ── Testimonials carousel state ── */
  const perView   = useCardsPerView()
  const pageCount = Math.ceil(testimonials.length / perView)

  const [page, setPage]           = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const carouselRef   = useRef(null)
  const autoplayRef   = useRef(null)
  const liveRegionRef = useRef(null)

  useEffect(() => {
    setPage(p => Math.min(p, pageCount - 1))
  }, [pageCount])

  const goTo = useCallback((next) => {
    setDirection(next > page ? 1 : -1)
    setPage(((next % pageCount) + pageCount) % pageCount)
  }, [page, pageCount])

  const nextSlide = useCallback(() => goTo(page + 1), [goTo, page])
  const prevSlide = useCallback(() => goTo(page - 1), [goTo, page])

  useEffect(() => {
    if (!isPlaying || isHovering || pageCount <= 1) return
    autoplayRef.current = setInterval(() => {
      setDirection(1)
      setPage(p => (p + 1) % pageCount)
    }, AUTOPLAY_MS)
    return () => clearInterval(autoplayRef.current)
  }, [isPlaying, isHovering, pageCount])

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Showing testimonials ${page + 1} of ${pageCount}`
    }
  }, [page, pageCount])

  const onCarouselKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide() }
    if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide() }
  }

  const testimonialSlides = useMemo(() => {
    const out = []
    for (let i = 0; i < pageCount; i++) {
      out.push(testimonials.slice(i * perView, i * perView + perView))
    }
    return out
  }, [perView, pageCount])

  const slideVariants = {
    enter:  (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
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

      {/* ── Testimonials Carousel ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">What They Say</span>
            <h2 className="section-heading">Client Testimonials</h2>
          </div>

          <div
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={onCarouselKeyDown}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 rounded-2xl"
          >
            {/* Live region for screen readers */}
            <p ref={liveRegionRef} className="sr-only" role="status" aria-live="polite" />

            {/* Side arrows — desktop/tablet only */}
            {pageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonials"
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6
                             z-10 w-10 h-10 rounded-full bg-white border border-brand-beige shadow-md
                             items-center justify-center text-brand-brown hover:bg-brand-gold
                             hover:text-brand-brownDark hover:border-brand-gold transition-colors duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonials"
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6
                             z-10 w-10 h-10 rounded-full bg-white border border-brand-beige shadow-md
                             items-center justify-center text-brand-brown hover:bg-brand-gold
                             hover:text-brand-brownDark hover:border-brand-gold transition-colors duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Slide viewport */}
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  drag={pageCount > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) nextSlide()
                    else if (info.offset.x > SWIPE_THRESHOLD) prevSlide()
                  }}
                  className={`grid gap-5 ${
                    perView === 1 ? 'grid-cols-1' : perView === 2 ? 'grid-cols-2' : 'grid-cols-3'
                  }`}
                >
                  {testimonialSlides[page]?.map((t, i) => (
                    <motion.div
                      key={`${page}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                    >
                      <div className="card-premium p-6 sm:p-7 relative h-full flex flex-col
                                      hover:border-brand-gold/30 transition-colors duration-300">
                        <Quote size={28} className="text-brand-gold/15 absolute top-5 right-5" aria-hidden="true" />
                        <div className="flex mb-3" role="img" aria-label={`${t.rating} out of 5 stars`}>
                          {[...Array(t.rating)].map((_, j) => (
                            <Star key={j} size={13} className="text-brand-gold fill-brand-gold" aria-hidden="true" />
                          ))}
                        </div>
                        <p className="text-brand-brown/70 text-sm leading-relaxed mb-5 italic grow">
                          "{t.text}"
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className={`w-10 h-10 ${t.bg} rounded-full flex items-center
                                          justify-center text-white font-bold text-sm shrink-0`}
                               aria-hidden="true">
                            {t.initial}
                          </div>
                          <div>
                            <div className="font-semibold text-brand-brownDark text-sm">{t.name}</div>
                            <div className="text-brand-brown/50 text-xs">{t.role}</div>
                            <div className="text-brand-brown/35 text-xs">{t.company}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots + play/pause */}
            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-3 mt-9">
                <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial page">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === page}
                      aria-label={`Go to testimonials page ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === page ? 'w-7 bg-brand-gold' : 'w-2.5 bg-brand-beige hover:bg-brand-gold/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying(p => !p)}
                  aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-brand-brown/50
                             hover:text-brand-gold hover:bg-brand-cream transition-colors duration-200 ml-1"
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
              </div>
            )}

            {/* Mobile-only nav row */}
            {pageCount > 1 && (
              <div className="flex sm:hidden items-center justify-center gap-4 mt-5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonials"
                  className="w-9 h-9 rounded-full bg-white border border-brand-beige shadow-sm
                             flex items-center justify-center text-brand-brown active:bg-brand-gold
                             active:text-brand-brownDark transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonials"
                  className="w-9 h-9 rounded-full bg-white border border-brand-beige shadow-sm
                             flex items-center justify-center text-brand-brown active:bg-brand-gold
                             active:text-brand-brownDark transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
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
