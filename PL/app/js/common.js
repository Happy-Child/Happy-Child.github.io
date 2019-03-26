$(function() {

//Common fn START
	//Cut all letters START
	var fnCutLetters = function (_this) {
		var newStr = '';
		var str = _this.val();
		var length = _this.val().length;
		var control = 0;

		for (var i = 0; i < length; i++) {
			var chr = str.substring(i, i+1);

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

	//Tabs START
	var tabsLogic = function () {
		var tabsBtn = $(".wrap-tabs-btn .tab");
		var tabsContentWrap = $(".wrap-tabs-content");
		var tabsContent = $(".wrap-tabs-content .tab-content");

		if ( tabsBtn.length && tabsContent.length ) {
			tabsBtn.click(function () {
				
				var curBtn = $(this);
				var curContent = tabsContentWrap.find(".tab-content-cur");
				var nextContentIndex = curBtn.index();

				tabsBtn.removeClass("cur-tab");
				tabsContent.removeClass("tab-content-cur");

				curBtn.addClass("cur-tab");
				tabsContent.eq(nextContentIndex).addClass("tab-content-cur");

			});
		}
	};
	//Tabs END

	//Dropdown list on click START
	var dropDownOnClick = function () {
		var wrap = $(".wrap-dropdown");
		var contentTop = wrap.find(".dropdown-top");

		if ( contentTop.length && wrap.length ) {
			contentTop.click(function () {
				var cur = $(this).parent();
				cur.toggleClass("dropdown-active");

				// $(document).click(function(e) {
				// 	var statusEl = $(e.target).closest(".dropdown-content").length;
				// 	console.log(statusEl);

				// 	if ( statusEl ) {
				// 		return;
				// 		console.log("nj yt nhjufnm")
				// 	} else {
				// 		cur.removeClass("dropdown-active");
				// 		console.log("lolo");
				// 	}

			 //    event.stopPropagation();
			 //  });
			});
		}
	};
	//Dropdown list on click END

	//Items drop down START
	var itemsDropdown = function () {
		var titles = $(".dropdown-title");

		if ( titles.length ) {
			titles.click(function () {
				var cur = $(this);
				var allTitle = cur.parent().parent().find(".dropdown-title");
				var allP = cur.parent().parent().find(".dropdown-content");
				var curP = cur.next(".dropdown-content");

				if ( curP.css("display") === "block" ) {
					allP.slideUp(400);
					cur.removeClass("dropdown-title-active");
				} else {
					allTitle.removeClass("dropdown-title-active");
					allP.slideUp(400);
					cur.addClass("dropdown-title-active");
					curP.slideDown(400);
				}

			})
		}
	};
	//Items drop down END

	//Check odd/even list items START
	var checkOddListItems = function (items, typeIf) {
		var addClass = "item-no-active";
		var newItem = items.eq(0).clone().empty();
		newItem.addClass(addClass);

		if ( typeIf == "odd" && items.length ) {

			if ( items.length % 2 ) {
				items.parent().append(newItem);
			}

		} else if ( typeIf == "even" && items.length ) {

			if ( items.length % 2 == 0 ) {
				items.parent().append(newItem);
			}

		}

	};
	//Check odd/even list items END

	//Check list length START
	var checkListLength = function (mainLists) {
		var maxLengthEls = 8;

		//Create new list START (if length list items > maxLengthEls)
		var createNewList = function (list) {
			var els = list.find("li").splice(maxLengthEls);

			var ul = document.createElement("ul");
			ul.append(...els);
			list.append(ul);
		};
		//Create new list END


		//Create btn hide/show new list START
		var createBtn = function (list) {

			var htmlBtnShow = `
				<span class="btn-list btn-show btn-active">
					<span>Показать ещё</span>
					<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.09267 9.90012L5.89687 5.23037C5.96559 5.16366 6 5.0869 6 5.00007C6 4.91324 5.96559 4.83634 5.89687 4.76959L1.09267 0.100236C1.02385 0.0333418 0.944879 0 0.855507 0C0.766172 0 0.687092 0.033447 0.618412 0.100236L0.103092 0.601134C0.0343757 0.667923 3.52859e-05 0.744785 3.52859e-05 0.831614C3.52859e-05 0.918443 0.0343757 0.995304 0.103092 1.06209L4.15466 5.00007L0.102839 8.93819C0.0341229 9.00494 -4.76837e-07 9.08184 -4.76837e-07 9.16853C-4.76837e-07 9.2555 0.0343394 9.33236 0.102839 9.39911L0.618376 9.90008C0.687056 9.96683 0.766172 10 0.855471 10C0.944878 10 1.02396 9.96687 1.09267 9.90012Z" fill="#292929"/>
					</svg>
				</span>
			`;

			var htmlBtnHide = `
				<span class="btn-list btn-hide">
					<span>Свернуть</span>
					<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.09267 9.90012L5.89687 5.23037C5.96559 5.16366 6 5.0869 6 5.00007C6 4.91324 5.96559 4.83634 5.89687 4.76959L1.09267 0.100236C1.02385 0.0333418 0.944879 0 0.855507 0C0.766172 0 0.687092 0.033447 0.618412 0.100236L0.103092 0.601134C0.0343757 0.667923 3.52859e-05 0.744785 3.52859e-05 0.831614C3.52859e-05 0.918443 0.0343757 0.995304 0.103092 1.06209L4.15466 5.00007L0.102839 8.93819C0.0341229 9.00494 -4.76837e-07 9.08184 -4.76837e-07 9.16853C-4.76837e-07 9.2555 0.0343394 9.33236 0.102839 9.39911L0.618376 9.90008C0.687056 9.96683 0.766172 10 0.855471 10C0.944878 10 1.02396 9.96687 1.09267 9.90012Z" fill="#292929"/>
					</svg>
				</span>
			`;

			var htmlWrapBtns = `
				<div class="wrap-btns-control">
					${htmlBtnShow}
					${htmlBtnHide}
				</div>
			`;

			list.append(htmlWrapBtns);

		};
		//Create btn hide/show new list END


		//Click btn show/hide more list items START
		var clickBtn = function (list) {
			var btns = list.find(".btn-list");

			if ( btns.length ) {
				btns.click(function () {
					var listParent = $(this).parent().parent();
					var listHidden = listParent.find("ul");

					$(this).removeClass("btn-active");
					listHidden.slideToggle(400);

					if ( $(this).hasClass("btn-show") ) {
						listParent.find(".btn-hide").addClass("btn-active");
					} else {
						listParent.find(".btn-show").addClass("btn-active");
					}
				})
			}
		};
		//Click btn show/hide more list items END

		if ( mainLists.length ) {
			mainLists.each(function () {
				var curListEls = $(this).find("li");

				if ( curListEls.length > maxLengthEls  ) {
					createNewList( $(this) );
					createBtn( $(this) );
					clickBtn( $(this) );
				}
			});
		}
	};
	//Check list length END
//Common fn END


//Header logic START
	//Flex menu START
	var flexMenuInit = function () {
		var menu = $(".header-bottom-line .desktop-nav .nav-list");

		if ( menu.length ) {
			menu.flexMenu({
          linkText: "Ещё"
      });
		}

		setTimeout(function () {
			$(".header .desktop-nav .nav-list").addClass("menu-d-flex")
		}, 50);
	};
	//Flex menu END

	//Set disabled menu link with the first click when < 992 START
	var setDisabledLink = function () {
		var links = $(".header-bottom-line .desktop-nav .nav-list .list-item > a");
		var linksHasUl = [];

		links.each(function () {
			if ( $(this).next(".dropdown-menu").length ) {
				$(this).addClass("link-disabled");
				linksHasUl.push( $(this) );
			}
		});

		if ( links.length ) {
			links.click(function (e) {

				if ( $(this).hasClass("link-disabled") ) {
					e.preventDefault();

					linksHasUl.forEach(function (cur) {
						cur.addClass("link-disabled");
					});
				}

				$(this).removeClass("link-disabled");

			});
		}
	};
	//Set disabled menu link with the first click when < 992 END


	//Add class item has submenu menu "view more" START
	var addClassItemHasSubmenu = function () {
		var items = $(".header-bottom-line .desktop-nav .flexMenu-viewMore .list-item");

		if ( items.length ) {
			items.each(function () {
				if ( $(this).find(".dropdown-menu").length ) {
					$(this).addClass("item-has-submenu");
				}
			});
		}
	};
	//Add class item has submenu menu "view more" END


	//Mobile menu init START
	var mobileMenu = function () {
		var $menu = $(".mobile-menu");
		var $btnShow = $(".wrap-menu-btn .menu-icon");
		var $btnHide = $(".wrap-menu-btn-hide");

		if ( $menu.length && $btnShow.length  ) {
			$menu.mmenu({
			  navbar: {
			    title: "Меню"
			  },
				"extensions": [
					"position-front"
				]
			});

			var $menuAPI = $menu.data( "mmenu" );

			$btnShow.click(function() {
		  	$menuAPI.open();
			});

			$btnShow.click(function() {
		  	$menuAPI.close();
			});
		}
	};
	//Mobile menu init END

	//Init START
	var headerInit = function () {
		flexMenuInit();
		mobileMenu();
		addClassItemHasSubmenu();
		if ( $(window).width() > 768 && $(window).width() < 992 ) { setDisabledLink(); }
	};
	//Init END
//Header logic END


//Button scroll to top START
	var btnScrollToTop = function () {
		var btn = $(".btn-to-top");

		if ( btn.length ) {
			btn.click(function() {
			  $("html, body").animate({ scrollTop: 0 }, 800);
			});
		}
	};

	var checkOffsetTop = function () {
		var offset = 1000;
		var btn = $(".btn-to-top")
		var bodyHeight = $("body").outerHeight();
		var footerHeight = $(".footer").outerHeight();
		var headerHeight = $(".header").outerHeight();
		var btnHeight = btn.outerHeight();
		var maxOffset = bodyHeight - footerHeight - headerHeight - btnHeight;

		function fnCheckOffset () {
			var windowWidth = $(this).width();
			var windowOffset =
				(windowWidth > 991) ? ($(this).height() * 5 / 10) : 
				(windowWidth > 576) ? ($(this).height() * 7 / 10) :
				($(this).height() * 5 / 10)
			var curOffset = $(this).scrollTop() + $(this).height() * 3 / 5;

			if ( curOffset >= maxOffset) {
				btn.css({"top": maxOffset + "px"});
			} else {
				btn.css({"top": curOffset + "px"});
			}

			if ( curOffset > offset ) {
				btn.addClass("btn-visible");
			} else {
				btn.removeClass("btn-visible")
			}
		};

		fnCheckOffset();

		$(window).scroll(function () {
			fnCheckOffset();
		});
	};


	var btnToTopInit = function () {
		btnScrollToTop();
		checkOffsetTop();
	};
//Button scroll to top END


//Catalog breeding logic START
	var lists = $(".lists-group .wrap-list");
	var listsBreeding = $(".lists-group .wrap-list ul");
	
	//Init
	var catalogBreedingLogic = function () {
		checkOddListItems(lists, "odd");
		checkListLength(listsBreeding);
	};
	//Init
//Catalog breeding logic END


//Sidebar logic START
	//Double range prise START
	var doubleRange = function () {
		var range = $(".range");
		var maxValue = +($(".range").attr("data-max-value"));
		var fields = $("aside .fields-price .field input");
		var fieldMin = $("aside .fields-price .field-min input");
		var fieldMax = $("aside .fields-price .field-max input");

		if ( range.length ) {
			range.slider({
				range: true,
				min: 0,
				max: maxValue,
				values: [0, maxValue],
				slide: function (event, ui) {
					var min = ( "" + ui.values[0] ).split("");
					var max = ( "" + ui.values[1] ).split("");

					if ( min.length > 3 ) { min.splice(-3, 0, ",") }
					if ( max.length > 3 ) { max.splice(-3, 0, ",") }

					fieldMin.val( min.join("") );
					fieldMax.val( max.join("") );
				}
			});
		}

		if ( fields.length ) {
			fields.on("keyup", function () {
				var curField = $(this);
				var curFieldVal = +(curField.val().replace(/\D+/g,""));

				fnCutLetters(curField);
				range.slider( "option", "values", [fieldMin.val().replace(/\D+/g,""), fieldMax.val().replace(/\D+/g,"")] );

				if ( curField.parent().hasClass("field-max") && curFieldVal > maxValue ) {
					curField.val(maxValue);
				} else if ( curField.parent().hasClass("field-min") && curFieldVal > maxValue ) {
					curField.val(0);
				}

			});
		}
	};
	//Double range prise END


	//Label filter param toggle START
	var labelFilterParam = function () {
		var labels = $(".filter-param .wrap-label .icon");

		if ( labels.length ) {
			labels.click(function () {
				
				$(this).toggleClass("label-active");

			});
		}
	};
	//Label filter param toggle END


	//Hide / show filter parameters START
	var hideShowParameters = function () {
		var iconHeadParameters = $(".filter-param .btn-control");

		if ( iconHeadParameters.length ) {
			iconHeadParameters.click(function () {
				var head = $(this).parent();
				
				head.toggleClass("param-visible");
				var curParamGroup = head.next(".wrap-fields");
				curParamGroup.slideToggle("400");

			});
		}

	};
	//Hide / show filter parameters END

	//Select color START
	var selectColor = function () {
		var colors = $(".wrap-fields .list-color .color-box");

		if ( colors.length ) {
			colors.click(function () {
				var cur = $(this);
			
				if ( cur.hasClass("color-none") ) {
					return true;
				} else if ( !cur.hasClass("select-box") ) {
					cur.addClass("select-box");
				} else if ( cur.hasClass("select-box") ) {
					cur.removeClass("select-box");
				}
			})
		}
	};
	//Select color END

	//Btn toggle aside < 991 START
	var btnToggleAside = function () {
		var btnShow = $(".wrap-btn-aside");
		var btnHide = $(".wrap-aside .btn-close");
		var aside = $(".wrap-aside");

		if ( btnShow.length && btnHide.length && aside.length ) {
			$(".wrap-btn-aside, .wrap-aside .btn-close").click(function () {
				aside.toggleClass("aside-active");
				$("html").toggleClass("page-fixed");
			});
		}
	};
	//Btn toggle aside < 991 END

	var listsSidebar = $("aside .filter-param ul:not(.list-color)");

	//Init START
	var sidebarLogicInit = function () {
		doubleRange();
		hideShowParameters();
		selectColor();
		btnToggleAside();
		labelFilterParam();
		checkListLength(listsSidebar);
	};
	//Init END
//Sidebar logic END


//Yandex card START
	var yCards = function () {
		var contactsMap = [{
			id: "map-1",
			cords: [53.939714612800614,27.60146359132249]
		},
		{
			id: "map-2",
			cords: [53.93876508268323,27.605647837385725]
		},
		{
			id: "map-3",
			cords: [53.935409902382965,27.600841318831044]
		},{
			id: "map-4",
			cords: [53.92755006916718,27.59475302389429]
		}];

		function setMap (id, cords) {
			ymaps.ready(function () {
				var curMap = new ymaps.Map(id, {
		      center: cords,
		      zoom: 16,
		      controls: []
		    }, {
		      searchControlProvider: 'yandex#search'
		    }),

		    myPlacemark = new ymaps.Placemark(curMap.getCenter(), {
		      hintContent: 'WebCompany',
		    }, {
		      iconLayout: 'default#image',
		      iconImageHref: 'img/card-icon.svg',
		      iconImageSize: [33, 42]
		    });

		    curMap.geoObjects.add(myPlacemark);
			});
		}

    contactsMap.forEach(function (cur) {
    	if ( $(`#${cur.id}`).length ) {
    		setMap(cur.id, cur.cords);
    	}
    });

	};
//Yandex card END


//Field count product logic START
	var fieldCountProduct = function () {
		var wrapCounter = $('.wrap-product-counter');
		var fields = wrapCounter.find(".cur-counter");
		var btns = wrapCounter.find(".icon-counter");

		if ( fields.length && btns.length ) {

			btns.click(function () {
				var curField = $(this).siblings("input");
				var curFieldVal = +(curField.val());
				var curBtn = $(this);

				if ( curBtn.hasClass("less") && curFieldVal > 1 ) {
					curField.val(curFieldVal -= 1);
				} else if ( curBtn.hasClass("plus") && curFieldVal < 999 ) {
					curField.val(curFieldVal += 1);
				}
			});

			fields.on("keyup", function () {
				fnCutLetters($(this)); // Top file
			});

			fields.on("blur", function () {
				var curVal = $(this).val();

				if ( curVal == "" && curVal == 0 ) {
					$(this).val(1);
				}
			});

		}
	};
//Field count product logic END


//Slider other products (set products) START
	var sliderSetProductsModal = function () {
		var slider = $(".modal-set-product .other-product-slider");
		var navSvg = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.2724 7.66891L6.22406 13.723C6.58719 14.0923 7.1761 14.0923 7.53923 13.723C7.90243 13.3535 7.90243 12.7546 7.53923 12.3852L3.1751 7.94596L19.0701 7.94596C19.5836 7.94596 20 7.5224 20 7.00001C20 6.4777 19.5836 6.05406 19.0701 6.05406L3.1751 6.05406L7.53908 1.61485C7.90228 1.2454 7.90228 0.646498 7.53908 0.277049C7.35756 0.0924759 7.11949 0 6.8815 0C6.6435 0 6.40551 0.0924759 6.22391 0.277049L0.2724 6.33111C-0.0907993 6.70056 -0.0907993 7.29946 0.2724 7.66891Z" fill="#A1A1A1"/></svg>`;

		if ( slider.length ) {

			var thisLgPlus = $(window).width() > 992;
			var thisMd = $(window).width() > 768 && $(window).width() < 992;
			var thisSm = $(window).width() > 576 && $(window).width() < 768;

			var sliderParams = {
				slidesToScroll: 1,
				speed: 400,
				dots: false,
				focusOnSelect: false,
				appendArrows: '.modal-set-product .wrap-slider-nav',
				prevArrow: `<span>${navSvg}</span>`,
				nextArrow: `<span>${navSvg}</span>`,
				infinite: false,
				variableWidth: true
			}

			if ( thisLgPlus && slider.find(".wrap-card").length > 4 ) {
				sliderParams["slidesToShow"] = 4;
				sliderParams["responsive"] = [
			    {
			      breakpoint: 992,
			      settings: {
							slidesToShow: 3,
			      }
			    },
			    {
			      breakpoint: 576,
			      settings: {
							slidesToShow: 2,
			      }
			    }
			  ];

			  slider.slick(sliderParams);
			}
			else if ( thisMd && slider.find(".wrap-card").length > 3 ) {
				sliderParams["slidesToShow"] = 3;
				sliderParams["responsive"] = [
			    {
			      breakpoint: 768,
			      settings: {
							slidesToShow: 2,
			      }
			    }
			  ];

			  slider.slick(sliderParams);
			}
			else if ( thisSm && slider.find(".wrap-card").length > 2 ) {
				sliderParams["slidesToShow"] = 2;

			  slider.slick(sliderParams);
			}
		}

	};
//Slider other products (set products) END


//Slider viewed products START
	var sliderViewedProducts = function () {
		const arrowPrev = $(".viewed-products .swiper-slide-prev");
		const arrowNext = $(".viewed-products .swiper-slide-next");

		if ( $(".viewed-products-slider").length ) {
	    var sliderInit = new Swiper(".viewed-products-slider", {
	      loop: true,
	      slidesPerView: 5,
	      grabCursor: true,
				nextButton: '.viewed-products .wrap-slider-nav .swiper-slide-next',
				prevButton: '.viewed-products .wrap-slider-nav .swiper-slide-prev',
				breakpoints: {
				  // when window width is <= 1259px
				  1259: {
				    slidesPerView: 4,
				  },
				  // when window width is <= 991px
				  991: {
				    slidesPerView: 3,
				  },
				  // when window width is <= 767px
				  767: {
				    slidesPerView: 2,
				  },
				  // when window width is <= 575px
				  575: {
				    slidesPerView: 1,
			      slidesPerView: 'auto',
			      loop: false
				  },
				}
	    });

			if ( arrowPrev.length ) { arrowPrev.click(function () { sliderInit.slidePrev(500); }); }
			if ( arrowNext.length ) { arrowNext.click(function () { sliderInit.slideNext(500); }); }

		}

	};
//Slider viewed products END


//Index product slider START
	var indexProductSlider = function () {
		var slider = $(".index-product-slider");

		if ( slider.length && $(window).width() < 578 ) {
	 		var sliderInit = new Swiper(".index-product-slider", {
	      slidesPerView: 'auto',
	    });
		}


	};
//index product slider END


//Fix bar logic START
	var fixBarProduct = function () {
		var btns = $(".wrap-fixed-bar .wrap-btns .btn");
		var bar = $(".wrap-fixed-bar");
		var btnHideBar = $(".btn-hide-bar");

		var contents = $(".wrap-fixed-bar .content");
		var contentZero = $(".wrap-fixed-bar .content-cart-empty");
		
		var removeClass = function () {
			btns.removeClass("cur-btn");
			bar.removeClass("fix-bar-active");
		};

		if ( btns.length && bar.length ) {
			btns.click(function () {
				var cur = $(this);
				
				if ( !cur.hasClass("cur-btn") && !cur.hasClass("btn-compare") ) {
					btns.removeClass("cur-btn");
					cur.addClass("cur-btn");
					bar.addClass("fix-bar-active");
					contents.removeClass("content-cur");

					var showKey = cur.attr("data-show-key");
					var curContent = $(`.wrap-fixed-bar .content[data-show-key='${showKey}']`);

					if ( curContent.find("table").length ) {
						curContent.addClass("content-cur");
					} else {
						contentZero.addClass("content-cur");
					}

				} else if ( cur.hasClass("cur-btn") ) {
					removeClass();
				}

			})
		}

		if ( btnHideBar.length ) {
			btnHideBar.click(function () {
				removeClass();
			})
		}

		$(document).mouseup(function (e){
			if (!bar.is(e.target) && bar.has(e.target).length === 0) {
				removeClass();
			}
		});
	};
//Fix bar logic END


//Fix aside START
	var asideFix = function () {
		var aside = $(".aside-fix");
		var windowWidth = $(window).width();
		var offsetTop = 140;

		if ( aside.length && windowWidth > 992 ) {
			aside.stick_in_parent({
				inner_scrolling: true,
				offset_top: offsetTop
			});
		}
	};
//Fix aside END


//Product card buttons START
	//Button show more info about product START
	var btnToDataTable = function () {
		var btn = $(".card-data .show-more");
		var wrapBtns = $(".card-info .wrap-tabs-btn");
		var wrapContents = $(".card-info .wrap-tabs-content");
		var tabContentAll = wrapContents.find(".tab-content");
		var tabTable = wrapContents.find(".tab-content-data-table");
		var thisMdPlus = $(window).width() > 768;

		function scrollToTable () {
			var offsetBlock = wrapContents.offset().top;
			var heightHeader = $(".header").outerHeight();
			var offsetTop = 80;
			var resultOffset = offsetBlock - heightHeader - offsetTop;

	    $([document.documentElement, document.body]).animate({
	        scrollTop: resultOffset
	    }, 500);
		};

		function changeTab () {
			wrapBtns.find(".tab").removeClass("cur-tab");
			wrapBtns.find(".tab-data-table").addClass("cur-tab");

			tabContentAll.removeClass("tab-content-cur");
			tabTable.addClass("tab-content-cur");
		};

		function changeDropdown () {
			if ( tabTable.css("display") !== "block" ) {
				wrapContents.find(".dropdown-title").removeClass("dropdown-title-active");
				wrapContents.find(".dropdown-title-data-table").addClass("dropdown-title-active");

				tabContentAll.slideUp(400);
				tabTable.slideDown(400);
			}
		};

		if ( btn.length ) {
			btn.click(function () {
				scrollToTable();
				
				if ( thisMdPlus ) {
					changeTab();
				} else {
					changeDropdown();
				}
			});
		}

	};
	//Button show more info about product END


	//Init START
		var productCardBtn = function () {
			btnToDataTable();
		};
	//Init END
//Product card buttons END


//Catalog products (posts products) START
	var catalogProducts = function () {
		var items = $(".row-product-category .category-item");
		var typeIf = $(window).width() > 991 ? "odd" : "even";
		checkOddListItems(items, typeIf);
	};
//Catalog products (posts products) END


//Product card page START
	//Slider images START
	var sliderImgs = function () {
		var sliderBig = $(".card-data .wrap-main-slider .slider");
		var slideSmall = $(".card-data .wrap-slider-thumb .slider");
		var slideModal = $(".modal-product-slider .slider");
		var sliderOtherProducts = $(".row-other-products .other-products-slider");

		var navSvg = `
			<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.4569 0.139839L7.86249 6.67748C7.95412 6.77088 8 6.87834 8 6.9999C8 7.12146 7.95412 7.22912 7.86249 7.32257L1.4569 13.8597C1.36513 13.9533 1.25984 14 1.14068 14C1.02156 14 0.916123 13.9532 0.824549 13.8597L0.137457 13.1584C0.045835 13.0649 4.76837e-05 12.9573 4.76837e-05 12.8357C4.76837e-05 12.7142 0.045835 12.6066 0.137457 12.5131L5.53954 6.9999L0.13712 1.48654C0.0454974 1.39308 0 1.28543 0 1.16406C0 1.04231 0.0457864 0.934699 0.13712 0.841244L0.824502 0.139889C0.916075 0.0464334 1.02156 0 1.14063 0C1.25984 -4.95911e-05 1.36528 0.0463839 1.4569 0.139839Z" fill="#999999"/>
			</svg>`;

		var sliderBigData = {
			slidesToShow: 1,
      slidesToScroll: 1,
      speed: 400,
      dots: true,
      appendDots: $(".card-data .wrap-main-slider-dots"),
      arrows: false,
      focusOnSelect: false,
      asNavFor: slideSmall
		};

		var sliderSmallData = {
			slidesToShow: 5,
      slidesToScroll: 1,
      speed: 400,
      dots: false,
      focusOnSelect: true,
      appendArrows: '.card-data .wrap-slider-thumb .wrap-nav',
      prevArrow: `<span>${navSvg}</span>`,
      nextArrow: `<span>${navSvg}</span>`,
      asNavFor: sliderBig,
      responsive: [
      	{
		    	breakpoint: 1260,
		      settings: {
		        slidesToShow: 4,
		      }
		    },
		    {
		    	breakpoint: 991,
		      settings: {
		        slidesToShow: 5,
		      }
		    },
		  ]
		};

		var sliderModalData = {
			slidesToShow: 1,
      slidesToScroll: 1,
      speed: 400,
      dots: true,
      focusOnSelect: true,
      appendArrows: '.modal-product-slider .wrap-nav',
      appendDots: '.modal-product-slider .wrap-dots',
      prevArrow: `<span>${navSvg}</span>`,
      nextArrow: `<span>${navSvg}</span>`,
		};

		var sliderOtherProductsData = {
			slidesToShow: 2,
			slidesToScroll: 1,
			speed: 400,
			arrows: false,
			dots: false,
			focusOnSelect: false,
			responsive: [
		    {
		      breakpoint: 576,
		      settings: {
						variableWidth: true,
						centerMode: true,
		        slidesToShow: 1,
		      }
		    }
		  ]
		};

		sliderBig.slick(sliderBigData);
		slideSmall.slick(sliderSmallData);
		slideModal.slick(sliderModalData);
		if ( $(window).width() < 768 ) { 
			sliderOtherProducts.slick(sliderOtherProductsData);
		}
	};
	//Slider images END

	//Init START
	var productCardPageInit = function () {
		sliderImgs();
	};
	//Init END
//Product card page END



//Compare products page START
  //Table characteristic tabs START
  var tableTabs = function() {
    var tabs = $(".compare-controls-btns .compare-control-btn");
    if ( $(window).width() > 576 ) {
    	var tables = $(".products-data-tables-desktop .products-data-table");
    } else {
    	var tables = $(".products-data-tables-mobile .products-data-table");
    }

    if ( tabs.length && tables.length ) {
      tabs.click(function () {
        tabs.removeClass("cur-btn");
        $(this).addClass("cur-btn");

        tables.removeClass("cur-table");
        tables.eq( $(this).index() ).addClass("cur-table");
      });
    }
  };
  //Table characteristic tabs END


  //Table tr hover START
  var tableTrHover = function() {
  	var tr = $(".products-data-wrap tr");
  	var trTitle = $(".products-data-table-titles tr");
  	var trInfo = $(".products-data-tables tr");
  	var hoverClass = "tr-hover";

  	if ( tr.length ) {
  		tr.hover(function() {
  			var index = $(this).index();
  			trTitle.eq(index).addClass(hoverClass);
  			trInfo.eq(index).addClass(hoverClass);
  			
  		}, function() {
  			tr.removeClass(hoverClass);
  		});
  	}
  };
  //Table tr hover END



  //Table tr check height START
  var tableTrCheckHeight = function() {
  	var trTitle = $(".products-data-table-titles tr");
  	var trInfo = $(".products-data-tables tr");

  	if ( trTitle.length && trInfo.length && $(window).width() > 576 ) {
  		trTitle.each(function() {
  			var index = $(this).index();
  			var arrHeight = [ $(this).height(), trInfo.eq(index).height() ];

  			if ( arrHeight[0] !== arrHeight[1] ) {
  				$(this).height( Math.max(...arrHeight) );
  				$(".products-data-table").each(function() {
  					var tr = $(this).find("tr:not(.row-subtitles-mobile)");
  					tr.eq(index).height( Math.max(...arrHeight) );
  				});
  			}
  		});
  	}
  };
  //Table tr check height END



  //Init START
  var compareProductsInit = function() {
  	tableTabs();
  	tableTrHover();
  	tableTrCheckHeight();
  };
  //Init END
//Compare products page END



//Custom scrollbar START
	var barsProductsCompare = function () {
		//Products row
		var barProductsCard = $(".products-row .products-line-content");
		var table = $(".products-data-table");
		var countCard = $(".products-row .wrap-card").length;

		if ( barProductsCard.length ) {
			barProductsCard.mCustomScrollbar({
				axis: "x",
				theme: "dark",
				scrollInertia: 0,
			  scrollButtons:{
			    enable:true
			  },
			  mouseWheel:{
			  	scrollAmount: "50"
			  },
			  callbacks: {
					whileScrolling: function() {
				    var left = this.mcs.left;
				    table.css({"left" : left + "px"});
				    
				    if ( $(window).width() < 576 ) {
				    	$(".title-mobile").css({"left" : -left + "px"});
				    }
					}
			  }
			});

			var btnsScroll = $(".products-row .mCSB_scrollTools > a");

			if ( btnsScroll.length ) {
				btnsScroll.html(`<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.09267 9.90012L5.89687 5.23037C5.96559 5.16366 6 5.0869 6 5.00007C6 4.91324 5.96559 4.83634 5.89687 4.76959L1.09267 0.100236C1.02385 0.0333418 0.944879 0 0.855507 0C0.766172 0 0.687092 0.033447 0.618412 0.100236L0.103092 0.601134C0.0343757 0.667923 3.52859e-05 0.744785 3.52859e-05 0.831614C3.52859e-05 0.918443 0.0343757 0.995304 0.103092 1.06209L4.15466 5.00007L0.102839 8.93819C0.0341229 9.00494 -4.76837e-07 9.08184 -4.76837e-07 9.16853C-4.76837e-07 9.2555 0.0343394 9.33236 0.102839 9.39911L0.618376 9.90008C0.687056 9.96683 0.766172 10 0.855471 10C0.944878 10 1.02396 9.96687 1.09267 9.90012Z" fill="#292929"/>
				</svg>
				`)
			}
		}
		//
	};

	var barDropdownSelect = function () {
		var barContent = $(".wrap-selects .selectize-dropdown");

		if ( barContent.length ) {
			barContent.mCustomScrollbar({
				axis: "y",
				theme: "dark",
			  mouseWheel:{
			  	scrollAmount: "200"
			  }
			});
		}
	};

	var bannerScrollBar = function () {
		var barContent = $(".banner .banner-content");

		if ( barContent.length && $(window).width() < 576 ) {
			barContent.mCustomScrollbar({
				theme: "dark",
				axis: "x",
			});
		}
	};

	var productsScrollBar = function () {
		var barContent = $(".modal-set-product .other-product-slider");

		if ( barContent.length && $(window).width() < 576 ) {
			barContent.mCustomScrollbar({
				axis: "x",
			});
		}
	};

	var userProductsTableScrollBar = function () {
		var barContent = $(".page-user-data .wrap-table-products-info");

		if ( barContent.length ) {
			barContent.mCustomScrollbar({
				axis: "x",
			});
		}
	};


	//Init START
	var customScrollBarInit = function () {
		barsProductsCompare();
		barDropdownSelect();
		bannerScrollBar();
		productsScrollBar();
		userProductsTableScrollBar();
	};
	//Init END
//Custom scrollbar END


//Modal window START
	var modalWindow = function () {
		var wrapModal = $(".wrap-modal-window");
		var btnClose = wrapModal.find(".icon-close");
		var btnShowModal = $(".modal-show");
		var $menuAPI = $(".mobile-menu").data("mmenu");
		var html = $("html");
		var body = $("body");

		if ( wrapModal.length ) {
			btnClose.click(function () {
				wrapModal.removeClass("modal-window-active");
				wrapModal.find(".modal").removeClass("modal-active");

				html.removeClass("page-fixed");
				$(".header, .wrap-fixed-bar").css({"padding-right" : 0})
			});

			btnShowModal.click(function () {
				var btn = $(this);
				var key = btn.attr("data-modal-key");

				//Mmenu close
				if ( $menuAPI ) {
					$menuAPI.close();
				}
				//

				//Page fixed
				var widthBeforeFixed = $("body").outerWidth(true);
				html.addClass("page-fixed");
				var widthAfterFixed = $("body").outerWidth(true);
				var pr = widthAfterFixed - widthBeforeFixed;
				$(".header, .wrap-fixed-bar").css({"padding-right" : pr + "px"});
				//

				if ( !(key === "product-img-slider" && $(window).width() < 768) ) {
					wrapModal.find(`.modal[data-modal-key=${key}]`).addClass("modal-active");
					wrapModal.addClass("modal-window-active");					
				}
			});
		}
	};
//Modal window END


//Form elements START
	//Custom select START
	var customSelect = function () {
		var fieldsSelect = $(".wrap-select select");
		fieldsSelect.hide();

		if ( fieldsSelect.length ) {
			fieldsSelect.selectize();
		}
	};
	//Custom select END

	//Phone mask START
	var phoneMask = function () {
		var fields = $(".field-tel");

		if ( fields.length ) {
			fields.mask("+375 (00) 000-00-00")
		}
	};
	//Phone mask END

	//Showing required field START
	var showingRequiredField = function () {
		var label = $(".form .label");

		var fnShowind = function (label) {
			var newIcon = "<span class='require-icon'>*</span>";
			var labelText = label.text();
			label.text( labelText.slice(0, labelText.length - 1) );

			label.append(newIcon);
		};

		if ( label.length ) {
			label.each(function () {
				var resultCheck = $(this).text().indexOf("*");
				
				if ( resultCheck !== -1 ) {
					fnShowind($(this))
				}

			});
		}

	};
	//Showing required field END

	//Init START
	var formElementsInit = function () {
		customSelect();
		showingRequiredField();
		phoneMask();
	}
	//Init END
//Form elements END


//Checkout logic START
	//Select big radio field START
	var selectBigRadioField = function () {
		var fields = $(".stage-content-big-radio .field-radio-big input");

		var fnSetBox = function (field) {
			var curWrap = field.closest(".stage-content-part");
			var box = curWrap.find(".wrap-result-select");
			var subtextPrice = field.find(".subtext").text();
			var newTitle = field.find(".text").text();
			var newIcon = field.find(".box .wrap-icon").clone();

			box.find(".title").text( newTitle );
			box.find(".box .wrap-icon").html(newIcon);

			if ( !!subtextPrice ) {
				box.find(".subtext .price").text( subtextPrice );
			}
		};

		if ( fields.length ) {
			fields.change(function () {
				fnSetBox( $(this).parent() );
			});
		}
	};
	//Select big radio field END

	//Btn clear search field START
	var btnClearSearchField = function () {
		var btn = $(".checkout-stage .wrap-field-search .icon-clear");
		var field = $(".checkout-stage .wrap-field-search .field");

		if ( btn.length && field.length ) {
			btn.click(function () {

				field.val("")

			});
		}
	};
	//Btn clear search field END

	var checkoutLogic = function () {
		selectBigRadioField();
		btnClearSearchField();
	};
//Checkout logic END


//Preloader logic START
	var preloaderLogic = function () {
		var preloader = $(".preloader");

		if ( preloader.length ) {
			$(document).ready(function () {
				
				setTimeout(function () {
					preloader.fadeOut(400)
				}, 600);

			});
		}
	};
//Preloader logic END


//Check length tags (page posts articles) START
	var checkLengthTags = function () {
		var list = $(".posts-articles .wrap-tags ul");
		var thisSm = $(window).width() < 576;

		if ( list.length && thisSm ) {
			checkListLength(list);
		}
	};
//Check length tags (page posts articles) END


//Init SPART
	var initScripts = function () {
		tabsLogic();
		dropDownOnClick();
		sliderViewedProducts();
		sliderSetProductsModal();
		headerInit();
		fixBarProduct();
		sidebarLogicInit();
		productCardBtn();
		catalogBreedingLogic();
		fieldCountProduct();
		productCardPageInit();
		itemsDropdown();
		modalWindow();
		formElementsInit();
		customScrollBarInit();
		compareProductsInit();
		checkoutLogic();
		yCards();
		asideFix();
		indexProductSlider();
		catalogProducts();
		preloaderLogic();
		btnToTopInit();
		checkLengthTags();
	};
//Init END


/***************/
	initScripts();
/***************/

});
