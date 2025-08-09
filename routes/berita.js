const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const { last } = require('lodash');
const Parser = require('rss-parser');

const parser = new Parser();
// List all feed URLs you want to pull from
const FEED_URLS = [
    'https://www.cnbcindonesia.com/rss', // Example: finance news
    // add more as needed
];

router.get('/', async function (req, res) {
    try {
        const allFeeds = [];

        // Fetch each feed in parallel
        const feedResults = await Promise.all(
            FEED_URLS.map(url => parser.parseURL(url).catch(err => {
                console.error(`Error fetching ${url}`, err);
                return null; // Avoid breaking on one error
            }))
        );

        // Flatten all feeds
        feedResults.forEach(feed => {
            if (feed && feed.items) {
                feed.items.forEach(item => {
                    allFeeds.push({
                        source: feed.title || 'Unknown Source',
                        title: item.title,
                        link: item.link,
                        pubDate: new Date(item.pubDate),
                        contentSnippet: item.contentSnippet || '',
                        isoDate: item.isoDate || null
                    });
                });
            }
        });

        // Sort by date (newest first)
        allFeeds.sort((a, b) => b.pubDate - a.pubDate);

        // Render HTML page
        res.render('pages/blog', {
            messageContact: req.session.messageContact,
            title: 'E-Ibu Cerdas',
            type: 'website',
            canonical: 'E-Ibu Cerdas',
            author: 'E-Ibu Cerdas',
            description: 'E-Ibu Cerdas adalah platform edukasi dan investasi yang membantu ibu-ibu cerdas dalam mengelola keuangan keluarga.',
            keywords: 'E-Ibu Cerdas, Investasi, Edukasi',
            articles: allFeeds,
            breadcrumbs: [
                { name: 'Home', link: '/' },
                { name: 'Kontak', link: '/kontak' }
            ]
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch feeds');
    }
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
