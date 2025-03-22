console.log("Hello from JavaScript!");

// wait window to load
window.addEventListener('load', function() {
// Initialize Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    effect: 'fade',
  
    // Enable pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Enable navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });


});

