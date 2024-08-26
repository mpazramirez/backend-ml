// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getSearchResults } = require('../controllers/get-search-results');
const { getDetailItem } = require('../controllers/get-detail-item');

router.get('/items', getSearchResults);
router.get('/items/:id', getDetailItem);

module.exports = router;
