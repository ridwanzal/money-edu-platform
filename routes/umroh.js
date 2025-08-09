const express = require('express');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const [umrohList] = await promisePool.query('SELECT * FROM umroh ORDER BY created_at DESC');

      res.render('pages/umroh-list2', {
         title: 'Beranda - Payung Madinah',
         type: 'website',
         canonical: 'https://payungmadinah.id/',
         author: 'Payung Madinah',
         description: 'Wujudkan impian Umroh Anda bersama Payung Madinah...',
         keywords: 'Umroh Plus, Payung Madinah, Travel Umroh Terpercaya',
         breadcrumbs: [
            { name: 'Home', link: '/' }
         ],
         umrohList,
      });

   } catch (err) {
      console.error('Query error:', err);
      res.status(500).send('Database error');
   }
});

router.get('/list', function (req, res) {
   const filter = req.query.filter;
   res.render('pages/umroh-list', {
      title: 'Daftar Paket Umroh - Payung Madinah',
      type: "article",
      canonical: 'https://payungmadinah.id/umroh',
      author: 'Payung Madinah',
      description: 'Spesialis Umroh Plus Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
      keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Umroh', link: '/umroh' }
      ],
      umrohList: umrohList
   });
});

router.get('/:slug', function (req, res) {
   const slug = req.params.slug;

   connection.query('SELECT * FROM umroh WHERE slug = ?', [slug], function (err, results) {
      if (err) throw err;
      if (!results.length) return res.status(404).render('404');

      const blog = results[0];

      connection.query('SELECT * FROM umroh WHERE slug != ? ORDER BY created_at DESC LIMIT 5', [slug], function (err, otherResults) {
         if (err) throw err;
         const blog_other = otherResults;

         connection.query('SELECT * FROM umroh ORDER BY id DESC LIMIT 1', [slug], function (err, lastArticle) {
            if (err) throw err;

            const blog_last = lastArticle;

            res.render('pages/umroh-detail', {
               umroh: blog,
               umroh_other: blog_other,
               umroh_last: blog_last
            });
         })
      });
   });
});

module.exports = router;
