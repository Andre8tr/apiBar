//app.js
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

//Middleware
app.use(express.json()) //To read json in request

//Security middlewares
app.use(helmet())
app.use(morgan('dev')) //DEV

//Set up CORS
const allowedOrigins = ['http://localhost:1234', 'http://miapp.com']
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH'],
    credentials: false,
  })
)
app.use(cors(allowedOrigins))
/* ******** End cors ************** */

/* ---------------- Import router ------------------ */
const v1routerItems = require('./routes/v1/items.routes.js')
app.use('/apibar/v1', v1routerItems)
/* -----------------End of import router ----------- */

//Check api
app.get('/healthz', (req, res) => {
  res.status(200).json({ message: 'Ok' })
  console.log('Clickaca')
})

module.exports = app
