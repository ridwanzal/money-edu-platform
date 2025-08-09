const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle');

router.get('/', (req, res) => {
  res.send('Run all services');
});

router.post('/add', (req, res) => {
  const { context, name } = req.body;
  const created_at = new Date();

  if (!context || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO campaign (context, name, created_at) VALUES (?, ?, ?)`;
  connection.query(query, [context, name, created_at], (err, result) => {
    if (err) {
      console.error('Error saving campaign:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    res.json({ success: true, id: result.insertId });
  });
});



module.exports = router;