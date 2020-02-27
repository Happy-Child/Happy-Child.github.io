// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END


// -- Libraries BEGIN
import lazyload from "vanilla-lazyload";
// -- Libraries END


documentReady(function() {

	const initLazyload = () => {
		new lazyload({
			elements_selector: ".lazy",
		});
	};

	initLazyload();

});
