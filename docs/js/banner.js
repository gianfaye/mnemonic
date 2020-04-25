/*   
Project Name: Mnemonic
Module: Banner
Version: 0.1
Author: Gian Faye Paguirigan
Website: http://gianfaye.com
*/

// Global variables
var wH = window.innerHeight ? window.innerHeight : $(window).height(),
  wW = window.innerWidth ? window.innerWidth : $(window).width(),
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Global Functions
var resizeBanner = function() {
    // Adjust Banner height to substract address bar height
    var rootElement = document.querySelector('.banner')
    var viewPortH = rootElement.getBoundingClientRect().height;
    console.log('viewPortH: ' + viewPortH);
    var windowH = window.innerHeight;
    console.log('windowH: ' + windowH);
    var browserUiBarsH = viewPortH - windowH;
    console.log('browserUiBarsH: ' + browserUiBarsH);
    if(browserUiBarsH > 0){
      rootElement.style.height = windowH + 'px';
    }
  },
  bannerImage = function() {
    var _banner = {

      init: function() {
        $('.banner__image img').each(function() {
          _banner.calculate( $(this) );
        });
      },

      calculate : function(image) {

        var wW = $(window).width();
        var imgObj = image;
        var iW = (wW < 641) ? 640 : imgObj.attr('width')
        var iH = (wW < 641) ? 964 : imgObj.attr('height')

        imgObj.width(0).height(0);

        var imgContainer = $('.banner');
        // var imgContainer = image.parent();
        var cW = imgContainer.width(); //width of container or browser
        var cH = imgContainer.height(); //height of container or browser

        // console.log(iW,iH,cW,cH);

        if ( cH > 1 ) {
            var cP = cW/cH; //ratio of container or browser
            var iP = iW/iH; //ratio of image

            if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
                iH = cH; //set image height from container height
                iW = cH * iP; //set image width using container height and image ratio
                imgObj.css({
                    'margin-top': 0,
                    'margin-left': Math.ceil((cW-iW)/2),
                    'width': Math.ceil(iW),
                    'height': Math.ceil(iH)
                }); //center the image and set dimensions
            } else { //if image ratio is less than container ratio (if image height is more than container height)
                iW = cW; //set image width from container width
                iH = cW / iP; //set image height from container width and ratio
                imgObj.css({
                    'margin-bottom': Math.ceil((cH-iH)/2),
                    'margin-left': 0,
                    'width': Math.ceil(iW),
                    'height': Math.ceil(iH)
                }); //center the image and set dimensions
            }
        } else {
            imgObj.css({
                'margin-bottom': 0,
                'margin-left': 0,
                'width': 'auto',
                'height': 'auto'
            });
        }
      }
    }
    _banner.init()
  },
  Banner = function() {
    "use strict";
    return {
      init: function() {
        resizeBanner(),
        bannerImage()
      }
    }
  }();