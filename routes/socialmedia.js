const express = require('express');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();

router.get('/', function (req, res) {
   res.render('pages/social-media', {
      title: 'Tim Kami - Payung Madinah',
      type: "article",
      canonical: 'https://payungmadinah.id/sosial-media',
      author: 'Payung Madinah',
      type: "article",
      description: 'Sosial Media - Payung Madinah',
      keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Sosial Media', link: '/sosial-media' }
      ],
   });
});

module.exports = router;
