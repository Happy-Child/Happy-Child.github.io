"use strict";

$(function () {

//Phone mask
	$(".form .phone").mask(("+375 ( 99 ) 999 - 99 - 99"));
//Phone mask END

//Cut all letters START
var fnCutLetters = function (_this) {
	var newStr = '';
	var str = _this.val();
	var length = _this.val().length;
	var control = 0;

	for (var i = 0; i < length; i++) {
		var chr = str.substring(i, i+1);

		if (/[0-9]/.test(chr)) {   
			newStr = newStr + chr;
		}
		else {
			if (!control) {
				control = 1;
			}
		}
	}

	_this.val(newStr);
	_this.focus();
}
//Cut all letters END

//Show/hide modal
	const showHideModalCallback = () => {
		const modalWindow = $(".wrapper-modal");

		if ( modalWindow ) {

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

	const showHideModalQuestions = () => {
		const modalWindowf = $(".wrapper-modal-question");

		if ( modalWindowf ) {

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
	const lengthAllQuestions = $(".wrapper-modal-question .question").length;
	const progress = $(".wrap-progress-bar .progress");
	const progressText = $(".wrapper-modal-question .progress-text .total");
	//Data END

	//Push data
	const dataQuestions = {};
	const pushData = () => {
		let i = 1;
		$(".question:not(.last-screen)").each(function () {
			
			let selectEl;
			let value;

			if ( i !== 8 && i !== 2 ) {
				selectEl = $(this).find(".answer-box-active");
				value = selectEl.find(".value").text();
			} else if ( i == 2 ) {

				selectEl = $(this).find(".answer-box-active:not(.wrap-btn)");

				if ( selectEl.length ) {
					value = selectEl.find(".value").text();
				} else {
					const inputs = $(".question-select-sizes .active");
					value = [];
					for ( let i = 0; i < inputs.length; i++){
						value[i] = inputs.eq(i).find("input").val();
					}
				}

			} else if ( i == 8 ) {
				selectEl = $(this).find(".massager-box-active");
				value = [selectEl.find(".value").text(), $(".field-file").val()];
			}

			dataQuestions[`q-${i}`] = value;
			i++;

			console.log(dataQuestions);

		});
	};
	//Push data END


	//Set img to 2 question START
	const setImg2Question = () => {
		const types = $(".answer-box.type");
		const img = $(".question-select-sizes .answer-box-img-wrap img");
		const inputs = $(".question-select-sizes .answer-box-fields .answer-box-field-price");
		const title = $(".question-select-sizes .answer-box-img-wrap .title span");

		if (types.length) {
			types.click(function () {
				title.text($(this).find(".value").text());

				const src = $(this).find("img").attr("data-src");
				img.attr("src", src);

				if ( $(this).hasClass("type-1") ) {
					inputs.eq(0).addClass("active").show();
				} else if ( $(this).hasClass("type-2") ) {
					for (let i = 0; i < 2; i++) {
						inputs.eq(i).addClass("active").show();
					}
				} else if ( $(this).hasClass("type-3") ) {
					for (let i = 0; i < 3; i++) {
						inputs.eq(i).addClass("active").show();
					}
				}

			})
		}
	};
	//Set img to 2 question END

	setImg2Question();


	//Progress bar animation
	let curProgress = 0;
	const progressBarAnimation = () => {
		const statusNew = (curProgress + 1) * 100 / 6;

		progress.css({"width" : statusNew + "%"});
		progressText.text(~~statusNew);

		curProgress++;
	};
	//Progress bar animation END


	//Show next question
	const showNextQuestion = () => {
		const cur = $(".wrapper-modal-question .question-current");
		cur.removeClass("question-current").addClass("question-disabled").fadeOut(350);
		const nextQuestion = cur.next("div");

		if ( nextQuestion.index() !== 7 ) {
			setTimeout(function () {
				$(".wrapper-modal-question .question").removeClass("question-disabled");
				nextQuestion.addClass("question-current").fadeIn(350);
			}, 350);
		} else if ( nextQuestion.index() === 7 ) {
			$(".wrapper-modal-question .preloader").fadeIn(350);
			setTimeout(function () {
				$(".wrapper-modal-question .preloader").fadeOut(350);
				nextQuestion.addClass("question-current").fadeIn(350);
			}, 3000);
		}

	};
	//Show next question END


	//Set sizes START
	const setSizesCheckInput = () => {
		const fields = $(".question-select-sizes input");
		let resultAll = 0;
		const allInputs = $(this).closest(".answer-box-fields").find(".active input");

		if ( fields.length ) {
			fields.on("keyup", function () {
				fnCutLetters( $(this) );

				allInputs.each(function () {
					const cur = $(this);

					if ( !!cur.val() ) {
						resultAll++;
					}
				});
			});

			if ( resultAll == allInputs.length + 1 ){
				$(".answer-box.wrap-btn").addClass("btn-active");
			}

		}
	};
	//Set sizes END


	//Field file START
	const fileUploadText = () => {
		$(".field-file").change(function(e){
			let fileName = e.target.files[0].name;

			const size = (e.target.files[0].size / 1000).toFixed(2);
			const maxLength = 12;

			if ( fileName.length > maxLength ) {
				fileName = fileName.slice(0, maxLength) + "...";
			}

			let text = `${fileName} (${size} kb)`;

			$(this).next(".file-text").text(text);
			$(this).parent().addClass("file-upload");
    });
	};
	//Field file END


	//Select massager
	const selectMassager = () => {
		const massagers = $(".wrapper-modal-question .massager");

		if ( massagers ) {
			massagers.click(function () {
				$(this).parent().parent().find(".massager").removeClass("massager-box-active");
				$(this).addClass("massager-box-active");

				$(".wrapper-modal-question .phone").removeAttr("disabled");
			});
		};
	};
	//Select massager END

	//Check valid data 
	const checkBtnSendResult = () => {
		const field = $(".question-massager .phone");

		field.on('keyup keypress', function(e) {
		  const keyCode = e.keyCode || e.which;
		  if (keyCode === 13) { 
		    e.preventDefault();
		    return false;
		  }
		});

		field.change(function () {
			if ( field.val() !== 0 ) {
				$(".question-massager .wrap-btn").addClass("btn-active");
			}
		});

	};
	//Check valid data END

	//Check btn send disabled
	const clickBtnSendData = () => {
		const btn = $(".question-massager .wrap-btn");

		btn.click(function () {
			if ( btn.hasClass("btn-active") ) {
				pushData();
				dataQuestions["phone"] = $(".question-massager .phone").val();
				sendCallbackForm("questions");

				$(".wrapper-modal-question .question").fadeOut(350);
				setTimeout(function () {
					$(".wrapper-modal-question .last-screen").fadeIn(350);
				}, 350);
			}
		})
	};
	//Check btn send disabled END

	const modalQuestionLogic = () => {
		const answers = $(".wrapper-modal-question .answer-box");

		if ( answers ) {
			answers.click(function () {
				$(this).addClass("answer-box-active");

				const positionCurQuestion = $(this).parent().parent().parent().index();

				if ( positionCurQuestion !== lengthAllQuestions ) {
					showNextQuestion();
					if ( positionCurQuestion < 6 ) {
						progressBarAnimation();
					}
				}
			});
		}//if END
	};

	//Init
	const modalQuestionInit = () => {
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
	const dataMail = {};
	const sendFormCallback = () => {
		const form = $(".wrapper-modal .modal-callback .form-callback");

		if ( form ) {
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
	const sendCallbackForm = (type) => {

		let data;

		if ( type == "questions" ) {
			data = dataQuestions;
			data["type"] = type;
		} else if ( type == "mail" ) {
			data = dataMail;
			data["type"] = type;
		}
		
		$.ajax({
			type: "POST",
			url: "sendmail.php",
			data,
			success (data) {
				if ( type == "mail" ) {
					$(".wrapper-modal .modal-callback").removeClass("modal-active");
					$(".wrapper-modal .modal-success").addClass("modal-active");
					$(".wrapper-modal .modal-callback").find(".btn").removeAttr("disabled");
				}
			},
			error (data) {
			}
		});
	};
//Send mail END



const setScrollbarGarantResult = () => {
	const block = $(".question-3 .wrap-answers");
	const btn = $(".question-3__arrow");

	if ( block.length && btn.length && $(window).width() > 768 ) {
		block.mCustomScrollbar({
			axis: "x",
		});

		btn.click(function() {
			block.mCustomScrollbar('scrollTo','-=250');
		});
	}
}

setTimeout(function () {
	$(".question:not(:first)").css({"display" : "none"});
}, 200);


//Init
showHideModalCallback();
showHideModalQuestions();
modalQuestionInit();
sendFormCallback();
setScrollbarGarantResult();
//Init END



})