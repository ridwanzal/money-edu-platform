const express = require('express');
const { link } = require('fs');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
  res.render('pages/about', {
    title: 'Tentang - Payung Madinah',
    type: "website",
    author: 'Payung Madinah',
    description: 'Spesialis Umroh Plus Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
    canonical: 'https://payungmadinah.id/tentang-kami',
    keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
    breadcrumbs: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Tentang Kami',
        link: '/tentang-kami'
      }
    ]
  });
});

module.exports = router;