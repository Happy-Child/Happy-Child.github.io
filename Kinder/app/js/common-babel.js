"use strict";

$(function () {
	//Presents slider START
	var presentsSlider = function presentsSlider() {
		var sliderImgs = $(".wrap-presents-slider .slider");
		var sliderTexts = $(".wrap-presents-texts");

		var sliderImgsOptions = {
			dots: true,
			appendDots: $(".wrap-present-slider-controls"),
			appendArrows: $(".wrap-present-slider-controls"),
			speed: 600,
			slidesToShow: 1,
			fade: true,
			cssEase: "linear",
			asNavFor: sliderTexts,
			autoWidth: true
		};

		var sliderTextsOptions = {
			dots: false,
			speed: 600,
			slidesToShow: 1,
			fade: true,
			arrows: false,
			cssEase: "linear",
			asNavFor: sliderImgs
		};

		if (sliderImgs.length !== 0) {
			sliderImgs.slick(sliderImgsOptions);
		}
		if (sliderTexts.length !== 0) {
			sliderTexts.slick(sliderTextsOptions);
		}
	};
	//Presents slider END


	//Slider week presents START
	var weekPresentsSlider = function weekPresentsSlider() {
		var slider = $(".week-slider .slider");

		var sliderOptions = {
			dots: false,
			appendArrows: $(".week-slider .slider-control"),
			speed: 600,
			slidesToShow: 2,
			autoWidth: true
		};

		if (slider.length !== 0) {
			slider.slick(sliderOptions);
		}
	};
	//Slider week presents END


	//Custom select START
	var customSelect = function customSelect() {
		var select = $(".select");

		if (select.length !== 0) {
			select.select2({ allowClear: true });

			$(".select-profile").select2({ placeholder: "Регион", allowClear: true });
			$(".select-gallery").select2({ placeholder: "Все регионы", allowClear: true });

			$(".select-day").select2({ placeholder: "День", allowClear: true });
			$(".select-month").select2({ placeholder: "Месяц", allowClear: true });
			$(".select-year").select2({ placeholder: "Год", allowClear: true });
		}
	};
	//Custom select END


	//Select border on field set image START
	var selectBorder = function selectBorder() {
		var mainBorder = $(".set-photo .cur-border");
		var thumbsBorders = $(".thumbs-photo .thumb");

		if (mainBorder.length !== 0 && thumbsBorders.length !== 0) {
			thumbsBorders.click(function (e) {
				e.preventDefault();

				var nextIndex = $(this).index() + 1;
				thumbsBorders.removeClass("cur-thumb");
				$(this).addClass("cur-thumb");

				mainBorder.removeClass("border-1 border-2 border-3 border-4").addClass("border-" + nextIndex);
			});
		}
	};
	//Select border on field set image END


	//Menu btn START
	var menuBtnLogic = function menuBtnLogic() {
		$(".header .menu-btn").click(function () {
			$(this).toggleClass("is-active");
			$(".nav-mobile").toggleClass("nav-active");
		});
	};
	//Menu btn END


	//Select bracelet START
	var selectBracelet = function selectBracelet() {
		var bracelets = $(".wrap-bracelets .bracelet");

		if (bracelets.length !== 0) {
			bracelets.click(function () {
				bracelets.removeClass("bracelet-select");
				$(this).addClass("bracelet-select");
			});
		}
	};
	//Select bracelet END


	//Custom datapicker START
	var customDatepicker = function customDatepicker() {
		$(".wrap-field-date .field").datepicker({
			format: "dd.mm.yyyy",
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
		});
	};
	//Custom datapicker END


	//Windows modal logic START
	var windowsModalLogic = function windowsModalLogic() {
		var modalsWrap = $(".wrap-modals");
		var modals = $(".modal");
		var btnClose = modals.find(".btn-close");
		var btnShowModal = $(".modal-show");
		var hasActiveModal = 0;

		if (modals.length !== 0) {
			btnClose.click(function (e) {
				e.preventDefault();

				hasActiveModal = 0;
				modalsWrap.removeClass("wrap-modals-active");
				modals.removeClass("modal-active");
				$("body").removeClass("fixed").css({ "margin-right": 0 });
			});

			btnShowModal.click(function (e) {
				e.preventDefault();

				modalsWrap.animate({
					scrollTop: 0
				}, 300);

				var widthBeforeFixed = $("body").outerWidth(true);
				$("body").addClass("fixed");
				var widthAfterFixed = $("body").outerWidth(true);
				var mr = widthAfterFixed - widthBeforeFixed;

				if (!hasActiveModal) {
					$("body").css({ "margin-right": mr + "px" });
				}
				hasActiveModal = 1;

				modals.removeClass("modal-active");
				var btn = $(this);
				var key = btn.attr("data-modal-key");
				var nextModal = $(".modal[data-modal-key=" + key + "]");

				nextModal.addClass("modal-active");
				modalsWrap.addClass("wrap-modals-active");
			});
		}
	};
	//Window modal logic END


	//Crop img START
	var cropImg = function cropImg() {
		var img = document.getElementById('crop-img');
		var dataFields = {
			x: $(".modal-crop .data-x"),
			y: $(".modal-crop .data-y"),
			width: $(".modal-crop .data-width"),
			height: $(".modal-crop .data-height"),
			scaleX: $(".modal-crop .data-scaleX"),
			scaleY: $(".modal-crop .data-scaleY")
		};

		function ff() {
			$(".data-img").each(function () {
				console.log($(this).val());
			});
		};

		if (!!img) {
			var cropper = new Cropper(img, {
				aspectRatio: 5 / 5,
				zoomable: false,
				toggleDragModeOnDblclick: false,
				background: false,
				minCropBoxWidth: 150,
				crop: function crop(event) {
					dataFields.x.val(event.detail.x);
					dataFields.y.val(event.detail.y);
					dataFields.width.val(event.detail.width);
					dataFields.height.val(event.detail.height);
					dataFields.scaleX.val(event.detail.scaleX);
					dataFields.scaleY.val(event.detail.scaleY);
					ff();
				}
			});
		}
	};
	//Crop img END

	$(function () {
		var iframe = $('#together', parent.document.body);
		iframe.height();
	});

	//Init scripts
	var initScripts = function initScripts() {
		presentsSlider();
		customSelect();
		weekPresentsSlider();
		menuBtnLogic();
		selectBracelet();
		customDatepicker();
		windowsModalLogic();
		cropImg();
		selectBorder();
	};
	//

	//-------------------------
	initScripts();
	//-------------------------
});