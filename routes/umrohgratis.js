const express = require('express');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();

router.get('/', function (req, res) {
   connection.query('SELECT * FROM umroh ORDER BY created_at DESC', (err, results) => {
      if (err) {
         console.error(err);
         return res.status(500).send('Database error');
      }

      res.render('pages/umroh-gratis', {
         title: 'Umroh Gratis - Payung Madinah',
         type: "article",
         canonical: 'https://payungmadinah.id/umroh-gratis',
         author: 'Payung Madinah',
         description: 'Spesialis Umroh Plus Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
         keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
         breadcrumbs: [
            { name: 'Home', link: '/' },
            { name: 'Program Umroh Gratis', link: '/umroh-gratis' }
         ],
         umrohList: results
      });
   });
});

module.exports = router;
