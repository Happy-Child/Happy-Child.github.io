"use strict";

$(function () {
	// -- Common data BEGIN
	const breakpoints = {
		xl: 1200,
		lg: 992,
		md: 768,
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



	// -- Form BEGIN
	const formElements = () => {
		const fields = $(".form__field");
		const forms = $("form");
		let countInvalidFields = 0;

		const regObj = {
			phone: /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/,
			email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
			text: /./,
			name: /^[а-яА-ЯёЁa-zA-Z -]+$/,
		}


		//Functions BEGIN
		const curLetters = (field) => {
			let newStr = '';
			const curVal = field.val();
			const curValLength = field.val().length;
			let control = 0;

			for (let i = 0; i < curValLength; i++) {
				const curValPart = curVal.substring(i, i+1);

				if (/[+, ,\-,0-9]/.test(curValPart)) {   
					newStr = newStr + curValPart;
				}
				else {
					if (!control) {
						control = 1;
					}
				}
			}
			
			field.val(newStr);
			field.focus();
		};

		const sendMessage = (data) => {
			$.ajax({
		    url: "./send.php",
		    type: "POST",
		    data: data,

		    success: function(response) {
	      	console.log(response);
				},

				error: function(response) {
					console.log(response);
				}

			});
		};
		//Functions END


		//Validation BEGIN
		const validation = () => {
			if ( forms.length ) {
				forms.submit(function(e) {
					e.preventDefault();

					const curFormFields = $(this).find(".form__field");
					
					curFormFields.parent().removeClass("error");
					countInvalidFields = 0;

					curFormFields.each(function() {
						const field = $(this);
						const type = field.attr("name");
						const val = field.val();

						if ( (val.length < 1) || (!regObj[type].test(val)) ) {
							field.parent().addClass("error");
							countInvalidFields++;
						}
					});

					if ( countInvalidFields == 0 ) sendMessage( $(this).serialize() );
				});
			}
		};
		//Validation END


		//Set phone mask BEGIN
		$("input[type='tel']").mask('+375-__-___-__-__', {
    	translation: {
	      '_': {
	        pattern: /[0-9]/,
	        optional: true
      	}
      }
    });
		//Set phone mask END


		//Set fields states BEGIN
		const setFieldsFocus = () => {
			if ( fields.length ) {
				fields.focus(function() {
					$(this).parent().addClass("active");
				});

				fields.blur(function() {
					if ( !$(this).val() ) $(this).parent().removeClass("active");
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
		validation();
		//Initialization END
	};
	// -- Form END



	//Popups BEGIN
	const popups = () => {
		const btnsShowPopups = $(".btn-popup");
		const btnsHidePopups = $(".popup__close");
		const popups = $(".popup");
		const page = $("html, body");

		if (!!btnsShowPopups && !!popups ) {
			btnsShowPopups.click(function (e) {
				e.preventDefault();

				const key = $(this).attr("data-popup-key");
				const popup = $(`.popup[data-popup-key=${key}]`)

				if ( !!popup ) {
					popups.removeClass("active");
					popup.addClass("active");
				}

				page.toggleClass("page-fixed");
			});
		}

		if ( !!btnsHidePopups ) {
			btnsHidePopups.click(function() {
				popups.removeClass("active");
				page.toggleClass("page-fixed");
			});
		}
	};
	//Popups END



	//WOW js animation BEGIN
	const wowJs = () => {
		const wow = new WOW().init();

		
		//Functions BEGIN
		const removeDelayOnFirstSection = () => {
			const allAnimationItems = $(".our-plus .wow");
			const listAnimationItems = $(".our-plus .our-plus__item");

			if ( allAnimationItems.length ) {
				allAnimationItems.attr("data-wow-delay", ".1s");
				
				let delay = 1;
				listAnimationItems.each(function() {
					$(this).attr("data-wow-delay", `.${delay}s`);
					delay++;
				});
			}
		};
		//Functions END


		let prevOffset = $(window).scrollTop();
		$(window).scroll(function() {
			const curOffset = $(this).scrollTop();
			
			if ( curOffset < prevOffset ) {
				removeDelayOnFirstSection();
			}

			prevOffset = curOffset;
		});
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
					const textItem = $(this).find(".btn__text");
					const text = textItem.text();


					//Change text BEGIN
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

					
					//Show/hide items BEGIN
					hideItems.each(function() {
						const cur = $(this);
						if ( text == textStates.show ) cur.slideDown(600).addClass("show");
						else if ( text == textStates.hide ) cur.slideUp(600).removeClass("show");
					});
					//Show/hide items END


					//Scroll on position BEGIN
					const secPortfolioOffset = $(".portfolio__content").offset().top;
					const customOffset = 60;

					function scrollToBottom () {
						const itemHeight = $(".portfolio .portfolio__wrap-item").eq(1).outerHeight(true);
						const isMobile = $(window).width() <= breakpoints.sm;

						const resultOffset = !isMobile ? (secPortfolioOffset + itemHeight) : (secPortfolioOffset + itemHeight * 2);
	
					 	$("html, body").animate({
          		scrollTop: resultOffset - customOffset
        		}, 800);
					}

					function scrollToTop () {
		        $("html, body").animate({
          		scrollTop: secPortfolioOffset - customOffset
        		}, 500);
					}

					if ( text == textStates.show ) scrollToBottom();
					else if ( text == textStates.hide ) scrollToTop();
					//Scroll on position END

				});
			}
		};
		//Show items END



		//Gif image restart BEGIN
		const gifsChache = [];

		const gifView = ( item, state ) => {
			const gifImg = item.find(".portfolio__gif");

			if ( state === "show" ) {
				const gifSrc = gifImg.attr("data-src-gif");

				if ( gifsChache.indexOf(gifSrc) !== -1 ) {

					// gifImg.parent().prepend(`
					// 	<div
					// 		class="portfolio__gif_result"
					// 		style="background-image: url('${gifSrc}')"
					// 	></div>
					// `);

					gifImg.css({"background-image": `url(${gifSrc}?p${new Date().getTime()})`});

				} else {

					item.addClass("portfolio__item_load");

					const img = new Image();
					img.onload = function() {
						if ( gifsChache.indexOf(gifSrc) == -1 ) gifsChache.push(gifSrc);

						// gifImg.parent().prepend(`
						// 	<div
						// 		class="portfolio__gif_result"
						// 		style="background-image: url('${gifSrc}')"
						// 	></div>
						// `);
						gifImg.css({"background-image": `url(${gifSrc}?p${new Date().getTime()})`});

						item.removeClass("portfolio__item_load");
					};
					img.src = gifSrc;

				}
	

			} else if ( state === "hide" ) {
				setTimeout(function() {
					gifImg.css({backgroundImage: "none"});
				}, 300);
				//gifImg.parent().find(".portfolio__gif_result").remove();
			}

		};
		//Gif image restart END


		//Hover items BEGIN
		const hoverItems = () => {
			const items = $(".portfolio__item");

			if ( items.length ) {
				items.hover( function() {

					$(this).addClass("portfolio__item_show");
					gifView( $(this), "show" );

				}, function () {
					$(this).removeClass("portfolio__item_show");
					gifView( $(this), "hide" );

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



	//Custom cursor BEGIN
	const customCursor = () => {
		const cursor = $(".custom-cursor");
		const hoverElements = $("a, .btn, input, textarea, .portfolio__item, .popup__close");

		//Functions BEGIN
		const mouseX = (e) => {
			return e.clientX;
  	};

		const mouseY = (e) => {
			return e.clientY;
		};
		
		const positionElement = (e) => {
			const mouse = {
		    x: mouseX(e),
		    y: mouseY(e)
		  };

		  cursor.css({
		  	"top": mouse.y + "px",
		  	"left": mouse.x + "px",
		  })
		};
		//Functions END

		if ( cursor.length ) {
			let timerMouse = false;

			$(document).mousemove(function(e) {
				cursor.addClass("custom-cursor_visible");

			  timerMouse = setTimeout(() => {
			    positionElement(e);
			  }, 1);
			});
		}

		if ( hoverElements.length ) {
			hoverElements.hover(function() {
				cursor.addClass("custom-cursor_hover");
			}, function() {
				cursor.removeClass("custom-cursor_hover");
			});
		}
	};
	//Custom cursor END



	// -- Initialization work functions BEGIN
	const initializationFunctions = () => {
		preloader();
		formElements()
		popups();
		progressBar();
		wowJs();
		portfolioSection();
		if ( $(window).width() > breakpoints.lg ) customCursor();
	};

	if ( isIE >= 10 ) initializationFunctions();
	// -- Initialization work functions END

});