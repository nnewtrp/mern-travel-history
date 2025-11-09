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
    // --- Parse and sanitize query parameters ---
    const {
      TextSearch = '',
      page = 1,
      pageSize = 10
    } = req.query;

    const limit = Math.max(parseInt(pageSize, 10) || 10, 0);
    const skip = Math.max((parseInt(page, 10) - 1) * limit, 0);

    // --- Build query ---
    const findQuery = TextSearch
      ? { name: { $regex: new RegExp(TextSearch, 'i') } }
      : {};

    // --- Run queries in parallel ---
    const [count, data] = await Promise.all([
      City.countDocuments(findQuery),
      City.find(findQuery)
        .select('name country iso3 -_id')
        .skip(limit > 0 ? skip : 0)
        .limit(limit > 0 ? limit : 0)
        .lean()
        .exec()
    ]);

    // --- Return consistent JSON response ---
    res.json({ count, data });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch cities',
      error: error.message
    });
  }
});

// GET /city/:name - Retrieve a single document by name
router.get('/:name', async (req, res) => {
  try {
    const doc = await City.findOne({ name: req.params.name })
    if (!doc) {
      return res.status(404).json({ error: 'Data not found' })
    }
    res.json({ data: doc })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city data' })
  }
})

module.exports = router