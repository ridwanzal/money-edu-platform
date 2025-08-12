const express = require('express');
const router = express.Router();

// Store JSON in memory (hardcoded for now, could load from file once)
const pdfList = [
  {
    id: 1,
    title: "Economic Report 2024",
    pdfPath: "/pdf/laporan1.pdf"
  },
  {
    id: 2,
    title: "Stock Market Overview Q2",
    pdfPath: "/pdf/laporan2.pdf"
  },
  {
    id: 3,
    title: "Macroeconomic Trends",
    pdfPath: "/pdf/laporan3.pdf"
  }
];

// Render page
router.get('/', function (req, res) {
  res.render('pages/modul', {
    messageContact: req.session.messageContact,
    title: 'E-Ibu Cerdas',
    type: 'website',
    canonical: 'E-Ibu Cerdas',
    author: 'E-Ibu Cerdas',
    description: 'E-Ibu Cerdas adalah platform edukasi dan investasi yang membantu ibu-ibu cerdas dalam mengelola keuangan keluarga.',
    keywords: 'E-Ibu Cerdas, Investasi, Edukasi',
    breadcrumbs: [
      { name: 'Home', link: '/' },
      { name: 'Kontak', link: '/kontak' }
    ],
    pdfList // pass JSON data to template
  });
});

// Optional: provide JSON API endpoint
router.get('/list', (req, res) => {
  res.json(pdfList);
});

module.exports = router;
