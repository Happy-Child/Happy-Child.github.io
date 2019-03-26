"use strict";

$(function () {
	var _this2 = this;

	//Phone mask
	$(".form .phone").mask("+375 ( 99 ) 999 - 99 - 99");
	//Phone mask END

	//Cut all letters START
	var fnCutLetters = function fnCutLetters(_this) {
		var newStr = '';
		var str = _this.val();
		var length = _this.val().length;
		var control = 0;

		for (var i = 0; i < length; i++) {
			var chr = str.substring(i, i + 1);

			if (/[0-9]/.test(chr)) {
				newStr = newStr + chr;
			} else {
				if (!control) {
					control = 1;
				}
			}
		}

		_this.val(newStr);
		_this.focus();
	};
	//Cut all letters END

	//Show/hide modal
	var showHideModalCallback = function showHideModalCallback() {
		var modalWindow = $(".wrapper-modal");

		if (modalWindow) {

			$(".btn-show-callback").click(function () {
				modalWindow.fadeIn(500);
			});

			$(".wrapper-modal .icon-close, .wrapper-modal .layer-out").click(function () {
				modalWindow.fadeOut(500);
				modalWindow.find(".modal-success").removeClass("modal-active");
				modalWindow.find(".modal-callback").addClass("modal-active");
				modalWindow.find("form-callback").trigger("reset");
			});
		}
	};

	var showHideModalQuestions = function showHideModalQuestions() {
		var modalWindowf = $(".wrapper-modal-question");

		if (modalWindowf) {

			$(".btn-show-questions").click(function () {
				modalWindowf.addClass("modal-question-show");
			});

			$(".wrapper-modal-question .icon-close").click(function () {
				modalWindowf.removeClass("modal-question-show");
			});
		}
	};
	//Show/hide modal END


	//Modal questions logic
	//Data
	var lengthAllQuestions = $(".wrapper-modal-question .question").length;
	var progress = $(".wrap-progress-bar .progress");
	var progressText = $(".wrapper-modal-question .progress-text .total");
	//Data END

	//Push data
	var dataQuestions = {};
	var pushData = function pushData() {
		var i = 1;
		$(".question:not(.last-screen)").each(function () {

			var selectEl = void 0;
			var value = void 0;

			if (i !== 8 && i !== 2) {
				selectEl = $(this).find(".answer-box-active");
				value = selectEl.find(".value").text();
			} else if (i == 2) {

				selectEl = $(this).find(".answer-box-active:not(.wrap-btn)");

				if (selectEl.length) {
					value = selectEl.find(".value").text();
				} else {
					var inputs = $(".question-select-sizes .active");
					value = [];
					for (var _i = 0; _i < inputs.length; _i++) {
						value[_i] = inputs.eq(_i).find("input").val();
					}
				}
			} else if (i == 8) {
				selectEl = $(this).find(".massager-box-active");
				value = [selectEl.find(".value").text(), $(".field-file").val()];
			}

			dataQuestions["q-" + i] = value;
			i++;

			console.log(dataQuestions);
		});
	};
	//Push data END


	//Set img to 2 question START
	var setImg2Question = function setImg2Question() {
		var types = $(".answer-box.type");
		var img = $(".question-select-sizes .answer-box-img-wrap img");
		var inputs = $(".question-select-sizes .answer-box-fields .answer-box-field-price");
		var title = $(".question-select-sizes .answer-box-img-wrap .title span");

		if (types.length) {
			types.click(function () {
				title.text($(this).find(".value").text());

				var src = $(this).find("img").attr("data-src");
				img.attr("src", src);

				if ($(this).hasClass("type-1")) {
					inputs.eq(0).addClass("active").show();
				} else if ($(this).hasClass("type-2")) {
					for (var i = 0; i < 2; i++) {
						inputs.eq(i).addClass("active").show();
					}
				} else if ($(this).hasClass("type-3")) {
					for (var _i2 = 0; _i2 < 3; _i2++) {
						inputs.eq(_i2).addClass("active").show();
					}
				}
			});
		}
	};
	//Set img to 2 question END

	setImg2Question();

	//Progress bar animation
	var curProgress = 0;
	var progressBarAnimation = function progressBarAnimation() {
		var statusNew = (curProgress + 1) * 100 / 6;

		progress.css({ "width": statusNew + "%" });
		progressText.text(~~statusNew);

		curProgress++;
	};
	//Progress bar animation END


	//Show next question
	var showNextQuestion = function showNextQuestion() {
		var cur = $(".wrapper-modal-question .question-current");
		cur.removeClass("question-current").addClass("question-disabled").fadeOut(350);
		var nextQuestion = cur.next("div");

		if (nextQuestion.index() !== 7) {
			setTimeout(function () {
				$(".wrapper-modal-question .question").removeClass("question-disabled");
				nextQuestion.addClass("question-current").fadeIn(350);
			}, 350);
		} else if (nextQuestion.index() === 7) {
			$(".wrapper-modal-question .preloader").fadeIn(350);
			setTimeout(function () {
				$(".wrapper-modal-question .preloader").fadeOut(350);
				nextQuestion.addClass("question-current").fadeIn(350);
			}, 3000);
		}
	};
	//Show next question END


	//Set sizes START
	var setSizesCheckInput = function setSizesCheckInput() {
		var fields = $(".question-select-sizes input");
		var resultAll = 0;
		var allInputs = $(_this2).closest(".answer-box-fields").find(".active input");

		if (fields.length) {
			fields.on("keyup", function () {
				fnCutLetters($(this));

				allInputs.each(function () {
					var cur = $(this);

					if (!!cur.val()) {
						resultAll++;
					}
				});
			});

			if (resultAll == allInputs.length + 1) {
				$(".answer-box.wrap-btn").addClass("btn-active");
			}
		}
	};
	//Set sizes END


	//Field file START
	var fileUploadText = function fileUploadText() {
		$(".field-file").change(function (e) {
			var fileName = e.target.files[0].name;

			var size = (e.target.files[0].size / 1000).toFixed(2);
			var maxLength = 12;

			if (fileName.length > maxLength) {
				fileName = fileName.slice(0, maxLength) + "...";
			}

			var text = fileName + " (" + size + " kb)";

			$(this).next(".file-text").text(text);
			$(this).parent().addClass("file-upload");
		});
	};
	//Field file END


	//Select massager
	var selectMassager = function selectMassager() {
		var massagers = $(".wrapper-modal-question .massager");

		if (massagers) {
			massagers.click(function () {
				$(this).parent().parent().find(".massager").removeClass("massager-box-active");
				$(this).addClass("massager-box-active");

				$(".wrapper-modal-question .phone").removeAttr("disabled");
			});
		};
	};
	//Select massager END

	//Check valid data 
	var checkBtnSendResult = function checkBtnSendResult() {
		var field = $(".question-massager .phone");

		field.on('keyup keypress', function (e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode === 13) {
				e.preventDefault();
				return false;
			}
		});

		field.change(function () {
			if (field.val() !== 0) {
				$(".question-massager .wrap-btn").addClass("btn-active");
			}
		});
	};
	//Check valid data END

	//Check btn send disabled
	var clickBtnSendData = function clickBtnSendData() {
		var btn = $(".question-massager .wrap-btn");

		btn.click(function () {
			if (btn.hasClass("btn-active")) {
				pushData();
				dataQuestions["phone"] = $(".question-massager .phone").val();
				sendCallbackForm("questions");

				$(".wrapper-modal-question .question").fadeOut(350);
				setTimeout(function () {
					$(".wrapper-modal-question .last-screen").fadeIn(350);
				}, 350);
			}
		});
	};
	//Check btn send disabled END

	var modalQuestionLogic = function modalQuestionLogic() {
		var answers = $(".wrapper-modal-question .answer-box");

		if (answers) {
			answers.click(function () {
				$(this).addClass("answer-box-active");

				var positionCurQuestion = $(this).parent().parent().parent().index();

				if (positionCurQuestion !== lengthAllQuestions) {
					showNextQuestion();
					if (positionCurQuestion < 6) {
						progressBarAnimation();
					}
				}
			});
		} //if END
	};

	//Init
	var modalQuestionInit = function modalQuestionInit() {
		modalQuestionLogic();
		checkBtnSendResult();
		selectMassager();
		clickBtnSendData();
		setSizesCheckInput();
		fileUploadText();
	};
	//Init END
	//Modal questions logic END


	//Send form callback
	var dataMail = {};
	var sendFormCallback = function sendFormCallback() {
		var form = $(".wrapper-modal .modal-callback .form-callback");

		if (form) {
			form.submit(function (e) {
				e.preventDefault();
				dataMail["phone"] = form.find(".phone").val();
				dataMail["name"] = form.find(".name").val();
				form.find(".btn").attr("disabled disabled");
				form.trigger("reset");
				sendCallbackForm("mail");
			});
		}
	};
	//Send form callback END


	//Send mail
	var sendCallbackForm = function sendCallbackForm(type) {

		var data = void 0;

		if (type == "questions") {
			data = dataQuestions;
			data["type"] = type;
		} else if (type == "mail") {
			data = dataMail;
			data["type"] = type;
		}

		$.ajax({
			type: "POST",
			url: "sendmail.php",
			data: data,
			success: function success(data) {
				if (type == "mail") {
					$(".wrapper-modal .modal-callback").removeClass("modal-active");
					$(".wrapper-modal .modal-success").addClass("modal-active");
					$(".wrapper-modal .modal-callback").find(".btn").removeAttr("disabled");
				}
			},
			error: function error(data) {}
		});
	};
	//Send mail END


	var setScrollbarGarantResult = function setScrollbarGarantResult() {
		var block = $(".question-3 .wrap-answers");
		var btn = $(".question-3__arrow");

		if (block.length && btn.length && $(window).width() > 768) {
			block.mCustomScrollbar({
				axis: "x"
			});

			btn.click(function () {
				block.mCustomScrollbar('scrollTo', '-=250');
			});
		}
	};

	setTimeout(function () {
		$(".question:not(:first)").css({ "display": "none" });
	}, 200);

	//Init
	showHideModalCallback();
	showHideModalQuestions();
	modalQuestionInit();
	sendFormCallback();
	setScrollbarGarantResult();
	//Init END

});