import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

// GET /api/inventory — list all, with optional low-stock filter
router.get('/', async (req, res) => {
  const { low } = req.query
  let q = supabase.from('inventory').select('*').order('product_name')
  const { data, error } = await q
  if (error) return res.status(500).json({ error: error.message })
  const result = low === 'true' ? data.filter(i => i.stock <= i.minimum_stock) : data
  res.json(result)
})

// PATCH /api/inventory/:id — update stock level
router.patch('/:id', async (req, res) => {
  const { stock } = req.body
  if (stock === undefined) return res.status(400).json({ error: 'stock value required' })
  const { error } = await supabase.from('inventory')
    .update({ stock: Number(stock), updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
