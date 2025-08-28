const allItems = require('../../utils/items.json')
const itemSchema = require('../../schemas/item.schema.js')
const Item = require('../../models/v1/item.model.js')

const getItem = async (req, res) => {
  const items = await Item.find({ status: true })
  res.status(200).json({ items: items })
}

const getAllItems = async (req, res) => {
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

const updateItem = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)

    //Validation with zod
    const result = itemSchema.safeParse(req.body)
    if (!result.success)
      res.status(400).json({ error: 'No esta enviado correctamente' })
    //Update with Mongo DB
    const updateItem = await Item.findByIdAndUpdate(id, result.data)
    if (!updateItem) res.status(400).json({ message: 'Item not found' })
    res.status(200).json(updateItem)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const inactiveItem = async (req, res) => {
  try {
    const { id } = req.params
    const inactiveItem = await Item.findByIdAndUpdate(id, {
      status: false,
    })
    if (!inactiveItem) res.status(404).json({ message: 'Item not found' })
    res.status(200).json({ msg: 'Item setting to inactive' })
  } catch (error) {
    res.status(500).json({ err: error.message })
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Item.findByIdAndDelete(id)
    if (!result) res.status(400).json({ msg: 'Theres an error' })
    res.status(200).json({ msg: 'Item deleted', result })
  } catch (error) {
    res.status(400).json({ msg: `The error is ${error.message}` })
  }
}

module.exports = {
  getItem,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  inactiveItem,
  getAllItems,
}
