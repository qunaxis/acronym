document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	// onClick .main-content__button
	// code

	windowHeight = $(window).height()

	$(window).scroll(function() {
		var header = $('header');
		var scroll = $(window).scrollTop();
		if (scroll > windowHeight * 0.85) {
			header.fadeIn(300);
		} else {
			header.fadeOut(300);

		}
	});

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

	var tweenArray = [];
	cardCount = 5;
	processSection = $('.process');
	processOffset = processSection.offset().top;
	console.log(processOffset);
	for (let i = 1; i <= cardCount; i++) { // выведет 0, затем 1, затем 2
		var showOffset = processOffset + (i-1)*windowHeight - windowHeight * 0.30;
		var hideOffset =  processOffset + (i-1)*windowHeight + windowHeight * 0.05;
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

});
