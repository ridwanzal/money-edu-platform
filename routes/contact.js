const express = require('express');
const { link } = require('fs');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
router.get('/', function (req, res, next) {
   res.render('pages/contact', {
      messageContact: req.session.messageContact,
      title: 'Visit Office - Payung Madinah',
      type: "website",
      author: 'Payung Madinah',
      description: 'Visit Office',
      canonical: 'https://payungmadinah.id/kontak',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Kontak',
            link: '/kontak'
         }
      ]
   });
});

module.exports = router;