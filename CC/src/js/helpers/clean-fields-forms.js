const cleanFieldsForms = ( $forms ) => {
	$forms.each(function() {
		$(this).trigger("reset")
			.find("input, textarea")
			.blur()
			.parent()
			.removeClass("form__wrap-field_error form__wrap-field_focus");
	});
};

module.exports = cleanFieldsForms;
