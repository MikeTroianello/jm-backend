require('dotenv').config();

const chalk = require('chalk');

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'You are not logged in' });
  } else {
    console.log(chalk.greenBright('THOMAS MIDDLEWARE'));
    next();
  }
};
