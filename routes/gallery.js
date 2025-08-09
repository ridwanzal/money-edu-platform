const express = require("express");
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get("/", function (req, res, next) {
	res.render("pages/gallery", {
		messageContact: req.session.messageContact,
		title: "Galeri - Payung Madinah",
		type: "website",
		author: "Payung Madinah",
		description: "Galeri",
		canonical: "https://payungmadinah.id/galeri",
		keywords:
			"Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula",
		breadcrumbs: [
			{
				name: "Home",
				link: "/",
			},
			{
				name: "Galeri",
				link: "/galeri",
			},
		],
	});
});

module.exports = router;
