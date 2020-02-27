// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END

documentReady(function() {
	const $header = $(".header"),
		$menu = $(".menu-mobile"),
		$menuBtn = $header.find(".header__btn"),
		$page = $("html, body");

	// -- Functions BEGIN
	const changeStateMenu = () => {
		$menuBtn.toggleClass("header__btn_active");
		$menu.toggleClass("menu-mobile_visible");
		$page.toggleClass("page-fixed");
	};

	const initMenuBtn = () => {
		$menuBtn.on("click", function () {
			changeStateMenu();
		});
	};
	// -- Functions END

	if ($menuBtn.length) initMenuBtn();
});
