const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

// Define Mongoose model for 'test1' collection
const Test1 = mongoose.model('test1', new mongoose.Schema({}, { collection: 'test1' }))

router.get('/', async (req, res) => {
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

module.exports = router