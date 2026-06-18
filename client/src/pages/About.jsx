import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, MapPin, Coffee, CheckCircle2, Target, Eye } from 'lucide-react'
import CountUp from 'react-countup'

const timeline = [
  { year: '2017', title: 'Founded in Chennai', desc: 'Started with 5 machines and a dream to transform workplace beverages in South India.' },
  { year: '2019', title: 'Expanded to Coimbatore', desc: 'Crossed 100 clients. Launched dedicated service centre in Coimbatore.' },
  { year: '2021', title: 'ISO Registration', desc: 'Received ISO certification for manufacturing excellence and service quality.' },
  { year: '2022', title: 'Karnataka Entry', desc: 'Expanded operations to Bangalore and Hosur to serve the growing industrial corridor.' },
  { year: '2024', title: '500+ Client Milestone', desc: 'Serving 500+ corporate clients. Launched smart IoT-enabled vending machines.' },
]

const values = [
  { icon: Coffee,    title: 'Quality First',      desc: 'Every machine and consumable meets ISO standards. No compromise.' },
  { icon: Users,     title: 'Client Partnership', desc: 'We\'re not a vendor — we\'re a long-term beverage partner.' },
  { icon: Target,    title: 'Zero Downtime Goal', desc: '24-hour service response. Your machine is always running.' },
  { icon: MapPin,    title: 'Local Excellence',   desc: 'Deep roots in South India. We understand local taste and culture.' },
]

function StatBox({ end, suffix, label, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-brand-gold mb-2">
        {inView ? <CountUp end={end} duration={2.5} delay={delay} suffix={suffix} /> : '0'}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Helmet>
        <title>About KofeeTek – 7+ Years of Vending Excellence in South India</title>
        <meta name="description" content="KofeeTek is an ISO registered coffee and tea vending machine manufacturer with 7+ years of experience serving 500+ corporates across Tamil Nadu and Karnataka." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-brand-dark to-brand-brownDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(245,184,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Our Story</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              7 Years of Brewing<br /><span className="text-brand-gold">Excellence</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto">
              From a Chennai garage to South India's most trusted B2B vending machine company —
              KofeeTek's story is one of obsessive quality and uncompromising service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-brown py-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBox end={500} suffix="+" label="Corporate Clients" delay={0} />
          <StatBox end={7}   suffix="+"  label="Years Experience" delay={0.2} />
          <StatBox end={15000} suffix="+" label="Cups Served Daily" delay={0.4} />
          <StatBox end={6}   suffix=""   label="Cities Served" delay={0.6} />
        </div>
      </section>

      {/* Story + Mission */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="section-label">Who We Are</span>
              <h2 className="section-heading mb-6">Built on Coffee.<br />Powered by Trust.</h2>
              <p className="text-brand-brown/70 leading-relaxed mb-5">
                KofeeTek was founded in 2017 with a single mission: give every corporate employee access to fresh,
                quality beverages without leaving their floor. We saw how inferior vending machines were demotivating
                workforces and creating unnecessary cafeteria traffic.
              </p>
              <p className="text-brand-brown/70 leading-relaxed mb-8">
                Today, we manufacture, rent, and service 1000+ machines across Tamil Nadu and Karnataka.
                Our in-house production facility ensures every consumable is blended, packed, and delivered fresh.
                We are ISO registered and committed to sustainability through biodegradable cups and energy-efficient machines.
              </p>
              <div className="space-y-3">
                {['ISO Registered Manufacturing', 'In-house Consumables Production', '24-Hour Service Guarantee', 'Energy-Efficient Machines'].map(p => (
                  <div key={p} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-gold shrink-0" />
                    <span className="text-brand-brown/80 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="card-premium p-7 bg-brand-brown text-white">
                  <Eye size={28} className="text-brand-gold mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Our Vision</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    To be the most trusted beverage solutions partner for every corporate workplace in India.
                  </p>
                </div>
                <div className="card-premium p-7 bg-brand-gold mt-8">
                  <Target size={28} className="text-brand-brownDark mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2 text-brand-brownDark">Our Mission</h3>
                  <p className="text-brand-brownDark/70 text-sm leading-relaxed">
                    Deliver fresh, hygienic, and consistent beverage experiences with zero compromise on quality.
                  </p>
                </div>
                <div className="card-premium p-7 col-span-2 bg-brand-cream">
                  <Award size={28} className="text-brand-brown mb-4" />
                  <h3 className="font-semibold text-brand-brownDark text-lg mb-2">ISO Registered Quality</h3>
                  <p className="text-brand-brown/70 text-sm leading-relaxed">
                    Our manufacturing process, service delivery, and consumable production all meet ISO international standards.
                    We're not just certified — we live quality every day.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="card-premium p-6">
                <div className="w-11 h-11 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-semibold text-brand-brownDark mb-2">{v.title}</h3>
                <p className="text-brand-brown/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div>
            <h2 className="section-heading text-center mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-beige" />
              <div className="space-y-10">
                {timeline.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
                    className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="card-premium p-5 inline-block max-w-sm">
                        <div className="font-display text-brand-gold font-bold text-lg mb-1">{t.year}</div>
                        <div className="font-semibold text-brand-brownDark mb-1">{t.title}</div>
                        <div className="text-brand-brown/60 text-sm">{t.desc}</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-brand-gold rounded-full border-4 border-white shadow z-10 shrink-0" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
