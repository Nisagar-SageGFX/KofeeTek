import { useRef, useEffect } from 'react'

const industries = [
  {
    title: 'IT & Software Companies',
    count: '120+',
    desc:  'Tech parks, BPOs and software companies across Chennai & Bangalore.',
    badge: 'Top Sector',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
  },
  {
    title: 'Manufacturing & Factories',
    count: '80+',
    desc:  'Automobile, textile, pharma and electronics manufacturing plants.',
    badge: 'High Volume',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&fit=crop',
  },
  {
    title: 'Hospitals & Healthcare',
    count: '50+',
    desc:  'Multi-specialty hospitals, diagnostic labs and healthcare facilities.',
    badge: 'Hygiene Certified',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&fit=crop',
  },
  {
    title: 'Educational Institutions',
    count: '40+',
    desc:  'Engineering colleges, MBA institutes and training centres.',
    badge: 'Trusted Sector',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&fit=crop',
  },
  {
    title: 'Corporate Offices',
    count: '180+',
    desc:  'MNC campuses, co-working spaces, banks and NBFC head offices.',
    badge: 'Top Performer',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&fit=crop',
  },
  {
    title: 'Warehouses & Logistics',
    count: '30+',
    desc:  'Logistics hubs, SEZs and large-scale warehouses.',
    badge: 'Trusted Sector',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&fit=crop',
  },
]

export default function Industries() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll('.hind-card'))
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          cards.forEach((c, i) => setTimeout(() => c.classList.add('hind-card--vis'), i * 75))
          io.disconnect()
        }
      })
    }, { threshold: 0.08 })
    io.observe(grid)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* Section */
        .hind-section {
          padding: 88px 0;
          background: #0d0603;
          position: relative;
          overflow: hidden;
        }
        .hind-section::before {
          content:'';position:absolute;inset:0;pointer-events:none;
          background-image:radial-gradient(circle,rgba(212,160,23,.07) 1px,transparent 1px);
          background-size:26px 26px;
        }
        .hind-section::after {
          content:'';position:absolute;top:-100px;right:-100px;
          width:420px;height:420px;pointer-events:none;
          background:radial-gradient(circle,rgba(212,160,23,.10) 0%,transparent 60%);
        }

        /* Header */
        .hind-header { text-align:center; margin-bottom:52px; position:relative; z-index:1; }
        .hind-label  { display:inline-block;color:#D4A017;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:10px; }
        .hind-title  { font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:#fff;line-height:1.15;margin-bottom:12px; }
        .hind-sub    { color:rgba(255,255,255,.42);font-size:15px;line-height:1.75;max-width:500px;margin:0 auto; }

        /* Grid */
        .hind-grid {
          display:grid;grid-template-columns:repeat(3,1fr);gap:20px;
          max-width:1200px;margin:0 auto;padding:0 24px;
          position:relative;z-index:1;
        }
        @media(max-width:1024px){.hind-grid{grid-template-columns:repeat(2,1fr);gap:14px;padding:0 16px;}}
        @media(max-width:640px) {.hind-grid{grid-template-columns:repeat(2,1fr);gap:10px;padding:0 16px;}}

        /* Card */
        .hind-card {
          position:relative;border-radius:24px;overflow:hidden;height:300px;cursor:pointer;
          border:1.5px solid rgba(255,255,255,.07);
          box-shadow:0 4px 24px rgba(0,0,0,.38);
          opacity:0;transform:translateY(28px);
          transition:opacity .55s ease var(--d,0ms),transform .55s ease var(--d,0ms),
                      border-color .4s ease,box-shadow .4s ease;
        }
        .hind-card--vis { opacity:1; transform:translateY(0); }
        @media(max-width:640px){.hind-card{height:220px;border-radius:18px;}}
        @media(max-width:640px){.hind-count{font-size:20px;top:12px;right:14px;}}
        @media(max-width:640px){.hind-badge{font-size:8.5px;padding:3px 8px;top:12px;left:12px;}}
        @media(max-width:640px){.hind-body{padding:14px 12px 12px;}}
        @media(max-width:640px){.hind-name{font-size:13px;margin-bottom:3px;}}
        @media(max-width:640px){.hind-desc{font-size:10px;line-height:1.5;}}

        .hind-img {
          position:absolute;inset:0;background-size:cover;background-position:center;
          transform:scale(1);transition:transform .45s ease;will-change:transform;
        }
        .hind-ov {
          ;inset:0;
          background:linear-gradient(158deg,rgba(13,6,3,.50) 0%,rgba(13,6,3,.80) 55%,rgba(13,6,3,.97) 100%);
          transition:background .4s ease;
        }
        .hind-shine {
          position:absolute;inset:0;pointer-events:none;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0) 50%,transparent 65%);
          background-size:200% 100%;background-position:200% 0;
        }
        .hind-count {
          position:absolute;top:18px;right:20px;
          font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;
          color:#D4A017;line-height:1;text-shadow:0 2px 10px rgba(212,160,23,.35);
          transition:font-size .4s ease,text-shadow .4s ease;
        }
        .hind-badge {
          position:absolute;top:18px;left:18px;
          background:rgba(212,160,23,.15);border:1px solid rgba(212,160,23,.32);
          color:#000000;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
          padding:4px 10px;border-radius:20px;backdrop-filter:blur(8px);
        }
        .hind-body {
          position:absolute;bottom:0;left:0;right:0;padding:22px 20px 20px;
          background:linear-gradient(to top,rgba(13,6,3,.98) 0%,transparent 100%);
        }
        .hind-name { font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.25;transition:color .35s ease; }
        .hind-desc { font-size:11.5px;color:rgba(255,255,255,.48);line-height:1.65;transition:color .35s ease; }

        /* Gold bottom bar */
        .hind-card::after {
          content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,transparent,#D4A017,transparent);
          opacity:0;transition:opacity .4s ease;
        }

        /* ── HOVER ── */
        .hind-card:hover {
          transform:translateY(-8px) !important;
          border-color:rgba(212,160,23,.55) !important;
          box-shadow:0 20px 56px rgba(0,0,0,.55),0 0 0 1px rgba(212,160,23,.25),0 0 40px rgba(212,160,23,.10) !important;
          transition:transform .4s ease,border-color .4s ease,box-shadow .4s ease !important;
        }
        .hind-card:hover .hind-img   { transform:scale(1.1); }
        .hind-card:hover .hind-ov    { background:linear-gradient(158deg,rgba(13,6,3,.28) 0%,rgba(13,6,3,.60) 48%,rgba(13,6,3,.96) 100%); }
        .hind-card:hover .hind-count { font-size:36px;text-shadow:0 4px 20px rgba(212,160,23,.65); }
        .hind-card:hover .hind-name  { color:#D4A017; }
        .hind-card:hover .hind-desc  { color:rgba(255,255,255,.70); }
        .hind-card:hover::after      { opacity:1; }
        .hind-card:hover .hind-shine {
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.07) 50%,transparent 70%);
          background-size:200% 100%;animation:hind-shine .65s ease forwards;
        }
        @keyframes hind-shine{0%{background-position:200% 0}100%{background-position:-50% 0}}
      `}</style>

      <section className="hind-section">
        <div className="hind-header">
          <span className="hind-label">Industries Served</span>
          <h2 className="hind-title">Trusted Across Every Industry</h2>
          <p className="hind-sub">From 50-employee startups to 5,000-employee factories — our machines scale with your workforce.</p>
        </div>

        <div ref={gridRef} className="hind-grid">
          {industries.map((ind, i) => (
            <div key={i} className="hind-card" style={{ '--d': `${i * 70}ms` }}>
              <div className="hind-img" style={{ backgroundImage: `url(${ind.image})` }} />
              <div className="hind-ov" />
              <div className="hind-shine" />
              <div className="hind-count">{ind.count}</div>
              <div className="hind-badge">{ind.badge}</div>
              <div className="hind-body">
                <div className="hind-name">{ind.title}</div>
                <div className="hind-desc">{ind.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
