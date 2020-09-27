const express = require('express');
const router = express.Router();

const auth = require('../configs/authMiddleware');

const Challenge = require('../models/Challenge');
const User = require('../models/User');

const chalk = require('chalk');

/* GET home page */
router.get('/all', async (req, res, next) => {
  try {
    let challenges = await Challenge.find().populate();
    res.json({ msg: 'The challenges:', challenges });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/create', auth, async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      category,
      challenge,
      bonusChallenge,
      minimumChallenge,
    } = req.body;
    const id = req.user._id;

    let newChallenge = await Challenge.create({
      name,
      category,
      challenge,
      bonusChallenge,
      minimumChallenge,
      creatorId: id,
    });

    res.json({ msg: 'Challenge created', challenge: newChallenge });
  } catch (err) {
    console.log(chalk.red(err));
    res.json({ err: err });
  }
});

router.post('/accept/:id', auth, async (req, res) => {
  try {
    console.log('HERE', req.user._id);
    const user = await User.findById(req.user._id);
    console.log(user);
    user.challenges.push(req.params.id);
    console.log('TWO', user);
    user.save();
    const challenge = await Challenge.findById(req.params.id).populate();
    res.json({ user, challenge });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/score', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    user.score += req.body.score * 50;
    user.save();
    res.json({ user });
  } catch (err) {
    console.log(chalk.redBright(err));
    res.json({ err });
  }
});

module.exports = router;
