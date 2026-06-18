import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { Wrench, Clock, Award, HeartHandshake, Zap, Shield } from 'lucide-react'

const features = [
  { icon: Wrench,        title: 'Full AMC Support',         desc: 'End-to-end Annual Maintenance Contracts. Repairs, cleaning, and spare parts — all handled by us.' },
  { icon: Clock,         title: '1–2 Hr Response Time',     desc: 'Dedicated support team resolves issues within 1–2 hours for minimal machine downtime.' },
  { icon: Award,         title: 'ISO & FSSAI Certified',    desc: 'Every machine and consumable meets ISO and FSSAI quality standards. No compromise.' },
  { icon: HeartHandshake,title: 'Flexible Rental Plans',    desc: 'Zero upfront investment. Monthly rental from ₹2,200. Cancel anytime with 30 days notice.' },
  { icon: Zap,           title: 'Energy Efficient',         desc: 'Eco-friendly design reduces power consumption by up to 40% without affecting performance.' },
  { icon: Shield,        title: '7+ Years of Trust',        desc: 'Since 2017, serving 500+ corporates across South India with zero-compromise service.' },
]

export default function WhyUs() {
  const ref = useStaggerReveal(90)

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-14">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-heading">Why 500+ Companies Choose KofeeTek</h2>
          <p className="section-subheading mx-auto text-center">
            We're not just a vending machine company — we're your long-term workplace beverage partner.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="reveal card-premium p-6 group">
              <div className="w-11 h-11 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-5
                              group-hover:bg-brand-gold/20 transition-colors duration-300">
                <f.icon size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-semibold text-brand-brownDark text-[15px] mb-2">{f.title}</h3>
              <p className="text-brand-brown/65 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
