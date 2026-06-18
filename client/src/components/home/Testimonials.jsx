import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  { name:'Rajesh Kumar',      role:'Facilities Manager',  company:'Tata Electronics, Chennai',    text:'KofeeTek transformed our cafeteria experience. 1,200 employees, zero machine downtime in 2 years. Their 24-hr response promise is absolutely real.', rating:5, initial:'R', bg:'bg-brand-brown' },
  { name:'Priya Venkataraman',role:'HR Director',         company:'Pegatron Technology, Chennai', text:'Our factory runs 3 shifts. KofeeTek installed machines on every floor. They fixed a minor issue within 4 hours at 2am. Incredibly impressive service.',  rating:5, initial:'P', bg:'bg-amber-700' },
  { name:'Dr. Srinivasan',    role:'Hospital Admin',      company:'LifeCell International',       text:'Healthcare requires impeccable hygiene. KofeeTek maintains machines to hospital standards. The health mix options are a huge hit with our staff.', rating:5, initial:'S', bg:'bg-green-700' },
  { name:'Kavitha Sundaram',  role:'Operations Head',     company:'UPS India, Bangalore',         text:'We have 8 machines across our facility. The monthly rental model was key — no capital expenditure. Refilling happens like clockwork every 3 days.', rating:5, initial:'K', bg:'bg-brand-gold' },
  { name:'Mohammed Farhan',   role:'Admin Manager',       company:'CBRE India, Bangalore',        text:'Migrated from another vendor to KofeeTek. The quality difference is night and day. Employees actually queue up for the filter coffee now.', rating:5, initial:'M', bg:'bg-slate-700' },
  { name:'Anita Rajan',       role:'Purchase Head',       company:'Microsense Networks',          text:'Excellent pricing, premium machines, professional team. The automated monitoring alerts us before the machine runs low. Truly smart technology.', rating:5, initial:'A', bg:'bg-purple-700' },
]

export default function Testimonials() {
  const ref = useStaggerReveal(80)

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

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal card-premium p-6 relative group hover:border-brand-gold/30">
              <Quote size={28} className="text-brand-gold/15 absolute top-5 right-5" />
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={13} className="text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <p className="text-brand-brown/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.bg} rounded-full flex items-center justify-center
                                text-white font-bold text-sm shrink-0`}>
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-brand-brownDark text-sm">{t.name}</div>
                  <div className="text-brand-brown/45 text-[11px]">{t.role}</div>
                  <div className="text-brand-brown/35 text-[11px]">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
