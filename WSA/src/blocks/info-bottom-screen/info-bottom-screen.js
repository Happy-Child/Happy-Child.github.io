import "%blocks%/info-bottom-screen/components/components.js";

// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
const windowLoad = require("%helpers%/window-load.js");
const breakpoints = require("%helpers%/breakpoints.js");
// -- Helpers END


// -- Libraries BEGIN
// -- Libraries END

if ($(window).width() > breakpoints.lg) {

	windowLoad(function() {
		const $infoBottomScreen = $(".info-bottom-screen__item");
		const $footer = $(".footer");

		const windowHeight = $(window).height();
		const footerOffset = ($footer.length) ? $footer.offset().top - parseInt($footer.css("margin-top")) : false;

		// -- Functions BEGIN
		const checkOffset = () => {
			const curOffset = $(window).scrollTop();
			const resultOffset = curOffset + windowHeight;

			if (resultOffset > footerOffset) {
				const bottom = resultOffset - footerOffset;
				$infoBottomScreen.css({"bottom": bottom + "px"});
			} else {
				$infoBottomScreen.css({"bottom": 0});
			}
		};

		const setEventOnScroll = () => {
			$(window).on("scroll", checkOffset);
			checkOffset();
		};
		// -- Functions END

		if ($infoBottomScreen.length && $footer.length) setEventOnScroll();
		
	});
	
}
