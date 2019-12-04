$(function () {


  $('.header__lang a').click(function () {
    $('.header__lang a').removeClass('active');
    $(this).toggleClass('active');
  });

  // strat 
  $(document).mouseup(function (e) {
    var $target = $(e.target);
    if (!$target.closest('.header__top').length) {
      $('.header__menu').removeClass('active');
      $('.header__btn').removeClass('active');
    }
    event.stopPropagation();
  });
  // end 
  // функция которая убирает меню при клике вне ее, но есть один баг то что при клике на .header__top меню не убирается, а если сделать чтобы убиралось то не работает .header__btn что делать я не знаю подскажеш а??   
  $('a[href*="#"').on('click', function(){
    event.preventDefault();
    var target = $(this).attr('href');
    var top = $(target).offset().top;
    $('html, body').animate({scrollTop: top}, 1000);
  });

  $('.header__banner-slider').slick({
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1500,
    rows: 0
  });

  $('.header__btn').on('click', function () {
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
    speed: 700,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }]
  });


  $(function validHeaderForm(){
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i,
        formHeader = $('#form__header'),
        name = $('#form__header input[name="header__name"]'),
        mail = $('#form__header input[name="header__email"]'),
        parentForm = $('#form__header .form__default'),
        password = $('input[name="header__password"]'),
        validName = false,
        validMail = false,
        validPassword = false;

    formHeader.submit(function(){
      event.preventDefault();
      if (name.val() != ''){
        name.parent().removeClass('error');
        validName = true;
      } else {
        name.parent().addClass('error');
        validName = false;
      }
      if (mail.val() != '') {
        if (mail.val().search(pattern) == 0) {
          mail.parent().removeClass('error');
          validMail = true;
        } else {
          mail.parent().addClass('error');
          mail.val('');
          validMail = false;
        }
      } else {
        mail.attr('placeholder', 'E-mail введен неверно');
        mail.parent().addClass('error');
        validMail = false;
      }
      if(password.val() <== 8) {
        password.parent().addClass('error');
        password.attr('placeholder', 'Введите минимум 8 символов');
        validPassword = false;
      } else {
        password.parent().removeClass('error');
        validPassword = true;
      }
      if (validName == true && validMail == true && validPassword == true) {
        parentForm.removeClass('error');
        formHeader[0].reset();
      } else {
        console.log('error validation form');
      }
    });    
  });   

  $(function validFormCustomer() {
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i,
      formCustomer = $('#form__customer'),
      parentForm = $('#form__customer .form__default'),
      mail = $('#email'),
      name = $('input[name="customer__name"]'),
      subject = $(' input[name="customer__subject"]'),
      message = $(' textarea[name="customer__message"]'),
      validName = false,
      validSubject = false,
      validMessage = false,
      validMail = false;

    formCustomer.submit(function () {
      var userName = $(this).find(name).val(),
        userSubject = $(this).find(subject).val(),
        userMail = $(this).find(mail).val(),
        userMessage = $(this).find(message).val();
      event.preventDefault();
      if (name.val() != '') {
        validName = true;
        name.parent().removeClass('error');
      } else {
        validName = false;
        name.parent().addClass('error');
      }
      if (subject.val() != '') {
        validSubject = true;
        subject.parent().removeClass('error');
      } else {
        validSubject = false;
        subject.parent().addClass('error');
      }
      if (message.val() != '') {
        validMessage = true;
        message.parent().removeClass('error');
      } else {
        validMessage = false;
        message.parent().addClass('error');
      }
      if (mail.val() != '') {
        if (mail.val().search(pattern) == 0) {
          validMail = true;
          mail.parent().removeClass('error');
        } else {
          mail.parent().addClass('error');
          mail.val('');
          validMail = false;
        }
      } else {
        mail.attr('placeholder', 'E-mail введен неверно');
        mail.parent().addClass('error');
        validMail = false;
      }

      if (validName == true && validMail == true && validSubject == true && validMessage == true) {
        $.ajax({
          url: 'send.php',
          type: 'GET',
          dataType: 'html',
          data: {
            name: userName,
            mail: userMail,
            subject: userSubject,
            message: userMessage
          },
        })
          .done(function (data) {
            $('#done, .overlay').addClass('active');
            $('.descr button').on('click', function () {
              $('#done, .overlay').removeClass('active');
            });
            console.log(data);
            parentForm.removeClass('error');
            formCustomer[0].reset();

          })
          .fail(function () {
            console.log('not found file');
            $('#fail, .overlay').addClass('active');
            $('.descr button').on('click', function () {
              $('#fail, .overlay').removeClass('active');
            });

          });
      } else {
        console.log('error validation form');
      }
    });
  });

 

  // не закончена так как нужно оптимизировать, а как я пока что не знаю сильно длинный код
  // и можно ли вообще и нужно ли???
  // еще есть маленькая проблемка вертикальний скрол при popup как то нужно убрать но сегодня скажем НЕТТ
  // после многочисленных попыток я понял что скролл взять очень сложно и решил нужно подождать и получить больше знаний
});

