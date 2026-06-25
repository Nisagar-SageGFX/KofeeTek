import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const testimonials = [
  { name:'Rajesh Kumar',      role:'Facilities Manager',  company:'Tata Electronics, Chennai',    text:'KofeeTek transformed our cafeteria experience. 1,200 employees, zero machine downtime in 2 years. Their 24-hr response promise is absolutely real.', rating:5, initial:'R', bg:'bg-brand-brown' },
  { name:'Priya Venkataraman',role:'HR Director',         company:'Pegatron Technology, Chennai', text:'Our factory runs 3 shifts. KofeeTek installed machines on every floor. They fixed a minor issue within 4 hours at 2am. Incredibly impressive service.',  rating:5, initial:'P', bg:'bg-amber-700' },
  { name:'Dr. Srinivasan',    role:'Hospital Admin',      company:'LifeCell International',       text:'Healthcare requires impeccable hygiene. KofeeTek maintains machines to hospital standards. The health mix options are a huge hit with our staff.', rating:5, initial:'S', bg:'bg-green-700' },
  { name:'Kavitha Sundaram',  role:'Operations Head',     company:'UPS India, Bangalore',         text:'We have 8 machines across our facility. The monthly rental model was key — no capital expenditure. Refilling happens like clockwork every 3 days.', rating:5, initial:'K', bg:'bg-brand-gold' },
  { name:'Mohammed Farhan',   role:'Admin Manager',       company:'CBRE India, Bangalore',        text:'Migrated from another vendor to KofeeTek. The quality difference is night and day. Employees actually queue up for the filter coffee now.', rating:5, initial:'M', bg:'bg-slate-700' },
  { name:'Anita Rajan',       role:'Purchase Head',       company:'Microsense Networks',          text:'Excellent pricing, premium machines, professional team. The automated monitoring alerts us before the machine runs low. Truly smart technology.', rating:5, initial:'A', bg:'bg-purple-700' },
]

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 50

/** Returns 3 (desktop, carousel) — below lg we render a static 2-col grid instead */
function useCardsPerView() {
  const [perView, setPerView] = useState(
    typeof window === 'undefined' ? 3 : getPerView(window.innerWidth)
  )

  function getPerView(w) {
    return 3
  }

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

function TestimonialCard({ t }) {
  return (
    <div
      className="card-premium p-4 sm:p-6 lg:p-7 relative h-full flex flex-col
                 hover:border-brand-gold/30 transition-colors duration-300"
    >
      <Quote size={22} className="text-brand-gold/15 absolute top-4 right-4 sm:w-7 sm:h-7" aria-hidden="true" />
      <div className="flex mb-2 sm:mb-3" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {[...Array(t.rating)].map((_, j) => (
          <Star key={j} size={12} className="text-brand-gold fill-brand-gold" aria-hidden="true" />
        ))}
      </div>
      <p className="text-brand-brown/70 text-[12px] sm:text-sm leading-relaxed mb-4 sm:mb-6 italic grow">"{t.text}"</p>
      <div className="flex items-center gap-2 sm:gap-3 mt-auto">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 ${t.bg} rounded-full flex items-center justify-center
                      text-white font-bold text-xs sm:text-sm shrink-0`}
          aria-hidden="true"
        >
          {t.initial}
        </div>
        <div>
          <div className="font-semibold text-brand-brownDark text-xs sm:text-sm">{t.name}</div>
          <div className="text-brand-brown/45 text-[10px] sm:text-[11px]">{t.role}</div>
          <div className="text-brand-brown/35 text-[10px] sm:text-[11px]">{t.company}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const perView = useCardsPerView()
  const pageCount = Math.ceil(testimonials.length / perView)

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const containerRef = useRef(null)
  const autoplayRef = useRef(null)
  const liveRegionRef = useRef(null)

  // Clamp page if perView changes (e.g. resize from mobile -> desktop)
  useEffect(() => {
    setPage(p => Math.min(p, pageCount - 1))
  }, [pageCount])

  const goTo = useCallback((next) => {
    setDirection(next > page ? 1 : -1)
    setPage(((next % pageCount) + pageCount) % pageCount)
  }, [page, pageCount])

  const next = useCallback(() => goTo(page + 1), [goTo, page])
  const prev = useCallback(() => goTo(page - 1), [goTo, page])

  // Autoplay
  useEffect(() => {
    if (!isPlaying || isHovering || pageCount <= 1) return
    autoplayRef.current = setInterval(() => {
      setDirection(1)
      setPage(p => (p + 1) % pageCount)
    }, AUTOPLAY_MS)
    return () => clearInterval(autoplayRef.current)
  }, [isPlaying, isHovering, pageCount])

  // Announce slide changes for screen readers
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Showing testimonials ${page + 1} of ${pageCount}`
    }
  }, [page, pageCount])

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  }

  const slides = useMemo(() => {
    const out = []
    for (let i = 0; i < pageCount; i++) {
      out.push(testimonials.slice(i * perView, i * perView + perView))
    }
    return out
  }, [perView, pageCount])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Client Reviews</span>
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-subheading mx-auto text-center">
            Don't take our word for it — here's what 500+ happy clients across South India say.
          </p>
        </div>

        {/* Mobile & Tablet: static 2-column grid (all 6 testimonials) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.06, duration: 0.35 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: carousel */}
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 rounded-2xl hidden lg:block"
        >
          {/* Live region for screen readers */}
          <p ref={liveRegionRef} className="sr-only" role="status" aria-live="polite" />

          {/* Side arrows — hidden on mobile to avoid overlapping cards, shown sm+ */}
          {pageCount > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
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
                onClick={next}
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
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                drag={pageCount > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) next()
                  else if (info.offset.x > SWIPE_THRESHOLD) prev()
                }}
                className={`grid gap-5 ${
                  perView === 1 ? 'grid-cols-1' : perView === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}
              >
                {slides[page]?.map((t, i) => (
                  <motion.div
                    key={`${page}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                  >
                    <TestimonialCard t={t} />
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

          {/* Mobile-only nav row (arrows shown here instead of overlapping cards) */}
          {pageCount > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-4 mt-5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonials"
                className="w-9 h-9 rounded-full bg-white border border-brand-beige shadow-sm
                           flex items-center justify-center text-brand-brown active:bg-brand-gold
                           active:text-brand-brownDark transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
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
  )
}
