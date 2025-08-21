const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle');
const path = require('path');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM keuangan ORDER BY created_at DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching blogs:', err);
      return res.status(500).json({ error: 'Gagal mengambil data pencatatan keuangan.' });
    }

    res.json({
      success: true,
      data: results
    });
  });
});

module.exports = router;
