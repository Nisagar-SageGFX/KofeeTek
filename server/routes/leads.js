import { Router } from 'express'
import Joi from 'joi'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const leadSchema = Joi.object({
  name:         Joi.string().min(2).max(100).required(),
  company_name: Joi.string().min(2).max(200).required(),
  phone:        Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  email:        Joi.string().email().required(),
  location:     Joi.string().max(100).required(),
  industry:     Joi.string().max(100).optional().allow(''),
  employees:    Joi.string().max(50).optional().allow(''),
  inquiry_type: Joi.string().max(100).optional().allow(''),
  notes:        Joi.string().max(1000).optional().allow(''),
})

// POST /api/leads  — submit a new lead
router.post('/', async (req, res) => {
  const { error: validErr, value } = leadSchema.validate(req.body)
  if (validErr) return res.status(400).json({ error: validErr.details[0].message })

  const { data, error } = await supabase.from('leads').insert([{
    ...value,
    status:     'new',
    created_at: new Date().toISOString(),
  }]).select().single()

  if (error) {
    console.error('Lead insert error:', error)
    return res.status(500).json({ error: 'Failed to save lead' })
  }

  res.status(201).json({ success: true, id: data.id })
})

// GET /api/leads  — admin: list all leads (requires service key via middleware in production)
router.get('/', async (req, res) => {
  const { status, limit = 50 } = req.query
  let q = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(Number(limit))
  if (status && status !== 'all') q = q.eq('status', status)
  const { data, error } = await q
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// PATCH /api/leads/:id  — update status or notes
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const allowed = ['status', 'notes', 'inquiry_type']
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)))
  if (!Object.keys(updates).length) return res.status(400).json({ error: 'No valid fields to update' })

  const { error } = await supabase.from('leads').update(updates).eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
