import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react'

const allMachines = [
  {
    id: 1, category: 'drip',
    name: 'KT Coffee Brewer',
    tagline: 'Classic Filter Coffee, Industrial Grade',
    badge: 'Entry Level',
    image: '/assets/machines/KT Coffee Brewer.jpeg',
    capacity: '300 cups/day', power: '1000W',
    features: ['Single decoction tank', 'Stainless steel body', 'Temperature control', 'Easy manual operation', 'Low maintenance'],
    rental: '₹2,500/month',
    specs: { Dimensions: '30×25×70 cm', Weight: '10 kg', Voltage: '220V AC', Cup: '100 ml', Capacity: '300 cups/day' }
  },
  {
    id: 2, category: 'drip',
    name: 'KT BrewOne with Milk Boiler',
    tagline: 'Coffee + Fresh Milk in One Unit',
    badge: 'Popular',
    image: '/assets/machines/KT BrewOne With Milk Boiler.jpeg',
    capacity: '400 cups/day', power: '1500W',
    features: ['Dual tank — decoction + milk', 'Built-in milk boiler', 'Stainless steel construction', 'Simple tap dispensing', 'Ideal for 50–150 staff'],
    rental: '₹3,200/month',
    specs: { Dimensions: '48×38×75 cm', Weight: '18 kg', Voltage: '220V AC', Cup: '100–180 ml', Capacity: '400 cups/day' }
  },
  {
    id: 3, category: 'combo',
    name: 'KT 3-in-1 COMBO',
    tagline: 'Coffee + Tea + Milk — One Machine',
    badge: 'Best Seller',
    image: '/assets/machines/KT 3-in-1 combo.jpeg',
    capacity: '600 cups/day', power: '2000W',
    features: ['Triple tank system', 'Coffee, Tea & Milk simultaneously', 'Temperature gauge', 'Stainless steel premium finish', 'Ideal for 200–500 staff'],
    // rental: '₹5,000/month',
    specs: { Dimensions: '65×45×80 cm', Weight: '26 kg', Voltage: '220V AC', Cup: '100–180 ml', Capacity: '600 cups/day' }
  },
  {
    id: 4, category: 'combo',
    name: 'KT Trio Brew Plus',
    tagline: 'High Capacity 3-Tank Brewer',
    badge: 'Heavy Duty',
    image: '/assets/machines/KT Trio Brew Plus.jpeg',
    capacity: '800 cups/day', power: '2400W',
    features: ['Three independent tanks', 'Hot water dispenser', 'Industrial-grade stainless body', 'Thermostat control per tank', 'Suitable for large factories'],
    rental: '₹6,500/month',
    specs: { Dimensions: '75×50×85 cm', Weight: '32 kg', Voltage: '220V AC', Cup: '100–180 ml', Capacity: '800 cups/day' }
  },
  {
    id: 5, category: 'premix',
    name: 'KT FreshMilk Pro 8',
    tagline: '8 Beverage Selections, Fresh Milk Technology',
    badge: 'Premium',
    image: '/assets/machines/KT FreshMilk Pro 8.jpeg',
    capacity: '500 cups/day', power: '1800W',
    features: ['8 beverage options', 'Fresh milk dispensing', 'Touch-button interface', 'Auto cleaning cycle', 'WiFi monitoring ready'],
    rental: '₹7,500/month',
    specs: { Dimensions: '40×38×90 cm', Weight: '22 kg', Voltage: '220V AC', Cup: '80–180 ml', Capacity: '500 cups/day' }
  },
  {
    id: 6, category: 'premix',
    name: 'KT Capacitive Touch Brew',
    tagline: 'Smart Touch Interface, Premium Experience',
    badge: 'Smart',
    image: '/assets/machines/KT Capacitive Touch Brew.jpeg',
    capacity: '400 cups/day', power: '1600W',
    features: ['Large capacitive touch screen', '6 selectable beverages', 'Fresh milk system', 'Auto portion control', 'Low ingredient alert'],
    rental: '₹8,000/month',
    specs: { Dimensions: '42×40×88 cm', Weight: '20 kg', Voltage: '220V AC', Cup: '80–150 ml', Capacity: '400 cups/day' }
  },
  {
    id: 7, category: 'beantocup',
    name: 'KT Premix 2 Selection',
    tagline: 'Compact Dual Beverage Machine',
    badge: 'Compact',
    image: '/assets/machines/KT Premix 2 Selection.jpg',
    capacity: '250 cups/day', power: '900W',
    features: ['Coffee + Tea selection', 'Hot water option', 'Counter-top compact design', 'LED display', 'Easy keypad controls'],
    rental: '₹2,200/month',
    specs: { Dimensions: '30×28×55 cm', Weight: '9 kg', Voltage: '220V AC', Cup: '100 ml', Capacity: '250 cups/day' }
  },
]

const cats = [
  { key: 'all',       label: 'All Machines' },
  { key: 'drip',      label: 'Drip Brewers' },
  { key: 'combo',     label: 'Combo Machines' },
  { key: 'premix',    label: 'Premix / Smart' },
  { key: 'beantocup', label: 'Compact' },
]

const badgeColors = {
  'Entry Level': 'bg-blue-100 text-blue-700',
  'Popular':     'bg-green-100 text-green-700',
  'Best Seller': 'bg-brand-gold text-brand-brownDark',
  'Heavy Duty':  'bg-slate-100 text-slate-700',
  'Premium':     'bg-purple-100 text-purple-700',
  'Smart':       'bg-cyan-100 text-cyan-700',
  'Compact':     'bg-orange-100 text-orange-700',
}

export default function Products() {
  const [active, setActive] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const filtered = active === 'all' ? allMachines : allMachines.filter(m => m.category === active)

  return (
    <>
      <Helmet>
        <title>Coffee & Tea Vending Machines | KofeeTek Products</title>
        <meta name="description" content="KofeeTek's full machine range — drip brewers, combo machines, fresh milk dispensers and smart vending machines for offices, factories and hospitals in Chennai, Coimbatore, Bangalore." />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,184,0,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Our Machines</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            The Right Machine for <span className="text-brand-gold">Every Workplace</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-6">
            From 50-person offices to 5,000-employee factories — KofeeTek has the exact machine your team needs.
          </p>
          <a href="tel:+919962242499"
            className="inline-flex items-center gap-2 text-brand-gold/80 hover:text-brand-gold transition-colors text-sm">
            <Phone size={14} />
            Not sure which machine? Call +91 99622 42499
          </a>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="bg-white border-b border-brand-beige sticky top-[65px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {cats.map(c => (
            <button key={c.key} onClick={() => setActive(c.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                active === c.key
                  ? 'bg-brand-gold text-brand-brownDark shadow-md'
                  : 'bg-brand-beige text-brand-brown hover:bg-brand-gold/20'
              }`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="py-16 bg-brand-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-premium group overflow-visible"
              >
                {/* Machine photo */}
                <div className="relative bg-white rounded-t-2xl overflow-hidden aspect-[3/3]">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = '/assets/images/brochure.png' }}
                  />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow ${badgeColors[m.badge]}`}>
                    {m.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="text-brand-gold text-xs uppercase tracking-wider font-semibold mb-1">{m.tagline}</div>
                  <h3 className="font-display font-bold text-lg text-brand-brownDark mb-1 leading-tight">{m.name}</h3>
                  <div className="text-brand-brown/50 text-xs mb-4">Capacity: {m.capacity} · {m.power}</div>

                  <ul className="space-y-1.5 mb-4">
                    {m.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-brand-brown/80">
                        <CheckCircle2 size={12} className="text-brand-gold shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {expanded === m.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                      <ul className="space-y-1.5 mb-4">
                        {m.features.slice(4).map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-brand-brown/80">
                            <CheckCircle2 size={12} className="text-brand-gold shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-brand-beige/60 rounded-xl p-4 mb-3">
                        <div className="text-xs font-semibold text-brand-brown uppercase tracking-wider mb-2">Specs</div>
                        {Object.entries(m.specs).map(([k, v]) => (
                          <div key={k} className="flex justify-between text-xs py-1.5 border-b border-brand-beige last:border-0">
                            <span className="text-brand-brown/60">{k}</span>
                            <span className="font-medium text-brand-brownDark">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                    className="text-xs text-brand-gold hover:underline mb-4 block">
                    {expanded === m.id ? '↑ Less details' : '↓ Full specs'}
                  </button>

                  <div className="flex items-center justify-between pt-3 border-t border-brand-beige">
                    <div>
                      <div className="text-[10px] text-brand-brown/50 uppercase tracking-wider">Rental from</div>
                      <div className="font-display font-bold text-xl text-brand-gold leading-tight">{m.rental}</div>
                    </div>
                    <Link to="/contact" className="flex items-center gap-1.5 bg-brand-brown text-white text-xs font-semibold
                                                    px-4 py-2.5 rounded-xl hover:bg-brand-brownLight transition-colors">
                      Get Quote <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-r from-brand-brown to-brand-brownDark rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-2">Need a Custom Solution?</h3>
            <p className="text-white/65 mb-6 text-sm">Multi-machine setups, branded wraps, payment integrations — we do it all.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary">Schedule Site Visit</Link>
              <a href="tel:+919962242499" className="btn-outline">Call +91 99622 42499</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
