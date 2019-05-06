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



		// BEGIN
		// END



		//Initialization BEGIN
		setFieldsFocus();
		autoHeightTextarea();
		//Initialization END
	};
	// -- Form elements END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloader();
		formElements()
	};
	initializationFunctions();
	// -- Initialization work functions END

});