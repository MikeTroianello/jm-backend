const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.get('/all', async (req, res, next) => {
  let allCategories = await Category.find();
  res.json({ msg: allCategories });
});

router.get('/create', async (req, res, next) => {
  let allCategories = await Category.find();
  res.json({ msg: allCategories });
});

router.post('/create', async (req, res) => {
  const { title } = req.body;

  let newCategory = await Category.create({
    title,
  });
});

module.exports = router;
