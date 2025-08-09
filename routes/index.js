const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', async (req, res, next) => {
   try {
      res.render('index', {
         title: 'E-Ibu Cerdas',
         type: 'website',
         canonical: 'E-Ibu Cerdas',
         author: 'E-Ibu Cerdas',
         description: 'E-Ibu Cerdas adalah platform edukasi dan investasi yang membantu ibu-ibu cerdas dalam mengelola keuangan keluarga.',
         keywords: 'E-Ibu Cerdas, Investasi, Edukasi',
         breadcrumbs: [
            { name: 'Home', link: '/' }
         ],
      });

   } catch (err) {
      console.error('Query error:', err);
      res.status(500).send('Database error');
   }
});

module.exports = router;
