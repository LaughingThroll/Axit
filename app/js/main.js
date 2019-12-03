$(function () {
  $('.header__lang a').click(function () {
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


  $(function validForm() {
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i,
      form = $('#form__contact'),
      mail = $('#email'),
      name = $('input[name="name"]'),
      subject = $('input[name="subject"]'),
      message = $('textarea[name="message"]'),
      validName = false,
      validSubject = false,
      validMessage = false,
      validMail = false;

    // форма отправки сообщений 
    form.submit(function () {
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
        mail.attr('placeholder', 'Введите e-mail');
        mail.parent().addClass('error');
        validMail = false;
      }

      if (validName == true && validMail == true && validSubject == true &&
        validMessage == true) {
        $.ajax({
          url: 'send.php',
          type: 'GET',
          dataType: 'html',
          data: { name: userName,
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
            mail.parent().removeClass('error');
            name.parent().removeClass('error');
            subject.parent().removeClass('error');
            message.parent().removeClass('error');
            form[0].reset();
            
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
  // я знаю как оптимизировать, нужен цикл смотрите  в следуйщей серии
  // еще есть маленькая проблемка вертикальний скрол при popup как то нужно убрать но сегодня скажем НЕТТ
});

