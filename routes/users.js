const express = require('express');
const router = express.Router();

const auth = require('../configs/authMiddleware');

const Challenge = require('../models/Challenge');

/* GET home page */
router.get('/profile', auth, async (req, res, next) => {
  try {
    console.log('MADE IT HERERERERERERERERERE', req.user);
    const { challenges } = req.user;
    let challengeId = challenges[0];
    let challenge = await Challenge.findById(challengeId).populate();
    res.json({ success: true, challenge });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
