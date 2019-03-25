"use strict";

$(function () {

	//Custom function
	//Check size (if window size > size => true)
	var checkWidth = function checkWidth(size) {
		var windowWidth = $(window).width();
		if (windowWidth > size) return true;else return false;
	};
	//end Check size

	//Drop down lists START
	var dropdownList = function dropdownList() {
		var dropdownBtns = $(".dropdown-btn");

		if (dropdownBtns.length) {
			dropdownBtns.click(function (e) {
				e.preventDefault();

				var cur = $(this).parent();
				var allBtns = cur.parent().parent().find(".dropdown-btn");
				var allLists = cur.parent().parent().find(".dropdown-content");
				var curList = cur.next(".dropdown-content");

				if (curList.css("display") === "block") {
					allLists.slideUp(400);
					cur.removeClass("dropdown-active");
				} else {
					allBtns.parent().removeClass("dropdown-active");
					allLists.slideUp(400);
					cur.addClass("dropdown-active");
					curList.slideDown(400);
				}
			});
		}
	};
	//Drop down lists END
	//


	//Menu
	//Check dropdown menu items
	var checkDropdownItems = function checkDropdownItems() {
		if ($(".bottom-line-nav-content > ul > li").length) {

			$(".bottom-line-nav-content > ul > li").each(function () {
				var count = 0;

				$(this).find("li").each(function () {
					count++;
					if (count > 4) {
						$(this).closest(".wrap-dropdown").addClass("dropdown-bg-white");
						return 1;
					}
				});
			});
		} //if end
	};
	//

	//Flex menu
	var flexMenu = function flexMenu() {
		var menu = $(".main-header .bottom-line-nav-content ul");

		if (menu.length) {
			menu.flexMenu({
				linkText: "Ещё"
			});
		}
	};
	//


	//Mobile menu START
	var mobileMenuInit = function mobileMenuInit() {
		var $menu = $(".mobile-menu");
		var $btn = $(".header-fixed .wrap-full-menu-btn .menu-icon");

		var menuOption = {
			"extensions": ["position-front"],
			navbar: {
				title: ""
			}
		};

		if ($(window).width() > 768) {
			menuOption.columns = true;
		}

		if ($menu.length && $btn.length) {
			$menu.mmenu(menuOption);

			var $menuAPI = $menu.data("mmenu");

			$btn.click(function () {
				if ($btn.hasClass("is-active")) $menuAPI.close();else {
					$menuAPI.open();
				}
				$btn.toggleClass("is-active");
			});
		}
	};
	//Mobile menu END

	//Mobile menu items click START
	var mobileMenuItemsClick = function mobileMenuItemsClick() {
		var items = $(".mobile-menu .main-item .mm-btn");

		if (items.length) {
			items.click(function () {
				items.parent().removeClass("main-item-active");
				$(this).parent().addClass("main-item-active");
			});
		}
	};
	//Mobile menu item click END

	//Init
	var menuLogic = function menuLogic() {
		checkDropdownItems();
		flexMenu();
		if ($(window).width() < 992) {
			mobileMenuInit();
			mobileMenuItemsClick();
		}
	};
	//
	//


	//Header fixed
	var headerFixed = function headerFixed() {
		var headerFixed = $(".header-fixed");
		var mainHeader = $(".main-header");
		var mainHeaderHeight = mainHeader.outerHeight(true);

		if (headerFixed.length && mainHeader.length) {

			$(window).resize(function () {
				if (checkWidth(1400) || !checkWidth(1400) || !checkWidth(1200) || !checkWidth(992)) {
					mainHeaderHeight = mainHeader.outerHeight(true);
				}
			});

			$(window).scroll(function () {

				if ($(window).scrollTop() >= mainHeaderHeight) {
					headerFixed.addClass("header-fixed-active");
					mainHeader.addClass("header-hide");
				} else {
					headerFixed.removeClass("header-fixed-active");
					mainHeader.removeClass("header-hide");
				}
			});
		} //if end
	};
	//


	//Sidebar navigation fixed
	var fixedSidebarNav = function fixedSidebarNav() {
		var navSidebar = $(".nav-sidebar:not(.wrap-page-banner-nav)");

		if (navSidebar.length) {

			navSidebar.stick_in_parent({
				inner_scrolling: true,
				offset_top: 100
			});
		} //if end
	};
	//


	//Custom scrollbar
	//Scrollbar section garant result
	var setScrollbarGarantResult = function setScrollbarGarantResult() {
		var block = $(".sec-srcoll .wrap-text");

		if (block.length) {

			block.mCustomScrollbar({
				theme: "dark"
			});
		} //if end
	};
	//


	//Scrollbar section blue list yellow result
	var setScrollbarSecBlueYellowList = function setScrollbarSecBlueYellowList() {
		var block = $(".blue-sec-list-yellow .wrap-lists");

		if (block.length && $(window).width() < 576) {

			block.mCustomScrollbar({
				theme: "dark"
			});
		} //if end
	};
	//


	//Scrollbar table causes
	var setScrollbarTable = function setScrollbarTable() {
		var block767 = $(".wrap-table-x-custom-scroll-767");
		var block991 = $(".wrap-table-x-custom-scroll-991");

		if (block767.length && $(window).width() < 767) {

			block767.mCustomScrollbar({
				theme: "dark",
				scrollButtons: {
					enable: true
				},
				axis: "x"
			});

			var btnsScroll = $(".wrap-table-x-custom-scroll .mCSB_scrollTools > a");

			if (btnsScroll.length) {
				btnsScroll.html("<svg width=\"6\" height=\"10\" viewBox=\"0 0 6 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M1.09267 9.90012L5.89687 5.23037C5.96559 5.16366 6 5.0869 6 5.00007C6 4.91324 5.96559 4.83634 5.89687 4.76959L1.09267 0.100236C1.02385 0.0333418 0.944879 0 0.855507 0C0.766172 0 0.687092 0.033447 0.618412 0.100236L0.103092 0.601134C0.0343757 0.667923 3.52859e-05 0.744785 3.52859e-05 0.831614C3.52859e-05 0.918443 0.0343757 0.995304 0.103092 1.06209L4.15466 5.00007L0.102839 8.93819C0.0341229 9.00494 -4.76837e-07 9.08184 -4.76837e-07 9.16853C-4.76837e-07 9.2555 0.0343394 9.33236 0.102839 9.39911L0.618376 9.90008C0.687056 9.96683 0.766172 10 0.855471 10C0.944878 10 1.02396 9.96687 1.09267 9.90012Z\" fill=\"#292929\"/>\n\t\t\t\t</svg>\n\t\t\t\t");
			}
		} else if (block991.length && $(window).width() < 991) {

			block991.mCustomScrollbar({
				theme: "dark",
				scrollButtons: {
					enable: true
				},
				axis: "x"
			});

			var _btnsScroll = $(".wrap-table-x-custom-scroll .mCSB_scrollTools > a");

			if (_btnsScroll.length) {
				_btnsScroll.html("<svg width=\"6\" height=\"10\" viewBox=\"0 0 6 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M1.09267 9.90012L5.89687 5.23037C5.96559 5.16366 6 5.0869 6 5.00007C6 4.91324 5.96559 4.83634 5.89687 4.76959L1.09267 0.100236C1.02385 0.0333418 0.944879 0 0.855507 0C0.766172 0 0.687092 0.033447 0.618412 0.100236L0.103092 0.601134C0.0343757 0.667923 3.52859e-05 0.744785 3.52859e-05 0.831614C3.52859e-05 0.918443 0.0343757 0.995304 0.103092 1.06209L4.15466 5.00007L0.102839 8.93819C0.0341229 9.00494 -4.76837e-07 9.08184 -4.76837e-07 9.16853C-4.76837e-07 9.2555 0.0343394 9.33236 0.102839 9.39911L0.618376 9.90008C0.687056 9.96683 0.766172 10 0.855471 10C0.944878 10 1.02396 9.96687 1.09267 9.90012Z\" fill=\"#292929\"/>\n\t\t\t\t</svg>\n\t\t\t\t");
			}
		}

		//if end
	};
	//


	//Init
	var setScrollbarInit = function setScrollbarInit() {
		setScrollbarGarantResult();
		setScrollbarSecBlueYellowList();
		setScrollbarTable();
	};
	//
	//


	//Show more items (cases, clients)
	var showMoreItems = function showMoreItems() {
		var btns = $(".view-more .btn");

		if (btns.length) {
			btns.click(function () {
				var curBtn = $(this).parent();
				curBtn.parent().find("> div").addClass("item-visible");
				curBtn.addClass("d-none");
			});
		}
	};
	//


	//Parse number count our sites
	var parseCountSites = function parseCountSites() {
		var fullNumber = $(".count-sites .wrap-count .full-number");

		if (fullNumber) {

			var fullNumberText = fullNumber.text();
			var arrSingleNumber = fullNumberText.replace(/\D+/g, "").split("");

			fullNumber.hide();

			arrSingleNumber.forEach(function (cur) {
				$(".count-sites .wrap-count").append("\n\t\t\t\t\t<span class=\"wrap-single-number\">\n\t\t\t\t\t\t<span>" + cur + "</span>\n\t\t\t\t\t</span>\n\t\t\t\t");
			});
		} //if end
	};
	//


	//Hover table col
	var hoverTableCol = function hoverTableCol() {
		var elements = void 0;

		$(".table-hover tr td:not(:first-child)").hover(function () {

			var positionEl = $(this).index();
			var parent = $(this).parent();

			elements = parent.siblings("tr").find("td:nth-child(" + (positionEl + 1) + ")").add($(this));
			elements.addClass("td-hover");
		}, function () {
			elements.removeClass("td-hover");
		});
	};
	//


	//Clear field file upload
	var clearFieldFileUpload = function clearFieldFileUpload() {
		var btn = $(".field-file .icon-remove");
		if (btn.length) {

			btn.click(function () {
				$(this).parent().removeClass("file-upload").find("input").removeAttr("disabled");
			});
		}
	};
	//


	//If bitrix Price odd - add item
	var checkBitrixPriceItem = function checkBitrixPriceItem() {
		var wrapsItems = $(".sec-price-list .wrap-prices-items");

		wrapsItems.each(function () {
			var items = $(this).find(".item");

			if (items.length) {
				if (items.length % 2) {
					items.parent().append("<div class=\"item item-no-active\"></div>");
				}
			}
		});
	};
	//


	//Hover item portfolio full
	var hoverItemPortfolioFull = function hoverItemPortfolioFull() {
		var items = $(".portfolio-banner .wrap-portfolio-items .item");

		if (items) {
			items.hover(function () {
				$(this).find("p").slideDown(500);
			}, function () {
				$(this).find("p").slideUp(500);
			});
		}
	};
	//


	//Bitrix table prices tabs
	var bitrixTablesPricesTabs = function bitrixTablesPricesTabs() {
		var tabs = $(".prices-bitrix .wrap-tabs .btn");
		var tables = $(".wrap-tables .wrap-table-accent");

		if (tabs && tables) {
			tabs.click(function () {
				//Btn
				tabs.removeClass("btn-active");
				$(this).addClass("btn-active");

				//Table
				tables.removeClass("table-active");
				tables.eq($(this).index()).addClass("table-active");
			});
		}
	};
	//


	//Map
	var mapInit = function mapInit() {
		var mapElement = document.getElementById('wrap-map');

		if (!!mapElement) {
			var mapOptions = {
				zoom: 18,
				center: new google.maps.LatLng(53.939527, 27.5992394),
				styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }],
				disableDefaultUI: true
			};

			var map = new google.maps.Map(mapElement, mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(53.939527, 27.5992394),
				map: map,
				title: 'WebCompany',
				icon: {
					url: "/img/map-icon.svg",
					scaledSize: new google.maps.Size(46, 46)
				}
			});
		}
	};
	//


	//Modal forms
	//Selectize
	var selectizeInit = function selectizeInit() {
		if ($(".select").length) {

			$(".select").selectize();
		} //if end
	};
	//

	//File apload
	var fileUploadText = function fileUploadText() {
		$(".field-file").change(function (e) {
			var fileName = e.target.files[0].name;

			var size = (e.target.files[0].size / 1000).toFixed(2);
			var maxLength = 12;

			if (fileName.length > maxLength) {
				fileName = fileName.slice(0, maxLength) + "...";
			}

			var text = "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B: " + fileName + " (" + size + " kb)";

			$(this).next(".file-name").find(".text").text(text);
			$(this).parent().addClass("file-upload");
		});
	};
	//

	//Set phone mask
	var setPhoneMask = function setPhoneMask() {
		var fieldsPhone = $(".field-phone");

		if (fieldsPhone) {
			fieldsPhone.mask("+000 00 000-00-00");
		};
	};
	//

	//Check input name field
	var checkField = function checkField() {
		var fieldName = $(".field-name");

		if (fieldName) {

			fieldName.on("keypress", function () {
				var _this = this;

				setTimeout(function () {
					var res = /[^а-яА-ЯїЇєЄіІёЁ ]/g.exec(_this.value);
					_this.value = _this.value.replace(res, '');
				}, 0);
			});
		};
	};
	//

	//Init
	var modalForms = function modalForms() {
		selectizeInit();
		fileUploadText();
		setPhoneMask();
		checkField();
	};
	//
	//


	//Modal show
	var modalShow = function modalShow() {
		var modalWrap = $(".wrap-modal-windows");
		var btns = $(".btn-show-modal");
		var allModals = $(".wrap-modal-windows .modal-window");
		var $menuAPI = $(".mobile-menu").data("mmenu");
		var $btnHeader = $(".header-fixed .wrap-full-menu-btn .menu-icon");
		console.log(!!$menuAPI);

		if (btns && modalWrap) {
			//Open
			btns.click(function () {
				//Menu hide
				if ($menuAPI) {
					$menuAPI.close();
					$btnHeader.removeClass("is-active");
				}
				//

				//	Page fixed
				var widthBeforeFixed = $("body").outerWidth(true);
				$("body").addClass("fixed");
				var widthAfterFixed = $("body").outerWidth(true);
				var mr = widthAfterFixed - widthBeforeFixed;
				$("body").css({ "margin-right": mr + "px" });
				//

				modalWrap.addClass("window-active");
				allModals.hide();
				var key = $(this).attr("data-modal-key");

				allModals.each(function () {
					if ($(this).hasClass("" + key)) {
						$(this).fadeIn(500);
						// $(this).fadeIn(500).addClass("modal-active");
					};
				});
			});
			//Open end

			//Close
			$(".wrap-modal-windows .close-modal, .wrap-modal-windows .layer-out").click(function () {
				modalWrap.removeClass("window-active");
				$("body").removeClass("fixed").css({ "margin-right": 0 });

				setTimeout(function () {
					modalWrap.find(".modal-window").removeClass("modal-active");
				}, 550);
			});
			//Close end
		};
	};
	//


	//Set number list item page "Analys Audit"
	var setNumList = function setNumList() {
		var itemsList = $(".wrap-list-poligon .list p");

		if (itemsList) {
			var count = 1;
			var countResalt = void 0;

			itemsList.each(function () {
				countResalt = count < 10 ? "0" + count : count;

				$(this).find(".counter-number").html("" + countResalt);
				count++;
			});
		};
	};
	//


	//Bitrix slider
	var bitrixSlider = function bitrixSlider() {
		var slider = new Swiper(".bitrix-packages-slider", {
			loop: true,
			spaceBetween: 40,
			slidesPerView: 3,
			centeredSlides: true,
			simulateTouch: false,
			navigation: {
				nextEl: '.bitrix-packages .wrap-packages-slider-nav .swiper-button-next',
				prevEl: '.bitrix-packages .wrap-packages-slider-nav .swiper-button-prev'
			},
			pagination: {
				el: '.bitrix-packages .swiper-pagination',
				type: 'bullets',
				clickable: true
			},
			breakpoints: {
				// when window width is <= 767px
				767: {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					centeredSlides: false
				}
			}
		});
	};
	//


	//Slick slider
	var navArrowPrev = "<span class=\"arrow-prev\">\t\n\t\t\t<svg width=\"10\" height=\"18\" viewBox=\"0 0 10 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path opacity=\"0.6\" d=\"M1 1.5L8.5 9L1 16.5\" stroke=\"white\" stroke-width=\"2\"/>\n\t\t\t</svg>\n\t\t</span>";

	var navArrowNext = "<span class=\"arrow-next\">\t\n\t\t\t<svg width=\"10\" height=\"18\" viewBox=\"0 0 10 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path opacity=\"0.6\" d=\"M1 1.5L8.5 9L1 16.5\" stroke=\"white\" stroke-width=\"2\"/>\n\t\t\t</svg>\n\t\t</span>";

	//Banner
	var bannerSliderData = {
		speed: 800,
		slidesToScroll: 1,
		slidesToShow: 1,
		swipeToSlide: false,
		dots: true,
		infinite: false,
		appendArrows: $(".banner .wrap-slider-nav"),
		appendDots: $(".banner .wrap-slider-dots"),
		prevArrow: navArrowPrev,
		nextArrow: navArrowNext
	};

	var bannerSlider = $(".banner-slider");

	if (bannerSlider.length) {
		bannerSlider.slick(bannerSliderData);
	}
	//Banner end


	//Testimonials
	var testimonialSliderData = {
		speed: 800,
		slidesToScroll: 1,
		slidesToShow: 4,
		swipeToSlide: false,
		appendArrows: $(".wrap-testimonials-slider .wrap-slider-nav"),
		prevArrow: navArrowPrev,
		nextArrow: navArrowNext,
		responsive: [{
			breakpoint: 1260,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				variableWidth: true,
				centerMode: true
			}
		}]
	};

	var testiSlider = $(".testimonials-slider");

	if (testiSlider.length) {
		testiSlider.slick(testimonialSliderData);
	}
	//Testimonials end


	//Testimonials modal
	var testimonialSliderModalData = {
		speed: 800,
		slidesToScroll: 1,
		slidesToShow: 1,
		swipeToSlide: false,
		appendArrows: $(".modal-testimonials .wrap-slider-nav"),
		prevArrow: navArrowPrev,
		nextArrow: navArrowNext
	};

	var testiSliderModal = $(".testimonials-slider-modal");

	if (testiSliderModal.length) {
		testiSliderModal.slick(testimonialSliderModalData);
	}
	//Testimonials modal end


	//Page testimonials
	var pageTestimonialSliderData = {
		speed: 800,
		slidesToScroll: 1,
		slidesToShow: 1,
		swipeToSlide: false,
		arrows: false,
		dots: false,
		variableWidth: true,
		centerMode: true
	};

	var pageTestiSlider = $(".page-testimonials-slider");

	if ($(window).width() < 576 && pageTestiSlider.length) {
		pageTestiSlider.slick(pageTestimonialSliderData);
	}
	//Page testimonials end
	//


	//Preloader START
	var preloaderInit = function preloaderInit() {
		var preloader = $(".wrap-preloader");

		if (preloader.length) {
			setTimeout(function () {
				$("body").removeClass("fixed");
				preloader.fadeOut();
			}, 600);
		}
	};
	//Preloader END


	//Lazyload init START
	var lazyloadInit = function lazyloadInit() {
		lazyload();
	};
	//Lazyload init END


	//Init
	if (checkWidth(992)) checkDropdownItems();
	menuLogic();
	if (checkWidth(992)) headerFixed();
	setScrollbarInit();
	fixedSidebarNav();
	showMoreItems();
	parseCountSites();
	hoverTableCol();
	modalForms();
	clearFieldFileUpload();
	checkBitrixPriceItem();
	setNumList();
	bitrixTablesPricesTabs();
	modalShow();
	hoverItemPortfolioFull();
	flexMenu();
	google.maps.event.addDomListener(window, 'load', mapInit);
	bitrixSlider();
	dropdownList();
	preloaderInit();
	lazyloadInit();
	//
}); //END ALL