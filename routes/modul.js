const express = require('express');
const router = express.Router();

// Store JSON in memory (hardcoded for now, could load from file once)
const pdfList = [
  {
    id: 1,
    title: "Modul 1. Misi Ibu Cerdas Di Era Digital.pdf",
    pdfPath: "/pdf/Modul 1. Misi Ibu Cerdas Di Era Digital.pdf"
  },
  {
    id: 2,
    title: "Modul 2. Mengenal Literasi Keuangan Keluarga.pdf",
    pdfPath: "/pdf/Modul 2. Mengenal Literasi Keuangan Keluarga.pdf"
  },
  {
    id: 3,
    title: "Modul 3. Membedakan Kebutuhan atau Keinginan .pdf",
    pdfPath: "/pdf/Modul 3. Membedakan Kebutuhan atau Keinginan.pdf"
  },
  {
    id: 4,
    title: "Modul 4, Menyusun Anggaran dan Mencatat Keuangan.pdf",
    pdfPath: "/pdf/Modul 4, Menyusun Anggaran dan Mencatat Keuangan.pdf"
  },
  {
    id: 5,
    title: "Modul 5. Menabung dan Berinvestasi.pdf",
    pdfPath: "/pdf/Modul 5. Menabung dan Berinvestasi.pdf"
  },
  {
    id: 6,
    title: "Modul 6. Deteksi dini dan komunikasi keluarga (Teknik pendekatan suportif dan cara menghindari konflik saat menghadapi isu ini).pdf",
    pdfPath: "/pdf/Modul 6. Deteksi dini dan komunikasi keluarga (Teknik pendekatan suportif dan cara menghindari konflik saat menghadapi isu ini).pdf"
  },
  {
    id: 9,
    title: "Modul 9. Ibu sebagai agen keuangan positif dalam keluarga (Membangun peran edukatif dan cerita sukses ibu yang mengubah pola kauangan).pdf",
    pdfPath: "/pdf/Modul 9. Ibu sebagai agen keuangan positif dalam keluarga (Membangun peran edukatif dan cerita sukses ibu yang mengubah pola kauangan).pdf"
  },
  {
    id: 10,
    title: "Modul 10. Refleksi &  Rencana Aksi Keluarga Cerdas Finansial.pdf",
    pdfPath: "/pdf/Modul 10. Refleksi &  Rencana Aksi Keluarga Cerdas Finansial.pdf"
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
