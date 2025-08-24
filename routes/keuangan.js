const express = require('express');
const { link } = require('fs');
const router = express.Router();

router.get('/', function (req, res, next) {
   res.render('pages/keuangan', {
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
            name: 'Keuangan',
            link: '/keuangan'
         }
      ]
   });
});

router.get('/add', function (req, res, next) {
   res.render('pages/keuangan-add', {
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
            name: 'Keuangan',
            link: '/keuangan'
         }
      ]
   });
});

module.exports = router;