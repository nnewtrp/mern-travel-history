const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
// mongoose.connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true })

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Travel History API' })
})

app.get('/:country', (req, res) => {
  const { country } = req.params
  res.send({ message: `Welcome to the Travel History API - ${country}` })
})