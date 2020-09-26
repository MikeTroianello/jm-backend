require('dotenv').config();

const chalk = require('chalk');

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'You are not logged in' });
  } else if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: 'You are not permitted to access this function' });
  } else {
    console.log(chalk.grey('WElCOME MY GOOD SIR'));
    next();
  }
};
