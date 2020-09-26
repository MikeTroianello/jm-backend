const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  console.log('MADE IT HERERERERERERERERERE');
  res.json({ msg: 'SUCCESSS???????' });
});

module.exports = router;
