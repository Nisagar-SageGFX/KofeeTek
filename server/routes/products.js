import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

// GET /api/products
router.get('/', async (req, res) => {
  const { category } = req.query
  let q = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (category) q = q.eq('category', category)
  const { data, error } = await q
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single()
  if (error) return res.status(404).json({ error: 'Product not found' })
  res.json(data)
})

// POST /api/products  (admin only — add service-role auth in production)
router.post('/', async (req, res) => {
  const { name, category, description, image, stock } = req.body
  if (!name || !category) return res.status(400).json({ error: 'name and category required' })
  const { data, error } = await supabase.from('products').insert([{ name, category, description, image, stock: stock || 0 }]).select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// PATCH /api/products/:id
router.patch('/:id', async (req, res) => {
  const allowed = ['name', 'category', 'description', 'image', 'stock']
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)))
  const { error } = await supabase.from('products').update(updates).eq('id', req.params.id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('products').delete().eq('id', req.params.id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
