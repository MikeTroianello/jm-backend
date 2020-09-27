const express = require('express');
const router = express.Router();

const auth = require('../configs/authMiddleware');

const Group = require('../models/Group');
const chalk = require('chalk');

require('dotenv').config();

const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
const fromPhone = process.env.FROM_PHONE;
const toPhone = process.env.TO_PHONE;

const client = require('twilio')(accountSid, authToken);

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

    res.json({ msg: `${name} Created!`, success: true, group: newGroup });
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
      res.json({ msg: 'Group has been expanded', group, success: true });
    } else {
      console.log('UR NOT WELCOME AT THE COOL KIDS CLUB');
      res.json({ msg: 'The password does not match' });
    }
  } catch (err) {
    console.log(chalk.redBright('NOOOOOOOOOOOOOOOOOOO'));
    res.json({ err });
  }
});

router.post('/join-by-name/:name', auth, async (req, res) => {
  try {
    let { password } = req.body;
    let id = req.user._id;

    let group = await Group.findOne({ name: req.params.name });
    if (group.users.includes(id)) {
      console.log('ALREADY JOINED');
      res.json({ msg: 'You Already joined this group' });
    } else if (password === group.password || !group.password) {
      group.users.push(id);
      console.log('POTENTIAL SUCCESS', group);
      group.save();
      res.json({ msg: 'Group has been expanded', group, success: true });
    } else {
      console.log('UR NOT WELCOME AT THE COOL KIDS CLUB');
      res.json({ msg: 'The password does not match' });
    }
  } catch (err) {
    console.log(chalk.redBright('NOOOOOOOOOOOOOOOOOOO'));
    res.json({ err });
  }
});

router.get('/your-group/:id', auth, async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);
    console.log('THE GROUP WAS FOUND', group);
    res.json({ group, success: true });
  } catch (err) {
    console.log(chalk.redBright('NOOOOOOOOOOOOOOOOOOO', err));
    res.json({ err });
  }
});

router.post('/message-group/:id', auth, async (req, res) => {
  const { phoneMessage, numArr } = req.body;
  console.log('CALLING TWILIO');
  for (let i = 0; i < numArr.length; i++) {
    client.messages
      .create({
        to: numArr[i],
        from: fromPhone,
        body: phoneMessage,
      })
      .then((message) => console.log(message));
  }
  res.json({ msg: 'Messages were successfully sent', success: true });
});

router.delete('./delete', (req, res) => {});

module.exports = router;
