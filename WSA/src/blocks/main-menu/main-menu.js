// -- Components BEGIN
import "%blocks%/main-menu/components/components.js";
// -- Components END


// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
const windowLoad = require("%helpers%/window-load.js");
const breakpoints = require("%helpers%/breakpoints.js");
const isDesktop = require("%helpers%/is-desktop.js");
const isIE = require("%helpers%/is-ie.js");
const isEdge = require("%helpers%/is-edge.js");
const cleanFieldsForms = require("%helpers%/clean-fields-forms.js");
const inputFilter = require("%helpers%/input-filter.js");
// -- Helpers END


// -- Libraries BEGIN
// -- Libraries END


documentReady(function() {

	const $menuBtn = $(".header__wrap-menu-btn");
	const $menu = $(".main-menu");
	const $infoBottomScreen = $(".info-bottom-screen__socials");
	const hasInfoBottomScreen = $infoBottomScreen.length;
	const $bgHomePage = $(".home__bg");
	const hasBgHomePage = $bgHomePage.length;
	const $page = $("body, html");
	const activeClassMenuBtn = "header__wrap-menu-btn_active";


	// -- Functions BEGIN
	const changeStatesOnHide = (menuActive) => {
		$menuBtn.toggleClass("el-disabled");

		if (menuActive) {
			if ( $(window).height() <= $("html").height() ) $page.toggleClass("page-fixed");
			if (hasInfoBottomScreen) $infoBottomScreen.css({"margin-right": 0});
			if (hasBgHomePage) $bgHomePage .css({"width": 100 + "%"});
		}
	};

	const changeStateMenu = ($btn) => {
		const menuActive = $btn.hasClass(activeClassMenuBtn);
		const pageWidthBeforeFixed = $("body").width();

		$menuBtn.toggleClass(`${activeClassMenuBtn} el-disabled`);
		$menu.toggleClass("main-menu_visible");

		if (!menuActive) {
			if ($(window).height() <= $("html").height()) $page.toggleClass("page-fixed");
			const pageWidthAfterFixed = $("body").width();
			const scrollHeaderIndent = pageWidthAfterFixed - pageWidthBeforeFixed;
			if (hasInfoBottomScreen) $infoBottomScreen.css({"margin-right": scrollHeaderIndent + "px"});
			if (hasBgHomePage) $bgHomePage .css({"width": `calc(100% - ${scrollHeaderIndent}px)`});
		}

		if ($menuBtn.hasClass("el-disabled")) {
			setTimeout(() => {
				changeStatesOnHide.call(this, menuActive);
			}, 1600); // Delay for menu animation
		} else {
			setTimeout(() => {
				changeStatesOnHide.call(this, menuActive);
			}, 800); // Delay for menu animation
		}


	};

	const setEventOnButton = () => {
		$menuBtn.on("click", function () {
			changeStateMenu($(this));
		});
	};
	// -- Functions END


	if ($menu.length && $menuBtn.length) setEventOnButton();

});
