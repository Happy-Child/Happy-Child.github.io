// -- Components BEGIN
import "%blocks%/pages/home/components/components.js";
// -- Components END


// -- Helpers BEGIN
const windowLoad = require("%helpers%/window-load.js");
const breakpoints = require("%helpers%/breakpoints.js");
const loadImages = require("%helpers%/load-images.js");
// -- Helpers END


// -- Libraries BEGIN
import swiper from "swiper";
// -- Libraries END


windowLoad(function() {

	let swiperInit;
	const $html = $("html");

	const sliderData = {
		element: $(".home__slider"),
		contentText: $(".home__wrap-slider-content_text"),
		contentImages: $(".home__wrap-slider-content_images"),
		contentElementsActiveClass: "home__slider-content_active",
		pagination: $(".home__slider-pagination"),
		paginationElements: $(".home__slider-pagination-item"),
		paginationElementsActiveClass: "home__slider-pagination-item_active",
		paginationElementsZClass: "home__slider-content_active_z-index",
		paginationCursor: $(".home__slider-pagination-cursor"),
		arrows: {
			all: $(".home .slider-arrows__arrow_next"),
			prev: $(".home .slider-arrows__arrow_prev"),
			next: $(".home .slider-arrows__arrow_next"),
		},
		sliderSpeed: ($(window).width() > breakpoints.md) ? 1700 : 700,
	};

	const swiperData = {
		spaceBetween: 0,
		speed: sliderData.sliderSpeed,
		loop: true,
		slidesPerView: "auto",
		centeredSlides: true,
		allowTouchMove: false,
		navigation: {
			prevEl: sliderData.arrows.prev,
			nextEl: sliderData.arrows.next,
		},
		breakpoints: {
			// when window width is <= 768px
			768: {
				loop: false,
				slidesPerView: 1,
				allowTouchMove: true,
				autoHeight: true,
				spaceBetween: 15
			}
		}
	};

	// -- Functions BEGIN
	const setHtmlClass = () => {
		$html.addClass("html-scroll");
	};

	const customLoadImages = (index) => {
		const curSlide = $(".home__slider-item").eq(index);
		const curImages = curSlide.find(".home__slider-item-img");

		loadImages(curImages);
	};
	customLoadImages(0);

	const changeSlider = (index) => {
		swiperInit.slideTo(index);
	};

	const changePagination = (index) => {
		const curItem = sliderData.paginationElements.eq(index);
		const curItemWidth = curItem.outerWidth();
		const curItemOffsetLeft = curItem.position().left;

		sliderData.paginationElements.removeClass(sliderData.paginationElementsActiveClass);
		curItem.addClass(sliderData.paginationElementsActiveClass);

		sliderData.paginationCursor.css({
			width: curItemWidth + "px",
			left: curItemOffsetLeft + "px",
		});
	};

	const startChangePagination = (index) => {
		sliderData.pagination.addClass("el-disabled");

		setTimeout(function () {
			sliderData.pagination.removeClass("el-disabled");
		}, sliderData.sliderSpeed);

		changePagination(index);
	};
	changePagination(0);

	const initSliderPagination = () => {
		sliderData.paginationElements.on("click", function () {
			if ( !$(this).hasClass(sliderData.paginationElementsActiveClass) ) {
				const index = $(this).index();
				changeSlider(index);
				changePagination(index);
			}
		});
	};


	const changeSliderAnimationContent = (index) => {
		sliderData.contentText.find(".home__slider-content").removeClass(sliderData.contentElementsActiveClass);
		sliderData.contentText.find(".home__slider-content").eq(index).addClass(sliderData.contentElementsActiveClass);

		sliderData.contentImages.find(".home__slider-content").removeClass(sliderData.contentElementsActiveClass);
		sliderData.contentImages.find(".home__slider-content").eq(index).addClass(sliderData.contentElementsActiveClass);

		setTimeout(function () {
			sliderData.contentText.find(".home__slider-content").removeClass(sliderData.paginationElementsZClass);
			sliderData.contentText.find(".home__slider-content").eq(index).addClass(sliderData.paginationElementsZClass);

			sliderData.contentImages.find(".home__slider-content").removeClass(sliderData.paginationElementsZClass);
			sliderData.contentImages.find(".home__slider-content").eq(index).addClass(sliderData.paginationElementsZClass);
		}, sliderData.sliderSpeed);

		startChangePagination(index);
	};
	// -- Functions END

	setHtmlClass();
	if (sliderData.element.length) {
		swiperInit = new swiper(sliderData.element, swiperData);

		swiperInit.on("slideChange", function () {
			const direction = (this.realIndex > this.previousIndex) ? "next" : "prev";

			if ($(window).width() > breakpoints.md) changeSliderAnimationContent(this.realIndex, direction);
			if ($(window).width() < breakpoints.md) customLoadImages(this.realIndex);
		});

		if (sliderData.paginationElements.length && sliderData.paginationCursor.length) initSliderPagination();
	}

});
