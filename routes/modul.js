const express = require('express');
const { link } = require('fs');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
router.get('/', function (req, res, next) {
   res.render('pages/modul', {
      messageContact: req.session.messageContact,
      title: 'E-Ibu Cerdas',
      type: 'website',
      canonical: 'E-Ibu Cerdas',
      author: 'E-Ibu Cerdas',
      description: 'E-Ibu Cerdas adalah platform edukasi dan investasi yang membantu ibu-ibu cerdas dalam mengelola keuangan keluarga.',
      keywords: 'E-Ibu Cerdas, Investasi, Edukasi',
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