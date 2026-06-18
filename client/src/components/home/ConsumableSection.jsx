import { useStaggerReveal, useScrollReveal } from '../../hooks/useScrollReveal'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const consumables = [
  { name: 'Filter Coffee Powder', image: '/assets/consumables/coffee.webp',    bg: '#FFF5EE' },
  { name: 'Fine Assam Tea',       image: '/assets/consumables/tea.webp',        bg: '#F0FFF2' },
  { name: 'Badam Mix Powder',     image: '/assets/consumables/badam_mix.webp',  bg: '#FFF8F0' },
  { name: 'Masala Tea',           image: '/assets/consumables/masala_tea.webp', bg: '#FFF5ED' },
  { name: 'Chocolate Mix',        image: '/assets/consumables/chocolate.webp',  bg: '#FFF2EC' },
  { name: 'Natural Jaggery',      image: '/assets/consumables/jaggery.webp',    bg: '#FFF8F0' },
  { name: 'Herbal Lemon Tea',     image: '/assets/consumables/lemon.webp',      bg: '#FFFFF0' },
]

export default function ConsumableSection() {
  const headRef = useScrollReveal()
  const ref     = useStaggerReveal(60)

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="section-label">Our Consumables</span>
            <h2 className="section-heading">Premium Beverage Ingredients</h2>
            <p className="section-subheading max-w-lg">
              FSSAI certified. Blended in-house. Every refill packed fresh for consistent taste, every cup.
            </p>
          </div>
          <Link to="/consumables" className="btn-brown shrink-0 gap-2 text-sm">
            All Products <ArrowRight size={15} />
          </Link>
        </div>

        {/* Product grid */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {consumables.map((c, i) => (
            <div key={i} className="reveal card-premium group cursor-default overflow-hidden">
              <div className="aspect-square overflow-hidden" style={{ background: c.bg }}>
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-contain p-3
                             group-hover:scale-110 transition-transform duration-400"
                  onError={e => { e.target.style.display='none' }}
                />
              </div>
              <div className="p-2.5 text-center">
                <p className="text-brand-brownDark font-semibold text-[11px] leading-tight">{c.name}</p>
              </div>
            </div>
          ))}

          {/* Enquiry card */}
          <div className="col-span-1 hidden lg:block">
            <Link to="/contact"
              className="card-premium h-full flex flex-col items-center justify-center text-center
                         bg-brand-brown hover:bg-brand-brownLight border-0 group min-h-[140px]">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">+</div>
              <span className="font-semibold text-white text-[11px]">Bulk Enquiry</span>
              <span className="text-white/45 text-[10px] mt-0.5">Contact us →</span>
            </Link>
          </div>
        </div>

        {/* Product range showcase */}
        <div className="reveal rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/assets/machines/machine4.jpeg"
            alt="KofeeTek Full Product Range"
            className="w-full object-cover max-h-[260px]"
          />
        </div>
      </div>
    </section>
  )
}
