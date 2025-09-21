const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

// Define Mongoose model for collection
const City = mongoose.model('city', new mongoose.Schema({
  name: String,
  country: String,
  lat: Number,
  lng: Number,
  iso2: String,
  iso3: String,
}, { collection: 'mas_cities' }))

// GET /city - Retrieve all documents from the 'city' collection
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const skip = parseInt(req.query.skip) || 0
    const data = await City.find({}).limit(limit).skip(skip)
    const length = await City.countDocuments({})

    // Return data and total count
    res.json({
      data: data,
      count: length
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

// GET /city/:name - Retrieve a single document by name
router.get('/:name', async (req, res) => {
  try {
    const doc = await City.findOne({ name: req.params.name })
    if (!doc) {
      return res.status(404).json({ error: 'Data not found' })
    }
    res.json({ data: doc })
  } catch (error) {
    console.error('Error fetching city data:', error)
    res.status(500).json({ error: 'Failed to fetch city data' })
  }
})

module.exports = router