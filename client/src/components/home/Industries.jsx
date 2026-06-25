import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { Building2, Factory, Building, GraduationCap, Laptop, Warehouse } from 'lucide-react'

const industries = [
  { icon: Laptop,        label: 'IT Companies',            count: '120+', desc: 'Tech parks, software companies, BPOs' },
  { icon: Factory,       label: 'Manufacturing',           count: '80+',  desc: 'Automobile, textile, pharma plants' },
  { icon: Building,      label: 'Commercial Buildings',    count: '50+',  desc: 'Offices, retail spaces, shopping malls' },
  { icon: GraduationCap, label: 'Educational Institutions',count: '40+',  desc: 'Engineering colleges, MBA institutes' },
  { icon: Building2,     label: 'Corporate Offices',       count: '180+', desc: 'MNCs, co-working spaces, banks' },
  { icon: Warehouse,     label: 'Industrial Parks',        count: '30+',  desc: 'SEZs, warehouses, logistics hubs' },
]

export default function Industries() {
  const ref = useStaggerReveal(80)

  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(245,184,0,.6) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Industries Served</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Trusted Across Every Industry
          </h2>
          <p className="text-white/45 text-[15px] mt-3 max-w-2xl mx-auto">
            From 50-employee startups to 5,000-employee factories — our machines scale with your workforce.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {industries.map((ind, i) => (
            <div key={i} className="reveal glass-card p-4 sm:p-6 hover:bg-brand-gold/10 hover:border-brand-gold/30
                                    transition-all duration-300 cursor-default group">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-brand-gold/10 rounded-xl flex items-center justify-center
                                group-hover:bg-brand-gold/20 transition-colors">
                  <ind.icon size={18} className="text-brand-gold sm:w-[22px] sm:h-[22px]" />
                </div>
                <span className="font-display text-xl sm:text-3xl font-bold text-brand-gold/30 group-hover:text-brand-gold/55
                                 transition-colors duration-300">{ind.count}</span>
              </div>
              <h3 className="text-white font-semibold text-[13px] sm:text-[15px] mb-1 sm:mb-1.5 leading-snug">{ind.label}</h3>
              <p className="text-white/40 text-[12px] sm:text-sm">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
