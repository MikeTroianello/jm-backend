require('dotenv').config();
var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');

const chalk = require('chalk');

router.get('/', (req, res, next) => {
  console.log(chalk.blueBright('YOU ARE HERE'));
  res.json({ msg: 'ROUTE HIT' });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(bcryptSalt);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashPass });

    User.find({ username: username.toLowerCase() });

    console.log(chalk.green('SUCCESS'));
    res.json({ msg: newUser });
  } catch (err) {
    console.log(chalk.red('YA DONE MESSED UP, A ARON'));
    res.json({ err });
  }
});

module.exports = router;
