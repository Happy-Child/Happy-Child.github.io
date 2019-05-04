"use strict";

$(function () {

	// -- Preloader BEGIN
	const preloader = () => {
		const preloaderWrapper = $(".preloader");
		const preloaderLogo = $('.preloader__logo-img');
		const preloaderLogoAnimationEl = document.querySelector('.preloader__logo-img');
		const animationDuration = 1700;

		const preloaderHide = () => {
			preloaderWrapper.addClass("preloader_hide");
		};

		const animationLogo = () => {
			const preloaderLogoAnimation = new LazyLinePainter(preloaderLogoAnimationEl, {
				"ease": "easeLinear",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"strokeColor": "#fff",
				"strokeCap": "square"
			});

			preloaderLogoAnimation.paint();

			setTimeout(() => {
		    preloaderLogo.addClass("fill-show");
		    preloaderHide();
		  }, animationDuration - 50);
		};

		//Initialization BEGIN
		animationLogo();
		//Initialization END
	};
	// -- Preloader END


	// -- Fixed header BEGIN
	const fixedHeader = () => {
		const header = $(".header");
		const headerHeight = $(".header").outerHeight(true);
		let prevOffset;

		//Functions BEGIN
		function checkOffset () {
			$(document).scroll(function() {
				header.addClass("scroll scroll-hide");
				const curOffset = $(window).scrollTop();

				if ( curOffset > headerHeight ) {
					if ( !!prevOffset && prevOffset > curOffset ) {
						header.removeClass("scroll-hide");
					}
				} else {
					header.removeClass("scroll scroll-hide");
				}

				prevOffset = curOffset;
			});
		}
		//Functions END

		if ( header.length ) {
			checkOffset();
		}
	};
	// -- Fixed header END


	// -- Menu BEGIN
	const menu = () => {
		const header = $(".header");
		const menuBtns = $(".header-menu-btn");
		const elHtml = $("html");
		const elBody = $("body");
		const page = $("body, html");

		//Functions BEGIN
		function checkScrollBarPage () {

		}
		//Functions END

		if ( header.length && menuBtns.length ) {
			menuBtns.click(function() {
				menuBtns.toggleClass("active");
				header.toggleClass("active");
				page.toggleClass("page-fixed");
				checkScrollBarPage();
			});
		}
	};
	// -- Menu END


	// -- Function set property depending on the page BEGIN
	const functionSetProperty = () => {
		//Check page scrollbar & set header margin-right BEGIN
		const checkPageScrollbar = () => {
			const header = $(".header");
			const windowHeight = $(window).outerHeight(true);
			const pageHeight = $(document).outerHeight(true);

			if ( windowHeight < pageHeight && $(window).width() > 992 ) {
				header.css({"width": "calc(100% - 15px)"});
			}
		};
		//Check page scrollbar & set header margin-right END


		//Initialization BEGIN
		checkPageScrollbar();
		//Initialization END
	};
	// -- Function set property depending on the page END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloader();
		menu();
		fixedHeader();
		functionSetProperty();
	};
	initializationFunctions();
	// -- Initialization work functions END

});