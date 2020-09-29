require('dotenv').config();

const chalk = require('chalk');

module.exports = (req, res, next) => {
  if (!req.user) {
    console.log('HITTING THIS');
    return res
      .status(401)
      .json({ message: 'You are not logged in!!!', unauthorized: true });
  } else {
    console.log(chalk.greenBright('THOMAS MIDDLEWARE'));
    next();
  }
};
