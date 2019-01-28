(function ($) {

    "use strict";

    var wind = $(window);

    setCoverBackground();
    scrollAnimate();
    headerController();
    loader();
    navInSidebar();
    fixeDropdowns();
    authorUrl();
    Stories();
    textSearch();
    mouseParallax();
    $(window).on('load', function () {
        scrollEffect();
    });
    hoverPlayVideo();
    shareSocialIcon();
    ogatoSlider();


    /* owlCarousel
    -------------------------------------------------------*/
    $('.post .post_banner_gallery_cur .owl-carousel').owlCarousel({
        items: 1,
        mouseDrag: true,
        autoplay: true,
        loop: true,
        smartSpeed: 500,
        nav: true,
        dots: false,
        navText: ['<span> <i class="jam jam-angle-left"></i> </span>',
            '<span> <i class="jam jam-angle-right"></i> </span>'],
    });


    /* YouTubePopUp
    -------------------------------------------------------*/
    $("a.vid").YouTubePopUp();


})(jQuery);


/**
 *
 *  =====================
 *      Top Side Bar
 *  ======================
 *
 */
function headerController() {
    var animation = 'rubberBand';
    $('.header-controller .icon , #topSidebar .icon').on('click', function () {
        var sidebar_toggle = $('.header-controller .icon , #topSidebar .icon'),
            body = $('body');
        sidebar_toggle.toggleClass('icon--active');
        if (sidebar_toggle.hasClass('icon--active')) {
            body.css('overflow', 'hidden');
        } else {
            body.css('overflow', '');
        }

        $('#topSidebar .sidebar').toggleClass('sidebar-width');
        $('#mainContent').toggleClass('sidebar-margin-left');
        $(this).addClass('animated ' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated ' + animation);
        });
    });

    $('.sidebar-overlay').on('click', function () {
        $('.header-controller .icon').click();
    });
}

/**
 *
 * ====================================
 *        Loader Page & Sticky Sidebar
 * ====================================
 *
 */
function loader() {
    $(window).on('load', function () {

        /* --==== Preloader ====-- */
        $("#preloader").fadeOut(500);

        /* --==== Sidebar ====-- */

        if ($('#sidebar').length !== 0) {
            var stickySidebar = new StickySidebar('#sidebar', {
                topSpacing: 20,
                bottomSpacing: 20,
                containerSelector: '.sticky-container',
                innerWrapperSelector: '.sidebar__inner',
                minWidth: 991
            });
        }

    });
}

/**
 *
 * ==========================================
 *        Drop Down Menu In Navigation
 * ==========================================
 *
 */
function dropdoenMenu() {
    $('a.dropdown-toggle').on('click', function (e) {
        $next = $(this).next();
        if ($next.hasClass('dropdown-left') || $next.hasClass('dropdown-right')) {
            $next.toggleClass('show');
            return false;
        }
    });
}

/**
 *
 * ==========================================
 *        Copy Nav In Left Side Bar
 * ==========================================
 *
 */
function navInSidebar() {
    var nav = $('#nav .navbar-collapse').html();
    nav = $('#topSidebar .navbar .navbar-collapse').html(nav);
    nav.find('.animated').removeClass('animated').removeClass('fadeInUp').removeClass('fadeInLeft').addClass('slideDown');
    dropdoenMenu();
}

/**
 *
 * ==========================================
 *   automatically make dropdowns on the right align right
 * ==========================================
 *
 */
function fixeDropdowns() {
    $('.dropdown-menu').on('mouseenter', function () {
        var _taht = $(this),
            _ul_left = _taht.offset().left,
            _ul_w = _taht.width(),
            _li_w = _taht.find('li:first').width(),
            bw = $('body').width();
        ;

        if ((_ul_left + _ul_w + _li_w) < bw) {
            _taht.find('.dropdown-menu').removeClass('dropdown-right').addClass('dropdown-left')
                .removeClass('fadeInRight').addClass('fadeInLeft')
                ;
        } else {
            _taht.find('.dropdown-menu').removeClass('dropdown-left').addClass('dropdown-right')
                .removeClass('fadeInLeft').addClass('fadeInRight');
        }
    });
}

/**
 *
 * ==========================================
 *        Social Media Author
 * ==========================================
 *
 */
function authorUrl() {
    var auth = $('.author_avatar .author-url'),
        p = $('.entry_header p'),
        sm = $('.entry_header .scoial-icon'),
        _icon, _icon_open, _icon_close;
    TweenMax.fromTo(sm, 0, { autoAlpha: 1, x: 0, marginBottom: 20 }, { autoAlpha: 0, x: 67, marginBottom: 0 });
    var tlanimation = new TimelineMax();
    auth.on('click', function (e) {
        e.preventDefault();
        _icon = $(this);
        _icon_open = _icon.find('i.fa-share-alt');
        _icon_close = _icon.find('i.fa-times');

        if (_icon_open.hasClass('open')) {
            tlanimation = new TimelineMax();
            tlanimation
                .fromTo(_icon_open, 0.1, { autoAlpha: 1, y: 0, display: '' }, { autoAlpha: 0, y: 20, display: 'none' })
                .fromTo(_icon_close, 0.1, { autoAlpha: 0, y: 20, display: 'none' }, { autoAlpha: 1, y: 0, display: '' })
                .fromTo(p, .5, { marginTop: -60 }, { marginTop: 0, onStart: function () { _icon_open.removeClass('open'); } })
                .fromTo(sm, .3, { autoAlpha: 0, x: 67, marginBottom: 0 }, { autoAlpha: 1, x: 0, marginBottom: 20 })
                ;

        } else {
            tlanimation.reverse();
            _icon_open.addClass('open');
        }


        return false;
    });
}

/**
 *
 * ==========================================
 *        Window Scroll Event
 * ==========================================
 *
 */
function scrollEffect() {
    var wind = $(window),
        header = $('.header-controller'),
        footer = $('footer'),
        story = $('#rStories'),
        topNav = header.offset().top,
        footer_top = footer.offset().top - footer.height(),
        fixDown = 'fixed-header-controller-down',
        fixUp = 'fixed-header-controller-up',
        lastScrollTop = 0
        ;

    wind.on('scroll', function (e) {
        var bodyScroll = wind.scrollTop();

        //---->  Top Nav Bar
        if (topNav < bodyScroll) {
            if (bodyScroll > lastScrollTop) {
                if (header.hasClass(fixDown)) {
                    header.removeClass(fixDown).addClass(fixUp);
                    $('.navbar-brand img').attr('src','/assets/img/logo-dark.png');
                 
                }
            } else {
                if (!header.hasClass(fixDown)) {
                    header.removeClass(fixUp).addClass(fixDown);
                    $('.navbar-brand img').attr('src','/assets/img/logo-dark.png');
                }
            }
        } else {
            header.removeClass(fixUp).removeClass(fixDown);
            if (!header.find('#nav').hasClass('nav-overlay')){
                $('.navbar-brand img').attr('src','/assets/img/logo-light.png');
            }
            

        }

        if (footer_top <= bodyScroll) {
            story.css('display', 'none');
        } else {
            story.css('display', 'block');
        }

        lastScrollTop = bodyScroll;
    });

}

/**
 *
 * ==========================================
 *        Stories
 * ==========================================
 *
 */
function Stories() {
    var body = $('body'),
        story = $('#rStories'),
        rsOverlay = $('.r-s-overlay'),
        rsContent = $('.r-s-slider-content'),
        sSticky = $('.stories-sticky-footer'),
        rsDisImg = $('.r-s-img-slider'),
        rsArrwImg = $('.r-s-arrow-slider'),
        rsClose = $('.r-s-close'),
        rsloader = $('.r-s-overlay .r-s-loader'),
        rsloaderImg = $('.r-s-overlay .r-s-loader img'),
        img = $('#rStories .r-s-content .img-story-item');


    story.hover(function () {
        TweenMax.to(sSticky, .3, { rotationX: 90, top: 0, autoAlpha: 0 });
        TweenMax.to(story, 1, { bottom: 0 }, 1);
    }, function () {
        TweenMax.to(sSticky, 1, { rotationX: 0, top: -42, autoAlpha: 1 });
        TweenMax.to(story, 1, { bottom: -130 }, 1);
    });


    img.on('click', function () {
        tlStories = new TimelineMax();
        tlLoader = new TimelineMax();
        body.css('overflow', 'hidden');
        var _that = $(this),
            post_id = _that.attr('data-post-id');

        rsloaderImg.attr('src', _that.attr('src'));
        tlStories.to(story, .5, { bottom: -150, ease: Power1.easeInOut })
            .fromTo(rsOverlay, 0.5,
                { display: 'inline-block', autoAlpha: 0, scale: 1.3 },
                { autoAlpha: 1, scale: 1, ease: Power0.easeNone, onComplete: ajaxRS }
            );


        function ajaxRS() {
            $.ajax({
                url: "ajax" + post_id + ".html",
                success: function (data) {
                    rsloader.addClass('hideRotate');
                    imgs = $(data);
                    tlStartStory = new TimelineMax();
                    tlStartStory.to(rsloaderImg, 1, {
                        width: rsContent.width(), height: rsContent.height(), borderRadius: 8
                        , onComplete: function () {
                            TweenMax.set(rsloaderImg, { display: 'none' });
                            imgs.not(':first').css('display', 'none');
                            rsDisImg.html(imgs);
                            imgs = rsDisImg.find('img');
                            rsArrwImg.html(getProgress(imgs.length));
                            tlLoader.staggerFromTo(rsArrwImg.find('.progress'), .5,
                                { autoAlpha: 0, y: 0 },
                                { autoAlpha: 1, y: 10, ease: Back.easeInOut },
                                0.2
                            ).to($('.r-s-close'), .7, { autoAlpha: 1 });

                            testlin = new TimelineMax();
                            var _currentKey = 0;
                            rsArrwImg.find('.progress').each(function (_key, _e) {
                                testlin.add('h' + _key).fromTo($(this).find('.progress-bar'), 5,
                                    { width: 0 },
                                    {
                                        width: '100%', onStart: function () {
                                            _currentKey = _key;
                                            imgs.css('display', '').not(':nth-child(' + (_key + 1) + ')').css('display', 'none');
                                        }
                                    }
                                );
                                $(_e).on('click', function () {

                                    if (_currentKey != _key) {
                                        if (_key == 0) testlin.restart();
                                        else testlin.seek('h' + _key);
                                    }
                                });
                            });
                        }
                    });

                    tmReloader = TweenMax.to(rsloader, 1, { width: rsContent.width(), height: rsContent.height() });
                }
            });
        }
    });


    rsClose.on('click', function () {
        testlin.reverse().timeScale(6);
        rsloaderImg.css('display', '');
        rsDisImg.find('img').css('display', 'none');
        setTimeout(function () {
            tlLoader.reverse().timeScale(5);
        }, 500);
        setTimeout(function () {
            tlStartStory.reverse().timeScale(5);
            tmReloader.reverse().timeScale(5);
        }, 1000);

        setTimeout(function () {
            tlStories.reverse().timeScale(5);
            rsloader.removeClass('hideRotate');
            body.css('overflow', '');
        }, 1500);


    });


}

/**
 *
 * ==========================================
 *        Stories -- Progress
 * ==========================================
 *
 */
function getProgress($len) {
    $text = '';
    for ($x = 0; $x < $len; $x++) {
        $per = 100 / $len;
        $text += '<div class="progress" data-index="' + $x + '" style="width: ' + $per + '%">\n' +
            '                <div class="progress-bar"></div>\n' +
            '            </div>';
    }

    return $text;

}

/**
 *
 * ==========================================
 *        Background Image
 * ==========================================
 *
 *  -- sections background image from data background
 *
 */

function setCoverBackground() {
    var cover = $(".cover-bg, section");
    cover.each(function () {
        var attr = $(this).attr('data-image-src');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }

    });
}

/**
 *
 * ==========================================
 *        Scroll Animate
 * ==========================================
 *
 *
 *
 */

function scrollAnimate() {
    var links = $('a[href*="#"]:not([href="#"])');
    links.on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            if($(this).attr('href') === '#header'){
                $('html,body').animate({
                    scrollTop: 0,
                }, 1000);
                return false;
            }
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 75,
                }, 1000);
                return false;
            }
        }
    });
}

/**
 *
 * ==========================================
 *        Input Text Search
 * ==========================================
 *
 * -- Full Screen Search
 *
 */
function textSearch() {
    $('.search-trigger').on('click', function (e) {
        e.preventDefault();
        $('.search-wrap').animate({ opacity: 'toggle' }, 500);
        $('.nav-search, #search-close').addClass("open");
    });
    $('.search-close').on('click', function (e) {
        e.preventDefault();
        $('.search-wrap').animate({ opacity: 'toggle' }, 500);
        $('.nav-search, #search-close').removeClass("open");
    });

    function closeSearch() {
        $('.search-wrap').fadeOut(200);
        $('.nav-search, #search-close').removeClass("open");
    }

    $(document.body).on('click', function (e) {
        closeSearch();
    });
    $(".search-trigger, .main-search-input").on('click', function (e) {
        e.stopPropagation();
    });
}

/**
 *
 * ==========================================
 *        Mouse Parallax
 * ==========================================
 *
 * -- Event Icon when
 *      -- Mouse Leave
 *      -- Mouse Enter
 *      -- Mouse Move
 *
 */
function mouseParallax() {
    $('.to_top').on('mouseleave', function (e) {
        TweenMax.to(this, 0.3, { scale: 1 });
        TweenMax.to('.icon-circle, #to-top', 0.3, { scale: 1, x: 0, y: 0 });
    });

    $('.to_top').on('mouseenter', function (e) {
        TweenMax.to(this, 0.3, { transformOrigin: '0 0', scale: 1 });
        TweenMax.to('.icon-circle', 0.3, { scale: 1.2 });
    });

    $('.to_top').on('mousemove', function (e) {
        callParallax(e);
    });

    function callParallax(e) {
        parallaxIt(e, '.icon-circle', 60);
        parallaxIt(e, '#to-top', 40);
    }
    function parallaxIt(e, target, movement) {
        var $this = $('.to_top');
        var boundingRect = $this[0].getBoundingClientRect();
        var relX = e.pageX - boundingRect.left;
        var relY = e.pageY - boundingRect.top;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        TweenMax.to(target, 0.3, {
            x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
            y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.width * movement,
            ease: Power2.easeOut
        });
    }

}


function hoverPlayVideo() {
    TweenMax.set(".play-circle-01", {
        rotation: 90,
        transformOrigin: "center"
    });

    TweenMax.set(".play-circle-02", {
        rotation: -90,
        transformOrigin: "center"
    });

    TweenMax.set(".play-perspective", {
        xPercent: -2,
        scale: .08,
        transformOrigin: "center 41%",
        perspective: 1
    })

    TweenMax.set(".play-video", {
        visibility: "hidden",
        opacity: 0,
    })

    TweenMax.set(".play-triangle", {
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        rotationY: 10,
        scaleX: 2
    })

    const rotateTL = new TimelineMax({ paused: true })
        .to(".play-circle-01", .7, {
            opacity: .1,
            rotation: '+=360',
            strokeDasharray: "456 456",
            ease: Power1.easeInOut
        }, 0)
        .to(".play-circle-02", .7, {
            opacity: .1,
            rotation: '-=360',
            strokeDasharray: "411 411",
            ease: Power1.easeInOut
        }, 0)

    const button = document.querySelector(".play-button")

    if (button !== null) {
        button.addEventListener("mouseover", () => rotateTL.play())
        button.addEventListener("mouseleave", () => rotateTL.reverse())

    }
    ;
}
/**
 *
 * ==========================================
 *                  Slider
 * ==========================================
 *
 */

function ogatoSlider() {

    var
        main_slider = $('#ogato_slider'),
        overloy_img = $('.ogato-overloy-img'),
        item = $('.ogato'),
        class_active = 'ogato-active',
        class_item = '.ogato-item',
        oldBgSlider = $('.ogato-active'),
        current_index = 1,
        slider = new TimelineMax(),
        tlSidebar = new TimelineMax();


    if (main_slider.length === 0) {
        return false;
    }


    $(window).on('load', function () {
        tlSidebar.fromTo(
            overloy_img.find('.progress'),
            10,
            { width: '0' },
            {
                width: '100%',
                onComplete: function () {
                    current_index = (current_index < item.length) ? current_index : 0;
                    current_item = $(item[current_index]);
                    // $('.' + class_active).removeClass(class_active);
                    // current_item.addClass(class_active);
                    $src = current_item.find(class_item).attr('data-image-src');
                    TweenMax.fromTo(overloy_img, .5, { y: -200, backgroundImage: 'url(' + $src + ')' }, { y: 0 });
                    TweenMax.to(overloy_img.find('.ogato-carousel'), .5, {
                        left: current_item.offset().left + 10,
                        top: current_item.offset().top + 10
                    }, .9);
                    current_index++;
                    tlSidebar.restart();
                }
            }
        );
    });

    // action_slider(oldBgSlider);


    item.on('mouseover', function () {
        var _taht = $(this);

        tlSidebar.pause();
        if (!_taht.hasClass(class_active)) {

            bgSlider = _taht.find(class_item);

            $('.' + class_active).removeClass(class_active);

            _taht.addClass(class_active);


            action_slider(_taht, bgSlider);

        }
    });


    main_slider.on('mouseleave', function () {
        slider.reverse().timeScale(1);
        $('.' + class_active).removeClass(class_active);
        tlSidebar.resume();
    });

    function action_slider(_taht) {
        bgSlider = _taht.find(class_item);
        $top = _taht.offset().top;
        $height = _taht.height();
        $width = _taht.width();

        slider.reverse().timeScale(1.5);
        slider = new TimelineMax();
        slider
            .set(bgSlider, {
                'position': 'absolute',
                'opacity': 0,
                'top': $top + 'px',
                'left': 'auto',
                'height': $height + 'px',
                'width': $width + 'px',
                'z-index': -1
            })
            .fromTo(bgSlider, .2, { autoAlpha: 0 }, { autoAlpha: 1 })
            .to(bgSlider, .7, { autoAlpha: 1, left: 0, top: 0, width: '100%', height: '100%' })
            ;
    }

}


function shareSocialIcon() {

    var socials_wrap = null;


    $('.socials-wrap').on('click', function () {
        socials_wrap = $(this);
        var socials = socials_wrap.find('.socials'),
            socials_text = socials_wrap.find('.socials-text'),
            socials_icon = socials_wrap.find('.socials-icon');
        if (socials.css('display') === 'none') {
            socials.css({
                'opacity': '1',
                'display': 'inline-block'
            });
            socials_text.css({
                'transform': 'translate(36px, -34px)'
            });
            socials_icon.css({
                'transform': 'translate(-150px) scale(1.09) ',

            });
            socials_icon.find('i').attr('class' , 'fa fa-times');

        } else {
            socials.css({
                'opacity': '',
                'display': ''
            });
            socials_text.css({
                'transform': ''
            });
            socials_icon.css({
                'transform': '',
                'opacity': '',

            });
            socials_icon.find('i').attr('class' , 'fa fa-share-alt');
        }
    });

}