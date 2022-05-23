var owl = $(".first-slider");
owl.owlCarousel({
  items: 1,
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  animateOut: "fadeOut",
});
$(".play").on("click", function () {
  owl.trigger("play.owl.autoplay", [3000]);
});
$(".stop").on("click", function () {
  owl.trigger("stop.owl.autoplay");
});

$('.blog-slider').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  autoplay:false,
  
  responsive:{
      390:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:3
      }
  }
})
$('.slider-icon').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  autoplay:false,
  
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:4
      }
  }
})
const swiper = new Swiper(".product-slider", {
  navigation: {
    nextEl: '.product-button-next',
    prevEl: '.product-button-prev',
    
  },
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    1000: {
      slidesPerView: 4,
    }
  }
 
});

$('.icon-cart').click(function(e){
  e.preventDefault();
  $('.canvas').addClass('active-canvas');
  $('.canvas-overlay').addClass('active-canvas-overlay');
})

$('.canvas-close-btn, .canvas-overlay').click(function(){
  $('.canvas').removeClass('active-canvas');
  $('.canvas-overlay').removeClass('active-canvas-overlay');
})

function createCookie(name, value, days) {
  var expires;

  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
  } else {
      expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
          c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => (v === value && count++));
  return count;
}

var products = {};

var cart = readCookie('cart');
if(cart == null) {
  cart = [];
} else {
  cart = JSON.parse(cart);
}

products[1] = {image: 'https://htmldemo.net/juan/juan/assets/img/product/product-4.jpg', name:'Purple Shoes', price:25};
products[2] = {image: 'https://htmldemo.net/juan/juan/assets/img/product/product-2.jpg', name:'Pink Shoes', price:5};
products[3] = {image: 'https://htmldemo.net/juan/juan/assets/img/product/product-1.jpg', name:'Dark Shoes', price:25};
products[4] = {image: 'https://htmldemo.net/juan/juan/assets/img/product/product-5.jpg', name:'Yellow Shoes', price:5};


$('.add-to-cart').click(function(){
  var id = $(this).closest('.product-block').attr('data-id');
  alert('Added to cart successfully');
  cart.push(id);
  var newcart = JSON.stringify(cart);
  createCookie('cart', newcart, 30);
  getCart();
})

function getCart() {
  $('.canvas-products').html('');
  var quantity = 0;
  var total = 0;
  if(cart != '') {
    var newcart = cart.filter(onlyUnique);
    $.each(newcart , function(index, val) {
      var counts = getOccurrence(cart, val);
      var price = parseInt(counts) * parseInt(products[val]['price']);
      total += price;
      quantity+=counts;
      $('.canvas-products').append('<div class="canvas-product"><div class="c-pro-img"><img src="'+products[val]['image']+'"></div><div class="c-pro-content"><div class="c-pro-title">'+products[val]['name']+'</div><div class="c-pro-price"><span class="c-pro-quantity">'+counts+'</span><span class="c-pro-separator">x</span><span class="c-pro-price">'+products[val]['price']+'$</span></div></div><div data-id="'+val+'" class="c-pro-btn">x</div></div>');
    });
    $('.canvas-subtotal .canvas-price-total').html(total+'$');
    var tax = parseInt($('.canvas-tax').attr('data-price'));
    var vat = parseInt($('.canvas-vat').attr('data-price'));
    var totalPrice = total + tax+ vat;
    $('.canvas-total .canvas-price-total').html(totalPrice+'$');
    $('.basket-count').html(quantity);
  }
}

getCart();

$(document).on('click', '.c-pro-btn', function(){
  var getid = $(this).attr('data-id');
  $(this).closest('.canvas-product').remove();
  $.each(cart, function(index, val){
    if(val == getid) {
      cart.splice(index);
    }
  })
  var newcart = JSON.stringify(cart);
  createCookie('cart', newcart, 30);
})

