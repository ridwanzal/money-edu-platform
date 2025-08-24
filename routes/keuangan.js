const express = require('express');
const { link } = require('fs');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', async function (req, res, next) {
  try {
    // Ambil list semua catatan
    const [rows] = await promisePool.query(
      "SELECT * FROM keuangan ORDER BY tanggal DESC"
    );

    // Ambil summary
    const [summaryRows] = await promisePool.query(
      `SELECT 
         COALESCE(SUM(CASE WHEN tipe = 'pemasukan' THEN jumlah ELSE 0 END), 0) AS total_pemasukan,
         COALESCE(SUM(CASE WHEN tipe = 'pengeluaran' THEN jumlah ELSE 0 END), 0) AS total_pengeluaran,
         COALESCE(SUM(CASE WHEN tipe = 'pemasukan' THEN jumlah ELSE -jumlah END), 0) AS saldo
       FROM keuangan`
    );

    const summary = summaryRows[0]; // ambil row pertama

    res.render('pages/keuangan', {
      messageContact: req.session.messageContact,
      title: 'E-Ibu Cerdas',
      type: 'website',
      canonical: 'E-Ibu Cerdas',
      author: 'E-Ibu Cerdas',
      description:
        'E-Ibu Cerdas adalah platform edukasi dan investasi yang membantu ibu-ibu cerdas dalam mengelola keuangan keluarga.',
      keywords: 'E-Ibu Cerdas, Investasi, Edukasi',
      breadcrumbs: [
        { name: 'Home', link: '/' },
        { name: 'Keuangan', link: '/keuangan' },
      ],

      keuangan: rows,
      summary, // <-- kirim ke view
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
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