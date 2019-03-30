$(function() {

	//Check home page
	const checkHomePage = () => {
		if ( $("body").hasClass("main-page") ) {
			return true;
		} 
		else {
			return false;
		}
	};
	//

	//Preloader / start animation main page
	const preloaderHide = () => {
		setTimeout(() => {
			$(".preloader").fadeOut(500);
			
			if (checkHomePage()) {
				animationMainPage();
			} else {
				$(".main-header > div, nav.nav-desktop ul.nav-list > li, .main-header .wrap-header-icons > div")
					.css({"transition" : "0s all ease 0s", "opacity" : 1});
			}
		}, 600);
	};
	//

	//Menu logic
	const menuIconClick = () => {
		$(".wrap-menu-icon .icon").click(function () {
			$(this).toggleClass("is-active");
			const windowWidth = $(window).width();

			if ( windowWidth > 992 ) {
				$(".wrap-header .wrap-menu-2").toggleClass("nav-active");
			} else {
				$(".wrap-header .nav-mobile").toggleClass("nav-active");
			}

		});
	};
	//


	//Mobile menu logic
	const mobileMenuLogic = () => {
		const items = $(".wrap-header .nav-mobile .menu-item-has-children");
		const btns = items.find(".icon-dropdown");

		if ( items ) {

			btns.click(function () {
				const list = $(this).parent().find("ul");
				const li = $(this).parent();

				if ( list.css("display") === "block" ) {
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
	const toColorPrice = () => {
		const strPriceArray = $(".main-services .price");

		strPriceArray.each(function () {
			let priceStr = $(this).text();
			const strDataPrev = priceStr.match(/\d+/i);

			//Prev
			const prevStr = priceStr.slice(0, strDataPrev.index);
			//

			priceStr = priceStr.slice(strDataPrev.index);
			const strDataNext = priceStr.search(/[А-яЁё]/i);

			//Next
			const nextStr = priceStr.slice(strDataNext);
			//

			//Price
			const arrPrice = priceStr.match(/\d+/gi);

			if ( arrPrice[1] !== undefined ) {
				arrPrice[0] = `${arrPrice[0]} ${arrPrice[1]}`;
				delete arrPrice[1];
			}
			//

			$(this).html(`${prevStr} <span>${arrPrice[0]}</span> ${nextStr}`);
			
		});
	};
	//

	//Main page slider / news page slider 
	const navArrow = 
	`<svg class="arrow-icon" width='14' height='20' viewBox='0 0 14 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
	<path d='M11.3322 20L13.25 18.1748L4.59929 10L13.25 1.82519L11.3322 -2.69677e-07L0.75 10L11.3322 20Z' fill='#BEC2C3'/>
	</svg>`;

	const owlNewsData = {
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

	const owlOtherNewsData = {
		smartSpeed: 700,
		dots: false,
		nav: true,
		margin: 40,
		stagePadding: 8,
		navContainer: ".wrap-slider-nav",
		navText: [navArrow, navArrow],
		autoHeight:true,
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

	if ( $(".news-slider") ) {
		$(".news-slider").owlCarousel(owlNewsData);
	}

	if ( $(".other-news-slider") ) {
		$(".other-news-slider").owlCarousel(owlOtherNewsData);
	} 
		
	//


	//Form elements
	$(".form .phone").mask(("+7 (000) 00 - 00 - 00"));
	//


	//Tabs logic
	const clickTabsItems = () => {
		const tabsItems = $(".wrap-tabs .tab-item");
		const tabsItemsContent = $(".wrap-tabs-content .tab-content-item");

		$(".wrap-tabs .tab-item").click(function () {
		
			tabsItems.removeClass("active-tab");
			$(this).addClass("active-tab");

			const newTabPos = $(this).attr("data-item-pos");
			tabsItemsContent.removeClass("active-content");
			tabsItemsContent.each(function () {
				if ( $(this).attr("data-item-pos") == newTabPos ) {
					$(this).addClass("active-content");
				}
			});

		});
	};
	//


	//Show/hide modal
	const showHideModal = () => {
		const modalWindow = $(".modal-window");

		if ( modalWindow ) {

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
	const sendCallbackForm = () => {
		$(".form-callback").submit(function (e) {
			e.preventDefault();
			const form = $(this);
			const btn = form.find(".btn-callback-send");

			btn.attr("disabled", "disabled").addClass("btn-callback-load");

			const data = {
				name: form.find(".name").val(),
				phone: form.find(".phone").val(),
				mail: $("#mail-to").val(),
				action: "ajax_order"
			};

			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data,
				success (data) {
					form.trigger('reset');
					console.log(data);

					setTimeout(function () {
						$(".modal-window .modal-callback").removeClass("modal-active");
						btn.removeAttr("disabled").removeClass("btn-callback-load");						
					}, 100);

					$(".modal-window").fadeIn(500);
					$(".modal-window .modal-success").addClass("modal-active");

				},
				error (data) {
					form.trigger('reset');
					console.log(data);
				}
			});
		});
	};
	//


//Animation main page
	//Set delay menu item
	const setDelayMenuItem = () => {
		let delay = 0.6;

		$(".nav-desktop .menu-item").each(function () {
			delay += 0.2;
			$(this).css({"transition-delay" : delay + "s"});
		});
	};
	//

	//Scroll to section main services
	const scrollToSec = () => {
		let secOffsetTop = ~~( $(".main-services").offset().top );

		const scrollToTitleFun = () => {
			if ($(window).scrollTop() >= secOffsetTop - ($(window).height() * 65 / 100 )) {
				//Title
				$(".main-services .title-group").addClass("title-animation");
				//

				// Services items
				$(".main-services .secvices-item").each(function () {
					let itemOffsetTop = ~~( $(this).offset().top );

					const scrollToItems = () => {
						if ($(window).scrollTop() >= itemOffsetTop - ($(window).height() * 65 / 100 )) {
							$(this).addClass("services-item-animation");
						}
					};

					//Check when document load
					scrollToItems();
					//

					$(document).scroll(() => {
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
	const checkItemMenuHasChild = () => {
		const items = $(".nav-mobile .nav-list .menu-item-has-children");

		if ( items ) {
			const span = 
			`<span class='icon-dropdown'>
				<svg class="arrow-icon" width='14' height='20' viewBox='0 0 14 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path d='M11.3322 20L13.25 18.1748L4.59929 10L13.25 1.82519L11.3322 -2.69677e-07L0.75 10L11.3322 20Z' fill='#BEC2C3'/>
				</svg>
			</span>`;

			items.each(function () {
				$(this).append(span);
			});

		}
	};
	//Check item menu has child END


	//Init
	const animationMainPage = () => {
		setDelayMenuItem();
		scrollToSec();

		//Header
		setTimeout(() => {
			$(".main-header").addClass("header-animation");
		}, 300);
		//

		//Banner
		setTimeout(() => {
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
	if ( checkHomePage() ) {
		toColorPrice();
	}

});
