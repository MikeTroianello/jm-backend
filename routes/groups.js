const express = require('express');
const router = express.Router();

const auth = require('../configs/authMiddleware');

const Group = require('../models/Group');
const chalk = require('chalk');

router.post('/create', auth, async (req, res) => {
  try {
    const { name, password, public } = req.body;

    const id = req.user.id;
    let newGroup = await Group.create({
      name,
      password,
      public,
      creatorId: id,
      users: [id],
    });
    console.log(chalk.cyanBright('SUCCESS?', newGroup));

    res.json({ msg: newGroup });
  } catch (err) {
    console.log(chalk.red('NO GROUP FOR YOU'));
    res.json({ msg: err });
  }
});

router.get('/all', async (req, res) => {
  let allGroups = await Group.find();
  res.json({ msg: allGroups });
});

router.get('/:id', async (req, res) => {
  console.log('JOINING', req.params.id);
  let group = await Group.findById(req.params.id);
  console.log('FOUUNNDD??????', group);
  res.json({ msg: group });
});

router.post('/join/:id', auth, async (req, res) => {
  try {
    let { password } = req.body;
    let id = req.user._id;

    let group = await Group.findById(req.params.id);
    if (group.users.includes) {
      console.log('ALREADY JOINED');
      res.json({ msg: 'You Already joined this group' });
    } else if (password === group.password || !group.password) {
      group.users.push(id);
      console.log('POTENTIAL SUCCESS', group);
      group.save();
      res.json({ msg: 'Group has been expanded', group });
    } else {
      console.log('UR NOT WELCOME AT THE COOL KIDS CLUB');
      res.json({ msg: 'The password does not match' });
    }
  } catch (err) {
    console.log(chalk.redBright('NOOOOOOOOOOOOOOOOOOO'));
    res.json({ err });
  }
});

router.delete('./delete', (req, res) => {});

module.exports = router;
