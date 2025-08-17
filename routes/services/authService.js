const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const bcrypt = require('bcrypt');

// POST /admin/login
router.post('/', (req, res) => {
  const { credential, password } = req.body;

  // Check if both fields are provided
  if (!credential || !password) {
    req.session.loggedin = false;
    req.session.messageAuth = 'Please provide both credential and password';
    return res.redirect('/admin');
  }

  // Query user by credential
  const query = "SELECT id,role,created_at,updated_at,password FROM users WHERE credential = ?";
  connection.query(query, [credential], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      req.session.loggedin = false;
      req.session.messageAuth = 'Internal Server Error';
      return res.redirect('/');
    }

    // Check if user exists
    if (results.length === 0) {
      req.session.loggedin = false;
      req.session.messageAuth = 'Wrong Credential / Password. Try again';
      return res.redirect('/');
    }

    const hash = results[0].password;
    const isPasswordMatch = bcrypt.compareSync(password, hash);

    if (isPasswordMatch) {
      // Set session for logged-in user
      req.session.loggedin = true;
      req.session.credential = credential;
      req.session.messageAuth = 'Login Success';
      req.session.userId = results[0].id;
      req.session.userRole = results[0].role;
      req.session.createdAt = results[0].created_at;
      req.session.updatedAt = results[0].updated_at;
    } else {
      req.session.loggedin = false;
      req.session.messageAuth = 'Wrong Credential / Password. Try again';
    }

    return res.redirect('/');
  });
});

// GET /admin/logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
    }
    res.redirect('/');
  });
});

module.exports = router;
