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

  // if this element clicked new-collection-list-item
  const newCollectionList = document.querySelectorAll('.new-collection-list-item');
  newCollectionList.forEach(function(item) {
    item.addEventListener('click', function() {
      // get the name .new-collection-list-item-info-heading roboto-mono
      const name = item.querySelector('.new-collection-list-item-info-heading').textContent;
      // get the price .new-collection-list-item-info-price
      const price = item.querySelector('.new-collection-list-item-info-price').textContent;
    //  goto wa me link
    window.open('https://wa.me/6285737139455?text=Halo%20saya%20ingin%20memesan%20' + name + '%20dengan%20harga%20' + price, '_blank');

    
    });
  });

});

