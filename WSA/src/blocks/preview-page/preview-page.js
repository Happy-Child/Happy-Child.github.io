// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
const windowLoad = require("%helpers%/window-load.js");
const breakpoints = require("%helpers%/breakpoints.js");
const isDesktop = require("%helpers%/is-desktop.js");
const isIE = require("%helpers%/is-ie.js");
const isEdge = require("%helpers%/is-edge.js");
const cleanFieldsForms = require("%helpers%/clean-fields-forms.js");
const inputFilter = require("%helpers%/input-filter.js");
const debounce = require("%helpers%/debounce.js");
// -- Helpers END


// -- Libraries BEGIN
// -- Libraries END


documentReady(function() {

	const $previewText = $(".preview-page__text-cut-letter");
	const firstTag = "<em>";
	const firstTagLength = firstTag.trim().length;

	// -- Functions BEGIN
	const startCut = (index, strHtml) => {
		const strHtmlArr = strHtml.split("");
		const firstLetter = strHtmlArr.splice(index, 1);

		const newStr = strHtmlArr.join("");
		$previewText
			.html(newStr)
			.prepend(`<span class='preview-page__text-first-letter'>${firstLetter}</span>`);
	};

	const checkTextOnFirstTag = (element) => {
		const strHtml = element.html();

		if (strHtml.indexOf(firstTag.trim()) == 0) startCut(firstTagLength, strHtml);
		else startCut(0, strHtml);
	};
	// -- Functions END


	if ($previewText.length && $(window).width() > breakpoints.md) checkTextOnFirstTag($previewText);


});
