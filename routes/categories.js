const express = require('express');
const router = express.Router();

const auth = require('../configs/authMiddleware');

const Category = require('../models/Category');

router.get('/all', async (req, res, next) => {
  let allCategories = await Category.find();
  res.json({ msg: allCategories });
});

router.get('/create', async (req, res, next) => {
  let allCategories = await Category.find();
  res.json({ msg: allCategories });
});

router.post('/create', auth, async (req, res) => {
  try {
    const { title, logo } = req.body;

    let newCategory = await Category.create({
      title,
      logo,
    });
    res.json({ msg: `${newCategory.title} has been created`, success: true });
  } catch (err) {
    console.log('NOPE', err);
    res.json({ msg: err });
  }
});

// router.get('/users/:id', (req, res, next));

module.exports = router;
