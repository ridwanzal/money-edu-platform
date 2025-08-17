const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const bcrypt = require('bcrypt');

// POST
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


//POST 
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    req.session.error = "All fields are required.";
    return res.redirect('/register');
  }

  if (password !== confirmPassword) {
    req.session.error = "Passwords do not match.";
    return res.redirect('/register');
  }

  try {
    // check if email already exists
    const [rows] = await connection.promise().query(
      "SELECT id FROM users WHERE email = ? OR credential = ?",
      [email, email]
    );
    if (rows.length > 0) {
      req.session.error = "Email already registered.";
      return res.redirect('/register');
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert new user (adjust to your schema)
    const now = new Date();
    await connection.promise().query(
      `INSERT INTO users 
       (credential, name, email, password, role, gender, age, profession, phone_number, address, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        name, // credential
        email,
        hashedPassword,
        "user",   // default role
        "unknown", // gender default
        0,         // age default
        "",        // profession
        0,         // phone_number
        "",        // address
        now,
        now
      ]
    );

    req.session.success = "Registration successful. Please log in.";
    return res.redirect('/auth/register');

  } catch (err) {
    console.error("Registration error:", err);
    req.session.error = "Internal Server Error.";
    return res.redirect('/auth/register');
  }
});

// GET 
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
    }
    res.redirect('/');
  });
});

module.exports = router;
