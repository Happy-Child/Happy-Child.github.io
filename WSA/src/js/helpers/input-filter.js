const inputFilter = ( $fields, inputFilter ) => {
	return $fields.on(`
		input
		keydown
		keyup
		mousedown
		mouseup
		select
		contextmenu
		drop`, function() {
		if ( inputFilter(this.value) ) {
			this.oldValue = this.value;
			this.oldSelectionStart = this.selectionStart;
			this.oldSelectionEnd = this.selectionEnd;
		} else if ( this.hasOwnProperty("oldValue") ) {
			this.value = this.oldValue;
			this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		}

	});
};

module.exports = inputFilter;


// -- Example BEGIN

//	const regObj = {
//		...,
//		number: /^-?\d*$/,
//		...
//	}
//	inputFilter( $fieldsOnlyNumber, (value) => { return regObj.number.test(value) } );

// -- Example END
