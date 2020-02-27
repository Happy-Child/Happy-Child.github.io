// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END

// -- Libraries BEGIN
import swiper from "swiper";
// -- Libraries END

documentReady(function() {
	const $sliders = $(".swiper-container");
	const $slidersSimple = $(".wrap-slider-simple");
	const $slidersRows = $(".wrap-slider-rows");
	const $slidersVideo = $(".wrap-slider-video");
	const $slidersReviews = $(".wrap-slider-reviews");
	const $slidersPartners = $(".wrap-slider-partners");
	const dataCommon = {
		spaceBetween: 30,
		slidesPerView: 3,
		speed: 600,
		breakpoints: {
			992: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			576: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		}
	};

	// -- Functions BEGIN
	const initPlayer = (element) => {
		const player = element.querySelector(".video-iframe");
		const button = element.querySelector('.video-play');

		const ytplayer = new YT.Player(player, {
			playerVars: {
				"autoplay": 0,
				"modestbranding": 1,
				"rel": 0,
			},
			videoId: element.dataset.id
		});

		button.addEventListener("click", function() {
			if (ytplayer.getPlayerState() === 1) ytplayer.stopVideo();
			else ytplayer.playVideo();
		});
	};

	const slidersWhile = () => {
		$slidersSimple.each(function () {
			const $curSlider = $(this);

			const arrowPrev = $(this).find(".slider__arrow_prev"),
				arrowNext = $(this).find(".slider__arrow_next");

			const data = Object.assign(dataCommon, {
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				}
			});

			const initSlider = new swiper($(this).find(".swiper-container"), data);
		});

		$slidersRows.each(function () {
			const sliderSecondary = $(this).find(".slider-secondary");
			const sliderMain = $(this).find(".slider-main");

			const arrowPrev = $(this).find(".slider__arrow_prev"),
				arrowNext = $(this).find(".slider__arrow_next"),
				pagination = $(this).find(".slider__pagination");

			const dataMain = Object.assign(dataCommon, {
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
			});

			const initSecondary = new swiper(sliderSecondary, dataCommon);
			const initMain = new swiper(sliderMain, dataMain);

			initSecondary.on("slideChange", function () {
				initMain.slideTo(this.realIndex);
			});

			initMain.on("slideChange", function () {
				initSecondary.slideTo(this.realIndex);
			});
		});

		$slidersVideo.each(function () {
			const arrowPrev = $(this).find(".slider__arrow_prev"),
				arrowNext = $(this).find(".slider__arrow_next"),
				pagination = $(this).find(".slider__pagination");

			const arrowPrevOther = $(this).find(".slider__wrap-nav_other .slider__arrow_prev"),
				arrowNextOther = $(this).find(".slider__wrap-nav_other .slider__arrow_next");

			const data = {
				slidesPerView: 1,
				spaceBetween: 30,
				speed: 600,
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				},
				breakpoints: {
					768: {
						navigation: {
							prevEl: arrowPrevOther,
							nextEl: arrowNextOther,
						},
					},
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
			};

			const initSlider = new swiper($(this).find(".swiper-container"), data);

			initSlider.on("slideChange", function () {
				const isVideo = initSlider.slides[initSlider.previousIndex].querySelector(".video-container");
				if (isVideo) YT.get(isVideo.querySelector("iframe").id).stopVideo();
			});
		});

		$slidersPartners.each(function () {
			const arrowPrev = $(this).find(".slider__arrow_prev"),
				arrowNext = $(this).find(".slider__arrow_next"),
				pagination = $(this).find(".slider__pagination");

			const arrowPrevOther = $(this).find(".slider__wrap-nav_other .slider__arrow_prev"),
				arrowNextOther = $(this).find(".slider__wrap-nav_other .slider__arrow_next");

			const data = {
				spaceBetween: 30,
				slidesPerView: 4,
				speed: 600,
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
				breakpoints: {
					992: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 3,
						navigation: {
							prevEl: arrowPrevOther,
							nextEl: arrowNextOther,
						},
					},
				}
			};

			const initSlider = new swiper($(this).find(".swiper-container"), data);
		});

		$slidersReviews.each(function () {
			const arrowPrev = $(this).find(".slider__arrow_prev"),
				arrowNext = $(this).find(".slider__arrow_next"),
				pagination = $(this).find(".slider__pagination");

			const data = {
				slidesPerView: 2,
				spaceBetween: 30,
				speed: 600,
				navigation: {
					prevEl: arrowPrev,
					nextEl: arrowNext,
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
				breakpoints: {
					992: {
						slidesPerView: 1,
					}
				}
			};

			new swiper($(this).find(".swiper-container"), data);
		});
	};
	// -- Functions END

	window.onYouTubePlayerAPIReady = function() {
		const container = document.querySelectorAll(".video-container");
		for (let i = 0; i < container.length; i++) {
			initPlayer(container[i]);
		}
	};

	if ($sliders.length) slidersWhile();
});
