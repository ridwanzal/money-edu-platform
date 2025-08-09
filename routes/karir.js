const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res) {
   res.render('pages/karir', {
      title: 'Karir - Payung Madinah',
      type: "article",
      canonical: 'https://payungmadinah.id/karir',
      author: 'Payung Madinah',
      type: "article",
      description: 'Karir - Payung Madinah',
      keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Karir', link: '/karir' }
      ],
   });
});

module.exports = router;
