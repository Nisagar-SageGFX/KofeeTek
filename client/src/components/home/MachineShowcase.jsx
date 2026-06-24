import { useStaggerReveal, useScrollReveal } from '../../hooks/useScrollReveal'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const machines = [
  {
    name: 'KT BrewOne + Milk Boiler', category: 'Drip Brewer',
    badge: 'Popular', badgeClass: 'bg-green-500 text-white',
    image: '/assets/machines/KT BrewOne With Milk Boiler.jpeg',
    features: ['Coffee + Fresh Milk', '400 cups/day', 'Stainless steel body', 'Compact footprint'],
    rental: '₹3,200/mo',
  },
  {
    name: 'KT 3-in-1 COMBO Machine', category: 'Combo Series',
    badge: 'Smart', badgeClass: 'bg-brand-gold text-brand-brownDark',
    image: '/assets/machines/KT 3-in-1 combo.jpeg',
    features: ['Coffee + Tea + Milk', '600 cups/day', 'Triple tank system', 'Ideal for 200–500 staff'],
    rental: '₹5,000/mo',
  },
  {
    name: 'KT FreshMilk Pro 8', category: 'Smart Premix',
    badge: 'Best Seller', badgeClass: 'bg-purple-500 text-white',
    image: '/assets/machines/KT FreshMilk Pro 8.jpeg',
    features: ['8 beverage options', '500 cups/day', 'Touch button interface', 'Auto cleaning cycle'],
    rental: '₹7,500/mo',
  },
  {
    name: 'KT Capacitive Touch Brew', category: 'Smart Series',
    badge: 'Premium', badgeClass: 'bg-red-600 text-white',
    image: '/assets/machines/KT Capacitive Touch Brew.jpeg',
    features: ['Large touch screen', '6 beverages', 'IoT monitoring', 'Auto portion control'],
    rental: '₹8,000/mo',
  },
]

export default function MachineShowcase() {
  const headRef = useScrollReveal()
  const ref     = useStaggerReveal(80)

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headRef} className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="section-label">Machine Range</span>
            <h2 className="section-heading">Machines Built for Every Scale</h2>
            <p className="section-subheading max-w-lg">
              From 50-person offices to 5,000-employee factories — the right machine for every need.
            </p>
          </div>
          <Link to="/products" className="btn-brown shrink-0 gap-2 text-sm">
            View All Machines <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {machines.map((m, i) => (
            <div key={i} className="reveal card-premium group overflow-hidden">
              {/* Real photo */}
              <div className="relative overflow-hidden bg-white aspect-[3/3]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.objectFit = 'contain'; e.target.style.padding = '16px' }}
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${m.badgeClass}`}>
                  {m.badge}
                </span>
              </div>

              <div className="p-5">
                <div className="text-brand-gold text-[10px] uppercase tracking-widest font-semibold mb-1">{m.category}</div>
                <h3 className="font-display font-bold text-[15px] text-brand-brownDark mb-3 leading-tight">{m.name}</h3>
                <ul className="space-y-1.5 mb-4">
                  {m.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-[12px] text-brand-brown/75">
                      <CheckCircle2 size={12} className="text-brand-gold shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-brand-beige">
                  
                  <Link to="/contact"
                    className="flex items-center gap-1.5 bg-brand-brown text-white text-[11px] font-semibold
                               px-4 py-2 rounded-xl hover:bg-brand-brownLight transition-colors">
                    Quote <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
