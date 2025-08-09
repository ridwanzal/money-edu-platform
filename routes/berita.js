const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const { last } = require('lodash');

router.get('/', function (req, res) {
   const articleQuery = "SELECT * FROM blogs ORDER BY created_at DESC";

   connection.query(articleQuery, function (err, articleRows) {
      if (err) throw err;

         connection.query('SELECT * FROM blogs ORDER BY id DESC LIMIT 1', function (err, lastArticle) {
            if (err) throw err;
            const blog_last = lastArticle;

            res.render('pages/blog', {
               title: 'Blog - Payung Madinah',
               type: "article",
               canonical: 'https://payungmadinah.id/berita',
               author: 'Payung Madinah',
               description: 'Spesialis Umroh Plus Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
               keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
               breadcrumbs: [
                  { name: 'Home', link: '/' },
                  { name: 'Berita & Artikel', link: '/berita' }
               ],
               blogs: articleRows,
               blog_last: blog_last
            });
         });

   });
});


router.get('/:slug', function (req, res) {
   const slug = req.params.slug;

   connection.query('SELECT * FROM blogs WHERE slug = ?', [slug], function (err, results) {
      if (err) throw err;
      if (!results.length) return res.status(404).render('404');

      const blog = results[0];

      connection.query('SELECT * FROM blogs WHERE slug != ? ORDER BY created_at DESC LIMIT 5', [slug], function (err, otherResults) {
         if (err) throw err;
         const blog_other = otherResults;

         connection.query('SELECT * FROM blogs ORDER BY id DESC LIMIT 1', [slug], function (err, lastArticle) {
            if (err) throw err;

            const blog_last = lastArticle;

            res.render('pages/blog-detail', {
               blog: blog,
               blogs_other: blog_other,
               blog_last: blog_last
            });
         })
      });
   });
});


module.exports = router;
