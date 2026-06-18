import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

export const blogPosts = [
  {
    slug: 'coffee-vending-machine-benefits-corporate-offices-chennai',
    title: 'Why Every Corporate Office in Chennai Needs a Coffee Vending Machine',
    excerpt: 'Discover how installing a coffee vending machine transforms employee productivity, reduces cafeteria costs, and boosts morale in IT companies and corporate offices across Chennai.',
    category: 'Corporate',
    date: '2026-06-01',
    readTime: '5 min read',
    tags: ['Coffee Machine', 'Corporate Office', 'Chennai', 'Workplace Productivity'],
    image: '/assets/machines/machine5.jpeg',
    content: `Coffee is no longer a luxury in the modern workplace — it's a necessity. Studies show that employees who have easy access to quality beverages are 20% more productive and report higher job satisfaction.

For corporate offices in Chennai's bustling IT corridors like OMR, Sholinganallur, and Tidel Park, a professional vending machine from KofeeTek is the smart choice.

## Benefits for IT Companies

**Zero downtime during breaks** — When your team doesn't have to leave the floor for coffee, you save 15–20 minutes per employee per day.

**Consistent quality, every cup** — Unlike canteen coffee that varies by cook and day, KofeeTek's machines deliver the same perfect cup every time.

**Cost savings** — A rental machine at ₹3,200/month for 200 employees works out to just ₹16 per person per month — far cheaper than any cafeteria setup.

## Why KofeeTek?

- ISO registered manufacturing
- 24-hour service response
- Monthly refill included in rental
- 500+ corporate clients trust us

Contact us today: +91 99622 42499 | sales@kofeetek.in`
  },
  {
    slug: 'tea-vending-machine-manufacturers-coimbatore',
    title: 'Top Tea Vending Machine Manufacturers in Coimbatore — Complete Guide 2026',
    excerpt: 'Looking for tea vending machine manufacturers in Coimbatore? This complete guide covers machine types, rental costs, service support, and why KofeeTek leads the market.',
    category: 'Guide',
    date: '2026-05-22',
    readTime: '7 min read',
    tags: ['Tea Vending Machine', 'Coimbatore', 'Manufacturers', 'Rental'],
    image: '/assets/machines/machine2.jpeg',
    content: `Coimbatore — the Manchester of South India — is home to thousands of textile mills, engineering firms, and IT companies that keep their workforce fuelled with quality chai.

If you're searching for tea vending machine manufacturers in Coimbatore, this guide is for you.

## Types of Tea Vending Machines

**Single-function tea machines** — Perfect for offices under 100 employees. Handles tea powder and milk automatically.

**Combo machines (Coffee + Tea)** — The most popular choice for Coimbatore offices. One machine handles both beverages.

**Industrial-grade brewers** — For factories and large mills with 500+ workers needing high-volume dispensing.

## Rental vs Purchase

Most businesses in Coimbatore prefer rental — and rightly so. With KofeeTek's rental from ₹3,200/month:
- No capital investment
- Full maintenance included
- Free replacement if machine breaks
- Monthly consumable refill

## KofeeTek in Coimbatore

We've been serving Coimbatore's textile and manufacturing sector since 2019. Call us: +91 99622 42499`
  },
  {
    slug: 'office-coffee-machine-rental-bangalore',
    title: 'Office Coffee Machine Rental in Bangalore — Prices, Plans & What to Expect',
    excerpt: 'Complete guide to coffee machine rental in Bangalore for IT companies, startups, and corporates. Compare plans, understand pricing, and learn what to ask before renting.',
    category: 'Rental',
    date: '2026-05-15',
    readTime: '6 min read',
    tags: ['Coffee Machine Rental', 'Bangalore', 'IT Companies', 'Pricing'],
    image: '/assets/machines/machine6.jpeg',
    content: `Bangalore's tech scene runs on coffee. From Whitefield to Electronic City, thousands of IT companies rely on vending machines to keep their teams energized.

## Rental Pricing in Bangalore (2026)

| Machine Type | Monthly Rental |
|---|---|
| Basic Coffee Machine | ₹2,500–₹3,200 |
| Combo (Coffee+Tea) | ₹4,500–₹5,500 |
| Smart Touch Screen | ₹7,500–₹8,000 |

## What's Included in Rental?

With KofeeTek, your rental always includes:
- Machine installation (free)
- Monthly consumable refill
- Regular maintenance
- 24-hour emergency support
- Machine replacement if needed

## How to Choose the Right Machine

1. Count your employees — 1 machine per 150–200 people
2. Decide coffee vs tea vs combo
3. Choose manual fill vs auto-fill based on location

Ready to rent? Call +91 99622 42499 or email sales@kofeetek.in`
  },
  {
    slug: 'filter-coffee-vending-machine-vs-instant-coffee-which-is-better',
    title: 'Filter Coffee Machine vs Instant Coffee for Offices — Which Should You Choose?',
    excerpt: 'The great office coffee debate: traditional filter coffee machines versus instant coffee dispensers. We break down taste, cost, maintenance, and employee satisfaction.',
    category: 'Comparison',
    date: '2026-05-08',
    readTime: '4 min read',
    tags: ['Filter Coffee', 'Instant Coffee', 'Comparison', 'Workplace'],
    image: '/assets/consumables/coffee.webp',
    content: `South Indian offices have a special relationship with filter coffee — the thick decoction, the frothy milk, the distinctive aroma. But is a full filter coffee machine worth it vs a simpler instant dispenser?

## Taste & Quality

**Filter Coffee Machine** wins hands down. Real decoction brewed from fresh coffee powder delivers authentic South Indian taste. Your employees from Chennai, Coimbatore, and Bangalore will appreciate the difference.

**Instant Coffee** is convenient but tastes noticeably inferior. It's a compromise many offices regret.

## Cost Comparison (per cup)

- Filter coffee vending machine: ₹4–6 per cup
- Instant coffee packet: ₹8–12 per cup

Filter machines are actually cheaper per cup!

## KofeeTek's Recommendation

For South Indian offices, always go filter coffee. Your employees deserve the real thing.

Contact KofeeTek: +91 99622 42499`
  },
  {
    slug: 'vending-machine-maintenance-tips-office',
    title: '10 Essential Vending Machine Maintenance Tips for Offices',
    excerpt: 'Keep your office vending machine running perfectly with these 10 maintenance tips from KofeeTek\'s service engineers with 7+ years of field experience.',
    category: 'Tips',
    date: '2026-04-30',
    readTime: '5 min read',
    tags: ['Maintenance', 'Tips', 'Vending Machine', 'Office'],
    image: '/assets/machines/machine3.jpeg',
    content: `After servicing 1,000+ machines across South India, KofeeTek's engineers have compiled the most important maintenance practices every office should follow.

## Daily Maintenance (5 minutes)

1. Wipe the drip tray with a clean cloth
2. Check the cup dispenser is loaded
3. Verify ingredient levels on the display

## Weekly Maintenance (15 minutes)

4. Clean the nozzle with a soft brush
5. Flush with hot water (use the cleaning cycle)
6. Wipe the exterior with a damp cloth

## Monthly Maintenance (handled by KofeeTek)

7. Deep clean of all internal components
8. Check water filter / descale if needed
9. Inspect electrical connections
10. Replenish all consumables

## When to Call KofeeTek

- Machine making unusual sounds
- Cups dispensing but empty (no liquid)
- Display showing error codes

Call us 24/7: +91 99622 42499`
  },
  {
    slug: 'badam-milk-vending-machine-hospitals-healthcare',
    title: 'Why Hospitals Are Switching to Badam Milk & Health Drink Vending Machines',
    excerpt: 'Healthcare facilities across Tamil Nadu are installing health drink vending machines for staff, patients, and visitors. Here\'s why badam milk dispensers are becoming essential.',
    category: 'Healthcare',
    date: '2026-04-20',
    readTime: '4 min read',
    tags: ['Badam Milk', 'Hospital', 'Health Drinks', 'Healthcare'],
    image: '/assets/consumables/badam_mix.webp',
    content: `Walk into any major hospital in Chennai or Coimbatore today and you'll notice something new — health drink vending machines dispensing badam milk, health mix, and ragi malt alongside the traditional tea and coffee.

## Why Hospitals Choose Health Drink Machines

**For nursing staff** — Long 12-hour shifts demand sustained energy. Badam milk provides protein and healthy fats.

**For patients and visitors** — Families waiting in hospitals need accessible, hygienic refreshments beyond vending chips.

**Infection control** — Enclosed dispensing systems are far more hygienic than open cafeterias.

## KofeeTek's Hospital-Grade Machines

Our machines serving LifeCell, ResMed, and Pro 1 Health meet hospital hygiene standards:
- Enclosed ingredient compartments
- Auto-clean cycles
- Stainless steel food-contact surfaces
- Sugar-free options available

Call us: +91 99622 42499 | sales@kofeetek.in`
  },
]

const categories = ['All', 'Corporate', 'Guide', 'Rental', 'Comparison', 'Tips', 'Healthcare']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Blog() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [ref, inView]           = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = blogPosts.filter(p => {
    const matchesCat    = category === 'All' || p.category === category
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const featured = blogPosts[0]

  return (
    <>
      <Helmet>
        <title>Blog | KofeeTek – Coffee Vending Machine Guides, Tips & Industry News</title>
        <meta name="description" content="KofeeTek blog — expert guides on coffee vending machines, rental plans, maintenance tips, and workplace beverage solutions for offices in Chennai, Coimbatore, and Bangalore." />
        <meta name="keywords" content="coffee vending machine blog, tea vending machine guide, office coffee tips, vending machine rental India" />
        <link rel="canonical" href="https://www.kofeetek.in/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "KofeeTek Blog",
          "url": "https://www.kofeetek.in/blog",
          "description": "Expert guides on coffee vending machines and workplace beverage solutions",
          "publisher": { "@type": "Organization", "name": "KofeeTek" }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(245,184,0,.6) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="section-label">Knowledge Hub</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The Vending <span className="text-brand-gold">Machine Blog</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Expert guides, tips, and industry insights for offices, factories, hospitals
            and corporates across South India.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-11 pr-5
                         text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold
                         focus:bg-white/15 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="bg-white border-b border-brand-beige sticky top-[65px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                category === c
                  ? 'bg-brand-gold text-brand-brownDark shadow-sm'
                  : 'bg-brand-beige text-brand-brown hover:bg-brand-gold/20'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <section ref={ref} className="py-14 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured post */}
          {category === 'All' && !search && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link to={`/blog/${featured.slug}`}
                className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-md overflow-hidden
                           hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-gold text-brand-brownDark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="bg-brand-beige text-brand-brown text-[10px] font-semibold px-3 py-1 rounded-full">
                      {featured.category}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-brand-brownDark mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-brand-brown/65 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-brand-brown/45">
                      <span className="flex items-center gap-1"><Calendar size={11} />{featured.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 text-brand-gold text-[12px] font-semibold">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-brown/40">No articles found for "{search}"</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(category === 'All' && !search ? filtered.slice(1) : filtered).map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/blog/${post.slug}`}
                    className="card-premium flex flex-col h-full group block">
                    <div className="aspect-[16/9] overflow-hidden bg-brand-beige">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.style.display='none' }} />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="bg-brand-beige text-brand-brown text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-[15px] text-brand-brownDark mb-2 leading-tight
                                     group-hover:text-brand-gold transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-brand-brown/60 text-[12px] leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-brand-beige">
                        <div className="flex items-center gap-3 text-[10px] text-brand-brown/40">
                          <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                        </div>
                        <span className="flex items-center gap-1 text-brand-gold text-[11px] font-semibold
                                         group-hover:gap-2 transition-all">
                          Read <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
