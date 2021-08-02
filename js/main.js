$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $($('#ballet-book')).parent().magnificPopup({
        type: 'image',
        closeOnContentClick: true,
    });

    // for tabs
    $('#programs').tabs();

    // for teachers slick
    $('#teachers').slick({
        slidesToShow: 1, // показать слайдов
        slidesToScroll: 1, // прокручивать по одному
        arrows: false, // стрелки нужны - true, нет - false
        fade: true, // плавная анимация переключения слайдов
        asNavFor: '#teachers-nav' // навигационное меню
    });
    $('#teachers-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#teachers', // связываем с первым слайдером
        dots: false, // точки
        vertical: true
    });

    // for reviews slick
    $('#reviews').slick({
        slidesToShow: 1, // показать слайдов
        slidesToScroll: 1, // прокручивать по одному
        arrows: false, // стрелки нужны - true, нет - false
        fade: true, // плавная анимация переключения слайдов
        asNavFor: '#reviews-nav' // навигационное меню
    });
    $('#reviews-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#reviews', // связываем с первым слайдером
        dots: false, // точки
        vertical: true
    });


    //for burger-menu:
    $('#burger').click(() => {
        $('#mobile-menu-container').css('display', 'flex')
    });
    // обработчик события - скрытие мобильного меню при нажатии на свободную область или крестик или на ссылку:
    $('#menu-cancel-svg, #mobile-menu-container').click((event) => {
        if (event.target.id === 'mobile-menu-container' || event.target.id === 'menu-cancel-svg') {
            $('#mobile-menu-container').hide();
        }
    });
    $('#menu-cancel-svg path').click(() => {
        $('#mobile-menu-container').hide();
    });
    $('#mobile-menu a').click(() => {
        $('#mobile-menu-container').hide();
    });


    //for select in order-form:
    $("#select").selectmenu();


    //for accordions:
    $('.question-accordion').accordion({
        heightStyle: "content",
        collapsible: true,
        active: null
    });
    $('.ui-accordion-header-icon').remove();


    // для того, чтобы при выборе программы и нажатии на кнопку "Записаться на обучение"
    // группа автоматически переносилась в форму:
    let programTitles = $('#programs ul li a');
    let programActions = $('.program-action').children();
    for (let i = 0; i < programTitles.length; i++) {
        if (programTitles[i]) {
            $(programActions[i]).click(() => {
                $('.ui-selectmenu-text').text($(programTitles[i]).text().trim());
            })
        }
    }


    //для открытия модального окна "call":
    $('.btn-for-call, #mobile-call').click(() => {
        $('#call-container').css('display', 'flex');
    });
    // обработчик события - скрытие модального окна при нажатии на свободную область или крестик
    $('.popup-cancel-svg, #reservation-container, #call-container').click((event) => {
        if (event.target.id === 'reservation-container' || event.target.classList[0] === 'popup-cancel-svg' || event.target.id === 'call-container') {
            $('#reservation-container').hide();
            $('#call-container').hide();
        }
    });
    $('.popup-cancel-svg path').click(() => {
        $('#reservation-container').hide();
        $('#call-container').hide();
    });


    // Наложим ограничения на ввод инпутов:
    let callInputs = $('#call-form input');
    let orderInputs = $('#order-form input');


    //Чтобы в инпут имени можно было вводить только русские или англ. буквы, пробел или дефис:
    $(callInputs[0]).on("input", function () {
        $(this).val($(this).val().replace(/[^a-zA-Zа-яА-Я- ]/g, ''));
    });
    $(orderInputs[0]).on("input", function () {
        $(this).val($(this).val().replace(/[^a-zA-Zа-яА-Я- ]/g, ''));
    });


    //Наложим маску на поле телефона (маска для ввода добавлена в атрибутах тега):
    callInputs[1].onkeypress = function (event) {
        let number = parseInt(event.key);
        if (!number && number !== 0) {
            event.preventDefault();
        }
    }
    orderInputs[1].onkeypress = function (event) {
        let number = parseInt(event.key);
        if (!number && number !== 0) {
            event.preventDefault();
        }
    }


    //для открытия модального окна "call-send":
    $('.callback > button').click(() => {
        $('.error-input').hide();

        // let callInputs = $('#call-form input')
        let hasError = false;

        for (let i of callInputs) {
            if (!$(i).val()) {
                $(i).css('margin-bottom', '1px').css('border-color', 'red');
                $(i).siblings('.error-input').show();
                hasError = true;
            } else {
                $(i).css('margin-bottom', '15px').css('border-color', 'initial');
            }
        }

        let name = callInputs[0];
        let phone = callInputs[1];

        if (!hasError) {
            $('#call').hide();
            $('#call-send').css('display', 'flex');
            // $.ajax({
            //     type: 'post',
            //     url: 'call_mail.php',
            //     data: 'name=' + name.val() + '&phone=' + phone.val(),
            //     success: () => {
            //         $('#call').hide();
            //         $('#call-send').css('display', 'flex');
            //     },
            //     error: () => {
            //         alert('Ошибка записи. Свяжитесь, пожалуйста, по номеру телефона.');
            //     }
            // });
        }
    });


    //для открытия модального окна "reservation":
    $('#order-action > button').click(() => {
        $('.error-input').hide();

        let selectText = $('.ui-selectmenu-text');
        let hasError = false;

        if ($(selectText).text().trim() === 'Программа обучения') {
            $($(selectText.parent())).css('margin-bottom', '1px').css('border-color', 'red');
            $($(selectText.parent())).siblings('.error-input').show();
            hasError = true;
        } else {
            $($(selectText.parent())).css('margin-bottom', '15px').css('border-color', 'initial');
        }
        for (let i of orderInputs) {
            if (!$(i).val()) {
                $(i).css('margin-bottom', '1px').css('border-color', 'red');
                $(i).siblings('.error-input').show();
                hasError = true;
            } else {
                $(i).css('margin-bottom', '15px').css('border-color', 'initial');
            }
        }

        let name = $('#name');
        let program = $(selectText).text().trim();
        let phone = $('#phone');

        if (!hasError) {
            $('#reservation-container').css('display', 'flex');
            // $.ajax({
            //     type: 'post',
            //     url: 'mail.php',
            //     data: 'name=' + name.val() + '&program=' + program + '&phone=' + phone.val(),
            //     success: () => {
            //         $('#reservation-container').css('display', 'flex');
            //     },
            //     error: () => {
            //         alert('Ошибка записи. Свяжитесь, пожалуйста, по номеру телефона или закажите звонок.');
            //     }
            // });
        }
    });


    // for different window width:
    let advantagesNav = $('#advantages-nav');
    let programNav = $('#programs ul');
    let teacherImg = $('.teacher-image');
    let programImg = $('.program-image');
    let reviewImg = $('.review-image');
    let callImg = $('.call-image-mobile');
    let reservationImg = $('#reservation-image');
    let header = $('#header');


    if (window.innerWidth < 1024) {
        $('.question-text').addClass('wow animate__fadeInLeft');
        $('.question-flex').removeClass('wow animate__fadeInLeft').removeClass('wow animate__fadeInRight');
    }

    function checkWidth() {
        if (window.innerWidth < 1024) {
            //for advantages slick (max-width 1023px)
            advantagesNav.css('display', 'block');
            $('#advantages').not('.slick-initialized').slick({
                slidesToShow: 1, // показать слайдов
                slidesToScroll: 1, // прокручивать по одному
                arrows: false, // стрелки нужны - true, нет - false
                fade: false, // плавная анимация переключения слайдов
                asNavFor: '#advantages-nav' // навигационное меню
            });
            advantagesNav.not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '#advantages', // связываем с первым слайдером
                dots: false, // точки
                vertical: true
            });
            if (window.innerWidth < 768) {
                //for programs-tabs slick (max-width 767px):
                programNav.not('.slick-initialized').slick({
                    dots: false,
                    variableWidth: true, //для пунктов разной ширины
                    arrows: false,
                    infinite: false,
                    slidesToScroll: 1
                });
                programNav.on('wheel', (function (e) { //для скролла колёсиком мыши
                    e.preventDefault();

                    if (e.originalEvent.deltaY < 0) {
                        $(this).slick('slickNext');
                    } else {
                        $(this).slick('slickPrev');
                    }
                }));
                //для изменения высоты картинки пропорционально ширине в блоках programs, teachers:
                $(function () {
                    programImg.height(programImg.width() / 0.82);
                    teacherImg.height(teacherImg.width() / 0.75);
                    reviewImg.height(reviewImg.width() / 1.3);

                    $(window).resize(function () {
                        programImg.height(programImg.width() / 0.82);
                        teacherImg.height(teacherImg.width() / 0.75);
                        reviewImg.height(reviewImg.width() / 1.3);
                    });
                });
                if (window.innerWidth < 580) {
                    $(function () {
                        reservationImg.width(header.width());
                        callImg.width(header.width());
                        reservationImg.height(reservationImg.width() / 1.42);
                        callImg.height(callImg.width() / 1.42);

                        $(window).resize(function () {
                            reservationImg.height(reservationImg.width() / 1.42);
                            callImg.height(callImg.width() / 1.42);
                        });
                    });
                } else {
                    callImg.width('540px');
                    callImg.height('410px');
                    reservationImg.width('540px');
                    reservationImg.height('380px');
                }
            }
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                if (programNav.hasClass('slick-initialized')) {
                    programNav.slick('unslick');
                }
                programImg.height('890px');
                teacherImg.height('960px');
                reviewImg.height('534px');
                reservationImg.width('380px');
                reservationImg.height('initial');
            }
        } else {
            if (advantagesNav.hasClass('slick-initialized')) {
                $('#advantages, #advantages-nav').slick('unslick');
            }
            advantagesNav.css('display', 'none');
            programImg.height('initial');
            teacherImg.height('initial');
            reviewImg.height('initial');
            reservationImg.width('380px');
            reservationImg.height('initial');
        }
    }

    checkWidth(); // проверит при загрузке страницы

    window.addEventListener("resize", function () {
        checkWidth(); // проверит при изменении размера окна клиента
    });
})
;

