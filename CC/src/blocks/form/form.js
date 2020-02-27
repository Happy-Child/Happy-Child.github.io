// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END


// -- Libraries BEGIN
import autosize from "autosize";
// -- Libraries END


documentReady(function() {
	const $fieldsFiles = $("input[type='file']");
	const textariaFields = $("textarea");

	// -- Function BEGIN
	const autosizeInit = () => {
		autosize(textariaFields);
	};

	const setEventOnChange = () => {
		$fieldsFiles.on("change", function (e) {
			const placeholder = $(this).parent().find(".filename");
			const fileName = e.target.files[0].name;
			$(this).addClass("load");
			placeholder.text(fileName);
		});
	};
	// -- Function END

	if (textariaFields.length) autosizeInit();
	if ($fieldsFiles.length) setEventOnChange();
});



