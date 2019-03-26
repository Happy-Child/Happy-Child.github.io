"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {

	//Slider arrows
	var sliderArrow = "\n\t\t<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 492 492\" xml:space=\"preserve\">\n\t\t\t<g>\n\t\t\t\t<g>\n\t\t\t\t\t<path d=\"M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124 c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844 L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412 c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008 c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788 C492,219.198,479.172,207.418,464.344,207.418z\"/>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</svg>\n\t";
	//

	//Common functions START
	//Cut all letters START
	var fnCutLetters = function fnCutLetters(_this) {
		var newStr = '';
		var str = _this.val();
		var length = _this.val().length;
		var control = 0;

		for (var i = 0; i < length; i++) {
			var chr = str.substring(i, i + 1);

			if (/[0-9]/.test(chr)) {
				newStr = newStr + chr;
			} else {
				if (!control) {
					control = 1;
				}
			}
		}

		_this.val(newStr);
		_this.focus();
	};
	//Cut all letters END

	//Check list length START
	var checkListLength = function checkListLength(list, maxLength, btnShowList) {
		if (list.length && btnShowList.length && typeof maxLength === "number") {
			var listItemLength = list.find("li").length;
			var customBtnText = btnShowList.text();
			var btnTextControl = 1;

			btnShowList.click(function () {
				var dropDownList = list.find("ul");
				list.find("ul").slideToggle();

				if (dropDownList.css("display") == "block" && btnTextControl) {
					btnShowList.text("Скрыть");
					btnTextControl = 0;
				} else {
					btnShowList.text(customBtnText);
					btnTextControl = 1;
				}
			});

			if (listItemLength > maxLength) {
				btnShowList.show();

				var itemsHideList = list.find("li").splice(maxLength);
				var hideList = document.createElement("ul");

				hideList.append.apply(hideList, _toConsumableArray(itemsHideList));
				list.append(hideList);
			}
		}
	};
	//Check list length END
	//Common functions END


	//Check list items length (testimonials comments - product card page, selected products - checkout page)
	var checkListItemsLength = function checkListItemsLength() {
		var testimonialsComments = {
			list: $(".wrap-all-testimonials .comments-list"),
			length: 2,
			btn: $(".wrap-all-testimonials .btn-view-all")
		};

		var selectedProducts = {
			list: $(".wrap-customer-data-bar .selected-products-list"),
			length: 2,
			btn: $(".wrap-customer-data-bar .btn-view-all")
		};

		checkListLength(testimonialsComments.list, testimonialsComments.length, testimonialsComments.btn);

		checkListLength(selectedProducts.list, selectedProducts.length, selectedProducts.btn);
	};
	//


	//Slider banner START//
	var presentsSlider = function presentsSlider() {
		var slider = $(".banner-slider");

		var sliderOptions = {
			dots: true,
			arrows: false,
			appendDots: $(".wrap-dots"),
			speed: 900,
			slidesToShow: 1,
			autoplay: true,
			autoplaySpeed: 7000
		};

		if (slider.length) {
			slider.slick(sliderOptions);
		}
	};
	//Slider banner END//


	//Slider article START//
	var articleSlider = function articleSlider() {
		var slider = $(".wrap-article-slider .article-slider");
		var sliderSpeed = 400;

		var sliderOptions = {
			dots: false,
			arrows: true,
			appendArrows: $(".wrap-article-slider .wrap-slider-arrows"),
			speed: sliderSpeed,
			prevArrow: "<span class=\"arrow-prev\">" + sliderArrow + "</span>",
			nextArrow: "<span class=\"arrow-next\">" + sliderArrow + "</span>",
			slidesToShow: 1,
			infinite: false
		};

		if (slider.length) {
			slider.slick(sliderOptions);
		}

		//Slider counter START
		var wrapCounter = $(".wrap-article-slider .wrap-slider-numbers");
		var sliderItemLength = $(".wrap-article-slider .slider-item").length;
		var sliderItemCur = $(".wrap-article-slider .slider-item.slick-current").index() + 1;
		var countSliderItemLength = $(".wrap-article-slider .slider-item-length");
		var countCurSliderPos = $(".wrap-article-slider .cur-slider-pos");

		var setNewCountTimer = void 0;

		if (wrapCounter.length) {
			//Set item length
			if (sliderItemLength < 10) sliderItemLength = "0" + sliderItemLength;
			countSliderItemLength.text(sliderItemLength);
			//

			//Set current position active slide
			if (sliderItemCur < 10) sliderItemCur = "0" + sliderItemCur;
			countCurSliderPos.text(sliderItemCur);
			//


			slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
				var newPos = nextSlide + 1;

				if (newPos < 10) newPos = "0" + newPos;

				clearTimeout(setNewCountTimer);
				setNewCountTimer = setTimeout(function () {
					countCurSliderPos.text(newPos);
				}, sliderSpeed / 2);
			});
		}
		//Slider counter END
	};
	//Slider article END//


	//Header START
	//Show drop down menu on click START
	var showDropdownMenu = function showDropdownMenu() {
		var items = $(".header-menu .nav-list > li");
		var showClass = "dropdown-active";

		if (items.length) {
			items.click(function (e) {
				e.preventDefault();

				var curItem = $(this);

				if (!curItem.hasClass(showClass)) {
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
	var headerFnInit = function headerFnInit() {
		showDropdownMenu();
	};
	//
	//Header END


	//Aside catalog START
	//Select items START
	var selectItems = function selectItems() {
		var itemsBrands = $(".list-brands ul li a");
		var itemsColors = $(".list-colors li a");
		var itemsSizes = $(".list-sizes li a");

		function selectFn(items) {
			if (items.length) {
				items.click(function (e) {
					e.preventDefault();
					$(this).toggleClass("active");
				});
			}
		}

		selectFn(itemsBrands);
		selectFn(itemsColors);
		selectFn(itemsSizes);
	};
	//Set items END

	//Slider range START
	var sliderRange = function sliderRange() {
		var range = $(".aside .wrap-range .range");
		var fields = $(".aside .wrap-fields input");
		var fieldMin = $(".aside .wrap-range .field-min");
		var fieldMax = $(".aside .wrap-range .field-max");
		var maxValue = $(".aside .wrap-range .range").attr("data-max-value");

		if (range.length) {
			range.slider({
				range: true,
				min: 0,
				max: maxValue,
				values: [0, maxValue],
				slide: function slide(event, ui) {
					var min = ("" + ui.values[0]).split("");
					var max = ("" + ui.values[1]).split("");

					if (min.length > 3) {
						min.splice(-3, 0, " ");
					}
					if (max.length > 3) {
						max.splice(-3, 0, " ");
					}

					fieldMin.val(min.join(""));
					fieldMax.val(max.join(""));
				}
			});
		}

		if (fields.length) {
			fields.on("keyup", function () {
				var cur = $(this);
				var curVal = +cur.val().replace(/\D+/g, "");

				fnCutLetters(cur);
				range.slider("option", "values", [fieldMin.val().replace(/\D+/g, ""), fieldMax.val().replace(/\D+/g, "")]);

				if (cur.hasClass("field-max") && curVal > maxValue) {
					cur.val(maxValue);
				} else if (cur.hasClass("field-min") && curVal > maxValue) {
					cur.val(0);
				}
			});
		}
	};
	//Slider range END

	//Init
	var asideCatalogFnInit = function asideCatalogFnInit() {
		selectItems();
		sliderRange();
	};
	//
	//Aside catalog END


	//Product card START
	//Card images START
	var cardImages = function cardImages() {
		var wrapThumbnailImages = $(".product-card-images .thumbnails-images");
		var wrapMainImages = $(".product-card-images .main-image");

		var thumbnailImages = wrapThumbnailImages.find(".wrap-img");
		var mainImages = wrapMainImages.find(".wrap-img");

		var activeClass = "cur-image";

		if (thumbnailImages.length && mainImages.length) {
			thumbnailImages.click(function () {
				var curThumb = wrapThumbnailImages.find(activeClass);

				var nextIndex = $(this).index();
				thumbnailImages.removeClass(activeClass).eq(nextIndex).addClass(activeClass);
				mainImages.removeClass(activeClass).eq(nextIndex).addClass(activeClass);
			});
		}
	};
	//Card images END


	//Description slider START
	var descriptionSlider = function descriptionSlider() {
		var slider = $(".description-slider");

		var sliderOptions = {
			dots: false,
			arrows: true,
			appendArrows: $(".wrap-description-slider .wrap-slider-arrows"),
			speed: 550,
			slidesToShow: 4,
			prevArrow: "<span class=\"arrow-prev\">" + sliderArrow + "</span>",
			nextArrow: "<span class=\"arrow-next\">" + sliderArrow + "</span>",
			infinite: false,
			variableWidth: true
		};

		if (slider.length) {
			slider.slick(sliderOptions);
		}
	};
	//Description slider END


	//Init
	var productCardFnInit = function productCardFnInit() {
		cardImages();
		descriptionSlider();
	};
	//Product card END


	//Drop down lists START
	var toggleDropdownLists = function toggleDropdownLists() {
		var btnsControl = $(".btn-dropdown");

		if (btnsControl.length) {
			btnsControl.click(function () {
				var curBtn = $(this);
				var curList = curBtn.parent().next("ul");
				curBtn.toggleClass("btn-dropdown-active");

				if (!!curList) {
					curList.slideToggle(400);
				}
			});
		}
	};
	//Drop down lists END


	//Tabs START
	var tabs = function tabs() {
		var tabsBtns = $(".section-tabs .tab-btn");

		if (tabsBtns.length) {
			tabsBtns.click(function () {
				if (!$(this).hasClass("cur-tab-btn")) {
					var key = $(this).attr('data-tab-key');

					$(this).closest('.section-tabs').find('.tab-btn, .tab-content').removeClass('cur-tab-btn cur-tab-content');
					$(this).addClass('cur-tab-btn').closest('.section-tabs').find("div[data-tab-key=" + key + "]").addClass('cur-tab-content');
				}
			});
		}
	};
	//Tabs END


	//Shop functional START
	//Product counter START
	var productCounter = function productCounter() {
		var btnLess = $(".wrap-product-count .btn-counter-less");
		var btnPlus = $(".wrap-product-count .btn-counter-plus");
		var fields = $(".wrap-product-count input");

		function lessPlusCount(context, status) {
			var input = context.parent().find("input");
			var curVal = input.val();

			if (status === "less" && curVal > 1) input.val(+curVal - 1);else if (status === "plus") input.val(+curVal + 1);
		}

		if (btnLess.length && btnPlus.length) {
			btnLess.click(function () {
				lessPlusCount($(this), "less");
			});

			btnPlus.click(function () {
				lessPlusCount($(this), "plus");
			});
		}
	};
	//Product counter END


	//Cut letters fields START
	var cutLettersFields = function cutLettersFields() {
		var fieldsCutLetters = $(".field-cut-letters");

		fieldsCutLetters.on("keyup", function () {
			fnCutLetters($(this));
		});
	};
	//Cut letters fields END


	var shopFunctionalFnInit = function shopFunctionalFnInit() {
		productCounter();
		cutLettersFields();
	};
	//Shop functional END


	//Form functional START
	//Clear fields START
	var clearField = function clearField() {
		var wrapFields = $(".wrap-field-clear");
		var btnClear = wrapFields.find(".btn-clear-field");

		if (wrapFields.length && btnClear.length) {
			btnClear.click(function () {
				$(this).closest(".wrap-field-clear").find("input").val("");
			});
		}
	};
	//Clear fields END


	//Clear fields START
	var customSelect = function customSelect() {
		var select = $("select");

		if (select.length) {
			select.select2();

			$(".wrap-select-personal-area select").select2({
				placeholder: "Тема обращения",
				dropdownParent: $('.wrap-select-personal-area')
			});
		}
	};
	//Clear fields END


	//Custom datapicker START
	var customDatepicker = function customDatepicker() {
		$(".wrap-field-date input").datepicker({
			format: "dd.mm.yyyy",
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
		});
	};
	//Custom datapicker END


	//Init
	var formFunctionalFnInit = function formFunctionalFnInit() {
		clearField();
		customSelect();
		customDatepicker();
	};
	//Form functional END


	//Parse string shop name on posts news page START
	var parseShopName = function parseShopName() {
		var strs = $(".posts-news-items .news-item-banner .shop-name");
		var delimiter = /\s*\|\s*/;

		if (strs.length) {
			strs.each(function () {
				var arrWords = strs.text().split(delimiter);
				var firstWord = "<span>" + arrWords[0] + "</span>";
				var secondWord = "<span>" + arrWords[1] + "</span>";
				console.log(arrWords);
			});
		}
	};
	//Parse string shop name on posts news page END


	//Scrollbar product list drop down cart START
	var scrollbarListDropDownCart = function scrollbarListDropDownCart() {
		var block = $(".dropdown-cart .selected-products-list");

		if (block.length) {

			block.mCustomScrollbar({
				theme: "dark"
			});
		}
	};
	//Scrollbar product list drop down shop END


	//Dropdown button click START
	var dropdownBtnClick = function dropdownBtnClick() {
		var btns = $(".dropdown-btn-click");

		if (btns.length) {
			btns.click(function () {
				$(this).parent().find(".dropdown-label").addClass("el-show");
			});
		}
	};
	//Dropdown button click END


	//Button close dropdown saved address block START
	var btnClose = function btnClose() {
		var btns = $(".btn-close-dropdown");

		if (btns.length) {
			btns.click(function () {
				$(this).parent().removeClass("el-show");
			});
		}
	};
	//Button close dropdown saved address block END


	//Personal area START
	//Check delivery list length START
	var checkDeliveryListLength = function checkDeliveryListLength() {
		var lists = $(".wrap-personal-data .personal-data-history-orders .delivery-list");
		var maxLength = 5;
		var classForItemCountOtherProduct = "other-product";

		if (lists.length) {
			lists.each(function () {

				var itemsLength = $(this).find("li").length;

				if (itemsLength > maxLength) {
					var curItems = $(this).find("li");
					var diff = itemsLength - maxLength;
					var itemCountOtherProduct = curItems.eq(0).clone().empty().append("<span></span>").text("+" + diff).addClass(classForItemCountOtherProduct);

					var viewProduct = curItems.splice(0, maxLength);
					$(this).empty().append(viewProduct, itemCountOtherProduct);
				}
			});
		}
	};
	//Check delivery list length END	


	//Init
	var personalAreaFnInit = function personalAreaFnInit() {
		checkDeliveryListLength();
	};
	//
	//Personal area END


	//Windows modal START
	// // START
	var btnModalShow = function btnModalShow() {
		var btns = $(".btn-modal-show");

		if (btns.length) {
			btns.click(function (e) {

				e.preventDefault();
				var modalKey = $(this).attr("href");

				$(".modal-testimonial").arcticmodal({
					closeOnEsc: false
				});
			});
		}
	};
	// // END


	// // START
	// const = () => {

	// };
	// // END


	// // START
	// const = () => {

	// };
	// // END


	//Init
	var windowsModalFnInit = function windowsModalFnInit() {
		btnModalShow();
	};
	//
	//Windows modal END


	//Init START//
	var scriptsInit = function scriptsInit() {
		presentsSlider();
		headerFnInit();
		toggleDropdownLists();
		asideCatalogFnInit();
		productCardFnInit();
		checkListItemsLength();
		tabs();
		formFunctionalFnInit();
		shopFunctionalFnInit();
		scrollbarListDropDownCart();
		dropdownBtnClick();
		btnClose();
		articleSlider();
		personalAreaFnInit();
		windowsModalFnInit();
		// parseShopName();
	};
	//Init END//


	//***************//
	scriptsInit();
	//**************//
});