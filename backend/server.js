require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Travel History API' })
})

// Import city routes
const cityRoutes = require('./routes/master/city')
app.use('/api/city', cityRoutes)

// Import country routes
const countryRoutes = require('./routes/master/country')
app.use('/api/country', countryRoutes)