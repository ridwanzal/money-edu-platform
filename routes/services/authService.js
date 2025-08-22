const express = require('express');
const router = express.Router();
const { promisePool } = require('../../config/db');
const { connection } = require('../../config/db');
const bcrypt = require('bcrypt');

// POST /auth/login
router.post('/', (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    req.session.flash = { type: 'error', message: "Please provide both credential and password" };
    return res.redirect('/auth/');
  }

  const query = "SELECT id, role, created_at, updated_at, password FROM users WHERE credential = ?";
  connection.query(query, [credential], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      req.session.flash = { type: 'error', message: "Internal Server Error" };
      return res.redirect('/auth/');
    }

    if (results.length === 0) {
      req.session.flash = { type: 'error', message: "Wrong Credential / Password. Try again" };
      return res.redirect('/auth/');
    }

    const user = results[0];
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      req.session.flash = { type: 'error', message: "Wrong Credential / Password. Try again" };
      return res.redirect('/auth/');
    }

    // ✅ success
    req.session.loggedin = true;
    req.session.credential = credential;
    req.session.userId = user.id;
    req.session.userRole = user.role;
    req.session.createdAt = user.created_at;
    req.session.updatedAt = user.updated_at;
    req.session.flash = { type: 'success', message: "Login Success" };
    req.session.flash = { type: 'success', message: "Login successful. <a href='/auth'>Please log in.</a>" };
    return res.redirect('/'); // ✅ after login → home/dashboard
  });
});


// POST /auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    req.session.flash = { type: 'error', message: "All fields are required." };
    return res.redirect('/auth/register');
  }

  if (password !== confirmPassword) {
    req.session.flash = { type: 'error', message: "Passwords do not match." };
    return res.redirect('/auth/register');
  }

  try {
    // check if email already exists
    const [rows] = await connection.promise().query(
      "SELECT id FROM users WHERE email = ? OR credential = ?",
      [email, email]
    );
    if (rows.length > 0) {
      req.session.flash = { type: 'error', message: "Email already registered." };
      return res.redirect('/auth/register');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const now = new Date();
    await connection.promise().query(
      `INSERT INTO users 
       (credential, name, email, password, password_plain, role, gender, age, profession, phone_number, address, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,        // credential = email
        name,
        email,
        hashedPassword,
        password,
        "user",       // default role
        "unknown",
        0,
        "-",
        "0",
        "-",
        now,
        now
      ]
    );

    req.session.flash = { type: 'success', message: "Registration successful. <a href='/auth'>Please log in.</a>" };
    return res.redirect('/auth/register'); // ✅ after register → login page

  } catch (err) {
    console.error("Registration error:", err);
    req.session.flash = { type: 'error', message: "Internal Server Error." };
    return res.redirect('/auth/register');
  }
});


module.exports = router;
