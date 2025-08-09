const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/syarat-ketentuan', {
      title: 'Syarat dan Ketentuan - Payung Madinah',
      type: "website",
      canonical: 'https://payungmadinah.id/syarat-ketentuan',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Syarat & Ketentuan',
         }
      ]
   });
});

module.exports = router;