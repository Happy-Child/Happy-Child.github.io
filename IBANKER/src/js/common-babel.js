"use strict";

;window.onload = function () {
	// -- Check availability script BEGIN
	document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
	// -- Check availability script END

	// -- Show page BEGIN
	document.querySelector("body").className = "body-visible";
	// -- Show page END


	// -- Common data BEGIN
	var breakpoints = {
		xl: 1200,
		lg: 992,
		md: 768,
		sm: 576
	};
	var isDesktop = $(window).width() >= breakpoints.md ? true : false;
	var isEdge = /Edge/.test(navigator.userAgent),
	    IEVersion = void 0;
	// -- Common data END


	// -- Check IE version BEGIN
	var checkIeVersion = function checkIeVersion() {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var userAgent = navigator.userAgent,
			    regV = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

			if (regV.exec(userAgent) !== null) IEVersion = parseFloat(RegExp.$1);
		} else if (navigator.appName == "Netscape") {
			if (navigator.appVersion.indexOf('Trident') === -1) IEVersion = 12; // -- Normal browser
			else IEVersion = 11;
		}

		// -- Initialization styles END
		if (isEdge) $("head").append("<link rel='stylesheet' href='css/styles-edge.min.css'>");else if (IEVersion === 10 || IEVersion === 11) $("head").append("<link rel='stylesheet' href='css/styles-ie.min.css'>");
		// -- Initialization styles END
	};
	checkIeVersion();
	// -- Check IE version END


	// -- Common functions BEGIN
	var debounce = function debounce(func, wait, immediate) {
		var timeout = void 0;

		return function () {
			var context = this,
			    args = arguments;

			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};

			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait || 200);
			if (callNow) func.apply(context, args);
		};
	};
	// -- Common functions END


	// -- Background slider initialization BEGIN
	var backgroundSliderInit = function backgroundSliderInit() {
		var $slider = $(".background-slider"),
		    $slides = $slider.find(".background-slider__slide"),
		    $slidesImages = $slides.find(".background-slider__slide-img");
		$dotsWrapper = $(".footer__slider-dots"), $navsWrapper = $(".footer__slider-navs"), $controlsWrappers = $dotsWrapper.add($navsWrapper), $navsBtns = {
			all: $navsWrapper.find(".footer__slider-navs-btn"),
			prev: $navsWrapper.find(".footer__slider-navs-btn_prev"),
			next: $navsWrapper.find(".footer__slider-navs-btn_next"),
			classDisabled: "footer__slider-navs-btn_disabled"
		};
		var $sliderControls = void 0,
		    $dotsBtns = void 0;

		var sliderData = {
			slidesLength: $slides.length,
			classSlide: "background-slider__slide",
			classCurrentSlide: "background-slider__slide_current",

			curSlide: "",
			nextSlide: "",
			curSlideIndex: 0,
			nextSlideIndex: 0,

			dotsButton: function dotsButton(count) {
				var resultCount = count < 10 ? "0" + count : count,
				    resultElement = count !== 1 ? '<div class=\'footer__slider-dots-btn\'>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\'footer__slider-dots-count\'>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + resultCount + '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>' : '<div class=\'footer__slider-dots-btn footer__slider-dots-btn_current\'>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\'footer__slider-dots-count\'>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + resultCount + '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>';

				return resultElement;
			}
		};

		// -- Functions BEGIN
		var disabledNextNavBtn = function disabledNextNavBtn() {
			$navsBtns.all.removeClass($navsBtns.classDisabled);
			$navsBtns.next.addClass($navsBtns.classDisabled);
		};

		var disabledPrevNavBtn = function disabledPrevNavBtn() {
			$navsBtns.all.removeClass($navsBtns.classDisabled);
			$navsBtns.prev.addClass($navsBtns.classDisabled);
		};

		var changeSlides = function changeSlides($target) {
			sliderData.curSlide = $slider.find("." + sliderData.classCurrentSlide);
			sliderData.curSlideIndex = sliderData.curSlide.index();
			$slides.removeClass(sliderData.classCurrentSlide);

			// -- Set disabled controls BEGIN
			$controlsWrappers.addClass("footer__slider-control_disabled");
			setTimeout(function () {
				$controlsWrappers.removeClass("footer__slider-control_disabled");
			}, 1500); // After change slide
			// -- Set disabled controls END


			// -- Change data when click on navs arrows BEGIN
			if ($target.hasClass("footer__slider-navs-btn") && sliderData.curSlideIndex < sliderData.slidesLength) {
				$navsBtns.all.removeClass($navsBtns.classDisabled);

				if ($target.hasClass("footer__slider-navs-btn_next")) {
					sliderData.nextSlide = sliderData.curSlide.next("." + sliderData.classSlide);
				} else {
					sliderData.nextSlide = sliderData.curSlide.prev("." + sliderData.classSlide);
				}

				sliderData.nextSlideIndex = sliderData.nextSlide.index() + 1;
			}
			// -- Change data when click on navs arrows END

			// -- Change data when click dots buttons BEGIN
			else if ($target.hasClass("footer__slider-dots-btn")) {
					$navsBtns.all.removeClass($navsBtns.classDisabled);

					sliderData.nextSlideIndex = $target.index() + 1;
					sliderData.nextSlide = $slides.eq(sliderData.nextSlideIndex - 1);
				}
			// -- Change data when click dots buttons END


			// -- Change state navs arrows BEGIN
			if (sliderData.nextSlideIndex === 1) disabledPrevNavBtn(); // If first slide
			else if (sliderData.nextSlideIndex === sliderData.slidesLength) disabledNextNavBtn(); // If last slide
			// -- Change state navs arrows END

			// -- Change state dots buttons BEGIN
			$dotsBtns.removeClass("footer__slider-dots-btn_current");
			$dotsBtns.eq(sliderData.nextSlideIndex - 1).addClass("footer__slider-dots-btn_current");
			// -- Change state dots buttons END


			sliderData.nextSlide.addClass(sliderData.classCurrentSlide);
		};

		var setEventOnControls = function setEventOnControls() {
			$sliderControls.on("click", function () {
				changeSlides($(this));
			});
		};

		var createDots = function createDots() {
			for (var i = 1; i <= sliderData.slidesLength; i++) {
				$dotsWrapper.append(sliderData.dotsButton(i));
			}

			$dotsBtns = $dotsWrapper.find(".footer__slider-dots-btn");
			$sliderControls = $navsBtns.all.add($dotsBtns);
		};

		var startCreate = function startCreate() {
			if ($dotsWrapper.length) createDots();
			if ($sliderControls.length) setEventOnControls();
		};
		// -- Functions END


		startCreate();
	};
	// -- Background slider initialization END


	// -- Reload page when change device BEGIN
	var reloadPage = function reloadPage() {
		var curWindowWidth = $(window).width();
		var reloadFlag = true,
		    typeDevice = isDesktop ? "desktop" : "mobile";

		// -- Functions BEGIN
		var typesReload = {
			desktop: function desktop() {
				if ($(window).width() <= breakpoints.md && reloadFlag) {
					reloadFlag = false;
					setTimeout(function () {
						window.location.reload();
					});
				};
			},
			mobile: function mobile() {
				if ($(window).width() >= breakpoints.md && reloadFlag) {
					reloadFlag = false;
					setTimeout(function () {
						window.location.reload();
					});
				};
			}
		};
		// -- Functions END


		$(window).on("resize", debounce(typesReload['' + typeDevice], 300));
	};
	// -- Reload page when change device END


	// -- Menu BEGIN
	var menuInit = function menuInit() {
		var $menuBtn = $(".header__menu-btn"),
		    $menu = $(".menu"),
		    $menuItems = $menu.find(".menu__nav-link");
		$page = $("body, html");
		$backgroundSliderControls = $(".footer__slider-control");

		// -- Functions BEGIN
		var menuStateToggle = function menuStateToggle() {
			$menuBtn.on("click", function () {
				$menuBtn.toggleClass("header__menu-btn_active").addClass("header__menu-btn_disabled");

				$menu.toggleClass("menu_visible");

				$backgroundSliderControls.toggleClass("footer__slider-control_disabled_hidden");

				if ($(window).width() <= breakpoints.sm && $page.length) $page.toggleClass("page-fixed");

				setTimeout(function () {
					$menuBtn.removeClass("header__menu-btn_disabled");
				}, 600); // Delay for menu animation
			});
		};
		// -- Functions END


		if ($menuBtn.length && $menuItems.length && $menu.length && $backgroundSliderControls.length) {
			menuStateToggle();
		}
	};
	// -- Menu END


	// -- Initialization work functions BEGIN
	var initializationFunctions = function initializationFunctions() {
		reloadPage();
		backgroundSliderInit();
		menuInit();
	};

	if (IEVersion >= 10) initializationFunctions();
	// -- Initialization work functions END
};