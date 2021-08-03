(function($) {
 
    var SliceSlider = {
      
      /**
       * Settings Object
       */
      settings: {
        delta:              0,
        currentSlideIndex:  0,
        scrollThreshold:    40,
        slides:             $('.flex__container'),
        numSlides:          $('.flex__container').length,
        navPrev:            $('.js-prev'),
        navNext:            $('.js-next'),
        furniture:          $('.furniture__img'),
        numFurniture:       $('.furniture__img').length
      },

      
      /**
       * Init
       */
      init: function() {
          s = this.settings;
          this.bindEvents();
          
        },
        
        /**
         * Bind our click and key events
         */
        bindEvents: function(){
        // On click prev
        s.navPrev.on({
          'click' : SliceSlider.prevSlide
        });
        // On click next
        s.navNext.on({
          'click' : SliceSlider.nextSlide
        });
        // On Arrow keys
        $(document).keyup(function(e) {
          // Left or back arrows
          if ((e.which === 37) ||  (e.which === 38)){
            SliceSlider.prevSlide();
          }
          // Down or right
          if ((e.which === 39) ||  (e.which === 40)) {
            SliceSlider.nextSlide();
          }
        });
      },
  
      /**
       * Show Slide
       */
      showSlide: function(){ 
        // reset
        s.delta = 0;
        // Bail if we're already sliding
        if ($('body').hasClass('is-sliding')){
          return;
        }

        // Loop through our slides
        s.slides.each(function(i, flex__container) {
          // Toggle the is-active class to show slide
          $('.slider__warpper').find('.flex__container[data-slide=' + s.currentSlideIndex + ']').addClass('flex--preStart');
          $('.flex--active').addClass('animate--end');
          setTimeout(function() {
            $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
            $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
          }, 800);
          
          // Add and remove is-sliding class
          $('body').addClass('is-sliding');
  
          setTimeout(function(){
              $('body').removeClass('is-sliding');
          }, 1000);
        });
      },
  
      /**
       * Previous Slide
       */
      prevSlide: function(){
        
        // If on first slide, loop to last
        if (s.currentSlideIndex <= 0) {
          s.currentSlideIndex = s.numSlides;
        }
        s.currentSlideIndex--;
        
        SliceSlider.showSlide();
      },
  
      /**
       * Next Slide
       */
      nextSlide: function(){
        
        s.currentSlideIndex++;
     
        // If on last slide, loop to first
        if (s.currentSlideIndex >= s.numSlides) { 
          s.currentSlideIndex = 0;
        }
        SliceSlider.showSlide();
      },

      // you're in PORTRAIT mode
        mobile: function(){
        if (window.matchMedia("(orientation: portrait)").matches) {
          s.furniture.each(function(i, furniture){
            $(furniture).attr('src',$(furniture).attr('src').replace('desktop-', 'mobile-'));
          });};
      },
    };
    SliceSlider.init();
    SliceSlider.mobile();
  })(jQuery);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-items");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    if (navMenu.classList.length == 1) {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    } else {
        hamburger.classList.remove("active");
        navMenu.classList.add("close");
    setTimeout(function () {
        navMenu.classList.remove("active");
        navMenu.classList.remove("close");
          }, 700); 
    }
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.add("close");
    setTimeout(function () {
        navMenu.classList.remove("active");
        navMenu.classList.remove("close");
      }, 700);
}