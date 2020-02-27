"use strict";

$(function () {

//Slider arrows
	const sliderArrow = `
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" xml:space="preserve">
			<g>
				<g>
					<path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124 c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844 L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412 c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008 c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788 C492,219.198,479.172,207.418,464.344,207.418z"/>
				</g>
			</g>
		</svg>
	`;
//

//Common functions START
	//Cut all letters START
	const fnCutLetters = function (_this) {
		let newStr = '';
		const str = _this.val();
		const length = _this.val().length;
		let control = 0;

		for (let i = 0; i < length; i++) {
			const chr = str.substring(i, i+1);

			if (/[0-9]/.test(chr)) {   
				newStr = newStr + chr;
			}
			else {
				if (!control) {
					control = 1;
				}
			}
		}

		_this.val(newStr);
		_this.focus();
	}
	//Cut all letters END

	//Check list length START
	const checkListLength = function (list, maxLength, btnShowList, pushTextItemsLength) {
		if ( list.length && btnShowList.length && typeof(maxLength) === "number" ) {
			const listItemLength = list.find("li").length;
			let btnTextControl = 1;
			let itemsHideList;
			let customBtnText;

			if ( listItemLength > maxLength ) {
				btnShowList.show();

				itemsHideList = list.find("li").splice(maxLength);
				const hideList = document.createElement("ul");

				hideList.append(...itemsHideList);
				list.append(hideList);

				if ( !!pushTextItemsLength ) {
					const text = btnShowList.find("span");
					text.text(itemsHideList.length);
				}
			}


			customBtnText = btnShowList.text();
			
			btnShowList.click(function () {
				const dropDownList = list.find("ul");
				list.find("ul").slideToggle();

				if ( dropDownList.css("display") == "block" && btnTextControl ) {
					btnShowList.text("Скрыть");
					btnTextControl = 0;
				} else {
					btnShowList.text(customBtnText);
					btnTextControl = 1;
				}
			});
		}
	};
	//Check list length END
//Common functions END


//Check list items length (testimonials comments - product card page - catalog page)
	const checkTestimonialsListItemsLength = () => {
		const listTestimonialsCommentsParam = {
			list: $(".wrap-all-testimonials .comments-list"),
			length: 2,
			btn: $(".wrap-all-testimonials .btn-view-all")
		};

		checkListLength(
			listTestimonialsCommentsParam.list,
			listTestimonialsCommentsParam.length,
			listTestimonialsCommentsParam.btn,
			true
		);

		const listFiltersParam = {
			list: $(".wrap-aside .list-category"),
			length: 6,
			btn: $(".wrap-aside .list-category").next(".btn-view-all"),
		};

		checkListLength(
			listFiltersParam.list,
			listFiltersParam.length,
			listFiltersParam.btn,
			true
		);
	}
//

//Checkout page bar START
	//Selected list products parameters START 
	const listSelectedProductsParam = {
		list: $(".wrap-customer-data-bar .selected-products-list"),
		length: 1,
		btn: $(".wrap-customer-data-bar .btn-view-all")
	};
	//Selected list products parameters END


	//List selected products bar ( 575 > n < 991 ) START
	const listSelectedProductsBar = () => {
		const list = $(".wrap-customer-data-bar .selected-products-list");

		if ( list.length ) {
			list.mCustomScrollbar({
				theme: "dark",
			});
		}
	};
	//List selected products bar ( 575 > n < 991 ) END


	//Init
	const checkoutPageFnInit = () => {
		if ( $(window).width() < 575 || $(window).width() > 991  ) {
			checkListLength(
				listSelectedProductsParam.list,
				listSelectedProductsParam.length,
				listSelectedProductsParam.btn
			);
		} else {
			listSelectedProductsBar();
		}
	};
//Checkout page bar END


//Slider banner START//
	const sliderBanner = () => {
		const slider = $(".banner-slider");

		const sliderOptions = {
			dots: true,
			arrows: true,
			appendDots: $(".banner .wrap-slider-dots"),
			appendArrows: $(".banner .wrap-slider-arrows"),
			speed: 900,
			prevArrow: `<span class="arrow-prev">${sliderArrow}</span>`,
			nextArrow: `<span class="arrow-next">${sliderArrow}</span>`,
			slidesToShow: 1,
			autoplay: true,
			autoplaySpeed: 7000,
		};

		if ( slider.length ) {
			slider.slick(sliderOptions);
		}
	};
//Slider banner END//


//Slider products cards on index page START//
	const sliderProductsIndex = () => {
		const slider = $(".index-products-cards-slider .slider");

		const sliderOptions = {
			dots: true,
			arrows: false,
			appendDots: $(".index-products-cards-slider .wrap-slider-dots"),
			speed: 600,
			slidesToShow: 1,
			variableWidth: true,
			centerMode: true,
			infinite: false
		};

		if ( slider.length && $(window).width() < 575 ) {
			slider.slick(sliderOptions);
		}
	};
//Slider products cards on index page END//


//Slider brands row on index page START//
	const sliderBrandsRow = () => {
		const slider = $(".brand-slider");

		const sliderOptions = {
			dots: true,
			arrows: false,
			appendDots: $(".row-brands .wrap-slider-dots"),
			speed: 900,
			slidesToShow: 3,
		};

		if ( slider.length && $(window).width() < 767 ) {
			slider.slick(sliderOptions);
		}
	};
//Slider brands row on index page END//


//Slider article START//
	const articleSlider = () => {
		const slider = $(".wrap-article-slider .article-slider");
		const sliderSpeed = 400;

		const sliderOptions = {
			dots: false,
			arrows: true,
			appendArrows: $(".wrap-article-slider .wrap-slider-arrows"),
			speed: sliderSpeed,
			prevArrow: `<span class="arrow-prev">${sliderArrow}</span>`,
			nextArrow: `<span class="arrow-next">${sliderArrow}</span>`,
			slidesToShow: 1,
			infinite: false
		};

		if ( slider.length ) {
			slider.slick(sliderOptions);
		}

		//Slider counter START
		const wrapCounter = $(".wrap-article-slider .wrap-slider-numbers");
		let sliderItemLength = $(".wrap-article-slider .slider-item").length;
		let sliderItemCur = $(".wrap-article-slider .slider-item.slick-current").index() + 1;
		const countSliderItemLength = $(".wrap-article-slider .slider-item-length");
		const countCurSliderPos = $(".wrap-article-slider .cur-slider-pos");

		let setNewCountTimer;


		if ( wrapCounter.length ) {
			//Set item length
			if ( sliderItemLength < 10 ) sliderItemLength = "0" + sliderItemLength;
			countSliderItemLength.text(sliderItemLength);
			//

			//Set current position active slide
			if ( sliderItemCur < 10 ) sliderItemCur = "0" + sliderItemCur;
			countCurSliderPos.text(sliderItemCur);
			//

			
			slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
				let newPos = nextSlide + 1;

				if ( newPos < 10 ) newPos = "0" + newPos;

				clearTimeout(setNewCountTimer);
				setNewCountTimer = setTimeout(function () {
					countCurSliderPos.text(newPos);
				}, sliderSpeed / 2);

			});
		}
		//Slider counter END
	}
//Slider article END//


//Header START
	//Show drop down menu on click START
	const showDropDownMenu = () => {
		const items = $(".header-menu .nav-list > li");
		const showClass = "dropdown-active";

		if ( items.length ) {
			items.click(function (e) {
				e.preventDefault();

				const curItem = $(this);

				if ( !curItem.hasClass(showClass) ) {
					items.removeClass(showClass);
					curItem.addClass(showClass);
				} else {
					items.removeClass(showClass);
				}
			});
		}
	};
	//Show drop down menu on click END

	//Init
	const headerFnInit = () => {
		showDropDownMenu();
	};
	//
//Header END


//Mobile menu START
	//Mobile menu START
	const mobileMenu = function () {
		const $menu = $(".mobile-menu");

		let menuOption = {
			"extensions": [
				"position-front"
			],
		  navbar: {
		    title: ""
		  }
		}

		if ( $menu.length ) {
			$menu.mmenu(menuOption);

			const $menuAPI = $menu.data( "mmenu" );
			const $btnOpen = $(".header-center-line .wrap-menu-btn .icon");
			const $btnClose = $(".mobile-menu .btn-close");
			const $btnMenuSingIn = $(".mobile-menu_header a");

			$btnOpen.click(function() {
		  	$menuAPI.open();
		  	$btnOpen.toggleClass("is-active");
			});

			$btnClose.click(function() {
		  	$menuAPI.close();
		  	$btnOpen.toggleClass("is-active");
			});

			$btnMenuSingIn.click(function() {
		  	$menuAPI.close();
		  	$btnOpen.toggleClass("is-active");
			});
		  
			//Push title && btn close in submenu menu START
			const title = $(".mobile-menu .title-dropdown-menu");
			const panels = $(".mobile-menu .mm-panels> .mm-panel:not(:first-child)");

			if ( title.length ) {
				panels.each(function () {
					const pushTitle = title.clone();
					const pushBtnClose = $btnClose.clone();
					$(this).prepend( pushTitle ).prepend( pushBtnClose );
				});
			}
			//Push title && btn close in submenu menu END


			//Btn close in panels START
			const $btnClosePanel = panels.find(".btn-close");
			
			$btnClosePanel.click(function() {
		  	$menuAPI.close();
		  	$btnOpen.toggleClass("is-active");
			});
			//Btn close in panels END

		}
	};
	//Mobile menu END


	//Mobile menu add class item click START
	const mobileMenuAddClassItem = function () {
		const items = $(".mobile-menu .mm-panels > div:first-child ul li .mm-btn");

		if ( items.length ) {
			items.click(function () {
				$(this).parent().siblings().removeClass("active");
				$(this).parent().addClass("active");
			});
		}
	};
	//Mobile menu add class item click END


	//Drop down submenu toggle START
	const dropDownSubmenuToggle = () => {
		const itemsDropDown = $(".mobile-menu .has-dropdown .submenu-dropdown-title");

		if ( itemsDropDown.length ) {
			itemsDropDown.click(function () {
				const curUl = $(this).next("ul");

				itemsDropDown.removeClass("submenu-dropdown-title_active");

				$(this)
					.addClass("submenu-dropdown-title_active")
					.closest(".has-dropdown")
					.siblings()
					.find(".submenu-dropdown")
					.slideUp(400);

				if ( curUl.css("display") !== "none" ) {
					curUl.slideUp(400);
					itemsDropDown.removeClass("submenu-dropdown-title_active");
				} else {
					curUl.slideDown(400);
				}

			});
		}
	};
	//Drop down submenu toggle END


	//Init
	const mobileMenuFnInit = () => {
		mobileMenu();
		mobileMenuAddClassItem();
		dropDownSubmenuToggle();
	};
	//
//Mobile menu END


//Aside catalog START
	//Select items START
	const selectItems = () => {
		const itemsBrands = $(".list-brands ul li a");
		const itemsColors = $(".list-colors li a");
		const itemsSizes = $(".list-sizes li a");

		function selectFn (items) {
			if ( items.length ) {
				items.click(function (e) {
					e.preventDefault();
					$(this).toggleClass("active");
				});
			}
		}

		const brandsCheckbox = $(".aside .list-brands .wrap-checkbox input[type=checkbox]");
		if ( brandsCheckbox.length ) {
			brandsCheckbox.change(function() {
				if ( $(this).prop('checked') ) {
					$(this).parent().next("ul").find("a").addClass("active");
				} else {
					$(this).parent().next("ul").find("a").removeClass("active");
				}
			});
		}

		if ( itemsBrands.length ) {
			itemsBrands.click(function (e) {
				e.preventDefault();
				$(this).toggleClass("active");
				const curCheckbox = $(this).closest("ul").prev("div").find("input[type=checkbox]");
				const arr = $(this).closest("ul").find("a");
				const resultCheck = [];

				for ( let i = 0; i < arr.length; i++ ) {
					resultCheck[i] = arr.eq(i).hasClass("active");
				}

				const status = resultCheck.every(function(n) {
					return n == true;
				});

				if ( status ) {
					curCheckbox.prop( "checked", true );
				} else {
					curCheckbox.prop( "checked", false );
				}

				// if ( resultCheck ) {
				// 	console.log("all")
				// } else {
				// 	console.log("no")
				// }

			});
		}

		
		selectFn(itemsColors);
		selectFn(itemsSizes);
	};
	//Select items END

	//Slider range START
	const sliderRange = () => {
		const range = $(".aside .wrap-range .range");
		const fields = $(".aside .wrap-fields input");
		const fieldMin = $(".aside .wrap-range .field-min");
		const fieldMax = $(".aside .wrap-range .field-max");
		const maxValue = $(".aside .wrap-range .range").attr("data-max-value");

		if ( range.length ) {
			range.slider({
				range: true,
				min: 0,
				max: maxValue,
				values: [0, maxValue],
				slide: function (event, ui) {
					const min = ( "" + ui.values[0] ).split("");
					const max = ( "" + ui.values[1] ).split("");

					if ( min.length > 3 ) { min.splice(-3, 0, " ") }
					if ( max.length > 3 ) { max.splice(-3, 0, " ") }

					fieldMin.val( min.join("") );
					fieldMax.val( max.join("") );
				}
			});
		}

		if ( fields.length ) {
			fields.on("keyup", function () {
				const cur = $(this);
				const curVal = +(cur.val().replace(/\D+/g,""));

				fnCutLetters(cur);
				range.slider( "option", "values", [fieldMin.val().replace(/\D+/g,""), fieldMax.val().replace(/\D+/g,"")] );

				if ( cur.hasClass("field-max") && curVal > maxValue ) {
					cur.val(maxValue);
				} else if ( cur.hasClass("field-min") && curVal > maxValue ) {
					cur.val(0);
				}

			});
		}
	}
	//Slider range END


	//Button toggle aside START
	const btnToggleAside = () => {
		const btnShow = $(".btn-show-filter");
		const btnClose = $(".btn-hide-filter");
		const aside = $(".wrap-aside");

		if ( btnShow.length && btnClose.length && aside.length ) {
			btnShow.click(function () {
				$("html").addClass("fix-page");
				aside.addClass("aside-active");
			});

			btnClose.click(function () {
				$("html").removeClass("fix-page");
				aside.removeClass("aside-active");
			});
		}
	};
	//Button toggle aside END


	//Init
	const asideCatalogFnInit = () => {
		selectItems();
		sliderRange();
		btnToggleAside();
	};
	//
//Aside catalog END


//Product card START
	//Card images START
	const cardImages = () => {
		const wrapThumbnailImages = $(".product-card-images .thumbnails-images");
		const wrapMainImages = $(".product-card-images .main-image");

		const thumbnailImages = wrapThumbnailImages.find(".wrap-img");
		const mainImages = wrapMainImages.find(".wrap-img");

		const activeClass = "cur-image";

		if ( thumbnailImages.length && mainImages.length ) {
			thumbnailImages.click(function () {
				const curThumb = wrapThumbnailImages.find(activeClass);

				const nextIndex = $(this).index();
				thumbnailImages.removeClass(activeClass).eq(nextIndex).addClass(activeClass);
				mainImages.removeClass(activeClass).eq(nextIndex).addClass(activeClass);
			});
		}
	};
	//Card images END



	//Description slider START
	const descriptionSlider = () => {
		const slider = $(".description-slider");

		const sliderOptions = {
			dots: false,
			arrows: true,
			appendArrows: $(".wrap-description-slider .wrap-slider-arrows"),
			appendDots: $(".wrap-description-slider .wrap-slider-dots"),
			speed: 550,
			slidesToShow: 4,
			prevArrow: `<span class="arrow-prev">${sliderArrow}</span>`,
			nextArrow: `<span class="arrow-next">${sliderArrow}</span>`,
			infinite: false,
			variableWidth: true,
		  responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 3,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 2,
		      }
		    },
		    {
		      breakpoint: 576,
		      settings: {
		      	slidesToShow: 2,
		        dots: true,
		        arrows: false
		      }
		    },
		  ]
		};

		if ( slider.length ) {
			slider.slick(sliderOptions);
		}
	};
	//Description slider END


	//Scroll to comments - on click START
	const scrollToComments = () => {
		const btn = $(".wrap-comments-count");
		const block = $(".testimonials-card");

		if ( btn.length && block.length ) {
			btn.click(function () {

				const offsetBlock = block.offset().top;

				$([document.documentElement, document.body]).animate({
					scrollTop: offsetBlock
				}, 500);

			});
		}
	};
	//Scroll to comments - on click END


	//Init
	const productCardFnInit = () => {
		cardImages();
		descriptionSlider();
		scrollToComments();
	};
//Product card END


//Drop down lists START
	const toggleDropDownMainLists = () => {
		const btnsControl = $(".wrap-aside .filter-group_head.btn-dropdown");

		if ( btnsControl.length ) {
			btnsControl.click(function () {
				const curBtn = $(this);
				const curList = curBtn.next("ul");
				curBtn.find(".icon-dropdown").toggleClass("icon-dropdown-active");

				if ( !!curList ) { curList.slideToggle(400); }
			});
		}
	};

	const toggleDropDownSubLists = () => {
		const btnsControl = $(".wrap-aside .wrap-checkbox .btn-dropdown");

		if ( btnsControl.length ) {
			btnsControl.click(function () {
				const curBtn = $(this);
				const curList = curBtn.parent().next("ul");
				curBtn.toggleClass("btn-dropdown-active");

				if ( !!curList ) { curList.slideToggle(400); }
			});
		}
	};
//Drop down lists END


//Tabs START
	const tabs = () => {
		const tabsBtns = $(".section-tabs .tab-btn");

		if ( tabsBtns.length ) {
			tabsBtns.click( function() {
				if ( !$(this).hasClass("cur-tab-btn") ) {
					const key = $(this).attr('data-tab-key');

					$(this)
						.closest('.section-tabs')
						.find('.tab-btn, .tab-content')
						.removeClass('cur-tab-btn cur-tab-content');
					$(this)
						.addClass('cur-tab-btn')
						.closest('.section-tabs')
						.find(`div[data-tab-key=${ key }]`)
						.addClass('cur-tab-content');

				}
			});
		}
	}
//Tabs END



//Shop functional START
	//Product counter START
	const productCounter = () => {
		const btnLess = $(".wrap-product-count .btn-counter-less");
		const btnPlus = $(".wrap-product-count .btn-counter-plus");
		const fields = $(".wrap-product-count input");

		function lessPlusCount (context, status) {
			const input = context.parent().find("input");
			let curVal = input.val();

			if ( status === "less" && curVal > 1 ) input.val( +curVal - 1 );
			else if ( status === "plus" ) input.val( +curVal + 1 );
		}

		if ( btnLess.length && btnPlus.length ) {
			btnLess.click(function () {
				lessPlusCount( $(this), "less" );
			});

			btnPlus.click(function () {
				lessPlusCount( $(this), "plus" );
			});
		}
	};
	//Product counter END


	//Cut letters fields START
	const cutLettersFields = () => {
		const fieldsCutLetters = $(".field-cut-letters");
		
		fieldsCutLetters.on("keyup", function () {
			fnCutLetters( $(this) );
		});
	};
	//Cut letters fields END

	//Init
	const shopFunctionalFnInit = () => {
		productCounter();
		cutLettersFields();
	};
//Shop functional END


//Windows modal START
	//Init
	const windowsModalFnInit = () => {
		$(".window-modal").iziModal({
			transitionIn: 'fadeIn',
	    transitionOut: 'fadeOut',
	    bodyOverflow: true,
	    overlayClose: false,
	    onOpening: function(){
	    	$("html").addClass("fix-page");
	    	$("body").addClass("page-scroll");

	    	const modals = $(".modal-content");
				$(document).mouseup(function (e) {
					if (!modals.is(e.target) && modals.has(e.target).length === 0) {
						const curModal = $(".window-modal.isAttached");

						curModal.iziModal("close");
			    	$("html").removeClass("fix-page");
			    	$("body").removeClass("page-scroll");
					}
				});
	    },
		});

		const btnsClose = $(".window-modal .btn-close");

		if ( btnsClose.length ) {
			btnsClose.click(function () {
	    	$("html").removeClass("fix-page");
	    	$("body").removeClass("page-scroll");				
			});
		}
	};
	//
//Windows modal END



//Replace all SVG images with inline SVG START
const replaceSVGToInline = () => {
	let imgs = $('img[src$=".svg"]');

	if ( imgs.length ) {
		imgs.each(function(){
			let $img = jQuery(this);
			let imgID = $img.attr('id');
			let imgClass = $img.attr('class');
			let imgURL = $img.attr('src');

			jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				let $svg = jQuery(data).find('svg');
				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');
				$svg.find("> g").removeAttr("clip-path");
				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

		});
	}
};
//Replace all SVG images with inline SVG END





//Form functional START
	//Set mask START
	const fieldPhone = $("input[type=tel]");

	if ( fieldPhone.length ) {
		fieldPhone.mask("+375 00 000-00-00");
	}
	//Set mask END


	//Clear fields START
	const clearField = () => {
		const wrapFields = $(".wrap-field-clear");
		const btnClear = wrapFields.find(".btn-clear-field");

		if ( wrapFields.length && btnClear.length ) {
			btnClear.click(function () {
				$(this)
					.closest(".wrap-field-clear")
					.find("input")
					.val("");
			});
		}
	};
	//Clear fields END


	//Custom select START
	const customSelect = () => {
		const select = $("select");

		if ( select.length ) {
			select.each(function () {
				const placeholder = $(this).attr("placeholder");

				$(this).select2({
					dropdownParent: $(this).parent(),
					placeholder: placeholder
				});
			});
		}
	};
	//Custom select END


	//Custom datapicker START
	const customDatepicker = () => {
		$(".wrap-field-date input").datepicker({
			format: "dd.mm.yyyy",
		  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		  monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
		  'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		  days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
		  daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		  daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
		});
	};
	//Custom datapicker END


	//Change placeholder on mobile device END
	const changePlaceholderOnMobile = () => {
		const fields = $("input");

		if ( fields.length ) {
			fields.each(function () {
				const placeholder = $(this).attr("data-placeholder-mobile");

				if ( !!placeholder ) {
					$(this).attr("placeholder", placeholder);
				}
			});
		}
	};
	//Change placeholder on mobile device END


	//Init
	const formFunctionalFnInit = () => {
		clearField();
		customSelect();
		customDatepicker();
		if ( $(window).width() < 575 ) { changePlaceholderOnMobile(); }
	};
//Form functional END


//Form validate START
	const formValidate = () => {
		const forms = $(".form-validate");
		
		if ( forms.length ) {
			forms.each(function () {
				$(this).validate({
					rules: {
						firstname: "required",
						lastname: "required",
						country: "required",
						street: "required",
						message: "required",
						birthday: "required",
						noempty: "required",
						thememsg: "required",
						selectthememsg: "required",
						house: {
							required: true,
							minlength: 1,
							maxlength: 15,
							number: true
						},
						housing: {
							required: true,
							minlength: 1,
							maxlength: 15,
							number: true
						},
						apartment: {
							required: true,
							minlength: 1,
							maxlength: 15,
							number: true
						},
						username: {
							required: true,
							minlength: 2
						},
						password: {
							required: true,
							minlength: 5
						},
						confirm_password: {
							required: true,
							minlength: 5,
							equalTo: ".password",
						},
						number: {
							required: true,
							minlength: 1,
							maxlength: 15,
							number: true
						},
						phone: {
							minlength: 1,			
						},
						email: {
							email: true,
							equalTo: "Неверный формат"
						},
						agree: "required"
					},
				});
			});
		}		
	};
//Form validate END


//Parse string shop name on posts news page START
	const parseShopName = () => {
		const strs = $(".posts-news-items .news-item-banner .shop-name");
		const delimiter = /\s*\|\s*/;

		if ( strs.length ) {
			strs.each(function () {
				const text = $(this).text();
				const arrWords = text.split(' ');
				
				$(this).text("");

				arrWords.forEach( (cur) => {
					$(this).append(`<span>${cur}</span>`);
				});
			});
		}


	};
//Parse string shop name on posts news page END


//Scrollbar product list drop down cart START
	const scrollbarListDropDownCart = () => {
		const block = $(".dropdown-cart .selected-products-list");

		if ( block.length ) {

			block.mCustomScrollbar({
				theme: "dark",
			});
		}

	};
//Scrollbar product list drop down shop END


//Drop down button click START
	const dropDownBtnClick = () => {
		const btns = $(".dropdown-btn-click");

		if ( btns.length ) {
			btns.click(function () {
				console.log("AWfsd0");
				$(this).parent().find(".dropdown-label").toggleClass("el-show");
			});
		}
	};
//Drop down button click END


//Button close drop down saved address block START
	const btnClose = () => {
		const btns = $(".btn-close-dropdown");

		if ( btns.length ) {
			btns.click(function () {
				$(this).parent().removeClass("el-show");
			});
		}
	};
//Button close drop down saved address block END


//Personal area START
	//Check delivery list length START
	const checkDeliveryListLength = () => {
		const lists = $(".wrap-personal-data .personal-data-history-orders .delivery-list");
		const classForItemCountOtherProduct = "other-product";

		let maxLength = 5;
		if ( $(window).width() > 575 && $(window).width() < 767 ) maxLength = 3;
		else if ( $(window).width() > 767 && $(window).width() < 991 ) maxLength = 2;
		else if ( $(window).width() > 991 && $(window).width() < 1199 ) maxLength = 4;

		if ( lists.length ) {
			lists.each(function () {

				const curItems = $(this).find("li");
				const itemsLength = curItems.length;

				if ( itemsLength > maxLength ) {
					const diff = itemsLength - maxLength;

					for (let i = maxLength; i < itemsLength; i++) {
						curItems.eq(i).addClass("hide-item");
					}

					const itemCountOtherProduct =
						curItems
							.eq(0)
							.clone()
							.empty()
							.append(`<span class='${classForItemCountOtherProduct}'>+ ${diff}</span>`);

					$(this).append(itemCountOtherProduct);
				}

			});
		}

		const btnShowList = $(`
			.wrap-personal-data
			.personal-data-history-orders
			.delivery-list
			.other-product`)
			.parent();

		if ( btnShowList.length ) {
			btnShowList.click(function () {
				$(this).hide().parent().find("li").removeClass("hide-item");
			});
		}
	};
	//Check delivery list length END	


	//Drop down tabs on mobile devise START
	const dropDownTabsOnMobile = () => {
		const curTab = $(".wrap-personal-area-bar .wrap-dropdown-tabs .wrap-cur-tab");
		const dropdown = curTab.next("div");
		const toggleClassCurTab = "wrap-cur-tab_active";
		const dropDownTabs = dropdown.find(".tab-btn");

		if ( curTab.length && dropdown.length ) {
			curTab.click(function () {
				$(this).toggleClass(toggleClassCurTab);
			});

			dropDownTabs.click(function () {
				const newText = $(this).text();
				curTab
					.removeClass(toggleClassCurTab)
					.text(newText);
			});
		}
	};
	//Drop down tabs on mobile devise END


	//Init
	const personalAreaFnInit = () => {
		checkDeliveryListLength();
		dropDownTabsOnMobile();
	};
	//
//Personal area END


//Toggle icon like START
	const toggleIconLike = () => {
		const btns = $(".wrap-icon-like");
		const className = "liked";

		if ( btns.length ) {
			btns.click(function () {
				$(this).toggleClass(className);
			});
		}
	};
//Toggle icon like END



//Preloader START
	const preloader = function () {
		const preloader = $(".preloader");

		if ( preloader.length ) {
			$(document).ready(function () {
				
				setTimeout(function () {
					preloader.fadeOut(400)
				}, 600);

			});
		}
	};
//Preloader END


//Init START//
	const scriptsInit = () => {
		replaceSVGToInline();
		sliderBanner();
		sliderBrandsRow();
		sliderProductsIndex();
		if ( $(window).width() < 767 ) { mobileMenuFnInit(); }
		// headerFnInit();
		toggleDropDownMainLists();
		toggleDropDownSubLists();
		asideCatalogFnInit();
		productCardFnInit();
		checkTestimonialsListItemsLength();
		tabs();
		formFunctionalFnInit();
		shopFunctionalFnInit();
		scrollbarListDropDownCart();
		dropDownBtnClick();
		btnClose();
		articleSlider();
		personalAreaFnInit();
		toggleIconLike();

		setTimeout(function () {
			windowsModalFnInit();
			formValidate();
		}, 50);

		checkoutPageFnInit();
		preloader();
		parseShopName();
	};
//Init END//



//***************//
scriptsInit();
//**************//

});