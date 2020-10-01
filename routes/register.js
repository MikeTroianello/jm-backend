require('dotenv').config();
var express = require('express');
var router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const auth = require('../configs/authMiddleware.js');

const User = require('../models/User');
const Challenge = require('../models/Challenge');

const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.blueBright('YOU ARE HERE'));
  res.json({ msg: 'ROUTE HIT' });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password) {
      console.log('IT IS BREAKING DUE TO NO USERNAME AND OR PASSWORD');
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    // if (password.length < 6) {
    //   console.log('THE PASSWORD IS NOT 6 OR GREATER');
    //   res.status(400).json({
    //     message:
    //       'Please make your password at least 6 characters long for security purposes.',
    //   });
    //   return;
    // }

    let lowerCaseUsername = username.toLowerCase();

    let foundUser = await User.findOne({ lowerCaseUsername });

    if (foundUser) {
      console.log('USER ALREADY EXISTS', foundUser);
      res.json({ err: 'User Already Exists!' });
      return;
    }

    const salt = await bcrypt.genSalt(bcryptSalt);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      password: hashPass,
      lowerCaseUsername,
      email,
      phone,
    });

    const { score, challenges } = newUser;

    let user = { username, score, challenges };

    console.log(chalk.green('SUCCESS'));
    await req.login(newUser, (err) => {
      if (err) {
        console.log('IT BROKE AT THE LOGIN', err);
        res.status(500).json({ message: 'Login after signup went bad.', err });
        return;
      }
      res
        .status(200)
        .json({ msg: 'Succesfully signed up', user, success: true });
    });
  } catch (err) {
    console.log('FAILED', err);
    res.json({ err: err });
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    console.log(chalk.greenBright('THE USER', theUser));

    const { username, score, currentChallenge, previousChallenges } = theUser;

    let fullChallenge = await Challenge.findById(currentChallenge).populate();

    let user = {
      username,
      score,
      currentChallenge: fullChallenge,
      previousChallenges,
    };

    console.log(chalk.yellowBright(user));

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      } else {
        res.json({ msg: 'User has been logged in', user, success: true });
      }
    });
  })(req, res, next);
});

router.post('/logout', async (req, res, next) => {
  await req.logout();
  console.log(chalk.blueBright('Logged out'));
  res.json({ message: 'Logged out', success: true });
});

router.get('/test', auth, (req, res) => {
  console.log(chalk.cyanBright('LOGGED IN'));
  res.json({ msg: 'You have persisted in being logged in' });
});

module.exports = router;
