const ready = require("%helpers%/document-ready.js");

ready(function() {
	const $btnsShowPopups = $(".btn-popup");
	const $elementsHidePopups = $(".popup__close");
	const $allPopups = $(".popup");
	const $page = $("html, body");
	const $scrollHeader = $(".header-scroll");
	const $popupLoadImage = $(".popup-portfolio__img");

	let $curPopup;
	let $curBtn;

	// -- Functions BEGIN
	const loadImage = ($btn) => {
		const src = $btn.data("popup-img") ? $btn.data("popup-img") : "./img/img-placeholder.svg";
		const img = new Image();

		img.onload = function () {
			$popupLoadImage.attr("src", src);

			setTimeout(function () {
				$popupLoadImage.parent().addClass("popup-portfolio__wrap-img_onload");
			}, 200);
		};

		img.src = src;
	};

	const showPopup = () => {
		const key = $curBtn.attr("data-popup-key");
		$curPopup = $(`.popup[data-popup-key=${key}]`);
		let pageWidthBeforeFixed = $("body").width();

		if ( $curPopup.length ) {
			if ($curPopup.hasClass("popup-portfolio")) loadImage($curBtn);

			$allPopups.removeClass("popup_visible");
			$curPopup.addClass("popup_visible disabled");
			$page.addClass("page-fixed");

			const pageWidthAfterFix = $("body").width();
			const scrollHeaderIndent = pageWidthAfterFix - pageWidthBeforeFixed;
			$scrollHeader.css({"padding-right": scrollHeaderIndent + "px"});

			setTimeout(function() {
				$curPopup.removeClass("disabled");
			}, 300); // -- After popups show animation show
		}
	};

	const hidePopups = () => {
		$allPopups.removeClass("popup_visible");

		setTimeout(function() {
			if (!$(".menu-mobile").hasClass("menu-mobile_visible")) $page.removeClass("page-fixed");
			$curBtn.removeClass("disabled");
			$scrollHeader.css({"padding-right": 0});
		}, 300); // -- After popups show animation hide
	};
	// -- Functions END


	// -- Show popop BEGIN
	if ($btnsShowPopups.length && $allPopups.length) {

		$btnsShowPopups.on("click", function (e) {
			e.preventDefault();
			$curBtn = $(this).addClass("disabled");
			showPopup();
		});
	}
	// -- Show popop END


	// -- Hide popups BEGIN
	if ($elementsHidePopups.length && $allPopups.length) {
		$elementsHidePopups.on("click", function () {
			hidePopups();
		});
	}
	// -- Hide popups END

});
