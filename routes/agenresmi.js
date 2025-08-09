const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();
const blogsData = require('../public/json/blogsData');

router.get('/', function (req, res) {
   res.render('pages/agenresmi', {
      title: 'Jadi Agen Resmi - Payung Madinah',
      type: "article",
      canonical: 'https://payungmadinah.id/agen-resmi',
      author: 'Payung Madinah',
      type: "article",
      description: 'Spesialis Umroh Plus, Umroh Al Ula, Dubai, Turki, Thaif',
      keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Agen Resmi Payung Madinah', link: '/agen-resmi' }
      ],
      blogs: blogsData.slice().reverse(),
   });
});

module.exports = router;
