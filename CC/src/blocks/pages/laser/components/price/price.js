// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END

documentReady(function() {
	const $dropdownBtn = $(".price__currency-cur"),
		$dropdownList = $(".price__currency-list"),
		$dropdownItems = $(".price__currency-item"),
		$tables = $(".price__wrap-table");

	// -- Functions BEGIN
	const initDropdown = () => {
		$dropdownBtn.on("click", function () {
			$dropdownList.toggleClass("price__currency-list_visible");
		});

		$dropdownItems.on("click", function () {
			$(".price__currency-cur").text($(this).text());

			if (!$(this).hasClass("price__currency-item_current")) {
				$dropdownList.removeClass("price__currency-list_visible");
				$(this).siblings("li").removeClass("price__currency-item_current");
				$(this).addClass("price__currency-item_current");

				const curCurrency = $(this).data("currency");
				$tables.removeClass("price__wrap-table_current");
				$(`.price__wrap-table[data-currency="${curCurrency}"]`).addClass("price__wrap-table_current");
			} else {
				$dropdownList.toggleClass("price__currency-list_visible");
			}
		});
	};
	// -- Functions END

	if ( $dropdownBtn.length && $dropdownList.length ) initDropdown();

});
