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

// Define Mongoose model for 'test1' collection
const Test1 = mongoose.model('test1', new mongoose.Schema({}, { collection: 'test1' }))

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Travel History API' })
})

// app.get('/:country', (req, res) => {
//   const { country } = req.params
//   res.send({ message: `Welcome to the Travel History API - ${country}` })
// })

app.get('/test1', async (req, res) => {
  try {
    const docs = await Test1.find({})
    res.json({
      data: docs,
      count: docs.length
    })
  } catch (error) {
    console.error('Error fetching test1 data:', error)
    res.status(500).json({ error: 'Failed to fetch test1 data' })
  }
})
