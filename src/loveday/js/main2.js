;(function(){
    var $win = $(window)
        ,$header = $('.header')
        ,$container = $('#evt_container')
        ,$sec1 = $('.sec1')
        ,$sec2 = $('.sec2')
        ,sec1Top=0,sec2Top=800
        ,containerWidth
        ,containerHeight
        ,scale
    function initDomByScreenHeight(){
        var headerHeight = $header.height(),
            winWidth = $win.width(),
            winHeight = $win.height(),
            viewHeight = winHeight - headerHeight;
        containerWidth = winWidth>1920 ? 1920 : (winWidth>1280 ? winWidth : 1280);
        containerHeight = viewHeight>840 ? 840 : (viewHeight>500 ? viewHeight : 500);
        scale = containerHeight / 840;
        $container.css({
            width: containerWidth,
            height: containerHeight
        });
        $sec2.css({
            top:sec2Top
        })
    }
    function initMouseWheel(){
        $(window).on('mousewheel', function(ev){
            sec1Top += ev.deltaY*0.3;
            sec2Top += ev.deltaY;
            if(sec1Top<0 && sec2Top>containerHeight-840){
                $sec1.css('top', sec1Top);
                $sec2.css('top', sec2Top)
            }else {
                sec1Top -= ev.deltaY*0.3;
                sec2Top -= ev.deltaY;
            }
        })
    }

    function initRule(){
        $('.rtitle').on('click', function(){
            $('.rule').toggle();
        })
    }

    function resourceLoadComplete(){
        $('.flower').parallax();
        initRule();
        initMouseWheel();
    }

    function loadResource(){
        resourceLoadComplete();
    }

    function preloadComplete(){
        loadResource();
    }
    initDomByScreenHeight();
    preloadComplete();
})()