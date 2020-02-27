const debounce = (func, wait, immediate) => {
	let timeout;

	return function () {
		const context = this,
			args = arguments;

		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if (callNow) func.apply(context, args);
	};
};

module.exports = debounce;
