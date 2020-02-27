// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END


documentReady(function() {

	let images = $("span.replace-svg");

	// -- Functions BEGIN
	const replaceSVG = () => {
		images.each(function(){
			let $img = $(this);
			let imgID = $img.attr("id");
			let imgClass = $img.attr("class");
			let imgURL = $img.data("src");

			$.get(imgURL, function(data) {
				let $svg = $(data).find("svg");
				if(typeof imgID !== "undefined") {
					$svg = $svg.attr("id", imgID);
				}
				if(typeof imgClass !== "undefined") {
					$svg = $svg.attr("class", imgClass+" replaced-svg");
				}

				$svg = $svg.removeAttr("xmlns:a");
				$svg.find("> g").removeAttr("clip-path");
				$img.replaceWith($svg);

			}, "xml");

		});
	};
	// -- Functions END

	if ( images.length ) replaceSVG();

});
