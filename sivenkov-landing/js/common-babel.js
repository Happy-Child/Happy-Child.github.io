"use strict";

$(function () {
	// -- Common data BEGIN
	var breakpoints = {
		xl: 1200,
		lg: 992,
		md: 768,
		sm: 576
	};
	var isIE = void 0;
	// -- Common data END


	// -- Check IE version BEGIN
	var checkIeVersion = function checkIeVersion() {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var userAgent = navigator.userAgent;
			var regV = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

			if (regV.exec(userAgent) !== null) {
				isIE = parseFloat(RegExp.$1);
			}
		} else if (navigator.appName == "Netscape") {
			/// In IE 11 the navigator.appVersion says 'trident'
			/// In Edge the navigator.appVersion does not say trident
			if (navigator.appVersion.indexOf('Trident') === -1) isIE = 12;else isIE = 11;
		}

		if (isIE <= 11) {
			$("head").append("<link rel='stylesheet' href='css/styles-ie.min.css'>");
		}
	};
	// -- Check IE version END
	checkIeVersion();

	// -- Preloader BEGIN
	var preloader = function preloader() {
		var preloaderWrapper = $(".preloader");
		var preloaderLogo = $('.preloader__logo-img');
		var preloaderLogoAnimationEl = document.querySelector('.preloader__logo-img');

		var delayAfterAnimation = 1000;
		var animationDuration = 1700;

		var animationLogo = function animationLogo() {
			var animationProperty = {
				"ease": "easeLinear",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"strokeColor": "#fff",
				"strokeCap": "squserAgentre"
			};
			if ($(window).width() < breakpoints.sm) animationProperty.strokeWidth = 3;

			var preloaderLogoAnimation = new LazyLinePainter(preloaderLogoAnimationEl, animationProperty);
			preloaderLogoAnimation.paint();

			setTimeout(function () {
				preloaderLogo.addClass("svg-hide");
			}, animationDuration - 50);

			setTimeout(function () {
				preloaderWrapper.addClass("preloader_hide");
			}, animationDuration + delayAfterAnimation);
		};

		var animationLogoIe = function animationLogoIe() {
			setTimeout(function () {
				preloaderLogo.addClass("svg-ie_show");
			}, 500);

			setTimeout(function () {
				preloaderLogo.addClass("svg-ie_hide");
				preloaderWrapper.addClass("preloader_hide");
			}, 1600);
		};

		//Initialization BEGIN
		if (isIE <= 11) animationLogoIe();else animationLogo();
		//Initialization END
	};
	// -- Preloader END


	//Progress bar BEGIN
	var progressBar = function progressBar() {
		var progressIndicator = $(".progress-bar__line");

		if (!!progressIndicator) {
			setScrollValue();

			$(window).scroll(function () {
				setScrollValue();
			});
		}

		function setScrollValue() {
			var scroll = document.body.scrollTop || document.documentElement.scrollTop;
			var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			var result = scroll / height * 100;

			progressIndicator.css({ "width": result + "%" });
		}
	};
	//Progress bar END


	// -- Form elements BEGIN
	var formElements = function formElements() {
		//Set fields states BEGIN
		var setFieldsFocus = function setFieldsFocus() {
			var fields = $(".form__field");

			if (fields.length) {
				fields.focus(function () {
					$(this).addClass("active");
				});

				fields.blur(function () {
					if (!$(this).val()) $(this).removeClass("active");
				});
			}
		};
		//Set fields states END


		//Auto height textarea BEGIN
		var autoHeightTextarea = function autoHeightTextarea() {
			var textarea = $("textarea");

			if (textarea.length) {
				autosize(textarea);
			}
		};
		//Auto height textarea END


		//Initialization BEGIN
		setFieldsFocus();
		autoHeightTextarea();
		//Initialization END
	};
	// -- Form elements END


	//Popups BEGIN
	var popups = function popups() {
		var btnsShowPopups = $(".btn-popup");
		var btnsHidePopups = $(".popup__close");
		var popups = $(".popup");

		if (!!btnsShowPopups && !!popups) {
			btnsShowPopups.click(function (e) {
				e.preventDefault();

				var key = $(this).attr("data-popup-key");
				var popup = $(".popup[data-popup-key=" + key + "]");

				if (!!popup) {
					popups.removeClass("active");
					popup.addClass("active");
				}
			});
		}

		if (!!btnsHidePopups) {
			btnsHidePopups.click(function () {
				popups.removeClass("active");
			});
		}
	};
	//Popups END


	//WOW js animation BEGIN
	var wowJs = function wowJs() {
		var wow = new WOW().init();
	};
	//WOW js animation END


	//Portfolio section logic (show items & view gif) BEGIN
	var portfolioSection = function portfolioSection() {
		//Show items BEGIN
		var showItems = function showItems() {
			var btn = $(".portfolio__btn");
			var textStates = {
				show: btn.attr("data-text-show-items"),
				hide: btn.attr("data-text-hide-items")
			};
			var hideItems = $(".portfolio .portfolio__wrap-item_hide");

			if (btn.length && hideItems.length) {
				btn.click(function () {
					var textItem = $(this).find(".btn__text");
					var text = textItem.text();

					//Change text BEGIN
					if (text == textStates.show) {

						textItem.text(textStates.hide);
						$(this).attr("data-text", textStates.hide);
					} else if (text == textStates.hide) {

						textItem.text(textStates.show);
						$(this).attr("data-text", textStates.show);
					} else {
						textItem.text(textStates.show);
					}
					//Change text END


					//Show/hide items BEGIN
					hideItems.each(function () {
						var cur = $(this);
						if (text == textStates.show) cur.slideDown(600).addClass("show");else if (text == textStates.hide) cur.slideUp(600).removeClass("show");
					});
					//Show/hide items END


					//Scroll on position BEGIN
					var secPortfolioOffset = $(".portfolio__content").offset().top;
					var customOffset = 60;

					function scrollToBottom() {
						var itemHeight = $(".portfolio .portfolio__wrap-item").eq(1).outerHeight(true);
						var isMobile = $(window).width() <= breakpoints.sm;

						var resultOffset = !isMobile ? secPortfolioOffset + itemHeight : secPortfolioOffset + itemHeight * 2;

						$("html, body").animate({
							scrollTop: resultOffset - customOffset
						}, 800);
					}

					function scrollToTop() {
						$("html, body").animate({
							scrollTop: secPortfolioOffset - customOffset
						}, 500);
					}

					if (text == textStates.show) scrollToBottom();else if (text == textStates.hide) scrollToTop();
					//Scroll on position END
				});
			}
		};
		//Show items END


		//Gif image restart BEGIN
		var gifView = function gifView(item, state) {

			if (state === "show") {
				var gifImg = item.find(".portfolio__gif");

				var gifSrc = $(window).width() > breakpoints.md ? item.attr("data-gif-src-desktop") : item.attr("data-gif-src-mobile");

				// item.prepend(`<img class="portfolio__gif" scr="${gifSrc}" alt="">`);

				gifImg.css({ "background-image": "url(" + gifSrc + ")" });
			} else if (state === "hide") {
				var _gifImg = item.find(".portfolio__gif");

				_gifImg.css({ "background-image": "none" });
				//gifImg.attr("src", "");
			}
		};
		//Gif image restart END


		//Hover items BEGIN
		var hoverItems = function hoverItems() {
			var items = $(".portfolio__item");

			if (items.length) {
				items.hover(function () {
					//items.addClass("portfolio__item_hover");
					gifView($(this), "show");
				}, function () {
					//items.removeClass("portfolio__item_hover");
					var itemIndex = $(this).parent().index() + 1;
					gifView($(this), "hide");
				});
			}
		};
		//Hover items END


		//Initialization BEGIN
		showItems();
		hoverItems();
		//Initialization END
	};
	//Portfolio section logic (show items & view gif) END


	// -- Initialization work functions BEGIN
	var initializationFunctions = function initializationFunctions() {
		preloader();
		formElements();
		popups();
		progressBar();
		wowJs();
		portfolioSection();
	};

	if (isIE >= 10) initializationFunctions();
	// -- Initialization work functions END
});