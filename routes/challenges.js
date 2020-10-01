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
      allOrNothing,
    } = req.body;
    const id = req.user._id;

    if (allOrNothing) {
      let newChallenge = await Challenge.create({
        name,
        category,
        challenge,
        creatorId: id,
        allOrNothing,
      });
      res.json({ msg: 'Challenge created', challenge: newChallenge });
    } else {
      let newChallenge = await Challenge.create({
        name,
        category,
        challenge,
        bonusChallenge,
        minimumChallenge,
        creatorId: id,
      });
      res.json({ msg: 'Challenge created', challenge: newChallenge });
    }
  } catch (err) {
    console.log(chalk.red(err));
    res.json({ err: err });
  }
});

router.post('/accept/:id', auth, async (req, res) => {
  try {
    console.log('HERE', req.params.id);
    const user = await User.findById(req.user._id);
    console.log(chalk.greenBright(user));
    console.log(chalk.blueBright(req.body.challenge));
    user.currentChallenge = req.params.id;
    user.save();
    const challenge = await Challenge.findById(req.params.id).populate();
    res.json({ challenge, success: true });
  } catch (err) {
    res.json({ err });
  }
});

// router.post('/drop/:id', auth, async (req, res) => {
//   try {
//     console.log('DROPPING', req.user._id);
//     const user = await User.findById(req.user._id);
//     console.log(user);
//     user.challenges.push(req.params.id);
//     console.log('TWO', user);
//     user.save();
//     const challenge = await Challenge.findById(req.params.id).populate();
//     res.json({ challenge, success: true });
//   } catch (err) {
//     res.json({ err });
//   }
// });

router.post('/process_challenge', auth, async (req, res) => {
  try {
    console.log('AM I THITTING THIS?????', req.body);
    let user = await User.findById(req.user._id);
    // let challenge = await Challenge.findById();
    user.score += req.body.score * 50;
    user.previousChallenges.push(user.challenge);
    user.challenge = null;
    user.save();
    res.json({ user, success: true });
  } catch (err) {
    console.log(chalk.redBright(err));
    res.json({ err });
  }
});

router.get('/score/:id', (req, res) => {
  res.json({ msg: 'this route exists' });
});

module.exports = router;
