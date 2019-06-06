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
		if ( preloaderWrapper.length && preloaderLogo.length ) animationLogo();
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
					header.addClass("header_scroll");

					if ( !!prevOffset && prevOffset >= curOffset ) { //scroll top
						header.addClass("header_scroll-show");
					} else if ( !!prevOffset && prevOffset < curOffset ) { //scroll bottom
						header.removeClass("header_scroll-show");
					}
				} else {
					if ( curOffset <= 1 ){
						header.removeClass("header_scroll header_scroll-show");
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
	const mainMenu = () => {
		const header = $(".header");
		const $menuBtn = $(".header__menu-btn");
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
			if ( header.length && $menuBtn.length ) {
				$menuBtn.click(function() {

					$(this).toggleClass("header__menu-btn_active");
					$(this).addClass("header__menu-btn_disabled");
					header.toggleClass("header_active");
					widthBodyAfterFixed = $("body").width();
					console.log(widthBodyAfterFixed);
					console.log(widthBodyBeforeFixed);

					if ( isDesktop ) {
						if ( !$(this).hasClass("header__menu-btn_active") ) { // If menu show

							setTimeout(function() {
								page.removeClass("page-fixed");
								header.css({"padding-right": "0px"});
							}, delayMenu + 200);

						} else { // If menu hide

							setTimeout(function() {
								if ( (widthBodyBeforeFixed - widthBodyAfterFixed) !== 0 ) { // if page has scroll
									page.addClass("page-fixed");

									if ( header.hasClass("header_scroll") ) {
										header.css({"padding-right": (widthBodyAfterFixed - widthBodyBeforeFixed) + "px"});
									}
								}
							}, delayMenu);

						}

						setTimeout( () => {
							$(this).removeClass("header__menu-btn_disabled");
						}, deskMenuBtnDuration);
					} else {
						page.toggleClass("page-fixed");

						setTimeout( () => {
							$(this).removeClass("header__menu-btn_disabled");
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



	// -- Init lazy load BEGIN
	const initLazyLoad = () => {
		const lazy = new LazyLoad({
    	elements_selector: ".lazy"
		});
	};
	// -- Init lazy load END



	// -- Set width technologies images loop BEGIN
	const setWidthTechnologiesImagesLoop = () => {
		const $wrapperLoop = $(".technologies__wrap-list"),
					wrapperLoopWidth = parseInt( $wrapperLoop.outerWidth(true) ),
					$loop = $wrapperLoop.find(".technologies__list"),
					$loopItems = $wrapperLoop.find(".technologies__list-item");

		
		// -- Functions BEGIN
		const setWidth = () => {
			let resultWidth = 0;

			$loopItems.each(function() {
				resultWidth += $(this).outerWidth();
			});


			resultWidth = resultWidth - wrapperLoopWidth;
			$loop.width( resultWidth );
		};
		// -- Functions END


		if (
			$wrapperLoop.length &&
			$loop.length &&
			$loopItems.length) setWidth();
	};
	// -- Set width technologies images loop END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloader();
		mainMenu();
		fixedHeader();
		initLazyLoad();
		setWidthTechnologiesImagesLoop();
	};
	initializationFunctions();
	// -- Initialization work functions END

});