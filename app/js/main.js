$(function(){

  $('.header__btn').click(function(){
    $(this).toggleClass('active');
    $('.header__menu').toggleClass('active');
  });

  $('.tabs .tab').on('click', function(event) {
    var id = $(this).attr('data-id');
      $('.tabs').find('.tab-item').removeClass('active-tab').hide();
      $('.tabs .tab__menu').find('.tab').removeClass('active');
      $(this).addClass('active');
      $('#'+id).addClass('active-tab').fadeIn(1000);
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