"use strict";

$(function () {
	// -- Common data BEGIN
	var breakpoints = {
		xl: 1200,
		lg: 992,
		mb: 768,
		sm: 576
	};
	// -- Common data END


	// -- Preloader BEGIN
	var preloader = function preloader() {
		var preloaderWrapper = $(".preloader");
		var preloaderLogo = $('.preloader__logo-img');
		var preloaderLogoAnimationEl = document.querySelector('.preloader__logo-img');

		var delayAfterAnimation = 1000;
		var animationDuration = 1700;

		var preloaderHide = function preloaderHide() {
			preloaderWrapper.addClass("preloader_hide");
		};

		var animationLogo = function animationLogo() {
			var animationProperty = {
				"ease": "easeLinear",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"strokeColor": "#fff",
				"strokeCap": "square"
			};
			if ($(window).width() < breakpoints.sm) animationProperty.strokeWidth = 3;

			var preloaderLogoAnimation = new LazyLinePainter(preloaderLogoAnimationEl, animationProperty);
			preloaderLogoAnimation.paint();

			setTimeout(function () {
				preloaderLogo.addClass("fill-show");
			}, animationDuration - 50);

			setTimeout(function () {
				preloaderHide();
			}, animationDuration + delayAfterAnimation);
		};

		//Initialization BEGIN
		if (preloaderWrapper.length && preloaderLogo.length) animationLogo();
		//Initialization END
	};
	// -- Preloader END


	// -- Fixed header BEGIN
	var fixedHeader = function fixedHeader() {
		var header = $(".header");
		var headerHeight = $(".header").outerHeight(true);
		var windowHeight = $(window).height();
		var prevOffset = void 0;

		//Functions BEGIN
		function checkOffset() {
			$(document).scroll(function () {
				var curOffset = $(window).scrollTop();

				if (curOffset > windowHeight) {
					header.addClass("header_scroll");

					if (!!prevOffset && prevOffset >= curOffset) {
						//scroll top
						header.addClass("header_scroll-show");
					} else if (!!prevOffset && prevOffset < curOffset) {
						//scroll bottom
						header.removeClass("header_scroll-show");
					}
				} else {
					if (curOffset <= 1) {
						header.removeClass("header_scroll header_scroll-show");
					}
				}

				prevOffset = curOffset;
			});
		}
		//Functions END

		if (header.length) {
			checkOffset();
		}
	};
	// -- Fixed header END


	// -- Menu BEGIN
	var mainMenu = function mainMenu() {
		var header = $(".header");
		var $menuBtn = $(".header__menu-btn");
		var elHtml = $("html");
		var elBody = $("body");
		var page = $("body, html");

		var delayMenu = 500;
		var deskMenuBtnDuration = 1100;
		var mobileMenuBtnDuration = 500;

		var widthBodyBeforeFixed = $("body").width();
		var widthBodyAfterFixed = void 0;

		var isDesktop = $(window).width() > breakpoints.lg;

		function changeStateMenu() {
			if (header.length && $menuBtn.length) {
				$menuBtn.click(function () {
					var _this = this;

					$(this).toggleClass("header__menu-btn_active");
					$(this).addClass("header__menu-btn_disabled");
					header.toggleClass("header_active");
					widthBodyAfterFixed = $("body").width();
					console.log(widthBodyAfterFixed);
					console.log(widthBodyBeforeFixed);

					if (isDesktop) {
						if (!$(this).hasClass("header__menu-btn_active")) {
							// If menu show

							setTimeout(function () {
								page.removeClass("page-fixed");
								header.css({ "padding-right": "0px" });
							}, delayMenu + 200);
						} else {
							// If menu hide

							setTimeout(function () {
								if (widthBodyBeforeFixed - widthBodyAfterFixed !== 0) {
									// if page has scroll
									page.addClass("page-fixed");

									if (header.hasClass("header_scroll")) {
										header.css({ "padding-right": widthBodyAfterFixed - widthBodyBeforeFixed + "px" });
									}
								}
							}, delayMenu);
						}

						setTimeout(function () {
							$(_this).removeClass("header__menu-btn_disabled");
						}, deskMenuBtnDuration);
					} else {
						page.toggleClass("page-fixed");

						setTimeout(function () {
							$(_this).removeClass("header__menu-btn_disabled");
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
	var initLazyLoad = function initLazyLoad() {
		var lazy = new LazyLoad({
			elements_selector: ".lazy"
		});
	};
	// -- Init lazy load END


	// -- Set width technologies images loop BEGIN
	var setWidthTechnologiesImagesLoop = function setWidthTechnologiesImagesLoop() {
		var $wrapperLoop = $(".technologies__wrap-list"),
		    wrapperLoopWidth = parseInt($wrapperLoop.outerWidth(true)),
		    $loop = $wrapperLoop.find(".technologies__list"),
		    $loopItems = $wrapperLoop.find(".technologies__list-item");

		// -- Functions BEGIN
		var setWidth = function setWidth() {
			var resultWidth = 0;

			$loopItems.each(function () {
				resultWidth += $(this).outerWidth();
			});

			resultWidth = resultWidth - wrapperLoopWidth;
			$loop.width(resultWidth);
		};
		// -- Functions END


		if ($wrapperLoop.length && $loop.length && $loopItems.length) setWidth();
	};
	// -- Set width technologies images loop END


	// -- Initialization work functions BEGIN
	var initializationFunctions = function initializationFunctions() {
		preloader();
		mainMenu();
		fixedHeader();
		initLazyLoad();
		setWidthTechnologiesImagesLoop();
	};
	initializationFunctions();
	// -- Initialization work functions END
});