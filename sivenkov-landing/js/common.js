"use strict";

jQuery.fn.reverse = [].reverse;

$(function () {
	// -- Common data BEGIN
	const breakpoints = {
		xl: 1200,
		lg: 992,
		mb: 768,
		sm: 576
	};
	let isIE;
	// -- Common data END



	// -- Check IE version BEGIN
	const checkIeVersion = () => {
		if (navigator.appName == 'Microsoft Internet Explorer'){
			const userAgent = navigator.userAgent;
			const regV	= new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

			if (regV.exec(userAgent) !== null){
				isIE = parseFloat( RegExp.$1 );
			}
		}

		else if (navigator.appName == "Netscape"){                       
			/// In IE 11 the navigator.appVersion says 'trident'
			/// In Edge the navigator.appVersion does not say trident
			if (navigator.appVersion.indexOf('Trident') === -1) isIE = 12;
			else isIE = 11;
		}

		if ( isIE <= 11 ) {
			$("head").append("<link rel='stylesheet' href='css/styles-ie.min.css'>")
		}
	};
	// -- Check IE version END
	checkIeVersion();



	// -- Preloader BEGIN
	const preloader = () => {
		const preloaderWrapper = $(".preloader");
		const preloaderLogo = $('.preloader__logo-img');
		const preloaderLogoAnimationEl = document.querySelector('.preloader__logo-img');
		
		const delayAfterAnimation = 1000;
		const animationDuration = 1700;

		const animationLogo = () => {
			const animationProperty = {
				"ease"				 : "easeLinear",
				"strokeWidth"	 : 1,
				"strokeOpacity": 1,
				"strokeColor"	 : "#fff",
				"strokeCap"		 : "squserAgentre"
			};
			if ( $(window).width() < breakpoints.sm ) animationProperty.strokeWidth = 3;

			const preloaderLogoAnimation = new LazyLinePainter(preloaderLogoAnimationEl, animationProperty);
			preloaderLogoAnimation.paint();

			setTimeout(() => {
		    preloaderLogo.addClass("svg-hide");
		  }, animationDuration - 50);

			setTimeout(() => {
		    preloaderWrapper.addClass("preloader_hide");
		  }, animationDuration + delayAfterAnimation);
		};

		const animationLogoIe = () => {
			setTimeout(() => {
		    preloaderLogo.addClass("svg-ie_show");
		  }, 500);

			setTimeout(() => {
				preloaderLogo.addClass("svg-ie_hide");
		    preloaderWrapper.addClass("preloader_hide");
		  }, 1600);
		};

		//Initialization BEGIN
		if ( isIE <= 11 ) animationLogoIe();
		else animationLogo();
		//Initialization END
	};
	// -- Preloader END



	//Progress bar BEGIN
	const progressBar = () => {
		const progressIndicator = $(".progress-bar__line");

		if ( !!progressIndicator ) {
			setScrollValue();

			$(window).scroll(function() {
				setScrollValue();
			});
		}

		function setScrollValue () {
			const scroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const result = (scroll / height) * 100;

			progressIndicator.css({"width": result + "%"});
		}
	};
	//Progress bar END



	// -- Form elements BEGIN
	const formElements = () => {
		//Set fields states BEGIN
		const setFieldsFocus = () => {
			const fields = $(".form__field");

			if ( fields.length ) {
				fields.focus(function() {
					$(this).addClass("active");
				});

				fields.blur(function() {
					if ( !$(this).val() ) $(this).removeClass("active");
				});
			}
		};
		//Set fields states END


		//Auto height textarea BEGIN
		const autoHeightTextarea = () => {
			const textarea = $("textarea");

			if ( textarea.length ) {
				autosize( textarea );
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
	const popups = () => {
		const btnsShowPopups = $(".btn-popup");
		const btnsHidePopups = $(".popup__close");
		const popups = $(".popup");

		if (!!btnsShowPopups && !!popups ) {
			btnsShowPopups.click(function (e) {
				e.preventDefault();

				const key = $(this).attr("data-popup-key");
				const popup = $(`.popup[data-popup-key=${key}]`)

				if ( !!popup ) {
					popups.removeClass("active");
					popup.addClass("active");
				}
			});
		}

		if ( !!btnsHidePopups ) {
			btnsHidePopups.click(function() {
				popups.removeClass("active");
			});
		}
	};
	//Popups END



	//WOW js animation BEGIN
	const wowJs = () => {
		const wow = new WOW().init();
	};
	//WOW js animation END



	//Portfolio section logic (show items & view gif) BEGIN
	const portfolioSection = () => {
		//Show items BEGIN
		const showItems = () => {
			const btn = $(".portfolio__btn");
			const textStates = {
				show: btn.attr("data-text-show-items"),
				hide: btn.attr("data-text-hide-items")
			};
			const hideItems = $(".portfolio .portfolio__wrap-item_hide");

			if ( btn.length && hideItems.length ) {
				btn.click(function() {
					//Change text BEGIN
					const textItem = $(this).find(".btn__text");
					const text = textItem.text();

					if ( text == textStates.show ) {

						textItem.text(textStates.hide);
						$(this).attr("data-text", textStates.hide);

					} else if ( text == textStates.hide ) {

						textItem.text(textStates.show);
						$(this).attr("data-text", textStates.show);

					} else {
						textItem.text(textStates.show);
					}
					//Change text END

					let i = 0;

					hideItems.reverse().each(function() {
						const cur = $(this);

						if ( text == textStates.show ) cur.slideDown(600).addClass("show");
						else if ( text == textStates.hide ) cur.slideUp(600).removeClass("show");
					});

				});
			}
		};
		//Show items END


		//Initialization BEGIN
		showItems();
		//Initialization END
	};
	//Portfolio section logic (show items & view gif) END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloader();
		formElements()
		popups();
		progressBar();
		wowJs();
		portfolioSection();
	};

	if ( isIE >= 10 ) initializationFunctions();
	// -- Initialization work functions END

});