const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/kebijakan-privasi', {
      title: 'Kebijakan Privasi - Payung Madinah',
      type: "website",
      canonical: 'https://payungmadinah.id/kebijakan-privasi',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Kebijakan Privasi',
         }
      ]
   });
});

module.exports = router;