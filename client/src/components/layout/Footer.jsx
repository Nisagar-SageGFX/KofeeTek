import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'

const machines  = [
  { label:'Coffee Vending Machines',  to:'/products' },
  { label:'Tea Vending Machines',     to:'/products' },
  { label:'Combo Machines',           to:'/products' },
  { label:'Bean-to-Cup Machines',     to:'/products' },
  { label:'Rental Solutions',         to:'/rental'   },
]
const quickLinks = [
  { label:'About KofeeTek',     to:'/about'      },
  { label:'Industries We Serve',to:'/industries' },
  { label:'Our Clients',        to:'/clients'    },
  { label:'Blog',               to:'/blog'       },
  { label:'Contact Us',         to:'/contact'    },
]
// const cities = ['Chennai','Coimbatore','Bangalore','Madurai','Hosur','Salem','Tirupur']

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/75">

      {/* ── CTA Banner ── */}
      <div className="bg-gradient-to-r from-brand-brown to-brand-brownLight py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Ready to Transform Your Workplace Beverage Experience?
          </h2>
          <p className="text-brand-gold/85 text-lg mb-8">
            Join 500+ companies across South India trusting KofeeTek
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Schedule Free Demo</Link>
            <a href="tel:+919962242499" className="btn-outline">Call Us Now</a>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-5">
            <img
              src="/assets/logo/kofeetek_logo.svg"
              alt="KofeeTek"
              className="h-12 object-contain"
              style={{ filter:'none' }}
            />
          </Link>
          <p className="text-sm leading-relaxed mb-5 text-white/50">
            South India's premier B2B vending machine manufacturer. ISO registered.
            FSSAI certified. Trusted by 500+ corporates since 2017.
          </p>
          <div className="flex gap-2.5">
            {['f','in','𝕏','Y'].map((s, i) => (
              <a key={i} href="#"
                className="w-9 h-9 bg-white/6 hover:bg-brand-gold rounded-lg flex items-center
                           justify-center transition-colors duration-200 hover:text-brand-brownDark text-sm">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Machines */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-[11px] tracking-[3px] uppercase">Our Machines</h3>
          <ul className="space-y-3">
            {machines.map(p => (
              <li key={p.label}>
                <Link to={p.to} className="text-sm hover:text-brand-gold transition-colors duration-200">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-[11px] tracking-[3px] uppercase">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map(q => (
              <li key={q.label}>
                <Link to={q.to} className="text-sm hover:text-brand-gold transition-colors duration-200">
                  {q.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/admin/login" className="text-sm hover:text-brand-gold transition-colors duration-200">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-[11px] tracking-[3px] uppercase">Contact</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm">
              <Phone size={15} className="text-brand-gold mt-0.5 shrink-0" />
              <div>
                <a href="tel:+919962242499" className="hover:text-brand-gold transition-colors block">+91 99622 42499</a>
                <a href="tel:+918072847972" className="hover:text-brand-gold transition-colors block text-white/40">+91 80728 47972</a>
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail size={15} className="text-brand-gold shrink-0 mt-0.5" />
              <a href="mailto:sales@kofeetek.in" className="hover:text-brand-gold transition-colors">
                sales@kofeetek.in
              </a>
            </li>
            <li className="flex gap-3 text-sm">
              <Globe size={15} className="text-brand-gold shrink-0 mt-0.5" />
              <a href="https://www.kofeetek.in" className="hover:text-brand-gold transition-colors">
                www.kofeetek.in
              </a>
            </li>
            <li className="flex gap-3 text-sm">
              <MapPin size={15} className="text-brand-gold mt-0.5 shrink-0" />
              <span className="text-white/70 leading-relaxed hover:text-brand-gold transition-colors" >
                Plot No 10, C-Block, G3,<br />
                Kalpathru Garden, Urapakkam,<br />
                Chennai – 603210
              </span>
            </li>
          </ul>
          {/* <div className="mt-5">
            <p className="text-[10px] text-white/35 uppercase tracking-[2px] mb-2">Service Cities</p>
            <div className="flex flex-wrap gap-1.5">
              {cities.map(c => (
                <span key={c} className="text-[10px] bg-white/6 px-2.5 py-1 rounded-full">{c}</span>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3
                        text-[11px] text-white/30">
          <span>© {new Date().getFullYear()} KofeeTek Beverage Pvt Ltd. All rights reserved. ISO & FSSAI Registered.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <Link to="/blog" className="hover:text-brand-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
