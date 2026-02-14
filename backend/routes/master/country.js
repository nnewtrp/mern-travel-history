const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

// Define Mongoose model for collection
const Country = mongoose.model('country', new mongoose.Schema({
  country: String,
  iso2: String,
  iso3: String,
}, { collection: 'mas_cities' }));

// GET /country - Retrieve all documents from the 'country' collection
router.get('/', async (req, res) => {
  try {
    // --- Parse and sanitize query parameters ---
    const {
      TextSearch = '',
      page = 1,
      pageSize = 10
    } = req.query;

    // Handle pageSize = -1 for no pagination
    const parsedPageSize = parseInt(pageSize, 10);

    const limit =
      parsedPageSize === -1
        ? null
        : Math.max(parsedPageSize || 10, 1);

    const skip =
      parsedPageSize === -1
        ? 0
        : Math.max((parseInt(page, 10) - 1) * limit, 0);

    // --- Build query ---
    const findQuery = TextSearch
      ? { country: { $regex: new RegExp(TextSearch, 'i') } }
      : {};

    // --- Aggregate to get distinct countries ---
    const [result] = await Country.aggregate([
      { $match: findQuery },
      {
        $group: {
          _id: "$iso2",
          country: { $first: "$country" }
        }
      },
      { $sort: { country: 1 } },
      {
        $facet: {
          data: [...(limit !== null ? [{ $skip: skip }, { $limit: limit }] : [])],
          count: [
            { $count: "total" }
          ]
        }
      }
    ]);

    // --- Extract data and count ---
    const data = result.data;
    const count = result.count[0]?.total || 0;

    // --- Return consistent JSON response ---
    res.json({ count, data });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch countries',
      error: error.message
    });
  }
});

// GET /country/:iso3 - Retrieve a single document by iso3
router.get('/:iso3', async (req, res) => {
  try {
    const doc = await Country.findOne({ iso3: req.params.iso3 }).select('country iso3 iso2 -_id')
    if (!doc) {
      return res.status(404).json({ error: 'Data not found' })
    }
    res.json({ data: doc })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country data' })
  }
})

module.exports = router