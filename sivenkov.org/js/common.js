"use strict";

$(function () {
	// -- Common data BEGIN
	const breakpoints = {
		xl: 1200,
		lg: 992,
		mb: 768,
		sm: 576
	};
	// -- Common data END


	// -- Preloader BEGIN
	const preloader = () => {
		const preloaderWrapper = $(".preloader");
		const preloaderLogo = $('.preloader__logo-img');
		const preloaderLogoAnimationEl = document.querySelector('.preloader__logo-img');
		
		const delayAfterAnimation = 1000;
		const animationDuration = 1700;

		const preloaderHide = () => {
			preloaderWrapper.addClass("preloader_hide");
		};

		const animationLogo = () => {
			const animationProperty = {
				"ease"				 : "easeLinear",
				"strokeWidth"	 : 1,
				"strokeOpacity": 1,
				"strokeColor"	 : "#fff",
				"strokeCap"		 : "square"
			};
			if ( $(window).width() < breakpoints.sm ) animationProperty.strokeWidth = 3;

			const preloaderLogoAnimation = new LazyLinePainter(preloaderLogoAnimationEl, animationProperty);
			preloaderLogoAnimation.paint();

			setTimeout(() => {
		    preloaderLogo.addClass("fill-show");
		  }, animationDuration - 50);

			setTimeout(() => {
		    preloaderHide();
		  }, animationDuration + delayAfterAnimation);
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
		const windowHeight = $(window).height();
		let prevOffset;

		//Functions BEGIN
		function checkOffset () {
			$(document).scroll(function() {
				const curOffset = $(window).scrollTop();

				if ( curOffset > windowHeight ) {
					header.addClass("scroll");

					if ( !!prevOffset && prevOffset >= curOffset ) { //scroll top
						header.addClass("scroll-show");
					} else if ( !!prevOffset && prevOffset < curOffset ) { //scroll bottom
						header.removeClass("scroll-show");
					}
				} else {
					if ( curOffset <= 1 ){
						header.removeClass("scroll scroll-show");
					}
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

		const delayMenu = 500;
		const deskMenuBtnDuration = 1100;
		const mobileMenuBtnDuration = 500;

		const widthBodyBeforeFixed = $("body").width();
		let widthBodyAfterFixed;

		const isDesktop = $(window).width() > breakpoints.lg;


		function changeStateMenu () {
			if ( header.length && menuBtns.length ) {
				menuBtns.click(function() {

					$(this).toggleClass("active");
					$(this).addClass("btn-disabled");
					header.toggleClass("active");

					if ( isDesktop ) {
						if ( !$(this).hasClass("active") ) { // If menu show
							setTimeout(function() {
								page.toggleClass("page-fixed");
								header.css({"padding-right": "0px"});
							}, delayMenu + 200);
						} else { // If menu hide
							setTimeout(function() {
								page.toggleClass("page-fixed");

								widthBodyAfterFixed = $("body").width();

								if ( header.hasClass("scroll") ) {
									header.css({"padding-right": (widthBodyAfterFixed - widthBodyBeforeFixed) + "px"});
								}
							}, delayMenu);
						}

						setTimeout( () => {
							$(this).removeClass("btn-disabled");
						}, deskMenuBtnDuration);
					} else {
						page.toggleClass("page-fixed");

						setTimeout( () => {
							$(this).removeClass("btn-disabled");
						}, mobileMenuBtnDuration);
					}

				});
			}
		}

		//Initialization BEGIN
		changeStateMenu();
		//Initialization END
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
		// functionSetProperty();
	};
	initializationFunctions();
	// -- Initialization work functions END

});