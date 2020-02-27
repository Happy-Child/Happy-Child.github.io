// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END

documentReady(function() {
	const $dropdownBtns = $(".faq__item-top");
	const $dropdownTexts = $(".faq__item-wrap-text");

	// -- Functions BEGIN
	const dropdownTextToggleState = () => {
		$dropdownBtns.on("click", function () {

			const isActive = $(this).hasClass("faq__item-top_active");
			const $nextText = $(this).next(".faq__item-wrap-text");

			$dropdownTexts.slideUp();
			$dropdownBtns.removeClass("faq__item-top_active");

			$(this).addClass("faq__item-top_active");

			if ( isActive ) $(this).removeClass("faq__item-top_active");
			else $nextText.slideDown();
		});
	};
	// -- Functions END

	if ( $dropdownBtns.length ) dropdownTextToggleState();

});
