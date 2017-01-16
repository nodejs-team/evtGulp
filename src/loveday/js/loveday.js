;(function(){
    var resData = {
        "groups":[
            {
                "keys":"loading-bg-left_jpg,loading-bg-right_jpg,title_png",
                "name":"pre"
            },
            {
                "keys":"price_png,product_png,text1_png,text2_png,buybtn-disable_png,buybtn_png,content-bg_jpg,f1_png,f2_png,f3_png,f4_png,f5_png,f6_png,f7_png,f8_png,f9_png,f10_png,f11_png,f12_png,icon_png,img1_png,img2_png",
                "name":"res"
            }],
        "resources":[
            {
                "name":"buybtn-disable_png",
                "type":"image",
                "url":"lv2/buybtn-disable.png"
            },
            {
                "name":"buybtn_png",
                "type":"image",
                "url":"lv2/buybtn.png"
            },
            {
                "name":"content-bg_jpg",
                "type":"image",
                "url":"lv2/content-bg.jpg"
            },
            {
                "name":"f1_png",
                "type":"image",
                "url":"lv2/f1.png"
            },
            {
                "name":"f2_png",
                "type":"image",
                "url":"lv2/f2.png"
            },
            {
                "name":"f3_png",
                "type":"image",
                "url":"lv2/f3.png"
            },
            {
                "name":"f4_png",
                "type":"image",
                "url":"lv2/f4.png"
            },
            {
                "name":"f5_png",
                "type":"image",
                "url":"lv2/f5.png"
            },
            {
                "name":"f6_png",
                "type":"image",
                "url":"lv2/f6.png"
            },
            {
                "name":"f7_png",
                "type":"image",
                "url":"lv2/f7.png"
            },
            {
                "name":"f8_png",
                "type":"image",
                "url":"lv2/f8.png"
            },
            {
                "name":"f9_png",
                "type":"image",
                "url":"lv2/f9.png"
            },
            {
                "name":"f10_png",
                "type":"image",
                "url":"lv2/f10.png"
            },
            {
                "name":"f11_png",
                "type":"image",
                "url":"lv2/f11.png"
            },
            {
                "name":"f12_png",
                "type":"image",
                "url":"lv2/f12.png"
            },
            {
                "name":"icon_png",
                "type":"image",
                "url":"lv2/icon.png"
            },
            {
                "name":"img1_png",
                "type":"image",
                "url":"lv2/img1.png"
            },
            {
                "name":"img2_png",
                "type":"image",
                "url":"lv2/img2.png"
            },
            {
                "name":"loading-bg-left_jpg",
                "type":"image",
                "url":"lv2/loading-bg-left.jpg"
            },
            {
                "name":"loading-bg-right_jpg",
                "type":"image",
                "url":"lv2/loading-bg-right.jpg"
            },
            {
                "name":"price_png",
                "type":"image",
                "url":"lv2/price.png"
            },
            {
                "name":"product_png",
                "type":"image",
                "url":"lv2/product.png"
            },
            {
                "name":"text1_png",
                "type":"image",
                "url":"lv2/text1.png"
            },
            {
                "name":"text2_png",
                "type":"image",
                "url":"lv2/text2.png"
            },
            {
                "name":"title_png",
                "type":"image",
                "url":"lv2/title.png"
            }]
    }
    var $win = $(window)
        ,$header = $('.header')
        ,$container = $('#evt_container')
        ,$sec1 = $('.sec1')
        ,$sec2 = $('.sec2')
        ,sec1Top=0,sec2Top=840
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
        });
        $('#blankdiv').css({
            height: viewHeight>840 ? (840*2+viewHeight-840) : (840*2)
        })
    }
    function initScroll(){
        $win.on('scroll', function(ev){
            var sTop = $win.scrollTop();
            sec1Top = -sTop * 0.3;
            sec2Top = 840-sTop;
            $sec1.css('top', sec1Top);
            $sec2.css('top', sec2Top)
        })
        // $(window).on('mousewheel', function(ev){
        //     sec1Top += ev.deltaY*0.3;
        //     sec2Top += ev.deltaY;
        //     if(sec1Top<0 && sec2Top>containerHeight-840){
        //         $sec1.css('top', sec1Top);
        //         $sec2.css('top', sec2Top)
        //     }else {
        //         sec1Top -= ev.deltaY*0.3;
        //         sec2Top -= ev.deltaY;
        //     }
        // })
    }

    function initRule(){
        $('.rtitle').on('click', function(){
            $('.rule').toggle();
        })
    }

    function animateLoading(){
        $('#evt_loading .title').fadeOut();
        $('#evt_spin').fadeOut(function(){
            $('#evt_loading .bg-left').animate({
                right: '100%'
            }, 500)
            $('#evt_loading .bg-right').animate({
                left: '100%'
            }, 500, function(){
                $('#evt_loading').hide();
            })
        })
    }

    function loadRes(){
        var loader = new Resource.loadGroup("res", resData);
        var spin = Resource.el('#evt_spin');
        loader.on("progress", function (loaded, total) {
            spin.innerHTML = Math.floor(loaded / total * 100) + "%";
        });
        loader.on("complete", function(){
            $('#blankdiv').show();
            $('#evt_content').show();
            $('.flower').parallax();
            initRule();
            initScroll();
            animateLoading()
        });
    }

    function loadPre(){
        var loader = new Resource.loadGroup("pre", resData);

        loader.on("complete", function(){
            loadRes();
        });
    }
    initDomByScreenHeight();
    loadPre();
})()