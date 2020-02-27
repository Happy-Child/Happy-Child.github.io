const load = function (fn) {
	window.addEventListener("load", function () {
		fn();
	});
};

module.exports = load;
