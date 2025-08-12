require('dotenv').config();
require('./utils/hbsutils');

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const connection = require('./config/db');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
require('dayjs/locale/id');

// Routers - Pages
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/berita');
const adminRouter = require('./routes/admin');
const profileRouter = require('./routes/profile');
const investasiRouter = require('./routes/investasi');
const videoRouter = require('./routes/video');
const modulRouter = require('./routes/modul');

// Routers - API / Services
const authSers = require('./routes/services/authService');
const servSers = require('./routes/services/contactService');
const uploadSers = require('./routes/services/uploadService');
const blogSers = require('./routes/services/blogService');
const campaignSers = require('./routes/services/campaignService');
const umrohSers = require('./routes/services/umrohService');
const umrohGratisSers = require('./routes/services/umrohgratisService');
const gallerySers = require('./routes/services/galleryService');

const app = express();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('id');

// Setup view engine
app.use('/pdf', express.static(__dirname + '/public/pdf'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy', true);

// Session configuration
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

app.use(session({
  store: sessionStore,
  secret: 'hjkasdas239jasdhjkaskyuas',
  resave: false,
  saveUninitialized: true,
  name: 'Hahsdgiu1209-zalvice-sdaw3',
  cookie: { maxAge: 12 * 60 * 60 * 1000 } // 30 minutes
}));

// Global middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.disable('etag');
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 86400000 * 30,
  etag: false,
}));

// Middleware to inject session values into views
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.locals.loggedin = req.session.loggedin || false;
  res.locals.credential = req.session.credential || null;
  res.locals.userId = req.session.userId || null;
  res.locals.userRole = req.session.userRole || null;
  res.locals.currentPath = req.path;
  res.locals.success = req.session.success;
  res.locals.error = req.session.error;
  delete req.session.success;
  delete req.session.error;

  const protocol = req.protocol; // respects 'X-Forwarded-Proto' if 'trust proxy' is set
  const host = req.get('host');

  if (process.env.APP_ENV === 'production') {
    res.locals.fullUrl = 'https' + `://${host}${req.originalUrl}`;
    res.locals.baseUrl = 'https' + `://${host}`;
  } else {
    res.locals.fullUrl = `${protocol}://${host}${req.originalUrl}`;
    res.locals.baseUrl = `${protocol}://${host}`;
  }

  next();
});


// Image caching
app.use('/images', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  next();
});
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Multer uploader
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });
app.post('/uploader', upload.single('fileme'), (req, res) => {
  const filename = req.file.filename;
  const query = `INSERT INTO uploads (filename) VALUES (?)`;
  connection.query(query, [filename], (err) => {
    if (err) throw err;
    res.redirect('/admin/uploader');
  });
});

// Frontpage routes
app.use('/', indexRouter);
app.use('/berita', blogRouter);
app.use('/profile', profileRouter);
app.use('/investasi', investasiRouter);
app.use('/video', videoRouter);
app.use('/modul', modulRouter);

// Backpage routes
app.use('/admin', adminRouter);

// Service routes
app.use('/services/auth', authSers);
app.use('/services/contact', servSers);
app.use('/services/upload', uploadSers);
app.use('/services/blog', blogSers);
app.use('/services/campaign', campaignSers);
app.use('/services/umroh', umrohSers);
app.use('/services/umrohgratis', umrohGratisSers);

// Serve /pdfjs (PDF.js files)
app.use('/pdfjs', express.static(path.join(__dirname, 'public/pdfjs')));

// Serve /pdf (PDF files)
app.use('/pdf', express.static(path.join(__dirname, 'public/pdf')));

// Optional: handle /pdf without starting slash in ?file parameter
app.get('/pdf/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'public/pdf', req.params.filename);
  res.sendFile(filePath);
});

// 404 Not Found
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    notFound: true,
    message: 'The page you are looking for does not exist.'
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error');
});

module.exports = app;
