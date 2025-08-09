const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/service', {
      title: 'Services - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
         }
      ]
   });
});

router.get('/landing-page', function (req, res, next) {
   res.render('pages/service-landingpage', {
      title: 'Landing Page - Services - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/landingpage',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Landing Page',
         }
      ]
   });
});

router.get('/business-website', function (req, res, next) {
   res.render('pages/service-business-website', {
      title: 'Business Website - Services - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/business-website',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Business Website',
         }
      ]
   });
});

router.get('/cms-website', function (req, res, next) {
   res.render('pages/service-cms', {
      title: 'CMS Website - Services - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/cms-website',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'CMS Website',
         }
      ]
   });
});


router.get('/ui-ux', function (req, res, next) {
   res.render('pages/service-uiux', {
      title: 'UI/UX Design Web dan Mobile - Layanan - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/ui-ux',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'UI/UX Design Web dan Mobile',
         }
      ]
   });
});

router.get('/logo', function (req, res, next) {
   res.render('pages/service-logo', {
      title: 'Logo & Brand Kit Design - Layanan - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/logo',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Logo & Brand Kit Design',
         }
      ]
   });
});

router.get('/web-slicing', function (req, res, next) {
   res.render('pages/service-slicing', {
      title: 'Web Slicing - Services - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/web-slicing',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Web Slicing',
         }
      ]
   });
});

router.get('/mobile', function (req, res, next) {
   res.render('pages/service-mobile', {
      title: 'Mobile - Layanan - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/mobile',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Mobile',
         }
      ]
   });
});

router.get('/advertising-media', function (req, res, next) {
   res.render('pages/service-advertising-media', {
      title: 'Mobile - Layanan - Payung Madinah',
      author: 'Payung Madinah',
      type: "website",
      canonical: 'https://payungmadinah.id/layanan/mobile',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Advertising Media',
         }
      ]
   });
});

router.get('/bi-analytics', function (req, res, next) {
   res.render('pages/service-bi-analytics', {
      title: 'Business Intelligence and Data Analytics Services - Layanan - Payung Madinah',
      author: 'Payung Madinah',
      canonical: 'https://payungmadinah.id/layanan/mobile',
      description: 'Jasa bangun Landing Page, Business Website, CMS Website, UI/UX Design, Brand Identity Design, Web Slicing, Mobile App Development',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Services',
            link: '/layanan'
         },
         {
            name: 'Business Intelligence and Data Analytics Services',
         }
      ]
   });
});

module.exports = router;