/*!
    * Start Bootstrap - Creative v6.0.4 (https://startbootstrap.com/theme/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

})(jQuery); // End of use strict


var btnCheck1 = document.getElementById("btncheck1")
var btnCheck2 = document.getElementById("btncheck2")
var btnCheck3 = document.getElementById("btncheck3")
var time1 = document.getElementsByClassName("time1")
var time2 = document.getElementsByClassName("time2")
var time3 = document.getElementsByClassName("time3")

btnCheck1.addEventListener('change', (event)=>{
  if(btnCheck1.checked){
    Array.from(time1).forEach((element, index)=>{
      element.checked = true;
    })
  }else{
    Array.from(time1).forEach((element, index)=>{
      element.checked = false;
    })
  }
})

btnCheck2.addEventListener('change', (event)=>{
  if(btnCheck2.checked){
    Array.from(time2).forEach((element, index)=>{
      element.checked = true;
    })
  }else{
    Array.from(time2).forEach((element, index)=>{
      element.checked = false;
    })
  }
})

btnCheck3.addEventListener('change', (event)=>{
  if(btnCheck3.checked){
    Array.from(time3).forEach((element, index)=>{
      element.checked = true;
    })
  }else{
    Array.from(time3).forEach((element, index)=>{
      element.checked = false;
    })
  }
})