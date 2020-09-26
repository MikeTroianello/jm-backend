const express = require('express');
const router = express.Router();

const Group = require('../models/Group');

router.post('/create', (req, res) => {
  const { name, password } = req.body;
});

router.get('/:id', (req, res) => {
  console.log('JOINING', req.params);
});

router.post('/join', (req, res) => {
  const { name, password } = req.body;
});

router.delete('./delete', (req, res) => {});

module.exports = router;
