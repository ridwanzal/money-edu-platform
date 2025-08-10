const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle');

router.post('/add', function (req, res, next) {
  const { date, description, category_id, amount, type } = req.body;
  connection.query('INSERT INTO transactions SET ?', { date, description, category_id, amount, type }, err => {
    if (err) throw err;
    res.redirect('/transactions');
  });
});   


module.exports = router;