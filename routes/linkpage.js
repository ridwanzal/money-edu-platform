const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/linkpage', {
      title: 'Linktree - Payung Madinah',
      type: "website",
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/pages/linkpage',
      description: 'Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari Payung Madinah',
      keywords: 'Spesialis Umroh Plus Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Link Page',
         }
      ]
   });
});

module.exports = router;