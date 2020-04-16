'use strict';
var wH = window.innerHeight ? window.innerHeight : $(window).height(),
    wW = window.innerWidth ? window.innerWidth : $(window).width();
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Prevent nav menu pushing content to the right when scrollbar is visible
function preventWidthAdjust(){
  var parentNav = $('.nav__drawer');
  var childrenNav = $('.nav__drawer-parent');
  var parentNavWidth = parentNav.width();
  parentNav.css('overflow-y','auto');
  childrenNav.css('width',parentNavWidth);
  // console.log('prevent width adjust');
}

function toggleSideMenu(){
  if ($('.nav__drawer').hasClass('expanded') ) {
    //console.log("hide menu");  
    $('.nav__drawer-toggle').removeClass('opened');
    $('.nav__drawer').removeClass('expanded');
    $('.nav__drawer').addClass('collapsed');
    $('main').animate({'width': '100%', 'margin-left': 0 + 'px'});
  } else {
    preventWidthAdjust();
    //console.log("show menu");
    $('.nav__drawer-toggle').addClass('opened');
    $('.nav__drawer').removeClass('collapsed');
    $('.nav__drawer').addClass('expanded');
    if ($('.nav__drawer').hasClass('push') ){
      var bodyWidth = $('main').width();
      var navWidth = 300;
      $('main').animate({'width': (bodyWidth - navWidth) + 'px', 'margin-left': navWidth + 'px'});
    } 
  }
}

$(document).ready(function(){
  
  // Init
  toggleSideMenu();

	// For element preloader
	$('.loader').on('load', function () {
		$('.text__loading span').show();
		$('.text__loading--line').css('background', 'none');
		$('.img__loading').css('animation', 'none');
	});

  // Menu hover behavior
  $('.nav__toolbar li.dropdown').hover(
    function(){
      $('.nav__child-bg').show();
    }, 
    function(){
      $('.nav__child-bg').hide();
    }
  );

  // Toggle mobile menu
  $('.nav__drawer-toggle').on('click',function(){   
    toggleSideMenu();
  });

  // Toggle accordion
  $('.accordion.is-expanded').next('.accordion__content').slideToggle('show');

  $('.accordion').on('click', function(e) {
    e.preventDefault();
    var isSingleView = $(this).parent().parent('.accordion-container').hasClass('singleview');
    if(isSingleView){
      console.log('isSingleView');
      $(this).parent().siblings().find('.accordion').removeClass('is-expanded').next('.accordion__content').slideUp();
      if($(this).hasClass('is-expanded')){
        $(this).removeClass('is-expanded');
      } else {
        $(this).addClass('is-expanded');
      }
      $(this)
        .next('.accordion__content')
        .slideToggle();
    } 
    else{
      $(this)
        .next('.accordion__content')
        .slideToggle();
      $(this).toggleClass('is-expanded');
    }
    // preventWidthAdjust();
  });

  // Toggle tabs
  $('.tab__toggle a').on('click', function(e) {
    e.preventDefault();
    console.log('tab clicked');
    $(this).parent().siblings().removeClass('active');
    $(this).parent().addClass('active');

    var targetTab = $(this).attr("href");
    $(targetTab).siblings('.tab__content').hide();
    $(targetTab).show();
  });

  // Determine vertical scroll direction
  var lastScrollTop = 0;
  var currentPosition = $(window).scrollTop();
  // If page is reloaded while scrolled down,
  // sub menu remains hidden
  if(currentPosition > 0){
    $('.nav__toolbar .logo img').show();
    $('.nav__toolbar').addClass('menu--scrolled');
    $('.nav__child-bg').addClass('menu--scrolled');
  } 
  if (wW < 768){
    $('.nav__toolbar .logo img').show();
  }

  $('.icon__select').on('click', function(e){
    e.preventDefault();
  });

  // Scroll behavior
  $(window).scroll(function(event){
    currentPosition = $(this).scrollTop();
     if (currentPosition > lastScrollTop){
        // console.log("down")
        $('.nav__toolbar').addClass('menu--scrolled');
        $('.nav__child-bg').addClass('menu--scrolled');

     } else if(currentPosition == lastScrollTop){
       //do nothing 
       //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
     }
     else {
        // console.log("up");
        if(currentPosition == 0){
          // Hide main menu logo
          if(wW > 767){

          }
          $('.nav__toolbar').removeClass('menu--scrolled');
          $('.nav__child-bg').removeClass('menu--scrolled');
        } else {
        }
     }
     lastScrollTop = currentPosition;
  });

  // Anchor links smooth scroll
  $(document).on("click", ".anchor-link", function(e) {
    e.preventDefault();

    var hash = $(this).attr("href");
    if ($(hash).length === 0) {
      return;
    }
    //console.log($(hash).offset().top)
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800)
  })

  // For Animate css
	$('.animated').appear(function() {
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if(animationDelay) {
      setTimeout(function(){
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
      }, animationDelay);
    } else {
      element.addClass( animation + " visible" );
      element.removeClass('hiding');
    }               
	}, {accY: -90});

});