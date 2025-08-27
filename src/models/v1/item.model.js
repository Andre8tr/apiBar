const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  price: {
    type: Number,
    required: true,
    min: 10,
  },
  category: {
    type: String,
    default: 'Bebida',
  },
})

const Item = model('Item', itemSchema, 'items')
module.exports = Item
