/**
 * Created by mcake on 2016/5/23.
 */
+function(window, $, undefined){

    var Gemini = {
        currentSection: null,
        currentIndex: 0,
        windowSize: {},
        lastIndex: 0,
        init: function( options ){

            var DEFAULTS = {
                speed: 800,
                scrollHandler: $.noop,
                viewHelper: $.noop,
                scrollLeave: $.noop,
                scrollEnter: $.noop
            };

            this.options = $.extend(DEFAULTS, options||{});
            this.isScrolling = false;
            this.headerH = 100;

            this.container = $('#page_container');
            this.sections = this.container.find(".section");
            this.scrollView = this.container.find('.page-scrollview');
            this.scroller = this.container.find(".page-scroller");
            this.points = this.container.find('.section-points');

            this.setLayout();
            this.setSkrollr();
            this.createNavbar();
            setTimeout($.proxy(function(){
                this.activeNavbar(this.currentIndex);
            }, this), 100);
            this.initEvents();

            if( document.all && /MSIE (6|7|8)/.test(navigator.userAgent) ){
                this.setOffsetForIE();
            }
        },
        setLayout: function(){
            var windowSize = this.windowSize = this.getWindowSize();
            this.sections.height(windowSize.height);
            this.scrollView.height(windowSize.height*this.sections.length);
            this.scroller.attr('data-end', "top: " + (-windowSize.height*(this.sections.length-1)) + "px");
            this.setScrollTop(this.currentIndex*windowSize.height);
            this.options.viewHelper.call(this, windowSize);
            this.skrollr && this.skrollr.refresh();
        },
        setScrollTop: function( scrollTop ){
            var DOC = document,
                BD = DOC.body,
                DE = DOC.documentElement;

            BD.scrollTop = scrollTop;
            DE.scrollTop = scrollTop;
        },
        getIndexByScrollTop: function(){
            var windowSize = this.getWindowSize();
            return Math.floor(windowSize.scrollTop/windowSize.height);
        },
        getWindowSize: function(){
            var DOC = document,
                BD = DOC.body,
                DE = DOC.documentElement;

            return {
                scrollTop: window.pageYOffset || BD.scrollTop || DE.scrollTop,
                width: window.innerWidth || DE.clientWidth || BD.clientWidth,
                height: (window.innerHeight || DE.clientHeight || BD.clientHeight) - this.headerH
            }
        },
        setSkrollr: function(){
           this.skrollr = skrollr.init({
                forceHeight: false,
                smoothScrolling: true,
                //smoothScrollingDuration: 400,
                render: function(data) {
                    //Log the current scroll position.
                    //console.log(data.curTop);
                }
            });
        },
        setOffsetForIE: function(){
            var elems = this.container.find('[data-offset]');
            var setOffset = function(){
                elems.each(function(){
                    var offset = this.getAttribute('data-offset').split(":");
                    this.style.marginLeft = this.offsetWidth*(parseFloat(offset[0])/100) + (offset[1] ? parseFloat(offset[1]) : 0) + "px";
                });
            };

            $(window).on('resize', setOffset);
            setOffset();
        },
        makeScroll: function(scrollTop, endCall){
            var self = this;
            $('html,body').animate({
                scrollTop: scrollTop
            }, this.options.speed, function(){
                endCall.call(self);
            });
        },
        activeSection: function( index ){
            if( this.currentSection ){
                this.currentSection.removeClass("current");
                this.options.scrollLeave.call(this, this.currentSection);
            }
            this.currentSection = this.sections.eq(index).addClass("current");
            this.options.scrollEnter.call(this, this.currentSection);
        },
        createNavbar: function(){
            for(var i=0; i<this.sections.length; i++){
                this.points.append('<li/>');
            }
        },
        activeNavbar: function( index ){
            this.points.find("li").eq( index ).addClass("active").siblings().removeClass("active");
        },
        scrollTo: function( index, endCall ){
            var $target = this.sections.eq(index);
            this.isScrolling = true;
            this.currentIndex = index;
            this.activeNavbar( index );
            this.makeScroll($target.offset().top - 100, function(){
                this.isScrolling = false;
                this.activeSection( index );
                endCall && endCall.call( this );
            });
            this.options.scrollHandler.call( this, index );
        },
        _eventHandler: function(e){
            e.preventDefault();

            var data;

            if( e.type == "keyup" ){
                if( e.which == 35 )
                    return this.scrollTo( this.sections.length - 1 );

                if( e.which == 36 )
                    return this.scrollTo( 0 );

                if( e.which == 38 || e.which == 40 || e.which == 33 || e.which == 34 )
                    data = (e.which == 38 || e.which == 33) ? 1 : -1;
            } else {
                data = e.deltaY;
            }

            if( !data || this.isScrolling )
                return;

            if( data < 0 ){
                if( ++this.currentIndex > this.sections.length - 1){
                    this.currentIndex = this.sections.length - 1;
                    return;
                }
            } else {
                if( this.lastIndex == this.currentIndex ){
                    this.currentIndex--;
                }
                if( this.currentIndex < 0 ){
                    this.currentIndex = 0;
                    return;
                }
            }

            this.scrollTo( this.currentIndex );
            this.lastIndex = this.currentIndex;
        },
        initEvents: function(){
            var $win = $(window),
                $doc = $(document),
                restimer;

            $win.on('resize', $.proxy(function(){
                if( restimer ) clearTimeout(restimer);
                restimer = setTimeout($.proxy(this, 'setLayout'), 100);
            }, this));

            $win.on('scroll', $.proxy(function(e){
                this.currentIndex = this.getIndexByScrollTop();
                this.activeNavbar(this.currentIndex);
            }, this));

            $doc.on('mousewheel', $.proxy(this, '_eventHandler'));
            $doc.on('keyup', $.proxy(this, '_eventHandler'));
            this.points.on('click', 'li', $.proxy(function(e){
                this.scrollTo($(e.target).index());
            }, this));
        }
    };

    $(function(){
        Gemini.init();
    });
}(window, jQuery);