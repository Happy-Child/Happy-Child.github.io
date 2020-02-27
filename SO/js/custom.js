//Scroll to top START
var scrollToTop = function () {
	var btn = $(".product-card-data .wrap-btn-to-cart");

	if ( btn.length ) {
		btn.click(function() {
			$([document.documentElement, document.body]).animate({
			  scrollTop: 0
			}, 500);
		});
	}

};
//Scroll to top BEGIN
scrollToTop();



//Modal rating product START
var modalRatingProduct = function () {
	var rating = document.querySelector('.modal-testimonial .wrap-rating'),
    ratingItem = document.querySelectorAll('.modal-testimonial .rating-item'),
    input = document.querySelector(".modal-testimonial #user_rating");

	rating.onclick = function(e){
	  var target = e.target;

	  if(target.classList.contains('rating-item')){
	    removeClass(ratingItem,'current-active');
	    target.classList.add('active','current-active');
	    $(input).val( ($(target).index() + 1) );

	    console.log( $(input).val() );
	  }
	}

	rating.onmouseover = function(e) {
	  var target = e.target;
	  if(target.classList.contains('rating-item')){
	    removeClass(ratingItem,'active')
	    target.classList.add('active');
	    mouseOverActiveClass(ratingItem)
	  }
	}
	rating.onmouseout = function(){
	  addClass(ratingItem,'active');
	  mouseOutActiveClas(ratingItem);
	}

	function removeClass(arr) {
	  for(var i = 0, iLen = arr.length; i <iLen; i ++) {
	    for(var j = 1; j < arguments.length; j ++) {
	      ratingItem[i].classList.remove(arguments[j]);
	    }
	  }
	}
	function addClass(arr) {
	  for(var i = 0, iLen = arr.length; i <iLen; i ++) {
	    for(var j = 1; j < arguments.length; j ++) {
	      ratingItem[i].classList.add(arguments[j]);
	    }
	  }
	}

	function mouseOverActiveClass(arr){
	  for(var i = 0, iLen = arr.length; i < iLen; i++) {
	    if(arr[i].classList.contains('active')){
	      break;
	    }else {
	      arr[i].classList.add('active');
	    }
	  }
	}

	function mouseOutActiveClas(arr){
	  for(var i = arr.length-1; i >=1; i--) {
	    if(arr[i].classList.contains('current-active')){
	      break;
	    }else {
	      arr[i].classList.remove('active');
	    }
	  }
	}
};
//Modal rating product END
setTimeout(function() {
	modalRatingProduct();
}, 1200);



//Common rating product START
var commonRatingProduct = function () {
	var starLayer = $(".wrap-big-star .wrap-icon-layer");
	var maxRating = 5;
	var curRating = +($(".result-rating").text());

	var result = (curRating * 100) / 5;

	starLayer.css({"height": result + "%"})
};
//Common rating product END
commonRatingProduct();
