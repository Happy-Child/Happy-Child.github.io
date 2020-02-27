const loadImages = (images) => {
	images.each(function () {
		const curImg = $(this);
		const src = curImg.data("src");
		const newImg = new Image();

		newImg.onload = function () {
			curImg.attr("src", src);

			setTimeout(function () {
				curImg.addClass("image-load");
			}, 50);
		};

		newImg.src = src;
	});
};

module.exports = loadImages;
