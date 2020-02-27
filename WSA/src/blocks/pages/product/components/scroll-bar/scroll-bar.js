// -- Helpers BEGIN
const documentReady = require("%helpers%/document-ready.js");
// -- Helpers END


// -- Libraries BEGIN
// -- Libraries END


if ($(window).width() > 1439) {

	documentReady(function() {
		const $fixedBar = $(".header__wrap-menu-btn");

		const $targetItemControl = $(".product__scroll-bar-item");
		const targetItemControlClass = "product__scroll-bar-item_active";

		const $targetBlocks = $(".product__main-content-item");
		const $targetBlocksArr = [...$targetBlocks];
		const targetBlocksOffsetArr = $targetBlocksArr.map(function (cur) {
			const offset = cur.offsetTop,
				halfHeight = $(cur).outerHeight(true);
			return offset + halfHeight;
		});

		const scrollToBlockCustomOffset = 100;
		const windowPartHeight = screen.height / 3;
		let indexCurBlock = 0;


		// -- Functions BEGIN
		const setClassOnLink = (i) => {
			$targetItemControl
				.removeClass(targetItemControlClass)
				.eq(i)
				.addClass(targetItemControlClass);
		};

		const checkOffsetEachBlock = (resultOffset) => {
			
			for (let i = 0; i < targetBlocksOffsetArr.length; i++) {

				const prev = targetBlocksOffsetArr[i - 1] ? targetBlocksOffsetArr[i - 1] : 0;
				const next = targetBlocksOffsetArr[i];

				if (resultOffset > prev && resultOffset < next && indexCurBlock !== i) {
					setClassOnLink(i);
				} else if (prev === 0 && indexCurBlock !== i) {
					setClassOnLink(0);
				}

				indexCurBlock = i;
			}
		};

		const checkOffsetForStart = () => {
			const curOffset = $(window).scrollTop();
			const resultOffset = curOffset + windowPartHeight;
			
			if (
				resultOffset > targetBlocksOffsetArr[0] &&
				resultOffset < targetBlocksOffsetArr[targetBlocksOffsetArr.length - 1]) 
			{
				checkOffsetEachBlock(resultOffset);
			}
			else if (resultOffset < targetBlocksOffsetArr[0]) { // Before targets items
				setClassOnLink(0);
			}
			else if (resultOffset > targetBlocksOffsetArr[targetBlocksOffsetArr.length - 1]) { // After targets items
				setClassOnLink(targetBlocksOffsetArr.length - 1);
			}
			
		};

		const scrollToBlock = ($link) => {
			const $parentLink = $link.parent();
			const key = $link.attr("href");
			const $targetBlock = $(`.product__main-content-item[id=${key}]`);
		
			if ( $targetBlock.length && !$parentLink.hasClass(targetItemControlClass)) {
				const targetBlockOffset = $targetBlock.offset().top;

				$([document.documentElement, document.body]).animate({
					scrollTop: targetBlockOffset - scrollToBlockCustomOffset
				}, 1000);
			}
		};

		const setEventOnScroll = () => {
			$(window).on("scroll", checkOffsetForStart);
			checkOffsetForStart();
		};

		const setEventOnLinks = () => {
			$targetItemControl.find("a").on("click", function (e) {
				e.preventDefault();

				scrollToBlock($(this));
			});
		};
		// -- Functions END


		if (
			$fixedBar.length &&
			$targetItemControl.length === $targetBlocks.length
		) {
			setEventOnScroll();
			setEventOnLinks();
		}
	});

}
