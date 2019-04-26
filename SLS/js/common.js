"use strict";

$(function () {

	//Popup video BEGIN
	var popupInit = function() {
		var btnShowPopup = $(".btn-show-popup");

		if ( btnShowPopup.length ) {
			btnShowPopup.magnificPopup({
				type: 'iframe',
				fixedContentPos: true,

			});
		}
	};
	//Popup video END


	//Dropdown BEGIN
	var itemsDropdown = function () {
		var dropdownBtns = $(".description_info-dropdown-top");
		var dropdownContents = $(".description_info-dropdown-content");

		if ( dropdownBtns.length ) {
			dropdownBtns.click(function () {
				var curBtn = $(this);
				var curDropdownContent = curBtn.next(".description_info-dropdown-content");

				if ( curDropdownContent.css("display") === "block" ) {
					dropdownContents.slideUp(400);
					curBtn.removeClass("description_info-dropdown-top__active");
				} else {
					dropdownBtns.removeClass("description_info-dropdown-top__active");
					dropdownContents.slideUp(400);
					curBtn.addClass("description_info-dropdown-top__active");
					curDropdownContent.slideDown(400);
				}

			})
		}
	};
	//Dropdown END


	//Btn select BEGIN
	var btnSelect = function() {
		var btn = $(".product-calc_top-select-btn");
		if ( btn.length ) {
			btn.click(function() {
				$(this).prev("select").prop("checked");
				$(this).prev("select option").eq(2).attr("selected", "selected");
				console.log($(this).prev("select option").eq(2));
			});
		}
	};
	//Btn select END


	//Init BEGIN
	popupInit();
	itemsDropdown();
	// btnSelect();
	//Init END
});