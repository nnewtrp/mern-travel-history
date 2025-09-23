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
    // Parse query parameters for pagination and filtering
    const limit = parseInt(req.query.pageSize) || 10
    const skip = parseInt((req.query.page - 1) * limit) || 0
    const name = req.query.TextSearch || ''
    const findQuery = {name: { $regex: new RegExp(name, 'i') }}

    // Fetch data with pagination and optional name filtering
    const data = await City.find(findQuery).limit(limit).skip(skip).select('name -_id country -_id iso3 -_id').exec()
    const length = await City.countDocuments(findQuery)

    // Return data and total count
    res.json({
      count: length,
      data: data
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