const { z } = require('zod')

const itemSchema = z.object({
  name: z.string().min(5, 'Must be at least 5 characters'),
  price: z.number().positive(),
})

module.exports = itemSchema
