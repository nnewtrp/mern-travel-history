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
      iso2 = '',
      page = 1,
      pageSize = 10
    } = req.query;

    const limit = Math.max(parseInt(pageSize, 10) || 10, 0);
    const skip = Math.max((parseInt(page, 10) - 1) * limit, 0);

    // --- Build query ---
    var findQuery = TextSearch
      ? { name: { $regex: new RegExp(TextSearch, 'i') } }
      : {};
      
    if (iso2) {
      findQuery.iso2 = iso2;
    }

    // --- Run queries in parallel ---
    const [count, data] = await Promise.all([
      City.countDocuments(findQuery),
      City.find(findQuery)
        .sort({ name: 1 })
        .select('name country iso2 -_id')
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

// GET /city/country/:iso2 - Retrieve cities by country iso2 code
router.get('/country/:iso2', async (req, res) => {
  try {
    const { iso2 } = req.params;
    const { TextSearch = '', pageSize = 10, page = 1 } = req.query;

    const limit = Math.max(parseInt(pageSize, 10) || 10, 0);
    const skip = Math.max((parseInt(page, 10) - 1) * limit, 0);

    var findQuery = { iso2: iso2 };
    if (TextSearch) {
      findQuery.name = { $regex: new RegExp(TextSearch, 'i') };
    }

    const docs = await City.find(findQuery).select('name').skip(skip).limit(limit).sort({ name: 1 });
    res.json({ data: docs.map(doc => doc.name).reduce((acc, name) => {
      if (!acc.includes(name)) {
        acc.push(name);
      }
      return acc;
    }, []) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities for country' })
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
    res.status(500).json({ error: 'Failed to fetch city data' })
  }
})

module.exports = router