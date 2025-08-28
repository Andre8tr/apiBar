const { Router } = require('express')
const router = Router()
const {
  getItem,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  inactiveItem,
  getAllItems,
} = require('../../controllers/v1/item.controller.js')

router.get('/', getItem)
router.get('/getAllItems', getAllItems)
router.get('/:id', getItemById)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', inactiveItem)

/* 
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  const item = items.find((i) => i.id === Number(id))
  if (!item) {
    return res.status(404).json({ message: 'Item not found' })
  }

  if (name) item.name = name
  if (price) item.price = price

  res.json(item)
}) */

module.exports = router
