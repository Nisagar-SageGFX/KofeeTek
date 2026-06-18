import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, CheckCircle2, Package } from 'lucide-react'

const consumables = [
  {
    name: 'Filter Coffee Powder',
    subtitle: 'Vend & Blend',
    image: '/assets/consumables/coffee.webp',
    color: '#4A2C1D',
    light: '#FFF0E6',
    desc: 'Premium Arabica & Robusta blend roasted to South Indian perfection. Rich aroma, strong body.',
    details: ['Arabica + Robusta blend', 'Karnataka plantation sourced', 'Rich liquor & aroma', 'Optimised for vending machines'],
    packs: ['500g', '1 kg', '5 kg', '25 kg Bulk']
  },
  {
    name: 'Fine Assam Tea Powder',
    subtitle: 'CTC Premium Blend',
    image: '/assets/consumables/tea.webp',
    color: '#2E6B35',
    light: '#F0FFF2',
    desc: 'Selected Assam CTC leaves for excellent milk tea performance. Strong liquor, vibrant color.',
    details: ['Assam CTC grade', 'Strong & refreshing', 'Excellent milk tea taste', 'Vending machine optimised'],
    packs: ['500g', '1 kg', '5 kg', '25 kg Bulk']
  },
  {
    name: 'Badam Mix Powder',
    subtitle: 'Real Almond Blend',
    image: '/assets/consumables/badam_mix.webp',
    color: '#C2773A',
    light: '#FFF8F0',
    desc: 'Real almonds, saffron, cardamom — a premium health drink loved by every workplace.',
    details: ['Real almond content', 'Saffron & cardamom', 'Nutritious & filling', 'Popular health option'],
    packs: ['500g', '1 kg', '5 kg']
  },
  {
    name: 'Masala Tea Powder',
    subtitle: 'Spiced Chai Blend',
    image: '/assets/consumables/masala_tea.webp',
    color: '#7B3F00',
    light: '#FFF5ED',
    desc: 'Ginger, cardamom, cinnamon and clove — our masala chai is a workforce favourite.',
    details: ['7 spice blend', 'Strong ginger notes', 'Cardamom finish', 'Authentic chai taste'],
    packs: ['500g', '1 kg', '5 kg']
  },
  {
    name: 'Chocolate Mix Powder',
    subtitle: 'Rich Cocoa Blend',
    image: '/assets/consumables/chocolate.webp',
    color: '#3D1F0D',
    light: '#FFF2EC',
    desc: 'Rich cocoa powder blend — perfect for cold mornings and employee delight.',
    details: ['Rich cocoa content', 'Creamy texture', 'Easy to dispense', 'Kids & adult favourite'],
    packs: ['500g', '1 kg', '5 kg']
  },
  {
    name: 'Natural Jaggery Powder',
    subtitle: 'Chemical-Free Sweetener',
    image: '/assets/consumables/jaggery.webp',
    color: '#7C4D2A',
    light: '#FFF8F0',
    desc: 'Pure sugarcane jaggery — the healthier alternative to refined sugar for office beverages.',
    details: ['100% natural', 'No chemical processing', 'Distinct caramel taste', 'Diabetic-friendly option'],
    packs: ['1 kg', '5 kg', '25 kg Bulk']
  },
  {
    name: 'Herbal Lemon Tea Mix',
    subtitle: 'Citrus Refresh Blend',
    image: '/assets/consumables/lemon.webp',
    color: '#B8860B',
    light: '#FFFFF0',
    desc: 'Refreshing herbal lemon tea — excellent for afternoon energy without caffeine.',
    details: ['Natural lemon extract', 'Herbal ingredients', 'Zero caffeine option', 'Instant preparation'],
    packs: ['500g', '1 kg', '5 kg']
  },
  {
    name: 'Protein Ragi Malt',
    subtitle: 'Health Drink',
    image: '/assets/consumables/coffee.webp',
    color: '#5A7A3A',
    light: '#F5FFF0',
    desc: 'Nutrient-dense ragi malt with natural sweeteners — a healthy choice for health-conscious workplaces.',
    details: ['High ragi content', 'Protein enriched', 'Natural sweeteners', 'Factory & hospital favourite'],
    packs: ['500g', '1 kg', '5 kg']
  },
  {
    name: 'Paper Cups',
    subtitle: 'FSC Certified',
    image: '/assets/consumables/coffee.webp',
    color: '#9B7653',
    light: '#FFF8F0',
    desc: 'Food-grade, biodegradable paper cups available in 100ml and 180ml sizes.',
    details: ['100ml & 180ml sizes', 'Food-grade material', 'Biodegradable', 'Bulk supply available'],
    packs: ['Box of 1000', 'Box of 2000', 'Carton of 5000']
  },
]

export default function Consumables() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <>
      <Helmet>
        <title>Beverage Consumables | KofeeTek – Coffee, Tea, Badam, Health Mix Powders</title>
        <meta name="description" content="KofeeTek premium beverage consumables — Filter Coffee, Assam Tea, Badam Mix, Masala Tea, Chocolate Mix, Jaggery Powder. Supplied in bulk for offices and factories across South India." />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,184,0,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Consumables</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Premium Beverage <span className="text-brand-gold">Ingredients</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Sourced, blended and packed in-house. Every consumable is formulated specifically
            for vending machine performance — consistent taste, every single cup.
          </p>
        </div>
      </section>

      {/* Quality badges */}
      <div className="bg-brand-gold py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          {[
            [Leaf,    'FSSAI Certified'],
            [Package, 'Bulk Supply Available'],
            [CheckCircle2, 'Machine-Optimised Blends'],
            [CheckCircle2, 'Regular Freshness Delivery'],
          ].map(([Icon, label], i) => (
            <div key={i} className="flex items-center gap-2 text-brand-brownDark font-semibold text-sm">
              <Icon size={15} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section ref={ref} className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {consumables.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-premium group overflow-hidden"
              >
                {/* Product image */}
                <div className="relative aspect-[5/3] overflow-hidden"
                  style={{ backgroundColor: c.light }}>
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: c.color }}>{c.subtitle}</div>
                  <h3 className="font-display font-bold text-xl text-brand-brownDark mb-2">{c.name}</h3>
                  <p className="text-brand-brown/65 text-sm leading-relaxed mb-4">{c.desc}</p>

                  <ul className="space-y-1.5 mb-5">
                    {c.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-brand-brown/80">
                        <CheckCircle2 size={12} className="text-brand-gold shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5">
                    <div className="text-xs text-brand-brown/50 mb-2 font-medium">Available Pack Sizes</div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.packs.map((p) => (
                        <span key={p} className="text-xs bg-brand-beige text-brand-brown px-2.5 py-1 rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact"
                    className="flex items-center gap-2 text-brand-brown font-semibold text-sm
                               hover:text-brand-gold transition-colors group/link">
                    Enquire for Bulk Order
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Real product photo showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-14 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* <img
              src="/assets/machines/machine5.jpeg"
              alt="KofeeTek Full Consumables Range"
              className="w-full object-cover max-h-[400px]"
            /> */}
          </motion.div>
        </div>
      </section>
    </>
  )
}
