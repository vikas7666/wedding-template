$(document).ready(function() {
    AOS.init();
    $("[data-youtube]").youtube_background();

    //enter site init
    $('.enter-btn').on('click', function() {
        $('.landing-wrapper').addClass('closed');
        $('.home-overlay').addClass('in');
        $(this).addClass('is-active');
        setTimeout(function() {
            $('.main-container').fadeIn();
            pageSlide();
            var t1 = new TimelineMax();
            t1.from('.intro-layout .f-left img', .4, {
                y: 50,
                opacity: 0,
                ease: Linear.easeIn
            }).from('.intro-layout .f-left h3', .4, {
                y: 50,
                opacity: 0,
                ease: Linear.easeIn
            }).from('.intro-layout .f-left p', .4, {
                y: 50,
                opacity: 0,
                ease: Linear.easeIn
            }).from('.intro-layout .s-left img', .4, {
                y: 50,
                opacity: 0,
                ease: Linear.easeIn
            }).from('.intro-layout .s-left h3', .4, {
                y: 50,
                opacity: 0,
                ease: Linear.easeIn
            })
        }, 600);
        $(this).after('<div class="close-btn"></div>');


    });
    $(document).on('click', '.close-btn', function(event) {
        $('.landing-wrapper').removeClass('closed');
        $('.main-container').fadeOut();
        pageSlide();
        $(this).remove();
        console.log('print');
        setTimeout(function() {
            $('.home-overlay').removeClass('in');
            $('.enter-btn').removeClass('is-active');
        }, 300);

    });

    pageSlide();

    function pageSlide() {
        $.scrollify({
            section: ".panel",
            easing: "swing",
            scrollbars: false,
            updateHash: false,
            before: function(i, panels) {

                var ref = panels[i].attr("data-section-name");

                $(".pagination .active").removeClass("active");

                $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
            },
            afterRender: function() {
                var pagination = "<ul class=\"pagination\">";
                var activeClass = "";
                $(".panel").each(function(i) {
                    activeClass = "";
                    if (i === $.scrollify.currentIndex()) {
                        activeClass = "active";
                    }
                    pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span><svg width='30' height='30'><circle cx='15' cy='15'r='11.5'></circle></svg></a></li>";
                });

                pagination += "</ul>";

                $(".main-container").append(pagination);
                /*

                Tip: The two click events below are the same:

                $(".pagination a").on("click",function() {
                  $.scrollify.move($(this).attr("href"));
                });

                */
                $(".pagination a").on("click", $.scrollify.move);
            }
        });
    }

    // init controller
    var scrollmagic = new ScrollMagic.Controller({
        addIndicators: false,
        globalSceneOptions: {
            //triggerHook: 'onEnter'
        }
    });
    var s1 = new ScrollMagic.Scene({
        // starting scene, when reaching this element
        triggerElement: ".about",
        duration: $(".about").outerHeight(),
        reverse: true,
    });
    s1.on("enter", function(event) {
        var t2 = new TimelineMax();
        console.log("Scene about entered.");
        t2.fromTo('.banner-content h2', 1, {
            y: 10,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            ease: Back.easeOut
        }).fromTo('.banner-content p', 1, {
            y: 10,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            ease: Back.easeOut
        })
    });
    var s2 = new ScrollMagic.Scene({
        // starting scene, when reaching this element
        triggerElement: ".desgin",
        duration: $(".desgin").outerHeight(),
        reverse: true,
    });
    s2.on("enter", function(event) {
        var t3 = new TimelineMax();
        console.log("Scene home entered.");
        t3.staggerFromTo('.desgin-wrap .col-lg-4', 2, {
            opacity: 0,
            yPercent: 50,
        }, {
            opacity: 1,
            yPercent: 0,
            ease: Elastic.easeOut.config(1, 0.75)
        }, 0.5);
    });
    // adding the scenes after some delay 
    setTimeout(function() {
        // Add Scene to ScrollMagic Controller
        scrollmagic.addScene([
            s1, s2
        ]);
    }, 100);

    $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
    });
});
$(window).on('load', function() {
    $('.loader').fadeOut();
    TweenMax.set('.banner-content h2, .banner-content p , .desgin-wrap .col-lg-4', {
        css: {
            opacity: 0,
        }
    });
})