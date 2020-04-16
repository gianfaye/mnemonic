/*   
  Project Name: Mnemonic
  Version: 1.0
  Author: Gian Faye Paguirigan
  Website: http://gianfaye.com 
*/

// Configure Drawer width
var navWidthExpanded = 250,
    navWidthMinifiedExpanded = 180,
    navWidthMinifiedCollapsed = 70;

// Global variables
var wH = window.innerHeight ? window.innerHeight : $(window).height(),
  wW = window.innerWidth ? window.innerWidth : $(window).width(),
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Global Functions
var preloader = function() {
    // For element preloader
    $('.loader').on('load', function() {
      $('.text__loading span').show();
      $('.text__loading--line').css('background', 'none');
      $('.img__loading').css('animation', 'none');
    });
  },

  resizeBody = function() {
    var pushWidth = 0;
    var mainWidth = $('main').width();
    // Get width of all expanded drawers with push actions
    $('.drawer').each(function(){
      var isExpandedState = $(this).data('state') == 'expanded';
      var isPushAction = $(this).data('action') == 'push';
      var isMinify = $(this).hasClass('minify');
      
      // Only get width if both expanded and has action to push content
      if(isExpandedState && isPushAction){
        var drawerWidth = $(this).width();
        console.log('drawerWidth: ' + drawerWidth);
        pushWidth = pushWidth + drawerWidth;
        console.log('pushWidth: ' + pushWidth);
      } else if (!isExpandedState && isPushAction){
        pushWidth = 0;
      }

      if(isMinify && isPushAction){
        console.log("isMinify");
        // $('.nav__icon.expanded').css({
        //   'flex': '0 0 ' + pushWidth + 'px'
        // });
      } 

      mainWidth = $('main').width();
    });
    //var navbarWidth =  $('nav.drawer').width();

    if(wW > 768){
      // Apply margin on main content based from all drawer width
      $('main').animate({
        'margin-left': pushWidth + 'px'
      });

      $('.sticked, .sticky').animate({
        'width': (mainWidth - pushWidth) + 'px'
      });
    } 

    //$('.nav__drawer-text').toggle();
    // $('main').animate({
    //   'margin-left': pushWidth + 'px'
    // });
    // $('.navbar').css({
    //   'width': navbarWidth + 'px'
    // });

    
  },

  // resizeBody = function() {
  //   var isMinify = function() {
  //       return $('.nav__drawer').hasClass('minify');
  //     },
  //     bodyWidth = $('body').width();
  //   if (isMinify()) {
  //     navWidth = navWidthMinifiedExpanded;
  //   } else {
  //     navWidth = navWidthExpanded;
  //   }
  //   var mainWidth = bodyWidth - navWidth;
  //   console.log('navWidth: ' + navWidth);
  //   $('main').animate({
  //     'margin-left': navWidth + 'px'
  //   });

  //   $('.sidebar__toggle').animate({
  //     'left': (navWidth) + 'px'
  //   });

  //   $('.sticked, .sticky').css({
  //     'width': (mainWidth) + 'px'
  //   });
  // },

  toggleDrawer = function() {
    "use strict";

    var initDrawer = function() {
        $('.drawer').each(function(){

          // If on mobile, all drawers should be collapsed on page load
          if(wW <= 768){
            $(this).data('state', 'collapsed').attr('data-state', 'collapsed').removeClass('expanded').addClass('collapsed');
          }

          // State - determines the default state if expanded or collapsed
          var isExpandedState = $(this).data('state') == 'expanded';
          console.log('isExpandedState: ' + isExpandedState);
          if (isExpandedState){ 
            $(this).addClass('expanded');
          } else{
            $(this).addClass('collapsed');
          }
          // Action - determines if drawer container pushes content
          var isPushAction = $(this).data('action') == 'push';
          console.log('isPushAction: ' + isPushAction);
          if (isPushAction){ 
            $(this).addClass('push');
            pushMainContent();
          }


        });
      },
      pushMainContent = function() {
        resizeBody();
      },
      closeDrawer = function(drawerTarget, drawerToggle) {
        $('#' + drawerTarget).attr('data-state', 'collapsed').data('state','collapsed').removeClass('expanded').addClass('collapsed');

        var isNavDrawer = $('#' + drawerTarget).hasClass('left');
        if(isNavDrawer){
          // Reset main view
          // $('.view--blank').show();
          // $('.view--selected').hide();
          // Remove active tabs
          $('.tab__toggle li').each(function(){
            $(this).removeClass('active');
          });
        }

        $('.drawer-toggle').removeClass('opened');

        pushMainContent();
      },
      openDrawer = function(drawerTarget, drawerToggle) {
        $('#' + drawerTarget).attr('data-state', 'expanded').data('state','expanded').addClass('expanded').removeClass('collapsed');

        $('#' + drawerTarget).siblings('aside').attr('data-state', 'collapsed').data('state','collapsed').removeClass('expanded').addClass('collapsed');

        $('.drawer-toggle').addClass('opened');

        pushMainContent();
      },
      minifyDrawer = function(drawerTarget, drawerToggle) {
        $('#' + drawerTarget + ', .drawer__icon').addClass('minify minified');
        // Only minify logo if nav drawer is toggled
        if(drawerTarget == 'drawerNav'){
          $('.nav__brand').addClass('minify minified');
        }
        pushMainContent();
      },
      unminifyDrawer = function(drawerTarget, drawerToggle) {
        $('#' + drawerTarget + ', .drawer__icon').removeClass('minify minified');
        // Only minify logo if nav drawer is toggled
        if(drawerTarget == 'drawerNav'){
          $('.nav__brand').removeClass('minify minified');
        }
        pushMainContent();
      },
      checkState = function(drawerTarget, drawerToggle) {
        //console.log('CHECK STATE: ' + $('#' + drawerTarget).data('state'));
        var isExpandedState = $('#' + drawerTarget).data('state') == 'expanded';
        var isMinified = $('#' + drawerTarget).hasClass('minified');

        if (drawerToggle == 'minify'){
          if(isMinified){
            unminifyDrawer(drawerTarget, drawerToggle);
          } else{
            minifyDrawer(drawerTarget, drawerToggle);
          }
        } else if (drawerToggle == 'show'){
          if(isExpandedState){
            closeDrawer(drawerTarget, drawerToggle);
          } else{
            openDrawer(drawerTarget, drawerToggle);
          }
        }
        //console.log('isExpandedState: ' + isExpandedState);
      }
    initDrawer();

    $('.drawer-toggle').click(function() {
      var drawerTarget = $(this).data('target'),
          drawerToggle = $(this).data('toggle');

      console.log('drawerTarget: ' + drawerTarget);
      console.log('drawerToggle: ' + drawerToggle);

      checkState(drawerTarget, drawerToggle);

      // Add active status to selected menu item
      // $(this).parent().toggleClass('active');
      // $(this).parent().siblings().removeClass('active');
    });

    $('nav.drawer .drawer-toggle').click(function(){
      var drawerTarget = $(this).data('target'),
          drawerToggle = $(this).data('toggle');

      if(drawerToggle == 'show'){
        // Reset any open views
        // $('.child-view').hide();
        // $('.view--blank').show();
        // $('.view--selected').hide();
      }

      // if(drawerTarget == 'reports'){
      //   $('#reportView').show();

      //   $('#modelView').hide();
      //   $('#groupView').hide();
      // } else if(drawerTarget == 'models'){
      //   $('#modelView').show();

      //   $('#reportView').hide();
      //   $('#groupView').hide();
      // } else if(drawerTarget == 'groups'){
      //   $('#groupView').show();

      //   $('#reportView').hide();
      //   $('#modelView').hide();
      // }

    });
  },

  // toggleSideMenu = function() {
  //   "use strict";
  //   // Toggle side menu
  //   var initSideMenu = function() {
  //       if (isExpanded()) {
  //         if (isPushed()) {
  //           pushMainContent();
  //         }
  //         if (isMinify()){
  //           $('.nav__icon').addClass('minify');
  //           $('.nav__icon').removeClass('minified');
  //         }
  //         $('.nav__icon').addClass('expanded');
  //       } else{
  //         if (isMinify()){
  //           $('.nav__icon').addClass('minify');
  //           $('.nav__icon').addClass('minified');
  //         }
  //         $('.nav__icon').addClass('collapsed');
  //       }
  //     },
  //     isExpanded = function() {
  //       return $('.nav__drawer').hasClass('expanded');
  //     },
  //     isPushed = function() {
  //       return $('.nav__drawer').hasClass('push');
  //     },
  //     isMinify = function() {
  //       return $('.nav__drawer').hasClass('minify');
  //     },
  //     isMinified = function() {
  //       return $('.nav__drawer').hasClass('minified');
  //     },
  //     pushMainContent = function() {
  //       resizeBody();
  //     },
  //     closeSideMenu = function() {
  //       $('.nav__drawer-toggle').removeClass('opened');
  //       $('.nav__drawer').removeClass('expanded');
  //       if (isMinify()) {
  //         $('.nav__drawer, .nav__icon').addClass('minified');
  //       } else {
  //         $('.nav__drawer').addClass('collapsed');
  //       }
  //       if (isPushed()) {
  //         if (isMinified()) {
  //           $('main').animate({'margin-left': navWidthMinifiedCollapsed + 'px' });
  //           $('.sidebar__toggle').animate({ 'left': '70px' });
  //           $('.sticky').addClass('expanded-more');

  //           console.log('expanded-more');
  //         } else{
  //           $('main').animate({'margin-left': 0 + 'px' });
  //         }
  //         $('.sticked, .sticky').animate({'width': '100%'});
  //       }
  //       $('.nav__icon').addClass('collapsed').removeClass('expanded');
  //     },
  //     openSideMenu = function() {
  //       $('.nav__drawer-toggle').addClass('opened');
  //       $('.nav__drawer').addClass('expanded');
  //       if (isMinify()) {
  //         $('.nav__drawer').removeClass('minified');
  //         $('.sticky').removeClass('expanded-more');
  //         $('.nav__icon').removeClass('minified');
  //       } else {
  //         $('.nav__drawer').removeClass('collapsed');
  //       }
  //       if (isPushed()) {
  //         pushMainContent();
  //       }
  //       $('.nav__icon').addClass('expanded').removeClass('collapsed');
  //     },
  //     checkState = function() {
  //       if (isExpanded()) {
  //         closeSideMenu();
  //       } else {
  //         if (isMinify() === false) {
  //           pushMainContent();
  //         }
  //         openSideMenu();
  //       }
  //     }
  //   initSideMenu();
  //   $('.nav__drawer-toggle').on('click', function() {
  //     checkState();
  //   });
  // },

  toggleAccordion = function() {
    "use strict";
    var preventWidthAdjust = function() {
        "use strict";
        // Prevent nav menu pushing content to the right when scrollbar is visible
        var parentNav = $('.nav__drawer');
        var childrenNav = $('.nav__drawer-parent');
        var parentNavWidth = parentNav.width();
        parentNav.css('overflow-y', 'auto');
        childrenNav.css('width', parentNavWidth);
      }
    // Toggle accordion
    $('.accordion.is-expanded').next('.accordion__content').slideToggle('show');

    $('.accordion').on('click', function(e) {
      e.preventDefault();
      var isSingleView = $(this).parent().parent('.accordion-container').hasClass('singleview');
      if (isSingleView) {
        console.log('isSingleView');
        $(this).parent().siblings().find('.accordion').removeClass('is-expanded').next('.accordion__content').slideUp();
        if ($(this).hasClass('is-expanded')) {
          $(this).removeClass('is-expanded');
        } else {
          $(this).addClass('is-expanded');
        }
        $(this)
          .next('.accordion__content')
          .slideToggle();
      } else {
        $(this)
          .next('.accordion__content')
          .slideToggle();
        $(this).toggleClass('is-expanded');
      }
      preventWidthAdjust();
    });
  },

  toggleTabs = function() {
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
  },

  toggleFilter = function() {

    var checkSelectedFilter = function(selectedVal){

      $('.filter__target').each(function(){
        var checker = $(this).is('[data-actions~="'+selectedVal+'"]');
        if (checker){
          $(this).show();
        } else{
          $(this).hide();
        }
      });
    };

    $('.filter').on('click',function(){
      $('.filter').removeClass('active');
      $(this).addClass('active');

      var selectedVal = $(this).data("target");

      console.log('selectedVal: ' + selectedVal);
      checkSelectedFilter(selectedVal);
    });
  },

  enableAnchorSmoothScroll = function() {
    "use strict";
    // Anchor links smooth scroll
    $('.anchor-link').click(function(e) {
      e.preventDefault();

      var hash = $(this).attr("href");
      if ($(hash).length === 0) {
        return;
      }

      var scrollToOffset = $(hash).offset().top;
      
      console.log($(hash).offset().top);
      $('html, body').animate({
        scrollTop: scrollToOffset
      }, 800)
    });
  },

  appearAnimate = function() {
    "use strict";
    // For Animate css
    $('.animated').appear(function() {
      var element = $(this);
      var animation = element.data('animation');
      var animationDelay = element.data('delay');
      if (animationDelay) {
        setTimeout(function() {
          element.addClass(animation + " visible");
          element.removeClass('hiding');
        }, animationDelay);
      } else {
        element.addClass(animation + " visible");
        element.removeClass('hiding');
      }
    }, { accY: -90 });
  },

  onWindowResize = function() {
    $(window).resize(function() {
      resizeBody();
    });
  },

  determineScroll = function() {
    "use strict";
    // Determine if user scrolls up or down
    var lastScrollTop = 0;
    var currentPosition = $(window).scrollTop();
    // If page is reloaded while scrolled down,
    // sub menu remains hidden
    if (currentPosition > 0) {
      $('.sticky').addClass('sticked');
      // $('.nav__toolbar .logo img').show();
      // $('.nav__toolbar').addClass('menu--scrolled');
      // $('.nav__child-bg').addClass('menu--scrolled');
    }
    if (wW < 768) {
      // $('.nav__toolbar .logo img').show();
    }
    $(window).scroll(function(event) {
      currentPosition = $(this).scrollTop();
      // On Scroll Down
      if (currentPosition > lastScrollTop) {
        $('.sticky').addClass('sticked');
         $('.sticky').hide();

        // console.log("down")
        // $('.nav__toolbar').addClass('menu--scrolled');
        // $('.nav__child').addClass('menu--scrolled');

      } else if (currentPosition == lastScrollTop) {
        //do nothing 
        //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
      }
      // On Scroll Up
      else {
        // console.log("up");
        if (currentPosition == 0) {
            $('.sticky').removeClass('sticked');
            // Hide main menu logo
            // if (wW > 767) {

            // }
        //     // $('.nav__toolbar').removeClass('menu--scrolled');
        //     // $('.nav__child').removeClass('menu--scrolled');
        // 
        } else {
         $('.sticky').show();
        }
      }
      lastScrollTop = currentPosition;
    });
  },
  App = function() {
    "use strict";
    return {
      init: function() {
        //preloader(),
        //toggleSideMenu(),
        toggleDrawer(),
        toggleAccordion(),
        toggleTabs(),
        toggleFilter(),
        enableAnchorSmoothScroll(),
        appearAnimate(),
        //onWindowResize(),
        determineScroll()
      }
    }
  }();