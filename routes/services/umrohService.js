const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle');

router.post('/add', upload.single('thumbnail'), (req, res) => {
  const {
    name,
    subtitle,
    tanggal,
    total_hari,
    jenis_penerbangan,
    maskapai,
    hotel_makkah,
    hotel_madinah,
    hotel_makkah_star,
    hotel_madinah_star,
    paket,
    harga,
    deskripsi,
    tagline,
    starting_from,
    slug,
    created_at,
    updated_at
  } = req.body;

  const finalSlug = slug && slug.trim()
  ? slug.trim()
  : name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const file = req.file;
  if (
    !file || !name || !subtitle || !tanggal || !total_hari || !jenis_penerbangan || !maskapai || !hotel_makkah ||
    !hotel_madinah || !hotel_makkah_star || !hotel_madinah_star || !paket || !harga ||
    !deskripsi || !tagline || !starting_from
  ) {
    return res.status(400).json({ error: 'Semua field wajib diisi.' });
  }

  const sql = `
    INSERT INTO umroh (
      name, subtitle, thumbnail, tanggal, total_hari, jenis_penerbangan, maskapai, hotel_makkah,
      hotel_madinah, hotel_makkah_star, hotel_madinah_star, paket, harga, deskripsi,
      tagline, starting_from, slug, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    name, subtitle, file.filename, tanggal, total_hari, jenis_penerbangan, maskapai, hotel_makkah,
    hotel_madinah, hotel_makkah_star, hotel_madinah_star, paket, harga, deskripsi,
    tagline, starting_from, finalSlug, Date.now(), Date.now()
  ];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: err });
    }
    res.redirect('/admin/umroh?umroh=added');
  });
});

router.post('/edit/:id', upload.single('thumbnail'), (req, res) => {
  const { id } = req.params;
  const {
    name,
    subtitle,
    tanggal,
    total_hari,
    jenis_penerbangan,
    maskapai,
    hotel_makkah,
    hotel_madinah,
    hotel_makkah_star,
    hotel_madinah_star,
    paket,
    harga,
    deskripsi,
    tagline,
    starting_from,
    created_at,
    updated_at
  } = req.body;

  const file = req.file;
  if (
    !name || !subtitle || !tanggal || !total_hari || !jenis_penerbangan || !maskapai || !hotel_makkah ||
    !hotel_madinah || !hotel_makkah_star || !hotel_madinah_star || !paket || !harga ||
    !deskripsi || !tagline || !starting_from
  ) {
    return res.status(400).json({ error: 'Semua field wajib diisi.' });
  }

  const fields = [
    'name = ?',
    'subtitle = ?',
    'tanggal = ?',
    'total_hari = ?',
    'jenis_penerbangan = ?',
    'maskapai = ?',
    'hotel_makkah = ?',
    'hotel_madinah = ?',
    'hotel_makkah_star = ?',
    'hotel_madinah_star = ?',
    'paket = ?',
    'harga = ?',
    'deskripsi = ?',
    'tagline = ?',
    'starting_from = ?',
    'created_at = ?',
    'updated_at = ?'
  ];
  const values = [
    name,
    subtitle,
    tanggal,
    total_hari,
    jenis_penerbangan,
    maskapai,
    hotel_makkah,
    hotel_madinah,
    hotel_makkah_star,
    hotel_madinah_star,
    paket,
    harga,
    deskripsi,
    tagline,
    starting_from,
    Date.now(),
    Date.now()
  ];

  if (file && file.filename) {
    fields.unshift('thumbnail = ?');
    values.unshift(file.filename);
  }

  values.push(id);

  const sql = `UPDATE umroh SET ${fields.join(', ')} WHERE id = ?`;

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Gagal mengedit paket umroh.' });
    }
    res.redirect('/admin/umroh?umroh=edited');
  });
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM umroh WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Gagal menghapus paket umroh.' });
    }
    res.redirect('/admin/umroh?umroh=deleted');
  });
});

module.exports = router;