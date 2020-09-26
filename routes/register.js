require('dotenv').config();
var express = require('express');
var router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const auth = require('../configs/authMiddleware.js');

const User = require('../models/User');

const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.blueBright('YOU ARE HERE'));
  res.json({ msg: 'ROUTE HIT' });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    let lowerCaseUsername = username.toLowerCase();

    const salt = await bcrypt.genSalt(bcryptSalt);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      password: hashPass,
      lowerCaseUsername,
    });

    User.find({ lowerCaseUsername });

    console.log(chalk.green('SUCCESS'));
    res.json({ msg: newUser });
  } catch (err) {
    console.log(chalk.red('YA DONE MESSED UP, A ARON'));
    res.json({ err });
  }
});

// router.post('/login', (req, res) => {
//   try {
//   } catch (err) {
//     console.log(chalk.red(err));
//     res.json({ err });
//   }
// });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      } else {
        res.json({ msg: 'User has been logged in' });
      }
    });
  })(req, res, next);
});

router.post('/logout', async (req, res, next) => {
  await req.logout();
  console.log(chalk.blueBright('Logged out'));
  res.json({ message: 'Logged out' });
});

router.get('/test', auth, (req, res) => {
  console.log(chalk.cyanBright('LOGGED IN'));
  res.json({ msg: 'You have persisted in being logged in' });
});

// router.get('/test', (req, res) => {
//   if (req.isAuthenticated()) {
//     console.log('LOGGED IN');
//     res.json({ msg: 'You have persisted in being logged in' });
//   } else {
//     console.log(chalk.red('NOT LOGGED IN'));
//     res.json({ msg: 'User has not persisted', loggedIn: true });
//   }
// });

module.exports = router;
