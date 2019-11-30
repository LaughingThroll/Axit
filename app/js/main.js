$(function () {


  // function designBg() {
  //   $('.header__banner').css({
  //     'background-image': 'url(images/content/design-bg.jpg)',
  //   });
  // }
  // function headerBg() {
  //   $('.header__banner').css({
  //     'background-image': 'url(images/content/header__bg.jpg)',

  //   });
  // }
  // setInterval(designBg, 4000);
  // setInterval(headerBg, 8000);


  $('.header__lang a').click(function(){
    $('.header__lang a').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.header__banner-slider').slick({
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1500,
    rows: 0
  });

  $('.header__btn').click(function () {
    $(this).toggleClass('active');
    $('.header__menu').toggleClass('active');
  });

  $('.tabs .tab').on('click', function (event) {
    var id = $(this).attr('data-id');
    $('.tabs').find('.tab-item').removeClass('active-tab').hide();
    $('.tabs .tab__menu').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('#' + id).addClass('active-tab').fadeIn(1000);
    return false;
  });

  $('.box-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    vertical: true,
    verticalSwiping: true,
    speed: 700
  });

 

});

