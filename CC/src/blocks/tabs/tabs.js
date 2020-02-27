// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END

documentReady(function() {
	const $tabsBtns = $(".tab");
	const $tabsContents = $(".tab-content");

	// -- Functions BEGIN
	const initTabs = () => {
		$tabsBtns.on("click", function(e) {
			e.preventDefault();

			$(this)
				.addClass("tab_active")
				.siblings()
				.removeClass("tab_active")
				.closest(".wrap-tabs")
				.find(".tab-content")
				.removeClass("tab-content_active").eq($(this).index())
				.addClass("tab-content_active");
		});
	};
	// -- Functions END

	if ($tabsBtns.length && $tabsContents.length) initTabs();
});
