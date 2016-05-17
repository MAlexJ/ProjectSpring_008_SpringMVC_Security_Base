jQuery(document).ready(function ($) {


    var secondaryNav = $('.cd-secondary-nav'),
        secondaryNavTopPosition = secondaryNav.offset().top,
        taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
        contentSections = $('.cd-section');

    $(window).on('scroll', function () {
        //on desktop - assign a position fixed to logo and action button and move them outside the viewport
        ( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');

        //on desktop - fix secondary navigation on scrolling
        if ($(window).scrollTop() > secondaryNavTopPosition) {
            //fix secondary navigation
            secondaryNav.addClass('is-fixed');
            //push the .cd-main-content giving it a top-margin
            $('.cd-main-content').addClass('has-top-margin');
            //on Firefox CSS transition/animation fails when parent element changes position attribute
            //so we to change secondary navigation childrens attributes after having changed its position value
            setTimeout(function () {
                secondaryNav.addClass('animate-children');
                $('#cd-logo').addClass('slide-in');
                $('.cd-btn').addClass('slide-in');
            }, 50);
        } else {
            secondaryNav.removeClass('is-fixed');
            $('.cd-main-content').removeClass('has-top-margin');
            setTimeout(function () {
                secondaryNav.removeClass('animate-children');
                $('#cd-logo').removeClass('slide-in');
                $('.cd-btn').removeClass('slide-in');
            }, 50);
        }

        //on desktop - update the active link in the secondary fixed navigation
        updateSecondaryNavigation();
    });

    function updateSecondaryNavigation() {
        contentSections.each(function () {
            var actual = $(this),
                actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
                actualAnchor = secondaryNav.find('a[href="#' + actual.attr('id') + '"]');
            if (( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top + actualHeight - secondaryNav.height() > $(window).scrollTop() )) {
                actualAnchor.addClass('active');
            } else {
                actualAnchor.removeClass('active');
            }
        });
    }

    //on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
    $('.cd-secondary-nav-trigger').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('menu-is-open');
        secondaryNav.find('ul').toggleClass('is-visible');
    });

    //smooth scrolling when clicking on the secondary navigation items
    secondaryNav.find('ul a').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('body,html').animate({
                'scrollTop': target.offset().top - secondaryNav.height() + 1
            }, 400
        );
        //on mobile - close secondary navigation
        $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
        secondaryNav.find('ul').removeClass('is-visible');
    });

    //on mobile - open/close primary navigation clicking/tapping the menu icon
    $('.cd-primary-nav').on('click', function (event) {
        if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
    });

    //open popup
    $('.cd-login').on('click', function (event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }

        if ($(event.target).is('.cd-close') || $(event.target).is('.cd-popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });


    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });

    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formForgotPassword = formModal.find('#cd-reset-password'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
        mainNav = $('.main-nav');

    //open modal
    mainNav.on('click', function(event){
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    //open sign-up form
    mainNav.on('click', '.cd-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.cd-signin', login_selected);

    //close modal
    formModal.on('click', function(event){
        if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function(){
        var togglePass= $(this),
            passwordField = togglePass.prev('input');

        ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form
    forgotPasswordLink.on('click', function(event){
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function(event){
        event.preventDefault();
        login_selected();
    });

    function login_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected(){
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages
    formLogin.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if(!Modernizr.input.placeholder){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

    var tabs = $('.cd-tabs');

    tabs.each(function(){
        var tab = $(this),
            tabItems = tab.find('ul.cd-tabs-navigation'),
            tabContentWrapper = tab.children('ul.cd-tabs-content'),
            tabNavigation = tab.find('nav');

        tabItems.on('click', 'a', function(event){
            event.preventDefault();
            var selectedItem = $(this);
            if( !selectedItem.hasClass('selected') ) {
                var selectedTab = selectedItem.data('content'),
                    selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
                    slectedContentHeight = selectedContent.innerHeight();

                tabItems.find('a.selected').removeClass('selected');
                selectedItem.addClass('selected');
                selectedContent.addClass('selected').siblings('li').removeClass('selected');
                //animate tabContentWrapper height when content changes
                tabContentWrapper.animate({
                    'height': slectedContentHeight
                }, 200);
            }
        });

        //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
        checkScrolling(tabNavigation);
        tabNavigation.on('scroll', function(){
            checkScrolling($(this));
        });
    });

    $(window).on('resize', function(){
        tabs.each(function(){
            var tab = $(this);
            checkScrolling(tab.find('nav'));
            tab.find('.cd-tabs-content').css('height', 'auto');
        });
    });

    function checkScrolling(tabs){
        var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
            tabsViewport = parseInt(tabs.width());
        if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
            tabs.parent('.cd-tabs').addClass('is-ended');
        } else {
            tabs.parent('.cd-tabs').removeClass('is-ended');
        }
    }

//update these values if you change these breakpoints in the style.css file (or _layout.scss if you use SASS)
    var MqM= 768,
        MqL = 1024;

    var faqsSections = $('.cd-faq-group'),
        faqTrigger = $('.cd-faq-trigger'),
        faqsContainer = $('.cd-faq-items'),
        faqsCategoriesContainer = $('.cd-faq-categories'),
        faqsCategories = faqsCategoriesContainer.find('a'),
        closeFaqsContainer = $('.cd-close-panel');

    //select a faq section
    faqsCategories.on('click', function(event){
        event.preventDefault();
        var selectedHref = $(this).attr('href'),
            target= $(selectedHref);
        if( $(window).width() < MqM) {
            faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
            closeFaqsContainer.addClass('move-left');
            $('body').addClass('cd-overlay');
        } else {
            $('body,html').animate({ 'scrollTop': target.offset().top - 80}, 200);
        }
    });

    //close faq lateral panel - mobile only
    $('body').bind('click touchstart', function(event){
        if( $(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) {
            closePanel(event);
        }
    });
    faqsContainer.on('swiperight', function(event){
        closePanel(event);
    });

    //show faq content clicking on faqTrigger
    faqTrigger.on('click', function(event){
        event.preventDefault();
        $(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
    });

    //update category sidebar while scrolling
    $(window).on('scroll', function(){
        if ( $(window).width() > MqL ) {
            (!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
        }
    });

    $(window).on('resize', function(){
        if($(window).width() <= MqL) {
            faqsCategoriesContainer.removeClass('is-fixed').css({
                '-moz-transform': 'translateY(0)',
                '-webkit-transform': 'translateY(0)',
                '-ms-transform': 'translateY(0)',
                '-o-transform': 'translateY(0)',
                'transform': 'translateY(0)',
            });
        }
        if( faqsCategoriesContainer.hasClass('is-fixed') ) {
            faqsCategoriesContainer.css({
                'left': faqsContainer.offset().left,
            });
        }
    });

    function closePanel(e) {
        e.preventDefault();
        faqsContainer.removeClass('slide-in').find('li').show();
        closeFaqsContainer.removeClass('move-left');
        $('body').removeClass('cd-overlay');
    }

    function updateCategory(){
        updateCategoryPosition();
        updateSelectedCategory();
    }

    function updateCategoryPosition() {
        var top = $('.cd-faq').offset().top,
            height = jQuery('.cd-faq').height() - jQuery('.cd-faq-categories').height(),
            margin = 80;
        if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {
            var leftValue = faqsCategoriesContainer.offset().left,
                widthValue = faqsCategoriesContainer.width();
            faqsCategoriesContainer.addClass('is-fixed').css({
                'left': leftValue,
                'top': margin,
                '-moz-transform': 'translateZ(0)',
                '-webkit-transform': 'translateZ(0)',
                '-ms-transform': 'translateZ(0)',
                '-o-transform': 'translateZ(0)',
                'transform': 'translateZ(0)',
            });
        } else if( top - margin + height <= $(window).scrollTop()) {
            var delta = top - margin + height - $(window).scrollTop();
            faqsCategoriesContainer.css({
                '-moz-transform': 'translateZ(0) translateY('+delta+'px)',
                '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
                '-ms-transform': 'translateZ(0) translateY('+delta+'px)',
                '-o-transform': 'translateZ(0) translateY('+delta+'px)',
                'transform': 'translateZ(0) translateY('+delta+'px)',
            });
        } else {
            faqsCategoriesContainer.removeClass('is-fixed').css({
                'left': 0,
                'top': 0
            });
        }
    }

    function updateSelectedCategory() {
        faqsSections.each(function(){
            var actual = $(this),
                margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
                activeCategory = $('.cd-faq-categories a[href="#'+actual.attr('id')+'"]'),
                topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);

            if ( ( topSection - 300 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 100 > $(window).scrollTop() ) ) {
                activeCategory.addClass('selected');
            }else {
                activeCategory.removeClass('selected');
            }
        });
    }

});

jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};