"use strict";

$(function () {


//Header fixed style START
const headerFixedStyle = () => {
	const header = $(".header");
	const mobileMenu = $(".header .wrap-mobile-menu");

	function checkOffset () {
		const headerOffset = header.offset().top;
			
		if ( headerOffset > 0 ) {
			header.addClass("header-scroll");
		} else if ( !headerOffset > 0 && !mobileMenu.hasClass("mobile-menu-active") ) {
			header.removeClass("header-scroll");
		}
	}

	checkOffset();

	if ( header.length ) {
		$(window).scroll(function() {
			checkOffset();
		});
	}
};
//Header fixed style END


//Mobile menu START
const mobileMenu = () => {
	const menuBtn = $(".header .wrap-menu-btn .menu-icon");
	const menu = $(".header .wrap-mobile-menu");
	const header = $(".header");

	if ( menuBtn.length && menu.length ) {
		menuBtn.click(function () {
			$(this).toggleClass("is-active");
			menu.toggleClass("mobile-menu-active");

			if ( header.offset().top < 1 && !header.hasClass("header-scroll") && header.hasClass("header-index") ) {
				header.addClass("header-scroll");
			} else if ( header.offset().top < 1 && header.hasClass("header-scroll") ) {
				header.removeClass("header-scroll");
			}
		});
	}
};
//Mobile menu END


//Sliders START
//
const slidersOurPrograms = () => {
	const sliderTopParams = {
    slidesPerView: 3,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.our-program .wrap-slider-top .wrap-slider-arrows .button-next',
	    prevEl: '.our-program .wrap-slider-top .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 820px
		  820: {
		    slidesPerView: 2,
		  },
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

	const sliderBottomParams = {
    slidesPerView: 3,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.our-program .wrap-slider-bottom .wrap-slider-arrows .button-next',
	    prevEl: '.our-program .wrap-slider-bottom .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 820px
		  820: {
		    slidesPerView: 2,
		  },
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

  const sliders = [
  	$(".our-program .wrap-slider-top .slider"),
  	$(".our-program .wrap-slider-bottom .slider")
  ];

	const sliderTop = new Swiper(sliders[0], sliderTopParams);
	const sliderBottom = new Swiper(sliders[1], sliderBottomParams);
};
//

//
const slidersPortfolio = () => {
	const sliderTopParams = {
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.portfolio .wrap-slider-top .wrap-slider-arrows .button-next',
	    prevEl: '.portfolio .wrap-slider-top .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

	const sliderBottomParams = {
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.portfolio .wrap-slider-bottom .wrap-slider-arrows .button-next',
	    prevEl: '.portfolio .wrap-slider-bottom .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

  const sliders = [
  	$(".portfolio .wrap-slider-top .slider"),
  	$(".portfolio .wrap-slider-bottom .slider")
  ];

	const sliderTop = new Swiper(sliders[0], sliderTopParams);
	const sliderBottom = new Swiper(sliders[1], sliderBottomParams);
};
//

//
const sliderTestimonials = () => {
	const sliderParams = {
    slidesPerView: 3,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.testimonials .wrap-slider .wrap-slider-arrows .button-next',
	    prevEl: '.testimonials .wrap-slider .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 820px
		  820: {
		    slidesPerView: 2,
		  },
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

	const slider = new Swiper($(".testimonials .wrap-slider .slider"), sliderParams);
};
//


//
const sliderPhotos = () => {
	const sliderParams = {
    slidesPerView: 3,
    spaceBetween: 16,
    speed: 700,
    navigation: {
	    nextEl: '.about-program .wrap-slider .wrap-slider-arrows .button-next',
	    prevEl: '.about-program .wrap-slider .wrap-slider-arrows .button-prev',
	  },
		breakpoints: {
		  // when window width is <= 820px
		  820: {
		    slidesPerView: 2,
		  },
		  // when window width is <= 576px
		  576: {
		  	slidesPerView: 1,
		  	spaceBetween: 8
		  },
		}
  }

	const slider = new Swiper($(".about-program .wrap-photos-slider .slider"), sliderParams);
};
//



//Init
const slidersInit = () => {
	slidersOurPrograms();
	slidersPortfolio();
	sliderTestimonials();
	sliderPhotos();
};
//Sliders END



//Slider arrows status visible START
const sliderArrowsStatusVisible = () => {
	const slidersTritle = $(".our-program .slider, .testimonials .slider, .about-program .slider");
	const sliderPortfolio = $(".portfolio .slider");

	if ( slidersTritle.length ) {
		slidersTritle.each(function() {
			const cur = $(this);
			const curItemsLenght = cur.find(".wrap-item").length;
			const curArrows = cur.next(".wrap-slider-arrows");

			if ( $(window).width() > 820 && curItemsLenght <= 3 ) { curArrows.hide() }
			else if (
				$(window).width() > 576 &&
				$(window).width() < 820 &&
				curItemsLenght <= 2 ) { curArrows.hide() }
			else if ( $(window).width() < 576 && curItemsLenght <= 1 ) { curArrows.hide() }
		});
	}

	if ( sliderPortfolio.length ) {
		sliderPortfolio.each(function() {
			const cur = $(this);
			const curItemsLenght = cur.find(".wrap-item").length;
			const curArrows = cur.next(".wrap-slider-arrows");

			if ( $(window).width() > 576 && curItemsLenght <= 2 ) { curArrows.hide() }
			else if ( $(window).width() < 576 && curItemsLenght <= 1 ) { curArrows.hide() }
		});
	}
};
//Slider arrows status visible END



//Preloader START
const preloader = function () {
	const preloader = $(".wrap-preloader");

	if ( preloader.length ) {
		$(document).ready(function () {
			
			setTimeout(function () {
				preloader.fadeOut(400)
			}, 600);

		});
	}
};
//Preloader END



//Replace all SVG images with inline SVG START
const replaceSVGToInline = () => {
	let imgs = $('img.svg');

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



//Parse url video START
const parseUrlVideo = () => {
	const videos = $(".video-url");

	if ( videos.length ) {
		videos.each(function() {

			let cur = $(this);
			const indexPos = cur.text().indexOf("?v=");
			const url = cur.text().slice(indexPos + 3, 14 + indexPos);
			const resultUrl = `https://www.youtube.com/embed/${url}?rel=0&amp;fs=0&amp;showinfo=0`;

			let iframe = document.createElement("iframe");
			iframe.setAttribute("src", resultUrl);
			cur.after(iframe);
			cur.remove();

		});
	}
};
//Parse url video END



//Parallax banner START
const parallaxBanner = () => {
	const parallaxLayer = $(".main-banner-parallax");

	if ( parallaxLayer.length ) {
		parallaxLayer.mousemove(function(e) {
	    let change;
	    let xpos = e.clientX;
	    let ypos = e.clientY;
	    let left = change * 20;
	    xpos = xpos *2 ;
	    ypos = ypos*2;
	    let topResult = (0 + (ypos/50)) + "px";
	    let rightResult = (0 + (xpos/80)) + "px";

	    parallaxLayer.css('top', `calc(50% - ${topResult})`);
	    parallaxLayer.css('left', `calc(50% - ${rightResult})`);

	  });
	}
};
//Parallax banner END



//Set mask START
const setMask = () => {
	const fields = $("input[type=tel]");

	if ( fields.length ) {
		fields.mask(("+7 (000) 00 - 00 - 00"));
	}
};
//Set mask END



//Modals START
const modalsLogic = () => {
	const modals = $(".wrap-modal");
	const btns = $(".btn");
	const btnClose = $(".icon-close");

	if ( modals.length && btns.length ) {
		btns.click(function() {
			const key = $(this).attr("data-modal-key");
			$(`.wrap-modal[data-modal-key=${key}]`).addClass("active");
		});

		btnClose.click(function() {
			modals.removeClass("active");
		});

		$(document).mouseup(function (e) {
			if (!modals.find(".modal").is(e.target) && modals.find(".modal").has(e.target).length === 0) {
				modals.removeClass("active");
			}
		});
	}
}
//Modals END




//Send message (AJAX) START
const sendMessage = (data) => {
	$(".form-callback").submit(function (e) {
		e.preventDefault();
		const form = $(this);
		const btn = form.find(".btn-callback-send");

		btn.attr("disabled", "disabled").addClass("btn-callback-load");

				$(".wrap-modal").removeClass("active");
				setTimeout(function() {
					$(".wrap-modal[data-modal-key=modal-success]").addClass("active");
					btn.removeAttr("disabled");
				}, 300);

		// const data = {
		// 	name: form.find("input.name").val(),
		// 	phone: form.find("input.phone").val()
		// };

		// $.ajax({
		// 	type: "POST",
		// 	url: "/sendform.php",
		// 	data: $(this).serialize(),
		// 	success (data) {
		// 		form.trigger('reset');
		// 		console.log(data);

		// 		$(".wrap-modal").removeClass("active");
		// 		setTimeout(function() {
		// 			$(".wrap-modal[data-modal-key=modal-success]").addClass("active");
		// 			btn.removeAttr("disabled");
		// 		}, 300);

		// 	},
		// 	error (data) {
		// 		form.trigger('reset');
		// 		console.log(data);
		// 	}
		// });
	});
}
//Send message (AJAX) END




//Init START
const scriptsInit = () => {
	headerFixedStyle();
	slidersInit();
	mobileMenu();
	parseUrlVideo();
	replaceSVGToInline();
	preloader();
	sliderArrowsStatusVisible();
	parallaxBanner();
	sendMessage();
	modalsLogic();
	setMask();
};
//Init END


//**
scriptsInit();
//**

});