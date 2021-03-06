"use strict";

window.onload = function () {
  // Custom JS
  // onClick .main-content__button
  // code
  var sceneShow = {};
  var sceneHide = {};
  var controller = new ScrollMagic.Controller();
  windowHeight = $(window).height();
  $.protip();
  getStickyScrollbar();
  startOwl();
  processParams = calcProcessParams();
  startGsapProcess(processParams);
  parallaxElements();
  var tooltip = $('#tooltip');
  tooltip.protipShow({
    position: 'bottom',
    scheme: 'leaf',
    trigger: 'sticky'
  });
  tooltip.mouseenter(function () {
    setTimeout(function () {
      tooltip.protipHide();
    }, 2000);
  });
  $(window).on('resize touchmove', function () {
    controller.destroy(reset);
    sceneShow.destroy(reset);
    sceneHide.destroy(reset);
    var controller = new ScrollMagic.Controller(); // adjust heights basing on window.innerHeight
    // $(window).height() will not return correct value before resizing is done

    windowHeight = $(window).height();
    getStickyScrollbar();
    startOwl();
    processParams = calcProcessParams();
    startGsapProcess(processParams);
  });

  function getStickyScrollbar() {
    $(window).scroll(function () {
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
            margin: 40
          },
          768: {
            items: 4,
            margin: 80
          },
          992: {
            items: 5,
            margin: 80
          },
          1200: {
            margin: 80,
            items: 6
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
        lazyLoad: true,
        // center: true,
        autoWidth: true,
        responsive: {
          0: {
            margin: 8,
            items: 2,
            autoHeight: true
          },
          768: {
            margin: 32,
            items: 3
          },
          992: {
            margin: 32,
            items: 3
          },
          1200: {
            margin: 32,
            items: 4
          }
        }
      }
    };
    $('.owl-partners').owlCarousel(owlParams.partners);
    $('.owl-team').owlCarousel(owlParams.team);
  }

  $(".input-effect input").val("");
  var phoneMask = IMask(document.getElementById('phone'), {
    mask: '+{7} (000) 000-00-00'
  });
  area = $('.form-textarea');
  lines = 6; // Ограничение по кол-ву строк (не даст натыкать Enter)

  area.keydown(function (e) {
    linesCount = $(this).val().split("\n").length;

    if (e.keyCode == 13 && linesCount >= lines) {
      return false;
    } else {}
  }); // try {
  // 	Scrollbar.initAll();
  // } catch (error) {
  // 	console.log(error)
  // }
  // var tweenArray = [];

  function calcProcessParams() {
    cardCount = 5;
    processSection = $('.process');
    processOffset = processSection.offset().top;
    header = $('header');
    headerOffset = header.height();
    console.log(processOffset);
    var cardHeight = windowHeight - headerOffset;
    console.log('windowHeight' + windowHeight);
    console.log('headerOffset' + headerOffset);
    console.log('cardHeight' + cardHeight); // $('.process-wrapper').height(cardHeight * cardCount);

    $('.process-card').height(cardHeight);
    return {
      processOffset: processOffset,
      headerOffset: headerOffset,
      cardHeight: cardHeight
    };
  }

  function startGsapProcess(params) {
    var processOffset = params.processOffset;
    var headerOffset = params.headerOffset;
    var cardHeight = params.cardHeight;

    for (var i = 1; i <= cardCount; i++) {
      // выведет 0, затем 1, затем 2
      // var showOffset = processOffset + headerOffset + (i-1)*windowHeight - windowHeight * 0.30;
      // var hideOffset =  processOffset + headerOffset + (i-1)*windowHeight + windowHeight * 0.05;
      var showOffset = processOffset + (i - 1) * cardHeight;
      var hideOffset = processOffset + (i - 1) * cardHeight + cardHeight - headerOffset;
      var movingDuration = cardHeight / 2.75;
      var tweenShow = TweenMax.to("#c".concat(i), 1, {
        opacity: "1",
        transform: "scale(1)"
      }); // var tweenMoving = TweenMax.to(`#c${i}`, 1, {bottom: "+=25"});

      var tweenHide = TweenMax.to("#c".concat(i), 1, {
        opacity: "0",
        transform: "scale(.95)"
      });
      console.log("c".concat(i, " showOffset: ").concat(showOffset));
      console.log("c".concat(i, " hideOffset: ").concat(hideOffset));
      console.log("c".concat(i, " movingDuration: ").concat(movingDuration));
      sceneShow = new ScrollMagic.Scene({
        triggerElement: "#process-trigger",
        duration: movingDuration,
        offset: showOffset
      }).setTween(tweenShow) // .setPin('.card')
      // .addIndicators({name: `#c${i} show`}) // add indicators (requires plugin)
      .addTo(controller); // var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: movingDuration, offset: showOffset})
      // 			.setTween(tweenMoving)
      // 			// .setPin('.card')
      // 			// .addIndicators({name: `#c${i} show`}) // add indicators (requires plugin)
      // 			.addTo(controller);

      sceneHide = new ScrollMagic.Scene({
        triggerElement: "#process-trigger",
        duration: movingDuration,
        offset: hideOffset
      }).setTween(tweenHide) // .setPin('.card')
      // .addIndicators({name: `#c${i} hide`}) // add indicators (requires plugin)
      .addTo(controller);
    }
  }

  function parallaxElements() {
    var tweenParallax1 = TweenMax.to("#ae-1", 1, {
      bottom: '70%'
    });
    var tweenParallax2 = TweenMax.to("#ae-2", 1, {
      bottom: '60%'
    });
    var tweenParallax3 = TweenMax.to("#ae-3", 1, {
      bottom: '45%'
    });
    sceneParallax1 = new ScrollMagic.Scene({
      triggerElement: "#assortment",
      duration: windowHeight / 1.1
    }).setTween(tweenParallax1) // .addIndicators({name: `parallax1`}) // add indicators (requires plugin)
    .addTo(controller);
    sceneParallax2 = new ScrollMagic.Scene({
      triggerElement: "#assortment",
      duration: windowHeight / 1.24
    }).setTween(tweenParallax2) // .addIndicators({name: `parallax2`}) // add indicators (requires plugin)
    .addTo(controller);
    sceneParallax3 = new ScrollMagic.Scene({
      triggerElement: "#assortment",
      duration: windowHeight / 1.75
    }).setTween(tweenParallax3) // .addIndicators({name: `parallax3`}) // add indicators (requires plugin)
    .addTo(controller);
  }
};