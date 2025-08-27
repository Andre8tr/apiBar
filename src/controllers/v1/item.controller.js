const allItems = require('../../utils/items.json')
const itemSchema = require('../../schemas/item.schema.js')
const Item = require('../../models/v1/item.model.js')

const getItem = async (req, res) => {
  const items = await Item.find()
  res.status(200).json({ items: items })
}

const getItemById = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findById(id)
    if (!item) res.status(404).json({ message: 'Not found' })
    res.json({ dataItem: item })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const createItem = (req, res) => {
  try {
    const validated = itemSchema.parse(req.body)
    const newItem = new Item(validated)
    newItem.save()
    allItems.push(newItem)
    res.status(201).json({ msg: 'Item Created', item: newItem })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const updateItem = (req, res) => {
  try {
    const { id } = req.params
    const { name, price } = req.body
    const index = allItems.findIndex((item) => item.id === Number(id))
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' })
    }
    items[index] = { id: Number(id), name, price }
    res.json(items[index])
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const deleteItem = (req, res) => {
  try {
    const { id } = req.params
    const index = allItems.findIndex((i) => i.id === Number(id))
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' })
    }
    const deleted = allItems.splice(index, 1)
    res.json({ message: `Item ${id} deleted`, deleted: deleted[0] })
  } catch (error) {
    res.status(400).json({ msg: `The error is ${error.message}` })
  }
}

module.exports = { getItem, createItem, getItemById, updateItem, deleteItem }
