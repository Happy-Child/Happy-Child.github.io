"use strict";

$(function () {

	// -- Preloader logic BEGIN
	const preloaderLogic = () => {
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
		  }, animationDuration - 200);
		};

		//Initialization BEGIN
		animationLogo();
		//Initialization END
	};
	// -- Preloader logic END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloaderLogic();
	};
	initializationFunctions();
	// -- Initialization work functions END

});