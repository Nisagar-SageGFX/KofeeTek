import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from 'lucide-react'
import { blogPosts } from './Blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)

  // Convert markdown-ish content to JSX
  const renderContent = (text) =>
    text.split('\n\n').map((block, i) => {
      if (block.startsWith('## '))
        return <h2 key={i} className="font-display text-xl font-bold text-brand-brownDark mt-8 mb-3">{block.replace('## ','')}</h2>
      if (block.startsWith('**') && block.endsWith('**'))
        return <p key={i} className="font-semibold text-brand-brownDark mb-2">{block.replace(/\*\*/g,'')}</p>
      if (block.includes('\n') && block.includes('-'))
        return <ul key={i} className="space-y-1.5 my-4 ml-4">{block.split('\n').filter(l=>l.startsWith('-')).map((l,j)=>(
          <li key={j} className="flex items-start gap-2 text-brand-brown/75 text-sm"><span className="text-brand-gold mt-0.5">•</span>{l.slice(1).trim()}</li>
        ))}</ul>
      if (block.includes('|'))
        return <div key={i} className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse">
          {block.split('\n').filter(r=>!r.includes('---')).map((row,j)=>(
            <tr key={j} className={j===0?'bg-brand-brown text-white':'border-b border-brand-beige'}>
              {row.split('|').filter(c=>c.trim()).map((cell,k)=>(
                j===0 ? <th key={k} className="px-4 py-2 text-left text-xs font-semibold">{cell.trim()}</th>
                       : <td key={k} className="px-4 py-2 text-brand-brown/80 text-xs">{cell.trim()}</td>
              ))}
            </tr>
          ))}
        </table></div>
      return <p key={i} className="text-brand-brown/75 text-[15px] leading-[1.85] mb-4">{block}</p>
    })

  return (
    <>
      <Helmet>
        <title>{post.title} | KofeeTek Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://www.kofeetek.in/blog/${post.slug}`} />
        <meta property="og:title"       content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type"        content="article" />
        <meta property="og:url"         content={`https://www.kofeetek.in/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "author": { "@type": "Organization", "name": "KofeeTek" },
          "publisher": { "@type": "Organization", "name": "KofeeTek", "url": "https://www.kofeetek.in" },
          "keywords": post.tags.join(', ')
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-28 pb-0 bg-gradient-to-br from-brand-dark to-brand-brownDark">
        <div className="max-w-4xl mx-auto px-4 pb-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-gold
                                         transition-colors text-sm mb-6">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-brand-gold text-brand-brownDark text-[10px] font-bold px-3 py-1 rounded-full uppercase">{post.category}</span>
              <span className="flex items-center gap-1 text-white/40 text-xs"><Calendar size={11} />{post.date}</span>
              <span className="flex items-center gap-1 text-white/40 text-xs"><Clock size={11} />{post.readTime}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-5">{post.title}</h1>
            <p className="text-white/60 text-lg leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <img src={post.image} alt={post.title}
            className="w-full rounded-t-2xl object-cover max-h-[380px]"
            onError={e=>{e.target.style.display='none'}} />
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
            {renderContent(post.content)}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-brand-beige">
            <span className="flex items-center gap-1 text-xs text-brand-brown/50 font-medium"><Tag size={12} />Tags:</span>
            {post.tags.map(t => (
              <span key={t} className="text-xs bg-brand-beige text-brand-brown px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-brand-brown to-brand-brownDark rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-white mb-2">Ready to Upgrade Your Workplace Beverages?</h3>
            <p className="text-white/60 text-sm mb-5">Get a free demo from KofeeTek — no commitment required.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/contact" className="btn-primary text-sm">Schedule Free Demo</Link>
              <a href="tel:+919962242499" className="btn-outline text-sm">+91 99622 42499</a>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="font-display font-bold text-xl text-brand-brownDark mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="card-premium group flex gap-4 p-4">
                  <img src={p.image} alt={p.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    onError={e=>{e.target.style.display='none'}} />
                  <div>
                    <h4 className="font-semibold text-brand-brownDark text-sm leading-tight mb-1 group-hover:text-brand-gold transition-colors line-clamp-2">{p.title}</h4>
                    <span className="flex items-center gap-1 text-[10px] text-brand-brown/40"><Clock size={9}/>{p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
