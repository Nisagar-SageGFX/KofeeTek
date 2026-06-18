import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import leadsRouter from './routes/leads.js'
import chatRouter from './routes/chat.js'
import productsRouter from './routes/products.js'
import inventoryRouter from './routes/inventory.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '2mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

// Stricter limit for lead submissions
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 10,
  message: { error: 'Too many submissions. Please try WhatsApp instead.' }
})

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/leads', leadLimiter, leadsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/products', productsRouter)
app.use('/api/inventory', inventoryRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'KofeeTek API' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 KofeeTek API running on http://localhost:${PORT}`)
})
