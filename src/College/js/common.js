// var dgdAd = $('#dgd-ad');
// dgdAd.owlCarousel({
//   items: 1,
//   loop: true,
//   autoplay: true,
//   autoplayTimeout: 5000,
//   autoplayHoverPause: true
// });
// var jp = $('#jp-class');
// jp.owlCarousel({
//   items: 3,
//   loop: true,
//   margin: 10,
//   autoplay: true,
//   autoplayTimeout: 5000,
//   autoplayHoverPause: true
// });
// $('.jp-class .next-btn').click(function () {
//   jp.trigger('next.owl.carousel');
// })
// $('.jp-class .prev-btn').click(function () {
//   jp.trigger('prev.owl.carousel')
// });


// var bl = $('#back-list');
// bl.owlCarousel({
//   items: 4,
//   loop: true,
//   margin: 10,
//   autoplay: true,
//   autoplayTimeout: 5000,
//   autoplayHoverPause: true
// });
// $('.history .next-btn').click(function () {
//   bl.trigger('next.owl.carousel');
// })
// $('.history .prev-btn').click(function () {
//   bl.trigger('prev.owl.carousel')
// });

;
(function () {
  $('.tab-bar a').each(function (i, el) {
    $(el).click(function () {
      $(el).addClass('cur').siblings('a').removeClass('cur');
      $('.tab-box').eq(i).show().siblings('.tab-box').hide();

    })
  })
})();

// ;
// (function () {
//   var slide = new Sld();
//   slide.init('slider', {})
//   $(window).on('resize', function () {
//     slide.resizeFn();
//   });
// })()