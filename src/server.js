//server.js
require('dotenv').config({ debug: false })
const app = require('./app.js')
const connectDB = require('./config/db.js')

//Variables
const PORT = process.env.PORT || 3000

//Connect DB
connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Server running on server http://localhost:${PORT}`)
})
