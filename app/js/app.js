document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	// onClick .main-content__button
	// code
	
	$(window).on('resize touchmove', function () {
		// adjust heights basing on window.innerHeight
		// $(window).height() will not return correct value before resizing is done
		windowHeight = $(window).height();

		getStickyScrollbar();
		processParams = calcProcessParams();
		startGsapProcess();

	});
	
	function getStickyScrollbar() {
		$(window).scroll(function() {
		var header = $('header');
			var scroll = $(window).scrollTop();
			if (scroll > windowHeight * 0.85) {
				header.fadeIn(300);
			} else {
				header.fadeOut(300);
			}
		});
	}

	function startOwl() {
		var owlParams = {
			partners: {
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				stagePadding: 0,
				dots: false,
				smartSpeed: 1500,
				lazyLoad: true,
				// center: true,
				autoWidth: true,
				responsive: {
					0: {
						items: 1,
						margin: 40,
					},
					768: {
						items: 4,
						margin: 80,
					},
					992: {
						items : 5,
						margin: 80,
					},
					1200: {
						margin: 80,
						items : 6,
					}
				}			
			},
			team: {
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				stagePadding: 0,
				dots: false,
				smartSpeed: 1500,
				// center: true,
				autoWidth: true,
				responsive: {
					0: {
						margin: 8,
						items: 2,
						autoHeight: true,
					},
					768: {
						margin: 32,
						items: 3
					},
					992: {
						margin: 32,
						items : 3
					},
					1200: {
						margin: 32,
						items : 4
					}
				}
			}
		}
		$('.owl-partners').owlCarousel(owlParams.partners);
		$('.owl-team').owlCarousel(owlParams.team);
	}

	$(".input-effect input").val("");
	var phoneMask = IMask(
		document.getElementById('phone'), {
			mask: '+{7}(000)000-00-00'
	});

	area = $('.form-textarea')
	lines = 6 // Ограничение по кол-ву строк (не даст натыкать Enter)
	area.keydown(function(e) {
        linesCount = $(this).val().split("\n").length;        
        if(e.keyCode == 13 && linesCount >= lines) {
            return false;
        }
        else {            
        }
    });

	// try {
	// 	Scrollbar.initAll();
	// } catch (error) {
	// 	console.log(error)
	// }



	var controller = new ScrollMagic.Controller();

	// var tweenArray = [];

	function calcProcessParams(){
		cardCount = 5;
		processSection = $('.process');
		processOffset = processSection.offset().top;
		header = $('header');
		headerOffset = processSection.offset().top;
		console.log(processOffset);
		$('.process-wrapper').height((windowHeight - headerOffset) * cardCount)
		return {
			processOffset,
			headerOffset
		}
	}
	
	function startGsapProcess(params) {
		var processOffset = params.processOffset
		var headerOffset = params.headerOffset
		for (let i = 1; i <= cardCount; i++) { // выведет 0, затем 1, затем 2
			// var showOffset = processOffset + headerOffset + (i-1)*windowHeight - windowHeight * 0.30;
			// var hideOffset =  processOffset + headerOffset + (i-1)*windowHeight + windowHeight * 0.05;
			var showOffset = processOffset + headerOffset + (i-1)*windowHeight;
			var hideOffset =  processOffset + headerOffset + (i-1)*windowHeight;
			var movingDuration = hideOffset - showOffset + windowHeight * 1.5;

			var tweenShow = TweenMax.to(`#c${i}`, 1, {opacity: "1", transform: "scale(1)"});
			var tweenMoving = TweenMax.to(`#c${i}`, 1, {bottom: "+=25"});
			var tweenHide = TweenMax.to(`#c${i}`, 1, {opacity: "0", transform: "scale(.95)"});


			console.log(`c${i} showOffset: ${showOffset}`)
			console.log(`c${i} hideOffset: ${hideOffset}`)
			var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: movingDuration * 0.125, offset: showOffset})
						.setTween(tweenShow)
						// .setPin('.card')
						// .addIndicators({name: `#c${i} show`}) // add indicators (requires plugin)
						.addTo(controller);
			var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: movingDuration, offset: showOffset})
						.setTween(tweenMoving)
						// .setPin('.card')
						// .addIndicators({name: `#c${i} show`}) // add indicators (requires plugin)
						.addTo(controller);
			var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: movingDuration * 0.125, offset: hideOffset})
						.setTween(tweenHide)
						// .setPin('.card')
						// .addIndicators({name: `#c${i} hide`}) // add indicators (requires plugin)
						.addTo(controller);
		}
	}
});
