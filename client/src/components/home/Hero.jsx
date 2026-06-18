import { useRef, Suspense, Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, CheckCircle2, Star } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, OrbitControls } from '@react-three/drei'

/* ── Error boundary — catches WebGL / Three.js failures ─────────────────── */
class ThreeBoundary extends Component {
  constructor(p) { super(p); this.state = { err: false } }
  static getDerivedStateFromError() { return { err: true } }
  componentDidCatch(e) { console.warn('Three.js error caught:', e.message) }
  render() { return this.state.err ? <PhotoHero /> : this.props.children }
}

/* ── Fallback: real machine photo when WebGL unavailable ─────────────────── */
function PhotoHero() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full max-w-sm mx-auto">
        <motion.img
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/assets/machines/machine_hero.jpeg"
          alt="KofeeTek Coffee Vending Machine"
          className="w-full object-contain drop-shadow-2xl animate-float"
          style={{ filter: 'drop-shadow(0 28px 56px rgba(245,184,0,0.22))' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-12 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(245,184,0,.28) 0%,transparent 70%)', filter: 'blur(14px)' }} />
      </div>
    </div>
  )
}

/* ── Realistic 3D KofeeTek machine (black + orange, like the real one) ───── */
function MachineModel() {
  const ref = useRef()
  useFrame(state => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.2
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.48) * 0.06
  })

  return (
    <group ref={ref} scale={[0.88, 0.88, 0.88]}>
      {/* Main body – black */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.6, 2.8, 1.1]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Orange top strip */}
      <mesh position={[0, 1.52, 0]}>
        <boxGeometry args={[1.62, 0.14, 1.12]} />
        <meshStandardMaterial color="#E8650A" emissive="#E8650A" emissiveIntensity={0.25} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Orange left rail */}
      <mesh position={[-0.82, 0.1, 0]}>
        <boxGeometry args={[0.08, 2.8, 1.12]} />
        <meshStandardMaterial color="#E8650A" emissive="#E8650A" emissiveIntensity={0.18} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Orange right rail */}
      <mesh position={[0.82, 0.1, 0]}>
        <boxGeometry args={[0.08, 2.8, 1.12]} />
        <meshStandardMaterial color="#E8650A" emissive="#E8650A" emissiveIntensity={0.18} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* LCD screen */}
      <mesh position={[0, 1.08, 0.56]}>
        <boxGeometry args={[1.1, 0.52, 0.04]} />
        <meshStandardMaterial color="#0d1f3c" emissive="#1a5acc" emissiveIntensity={0.65} />
      </mesh>
      {/* Screen content */}
      <mesh position={[0, 1.08, 0.585]}>
        <boxGeometry args={[0.88, 0.36, 0.01]} />
        <meshStandardMaterial color="#2266ff" emissive="#4488ff" emissiveIntensity={0.9} transparent opacity={0.8} />
      </mesh>
      {/* 8 beverage buttons (2×4 grid) */}
      {[
        [-0.28, 0.55], [0.28, 0.55],
        [-0.28, 0.22], [0.28, 0.22],
        [-0.28, -0.12], [0.28, -0.12],
        [-0.28, -0.46], [0.28, -0.46],
      ].map(([x, y], i) => (
        <group key={i}>
          <mesh position={[x, y, 0.558]}>
            <boxGeometry args={[0.36, 0.22, 0.032]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          <mesh position={[x, y + 0.04, 0.582]}>
            <circleGeometry args={[0.042, 12]} />
            <meshStandardMaterial color="#4499ff" emissive="#4499ff" emissiveIntensity={0.85} />
          </mesh>
        </group>
      ))}
      {/* Nozzle */}
      <mesh position={[0, -0.92, 0.62]}>
        <cylinderGeometry args={[0.04, 0.06, 0.18, 12]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Drip tray */}
      <mesh position={[0, -1.12, 0.62]}>
        <boxGeometry args={[1.1, 0.06, 0.3]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* KofeeTek logo plate */}
      <mesh position={[0, -0.56, 0.557]}>
        <boxGeometry args={[0.7, 0.13, 0.022]} />
        <meshStandardMaterial color="#E8650A" emissive="#E8650A" emissiveIntensity={0.4} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -1.52, 0]}>
        <boxGeometry args={[1.9, 0.1, 1.3]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Side milk unit */}
      <mesh position={[1.28, -0.22, 0]}>
        <boxGeometry args={[0.55, 1.75, 1.0]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[1.28, 0.69, 0]}>
        <cylinderGeometry args={[0.28, 0.26, 0.08, 20]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.57, -0.32, 0.2]}>
        <sphereGeometry args={[0.052, 12, 12]} />
        <meshStandardMaterial color="#E8650A" emissive="#E8650A" emissiveIntensity={0.65} />
      </mesh>
    </group>
  )
}

function CoffeeBean({ position, speed }) {
  const ref = useRef()
  useFrame(state => {
    if (!ref.current) return
    ref.current.rotation.x += 0.013 * speed
    ref.current.rotation.z += 0.008 * speed
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.75 + position[0]) * 0.28
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshStandardMaterial color="#2E1A10" roughness={0.65} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 5, 4]} intensity={1.8} color="#F5B800" />
      <pointLight position={[-4, 2, -3]} intensity={0.7} color="#ffffff" />
      <pointLight position={[0, -3, 4]} intensity={0.5} color="#E8650A" />
      <spotLight position={[0, 8, 5]} intensity={1.4} angle={0.4} penumbra={0.6} castShadow />
      <Float speed={0.95} rotationIntensity={0.07} floatIntensity={0.18}>
        <MachineModel />
      </Float>
      {[[-3.0, 0.5, -0.5], [3.3, -0.4, -0.8], [-2.6, -1.6, 0.3],
      [2.9, 1.7, 0.2], [-2.9, 1.9, -0.3], [3.1, 0.1, 0.6],
      [-2.1, -0.9, -0.9], [3.7, -1.1, 0.4]].map((p, i) => (
        <CoffeeBean key={i} position={p} speed={0.33 + i * 0.11} />
      ))}
      <OrbitControls
        enableZoom={false} enablePan={false}
        autoRotate autoRotateSpeed={0.45}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3.2}
      />
    </>
  )
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const stats = [
  { value: '500+', label: 'Corporate Clients' },
  { value: '7+', label: 'Years Experience' },
  { value: '15K+', label: 'Cups Daily' },
  { value: 'ISO', label: 'Registered' },
]
const badges = ['IT Companies', 'Manufacturing', 'Hospitals', 'Corporates']

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }

/* ── Hero ──────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0d0603] via-[#1a0a03] to-brand-brownDark overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.032] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(245,184,0,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(245,184,0,.5) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 75% 50%,rgba(245,184,0,0.065) 0%,transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 items-center w-full pt-20 pb-14">

          {/* ── LEFT ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">

            {/* Industry pills */}
            {/* <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
              {badges.map(b => (
                <span key={b} className="flex items-center gap-1.5 text-[11px] bg-brand-gold/12
                  text-brand-gold border border-brand-gold/22 px-3 py-1 rounded-full font-medium">
                  <CheckCircle2 size={10} className="fill-brand-gold" />{b}
                </span>
              ))}
            </motion.div> */}

            {/* Eyebrow */}
            <motion.p variants={fadeUp}
              className="text-brand-gold/65 text-[11px] font-semibold uppercase tracking-[3.5px] mb-3">
              South India's #1 B2B Vending Partner
            </motion.p>

            {/* Headline — improved sizing */}
            <motion.h1 variants={fadeUp}
              className="font-clash font-medium tracking-tight leading-[0.9] text-white mb-5"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
              Smart Beverage{' '}
              <span className="text-brand-gold relative whitespace-nowrap">
                Solutions
                {/* <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 240 8" fill="none">
                  <path d="M2 6 Q120 1 238 6" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                </svg> */}
              </span>
              <br />
              <span className="text-white/88">for Modern Workplaces</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp}
              className="text-white/58 text-[15px] leading-[1.78] mb-7 max-w-[430px]">
              Premium Coffee & Tea Vending Machines — manufactured, rented and fully serviced
              across Tamil Nadu & Karnataka. ISO Certified. FSSAI Approved.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/contact" className="btn-primary gap-2 shadow-lg shadow-brand-gold/18 text-sm">
                Schedule Free Demo <ArrowRight size={15} />
              </Link>
              <Link to="/products" className="btn-outline gap-2 text-sm">
                Explore Machines
              </Link>
            </motion.div>

            {/* Quick contact */}
            {/* <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              <a href="tel:+919962242499"
                className="flex items-center gap-2 text-white/52 hover:text-brand-gold transition-colors text-[13px]">
                <div className="w-7 h-7 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Phone size={12} className="text-brand-gold" />
                </div>
                +91 99622 42499
              </a>
              <span className="text-white/15 hidden sm:block">|</span>
              <a href="mailto:sales@kofeetek.in"
                className="text-white/52 hover:text-brand-gold transition-colors text-[13px]">
                sales@kofeetek.in
              </a>
            </motion.div> */}

            {/* Stats */}
            {/* <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="border-l-2 border-brand-gold/22 pl-3">
                  <div className="font-display text-[20px] font-bold text-white">{s.value}</div>
                  <div className="text-white/38 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* ── RIGHT: 3D Canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.25 }}
            className="order-1 lg:order-2 h-[360px] sm:h-[470px] lg:h-[570px] relative"
          >
            <ThreeBoundary>
              <Suspense fallback={<PhotoHero />}>
                <Canvas camera={{ position: [0, 0.2, 6.2], fov: 42 }} shadows>
                  <Scene />
                </Canvas>
              </Suspense>
            </ThreeBoundary>

            {/* Floating badge */}
            {/* <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute top-8 left-0 bg-white/8 backdrop-blur-md border border-white/14
                         rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 pointer-events-none"
            >
              <div className="w-8 h-8 bg-[#E8650A]/20 rounded-lg flex items-center justify-center text-sm">☕</div>
              <div>
                <div className="text-white text-[11px] font-semibold">KT FreshMilk Pro 8</div>
                <div className="text-brand-gold text-[11px]">₹7,700 / month</div>
              </div>
            </motion.div> */}

            {/* Stars badge */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              // className="absolute bottom-14 right-0 bg-white/8 backdrop-blur-md border border-white/14
              //            rounded-xl px-3.5 py-2.5 flex items-center gap-2 pointer-events-none"
            >
              {/* <div className="flex">{[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-brand-gold fill-brand-gold" />
              ))}</div> */}
              {/* <span className="text-white/72 text-[11px]">500+ Clients</span> */}
            </motion.div>

            {/* Ground glow */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,rgba(245,184,0,.2) 0%,transparent 70%)', filter: 'blur(10px)' }} />
          </motion.div>

          
        </div>
      </div>

      {/* Scroll cue */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="w-5 h-8 border-2 border-white/18 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 bg-brand-gold rounded-full"
          />
        </div>
      </motion.div> */}
    </section>
  )
}
