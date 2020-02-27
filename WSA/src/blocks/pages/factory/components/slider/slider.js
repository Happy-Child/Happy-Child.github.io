// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
const windowLoad = require("%helpers%/window-load.js");
const breakpoints = require("%helpers%/breakpoints.js");
const isDesktop = require("%helpers%/is-desktop.js");
const isIE = require("%helpers%/is-ie.js");
const isEdge = require("%helpers%/is-edge.js");
const cleanFieldsForms = require("%helpers%/clean-fields-forms.js");
const inputFilter = require("%helpers%/input-filter.js");
const debounce = require("%helpers%/debounce.js");
const loadImages = require("%helpers%/load-images.js");
// -- Helpers END


// -- Libraries BEGIN
import swiper from "swiper";
// -- Libraries END


windowLoad(function() {

	const sliderData = {
		element: $(".factory__slider"),
		elementOffsetTop: $(".factory__slider").offset().top,
		arrows: {
			all: $(".factory .slider-arrows__arrow_next"),
			prev: $(".factory .slider-arrows__arrow_prev"),
			next: $(".factory .slider-arrows__arrow_next"),
		},
		pagination: $(".factory__slider-pagination"),
	};

	const swiperData = {
		spaceBetween: 30,
		speed: 800,
		loop: false,
		slidesPerView: 1,
		autoHeight: true,
		navigation: {
			prevEl: sliderData.arrows.prev,
			nextEl: sliderData.arrows.next,
		},
		breakpoints: {
		// when window width is <= 1300px
			1300: {
				pagination: {
					el: sliderData.pagination,
					type: "bullets",
					clickable: true
				},
			},
		}
	};

	// -- Functions BEGIN
	const scrollToUp = () => {
		$("html, body").animate({
			scrollTop: sliderData.elementOffsetTop - 60
		}, 800);
	};

	const customLoadImages = (index) => {
		const curSlide = $(".factory__slider-slide").eq(index);
		const curImages = curSlide.find(".factory__slider-slide-wrap-image .factory__slider-slide-image");

		loadImages(curImages)
	};
	customLoadImages(0);

	const sliderInit = () => {
		const swiperInit = new swiper(sliderData.element, swiperData);

		swiperInit.on("init slideChange", function () {
			customLoadImages(this.realIndex);

			if ($(window).width() < 1300) scrollToUp();
		});
	};
	// -- Functions END


	if (sliderData.element.length) sliderInit();

});

