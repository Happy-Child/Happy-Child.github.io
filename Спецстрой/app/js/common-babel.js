"use strict";

$(function () {

	//Check home page
	var checkHomePage = function checkHomePage() {
		if ($("body").hasClass("main-page")) {
			return true;
		} else {
			return false;
		}
	};
	//

	//Preloader / start animation main page
	var preloaderHide = function preloaderHide() {
		setTimeout(function () {
			$(".preloader").fadeOut(500);

			if (checkHomePage()) {
				animationMainPage();
			} else {
				$(".main-header > div, nav.nav-desktop ul.nav-list > li, .main-header .wrap-header-icons > div").css({ "transition": "0s all ease 0s", "opacity": 1 });
			}
		}, 600);
	};
	//

	//Menu logic
	var menuIconClick = function menuIconClick() {
		$(".wrap-menu-icon .icon").click(function () {
			$(this).toggleClass("is-active");
			var windowWidth = $(window).width();

			if (windowWidth > 992) {
				$(".wrap-header .wrap-menu-2").toggleClass("nav-active");
			} else {
				$(".wrap-header .nav-mobile").toggleClass("nav-active");
			}
		});
	};
	//


	//Mobile menu logic
	var mobileMenuLogic = function mobileMenuLogic() {
		var items = $(".wrap-header .nav-mobile .menu-item-has-children");
		var btns = items.find(".icon-dropdown");

		if (items) {

			btns.click(function () {
				var list = $(this).parent().find("ul");
				var li = $(this).parent();

				if (list.css("display") === "block") {
					items.find("ul").slideUp(400);
					items.removeClass("menu-item-active");
				} else {
					items.find("ul").slideUp(400);
					items.removeClass("menu-item-active");

					li.addClass("menu-item-active");
					list.slideDown(400);
				}
			});
		}
	};
	//


	//To color number (price) on home page on section 'Main services'
	var toColorPrice = function toColorPrice() {
		var strPriceArray = $(".main-services .price");

		strPriceArray.each(function () {
			var priceStr = $(this).text();
			var strDataPrev = priceStr.match(/\d+/i);

			//Prev
			var prevStr = priceStr.slice(0, strDataPrev.index);
			//

			priceStr = priceStr.slice(strDataPrev.index);
			var strDataNext = priceStr.search(/[А-яЁё]/i);

			//Next
			var nextStr = priceStr.slice(strDataNext);
			//

			//Price
			var arrPrice = priceStr.match(/\d+/gi);

			if (arrPrice[1] !== undefined) {
				arrPrice[0] = arrPrice[0] + " " + arrPrice[1];
				delete arrPrice[1];
			}
			//

			$(this).html(prevStr + " <span>" + arrPrice[0] + "</span> " + nextStr);
		});
	};
	//

	//Main page slider / news page slider 
	var navArrow = "<svg class=\"arrow-icon\" width='14' height='20' viewBox='0 0 14 20' fill='none' xmlns='http://www.w3.org/2000/svg'>\n\t<path d='M11.3322 20L13.25 18.1748L4.59929 10L13.25 1.82519L11.3322 -2.69677e-07L0.75 10L11.3322 20Z' fill='#BEC2C3'/>\n\t</svg>";

	var owlNewsData = {
		smartSpeed: 700,
		dots: false,
		nav: true,
		margin: 16,
		navContainer: ".wrap-slider-nav",
		navText: [navArrow, navArrow],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			}
		}
	};

	var owlOtherNewsData = {
		smartSpeed: 700,
		dots: false,
		nav: true,
		margin: 40,
		stagePadding: 8,
		navContainer: ".wrap-slider-nav",
		navText: [navArrow, navArrow],
		autoHeight: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1200: {
				items: 3
			}
		}
	};

	if ($(".news-slider")) {
		$(".news-slider").owlCarousel(owlNewsData);
	}

	if ($(".other-news-slider")) {
		$(".other-news-slider").owlCarousel(owlOtherNewsData);
	}

	//


	//Form elements
	$(".form .phone").mask("+7 (000) 00 - 00 - 00");
	//


	//Tabs logic
	var clickTabsItems = function clickTabsItems() {
		var tabsItems = $(".wrap-tabs .tab-item");
		var tabsItemsContent = $(".wrap-tabs-content .tab-content-item");

		$(".wrap-tabs .tab-item").click(function () {

			tabsItems.removeClass("active-tab");
			$(this).addClass("active-tab");

			var newTabPos = $(this).attr("data-item-pos");
			tabsItemsContent.removeClass("active-content");
			tabsItemsContent.each(function () {
				if ($(this).attr("data-item-pos") == newTabPos) {
					$(this).addClass("active-content");
				}
			});
		});
	};
	//


	//Show/hide modal
	var showHideModal = function showHideModal() {
		var modalWindow = $(".modal-window");

		if (modalWindow) {

			$(".btn-callback-show").click(function () {
				modalWindow.fadeIn(500);
				$(".modal-window .modal-callback").addClass("modal-active");
			});

			$(".modal-window .icon-close, .modal-window .layer-out").click(function () {
				modalWindow.fadeOut(500);

				setTimeout(function () {
					$(".modal-window .modal").removeClass("modal-active");
				}, 550);
			});
		}
	};
	//


	//Send callback form
	var sendCallbackForm = function sendCallbackForm() {
		$(".form-callback").submit(function (e) {
			e.preventDefault();
			var form = $(this);
			var btn = form.find(".btn-callback-send");

			btn.attr("disabled", "disabled").addClass("btn-callback-load");

			var data = {
				name: form.find(".name").val(),
				phone: form.find(".phone").val(),
				mail: $("#mail-to").val(),
				action: "ajax_order"
			};

			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: data,
				success: function success(data) {
					form.trigger('reset');
					console.log(data);

					setTimeout(function () {
						$(".modal-window .modal-callback").removeClass("modal-active");
						btn.removeAttr("disabled").removeClass("btn-callback-load");
					}, 100);

					$(".modal-window").fadeIn(500);
					$(".modal-window .modal-success").addClass("modal-active");
				},
				error: function error(data) {
					form.trigger('reset');
					console.log(data);
				}
			});
		});
	};
	//


	//Animation main page
	//Set delay menu item
	var setDelayMenuItem = function setDelayMenuItem() {
		var delay = 0.6;

		$(".nav-desktop .menu-item").each(function () {
			delay += 0.2;
			$(this).css({ "transition-delay": delay + "s" });
		});
	};
	//

	//Scroll to section main services
	var scrollToSec = function scrollToSec() {
		var secOffsetTop = ~~$(".main-services").offset().top;

		var scrollToTitleFun = function scrollToTitleFun() {
			if ($(window).scrollTop() >= secOffsetTop - $(window).height() * 65 / 100) {
				//Title
				$(".main-services .title-group").addClass("title-animation");
				//

				// Services items
				$(".main-services .secvices-item").each(function () {
					var _this = this;

					var itemOffsetTop = ~~$(this).offset().top;

					var scrollToItems = function scrollToItems() {
						if ($(window).scrollTop() >= itemOffsetTop - $(window).height() * 65 / 100) {
							$(_this).addClass("services-item-animation");
						}
					};

					//Check when document load
					scrollToItems();
					//

					$(document).scroll(function () {
						scrollToItems();
					});
				});
				//
			}
		};

		//Check when document load
		scrollToTitleFun();
		//

		$(document).scroll(function () {
			scrollToTitleFun();
		});
	};
	//Scroll to section main services END


	//Check item menu has child
	var checkItemMenuHasChild = function checkItemMenuHasChild() {
		var items = $(".nav-mobile .nav-list .menu-item-has-children");

		if (items) {
			var span = "<span class='icon-dropdown'>\n\t\t\t\t<svg class=\"arrow-icon\" width='14' height='20' viewBox='0 0 14 20' fill='none' xmlns='http://www.w3.org/2000/svg'>\n\t\t\t\t\t<path d='M11.3322 20L13.25 18.1748L4.59929 10L13.25 1.82519L11.3322 -2.69677e-07L0.75 10L11.3322 20Z' fill='#BEC2C3'/>\n\t\t\t\t</svg>\n\t\t\t</span>";

			items.each(function () {
				$(this).append(span);
			});
		}
	};
	//Check item menu has child END


	//Init
	var animationMainPage = function animationMainPage() {
		setDelayMenuItem();
		scrollToSec();

		//Header
		setTimeout(function () {
			$(".main-header").addClass("header-animation");
		}, 300);
		//

		//Banner
		setTimeout(function () {
			$(".banner-top-page").addClass("banner-animation");
		}, 1500);
		//
	};
	//
	//Animation main page END


	//Init
	clickTabsItems();
	menuIconClick();
	preloaderHide();
	showHideModal();
	sendCallbackForm();
	checkItemMenuHasChild();
	mobileMenuLogic();
	if (checkHomePage()) {
		toColorPrice();
	}
});