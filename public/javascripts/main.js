window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;
window.baseURL = $("body").data("baseurl");
window.fullURL = $("body").data("fullurl");

var core = {
	init: function () {
		this.lazyloading();
		AOS.init();
	},
	lazyloading: function () {
		lazySizes.init();
	},
};

$(function () {
	// Hide on normal load
	// Show preloader when clicking internal links
	document.addEventListener('click', function (e) {
		const link = e.target.closest('a');
		if (link && link.href && link.origin === location.origin && !link.hasAttribute('target')) {
			e.preventDefault();
			window.location.href = link.href;
		}
	});


	core.init();
	$(window).on("scroll", function (e) {
		var scroll = $(this).scrollTop();
		if (scroll > $(".masthead__nav").outerHeight()) {
			// scrolling
			$("body").css("padding-top", $(".masthead__nav").outerHeight());
			$(".js-nav-container").addClass("sticky");
			$(".js-cta").removeClass("hide");
			$(".ttw").hide();
			$(".ttd").show();
			$(".js-nav").find(".nav-link").removeClass("text-white");
		} else {
			$("body").css("padding-top", 0);
			$(".js-nav-container").removeClass("sticky");
			$(".js-cta").addClass("hide");
			$(".llight").removeClass("d-none");
			$(".ttw").show();
			$(".ttd").hide();
			$(".js-nav").find(".nav-link").addClass("text-white");
		}
	});

	$(".js-match-height").matchHeight();

	$(document).ready(function () {
		let lastScrollTop = 0;

		$(window).scroll(function () {
			let currentScrollTop = $(this).scrollTop();

			lastScrollTop = currentScrollTop;

			if ($(this).scrollTop() > 50) {
				$(".navbar").addClass("navbar-scrolled");
				$(".navbar").addClass("whitebg");
			} else {
				$(".navbar").removeClass("navbar-scrolled");
				if (window.location.pathname == "/") {
					$(".navbar").removeClass("whitebg");
				}
			}
		});

		$(".navbar-toggler").on("click", function () {
			setTimeout(function () {
				$(".nav-link").each(function (index) {
					$(this).addClass("show");
				});
			}, 200);
		});

		$(".navbar-collapse").on("hidden.bs.collapse", function () {
			$(".nav-link").removeClass("show");
		});

		$(".js-megamenu").on("mouseenter", function () {
			$(".umroh-listing").stop(true, true).fadeIn(200);
		});

		$(".js-megamenu, .umroh-listing").on("mouseleave", function () {
			setTimeout(function () {
				if (
					!$(".js-megamenu:hover").length &&
					!$(".umroh-listing:hover").length
				) {
					$(".umroh-listing").stop(true, true).fadeOut(200);
				}
			}, 100);
		});
	});

	lightbox.option({
		resizeDuration: 200,
		wrapAround: true,
	});

	let $widget = $(".js-wa-widget");
	$(".js-whatsapp-float").on("click", function () {
		if ($widget.is(":visible")) {
			$widget.css({
				display: "none",
				"z-index": -1,
			});
		} else {
			$widget.css({
				display: "block",
				"z-index": 6,
			});
		}
	});

	$(".js-wa-back").on("click", function () {
		$widget.css({
			display: "none",
			"z-index": -1,
		});
	});

	$(".form-title-blog").on("input", function () {
		var title = $(this).val();
		var slug = title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");

		$(".form-slug-blog").val(slug);
	});

	$(".js-campaign-contact").on("click", function (e) {
		const campaignName = $(this)
			.closest(".campaign-pict")
			.find("h6")
			.text()
			.trim();
		const campaignContext = $(this)
			.closest(".campaign-pict")
			.find("p")
			.text()
			.trim();

		$.ajax({
			url: window.baseURL + "/services/campaign/add",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				context: campaignContext,
				name: campaignName,
			}),
			success: function (res) {
				console.log("Campaign interaction saved:", res);
			},
			error: function (xhr, status, error) {
				console.error("Error saving campaign:", error);
			},
		});
	});

	$('.js-article-title').on('input', function () {
		const title = $(this).val();
		const slug = title
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')     // hapus karakter aneh
			.replace(/\s+/g, '-')         // ganti spasi dengan -
			.replace(/--+/g, '-')         // ganti double dash jadi satu
			.replace(/^-+|-+$/g, '');     // hapus dash di awal/akhir

		$('.form-slug-Artikel').val(slug);
	});

	new Swiper(".marquee-swiper", {
		slidesPerView: "auto",
		loop: true,
		loopAdditionalSlides: 10,
		speed: 5000,
		autoplay: {
			delay: 1,
			disableOnInteraction: false,
		},
		freeMode: true,
		freeModeMomentum: false,
		grabCursor: false,
	});

	function filterJobs() {
		var keyword = $(".js-karir-search").val().toLowerCase();
		var selectedEdu = $(".js-karir-jenjang").val().toLowerCase();
		var selectedLoc = $(".js-karir-domisili").val().toLowerCase();

		$(".karir-list .card-post").each(function () {
			var $card = $(this);
			var title = $card.data("title").toLowerCase();
			var edu = $card.data("edu").toLowerCase();
			var loc = $card.data("location").toLowerCase();

			var matchKeyword = keyword === "" || title.includes(keyword);
			var matchEdu =
				selectedEdu === "-- pilih jenjang" || edu.includes(selectedEdu);
			var matchLoc =
				selectedLoc === "-- pilih domisili" || loc.includes(selectedLoc);

			if (matchKeyword && matchEdu && matchLoc) {
				$card.closest(".col").show();
			} else {
				$card.closest(".col").hide();
			}
		});
	}

	$(".js-karir-search").on("input", filterJobs);
	$(".js-karir-jenjang, .js-karir-domisili").on("change", filterJobs);

	var swiper = new Swiper(".swiperTeam", {
		loop: true,
		spaceBetween: 10,
		slidesPerView: 6,
		freeMode: true,
		autoplay: {
			delay: 5200,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		breakpoints: {
			378: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 16,
			},
		},
	});

	var swiper2 = new Swiper(".swiperTeam2", {
		loop: true,
		spaceBetween: 10,
		autoplay: {
			delay: 5200,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});

	function animateCounter(selector, target) {
		$({ Counter: 0 }).animate(
			{ Counter: target },
			{
				duration: 1500,
				easing: "swing",
				step: function (now) {
					$(selector).text(Math.floor(now));
				},
			}
		);
	}

	// Homepage counters
	animateCounter(".js-counter-1", 423);
	animateCounter(".js-counter-2", 8000);
	animateCounter(".js-counter-3", 20);
	animateCounter(".js-counter-4", 50);

	// About page counters
	animateCounter(".js-counterabout-1", 1500);
	animateCounter(".js-counterabout-2", 10);
	animateCounter(".js-counterabout-3", 20);
	animateCounter(".js-counterabout-4", 5);

	let lastScrollTop = 0;

	$(window).on("scroll", function () {
		let currentScroll = $(this).scrollTop();
		$('.navbar-toggler').addClass('collapsed');
		$('.navbar-collapse').removeClass('show');
		lastScrollTop = currentScroll;
	});


	$('#thumbnails').on('change', function () {
		const preview = $('#preview');
		preview.empty();

		$.each(this.files, function (index, file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const img = $('<img>', {
					src: e.target.result,
					class: 'rounded border me-2 mb-2',
					css: { height: '100px' }
				});
				preview.append(img);
			};
			reader.readAsDataURL(file);
		});
	});

	$('#table-pendaftar').DataTable();

	let $carousel = $('.carousel');
	let $slides = $carousel.children();
	let index = 0;

	function showSlide(i) {
		$carousel.css('transform', `translateX(-${i * 100}%)`);
	}

	function nextSlide() {
		index = (index + 1) % $slides.length;
		showSlide(index);
	}

	$carousel.css({
		display: 'flex',
		transition: 'transform 0.5s ease'
	});
	$slides.css({
		flex: '0 0 100%'
	});

	setInterval(nextSlide, 3000);

	// End Initialize
	document.addEventListener('input', e => {
		if (e.target.id !== 'searchInput') return;

		const filter = e.target.value.trim().toLowerCase();
		const cards = document.querySelectorAll('#videoList .video-card');

		cards.forEach(card => {
			const titleEl = card.querySelector('.card-title');
			if (!titleEl) return;
			const title = titleEl.textContent.toLowerCase();
			card.style.display = title.includes(filter) ? '' : 'none';
		});
	});

	const pdfButtons = document.querySelectorAll('.pdf-open-btn');
	const pdfViewer = document.getElementById('pdfViewer');

	pdfButtons.forEach(button => {
		button.addEventListener('click', () => {
			const pdfPath = button.getAttribute('data-pdf');
			pdfViewer.src = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(pdfPath);
		});
	});

	if ($('#pdfModal').length) {
		document.getElementById('pdfModal').addEventListener('hidden.bs.modal', () => {
			pdfViewer.src = '';
		});
	}
});