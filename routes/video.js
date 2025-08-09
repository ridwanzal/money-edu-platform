const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

const parser = new Parser();
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCE6Tp0JEZ6THr24ny5i-jfg';

router.get('/', async function (req, res) {
    try {
        const feed = await parser.parseURL(FEED_URL);

        const videos = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            videoId: item.id.replace('yt:video:', '') // Extract YouTube video ID
        }));

        res.render('pages/video', {
            title: 'Video List - E-Ibu Cerdas',
            description: 'Kumpulan video edukasi dan inspirasi dari E-Ibu Cerdas.',
            videos
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch YouTube feed');
    }
});

module.exports = router;
