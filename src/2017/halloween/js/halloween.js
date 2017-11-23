// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



;(function(){
    var resData ={
        "groups":[
            {
                "keys":"loading-bg_jpg,loading-slide_png,loading-title_png,floater_png",
                "name":"loading"
            },
            {
                "keys":"btn-glitch_png,btn-text_png,cake-bg2_jpg,cake-btn-disable_png,cake-btn_png,cake-text_png,care-bg_jpg,care-btn-glitch_png,care-btn_png,care-lighting-left_png,care-lighting-right_png,care-pump_png,ccd_png,glitch-care_png,glitch_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"btn-glitch_png",
                "type":"image",
                "url":"btn-glitch.png"
            },
            {
                "name":"btn-text_png",
                "type":"image",
                "url":"btn-text.png"
            },
            {
                "name":"cake-bg2_jpg",
                "type":"image",
                "url":"cake-bg2.jpg"
            },
            {
                "name":"cake-btn-disable_png",
                "type":"image",
                "url":"cake-btn-disable.png"
            },
            {
                "name":"cake-btn_png",
                "type":"image",
                "url":"cake-btn.png"
            },
            {
                "name":"cake-text_png",
                "type":"image",
                "url":"cake-text.png"
            },
            {
                "name":"care-bg_jpg",
                "type":"image",
                "url":"care-bg.jpg"
            },
            {
                "name":"care-btn-glitch_png",
                "type":"image",
                "url":"care-btn-glitch.png"
            },
            {
                "name":"care-btn_png",
                "type":"image",
                "url":"care-btn.png"
            },
            {
                "name":"care-lighting-left_png",
                "type":"image",
                "url":"care-lighting-left.png"
            },
            {
                "name":"care-lighting-right_png",
                "type":"image",
                "url":"care-lighting-right.png"
            },
            {
                "name":"care-pump_png",
                "type":"image",
                "url":"care-pump.png"
            },
            {
                "name":"ccd_png",
                "type":"image",
                "url":"ccd.png"
            },
            {
                "name":"glitch-care_png",
                "type":"image",
                "url":"glitch-care.png"
            },
            {
                "name":"glitch_png",
                "type":"image",
                "url":"glitch.png"
            },
            {
                "name":"loading-bg_jpg",
                "type":"image",
                "url":"loading-bg.jpg"
            },
            {
                "name":"loading-slide_png",
                "type":"image",
                "url":"loading-slide.png"
            },
            {
                "name":"loading-title_png",
                "type":"image",
                "url":"loading-title.png"
            },{
                "name":"floater_png",
                "type":"image",
                "url":"floater.png"
            }]
    };
    var McData = {
        floater: {
            mc:{
                floater: {
                    frameRate:10,
                    events:[],
                    frames: [
                        {res: 'floater1', duration:10},
                        {res: 'floater2', duration:1},
                        {res: 'floater3', duration:1},
                        {res: 'floater4', duration:1},
                        {res: 'floater5', duration:1},
                        {res: 'floater6'}
                    ]
                }
            },
            res:{
                "floater1":{"x":0,"y":0,"w":169,"h":151},
                "floater2":{"x":169,"y":0,"w":169,"h":151},
                "floater3":{"x":0,"y":151,"w":169,"h":151},
                "floater4":{"x":169,"y":151,"w":169,"h":151},
                "floater5":{"x":338,"y":0,"w":169,"h":151},
                "floater6":{"x":338,"y":151,"w":169,"h":151}
            }
        },
        loadingSlide : {
            mc:{
                loadingSlide: {
                    frameRate:24,
                    events: [],
                    frames: [{
                        "res":"2F0177F3",
                        "x":0,
                        "y":0,
                        "duration":4
                    },{
                        "res":"BC6666C7",
                        "x":0,
                        "y":0,
                        "duration":4
                    },{
                        "res":"53D58AF",
                        "x":0,
                        "y":0,
                        "duration":4
                    }]
                }
            },
            res:{
                '2F0177F3':{"x":0,"y":0,"w":496,"h":250},
                'BC6666C7':{"x":0,"y":252,"w":496,"h":250},
                '53D58AF':{"x":498,"y":0,"w":496,"h":250}
            }
        },
        cakemc: {"mc":{
            "cakemc":{
                "frameRate":10,
                "events":[

                ],
                "frames":[
                    {res: 'heart1', y:-50, duration:1}
                    // ,{res: 'heart2', y:-42, duration:1}
                    ,{res: 'heart3', y:-22, duration:1}
                    ,{res: 'heart4', y:197, duration:1}
                    ,{res: 'heart5', y:197, duration:1}
                    ,{res: 'ghost1', y:-25, duration:1}
                    ,{res: 'ghost3', y:43, duration:1}
                    ,{res: 'ghost4', y:197, duration:1}
                    ,{res: 'ghost5', y:197, duration:1}
                    ,{res: 'eye1', y:-29, duration:1}
                    ,{res: 'eye3', y:22, duration:1}
                    ,{res: 'eye4', y:197, duration:1}
                    ,{res: 'eye5', y:197, duration:1}
                    ,{res: 'pumpkin1', y:-34, duration:1}
                    ,{res: 'pumpkin3', y:-20, duration:1}
                    ,{res: 'pumpkin4', y:185, duration:1}
                    // ,{res: 'pumpkin5', y:185, duration:1}
                    // ,{res: 'pumpkin6', y:185, duration:1}
                    // ,{res: 'pumpkin7', y:185, duration:10}
                ]
            }},
            res: {
                eye1:{"x":1126,"y":0,"w":563,"h":522},
                eye2:{"x":563,"y":543,"w":563,"h":522},
                eye3:{"x":1126,"y":1070,"w":563,"h":471},
                eye4:{"x":1126,"y":1585,"w":563,"h":296},
                eye5:{"x":1689,"y":1585,"w":563,"h":296},
                ghost1:{"x":1126,"y":522,"w":563,"h":518},
                ghost3:{"x":1689,"y":0,"w":563,"h":450},
                ghost4:{"x":563,"y":1893,"w":563,"h":296},
                ghost5:{"x":0,"y":1893,"w":563,"h":296},
                heart1:{"x":0,"y":0,"w":563,"h":543},
                heart2:{"x":563,"y":0,"w":563,"h":535},
                heart3:{"x":0,"y":1070,"w":563,"h":515},
                heart4:{"x":1126,"y":1893,"w":563,"h":296},
                heart5:{"x":563,"y":1585,"w":563,"h":296},
                pumpkin1:{"x":0,"y":543,"w":563,"h":527},
                pumpkin3:{"x":563,"y":1070,"w":563,"h":513},
                pumpkin4:{"x":0,"y":1585,"w":563,"h":308},
                pumpkin5:{"x":1689,"y":1066,"w":563,"h":308},
                pumpkin6:{"x":1689,"y":758,"w":563,"h":308},
                pumpkin7:{"x":1689,"y":450,"w":563,"h":308}
            }
        }
    }
    var transitionEnd=(function(){
        var body=document.body || document.documentElement,
            style=body.style;
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }
        for(var name in transEndEventNames){
            if(typeof style[name] === "string"){
                return transEndEventNames[name]
            }
        }
        return '';
    })();
    function sliding(callback, duration){
        //替换setTimeout功能
        var starttime;
        function animate(timestamp){
            var runtime = timestamp - starttime;
            if(runtime<duration){
                requestAnimationFrame(function(timestamp){
                    animate(timestamp || new Date().getTime())
                })
            } else {
                callback();
            }
        }
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            animate(starttime);
        })
    }
    function getRandom(start, end, isInt){
        var rdm = Math.random()*(end-start)+start;
        return isInt === false ? rdm : parseInt(Math.random()*(end-start)+start);
    }
    function animateLighting(){
        var $lighting = $('.evt_care .lighting');
        var $lightingLeft = $lighting.find('.lighting-left');
        var $lightingRight = $lighting.find('.lighting-right');
        if(transitionEnd){
            $lightingLeft.on(transitionEnd, function(){
                $lightingRight.addClass('restore')
            })
        } else {
            $lightingRight.addClass('restore')
        }

        $lightingLeft.addClass('restore');

        // sliding(function(){
        //     $lighting.hide();
        //     sliding(function(){
        //         $lighting.show();
        //         sliding(function(){
        //             $lighting.hide();
        //             sliding(function(){
        //                 $lighting.show();
        //             }, 300)
        //         }, 100)
        //     }, 100)
        // }, 100);
    }

    function animateCake(){
        var $pumpContain = $('.care-contain');
        $pumpContain.animate({
            opacity: 1
        }, 1000, function(){

        })
        animateLighting();
    }
    function animatePump(){
        var $pump = $('.care-pump');
        function pumpLighting(ticks){
            $pump.toggleClass('light');
            if(ticks>0){
                sliding(function(){
                    pumpLighting(ticks-1);
                }, getRandom(50, 400))
            }
        }
        function pumpShinning(){
            pumpLighting(7);
            sliding(pumpShinning, getRandom(6000,10000))
        }
        sliding(pumpShinning, 1300)
    }
    function animateGlitch(){
        var $glitch = $('.evt_care .glitch');
        var $careGlitch = $('.evt_care .care-glitch');
        function glitchStep(ticks){
            for(var i=0; i<getRandom(0,ticks); i++){
                sliding(function(){
                    var css,dir;
                    dir=Math.random()<0.5?'horizontal':'vertical';
                    if(dir=='vertical'){
                        css = {top: getRandom(0, 40)}
                    } else {
                        css = {left: getRandom(0,30)}
                    }
                    $careGlitch.css(css);
                    $glitch.css({
                        'opacity': getRandom(0, 0.1, false),
                        'background-position': getRandom(0,600)+'px '+getRandom(0,600)+'px'
                    })
                }, getRandom(0, 400));
            }
            sliding(function(){
                $glitch.css('opacity',0);
                $careGlitch.css({
                    top:0,
                    left:0
                })
            }, 500);
            // $glitch.css({
            //     'background-position': getRandom(0,500)+'px '+getRandom(0,800)+'px',
            //     'opacity': getRandom(0.01, 0.1, false)
            // });
            // $careGlitch.css({
            //     'top':getRandom(0,40),
            //     'left':getRandom(0,30),
            //     opacity: 1
            // })
            // if(ticks>0){
            //     sliding(function(){
            //         glitchStep(ticks-1);
            //     }, 80)
            // } else {
            //     $glitch.css('opacity',0);
            //     $careGlitch.css({
            //         top:0,
            //         left:0
            //     });
            // }
        }
        function glitch(){
            glitchStep(100);
            sliding(glitch, getRandom(3000,3500))
        }
        sliding(glitch, 2000);
    }
    function animateBtn(){
        var $glitch = $('.evt_care .btn-glitch');
        var $btnGlitch=$('.evt_care .glitch-btn');
        function glitchStep(ticks){
            $glitch.css({
                'background-position': getRandom(0,100)+'px '+getRandom(0,100)+'px',
                'opacity': getRandom(0.05,0.1,false)
            });
            $btnGlitch.css({
                'top':getRandom(-20,20),
                'left':getRandom(-30,30),
                opacity: 1
            })
            if(ticks>0){
                sliding(function(){
                    glitchStep(ticks-1);
                }, 100)
            } else {
                $glitch.css('opacity',0);
                $btnGlitch.css('opacity', 0);
            }
        }
        function glitch(){
            glitchStep(4);
            sliding(glitch, getRandom(1000,15000))
        }
        sliding(glitch, 2000);
    }

    function startMovieClip(){
        // var imgSrc = [];
        // var frameSrc = McData.cakemc.mc.cakemc.frames;
        // for(var i=0, l=frameSrc.length; i<l; i++){
        //     imgSrc.push(frameSrc[i].src);
        // }
        var mc = new MovieClip(Resource.getRes('ccd_png'), McData.cakemc, 'cakemc', 'cakemc');
        mc.gotoAndPlay(1,1);
    }

    function start(){
        //小屏幕首屏露出按钮
        var winHeight = $(window).height() || 0;
        if(winHeight && winHeight<700){
            $('.evt_care').css({
                top: winHeight - 700
            });
            $('.evt_cake').css({
                top: winHeight - 700
            })
        }
        $('.evt_care').fadeIn(function(){
            $('.evt_loading').hide();
            animateCake();
            animatePump();
            animateGlitch();
            animateBtn();
        })
        $('.btn-glitch').on('click', function(){
            $('.evt_cake').fadeIn(function(){
                $('.evt_care').hide();
                //有横向滚动条
                $(this).css({
                    overflow: 'hidden',
                    height: $('.cake-contain').height()
                })
            })
            sliding(startMovieClip, 500)
        })
        // startMovieClip()
    }

    function loadResource(){
        var isLoadingAnimationEnd = false,
            isLoadingResourceEnd = false,
            loadingNumber = 0;
        var $progressText = $('.loading-load .text'),
            $progressBar = $('.loading-load .progress span');
        var loader = new Resource.loadGroup("preload", resData);
        function loadEnd(){
            if(isLoadingAnimationEnd && isLoadingResourceEnd){
                $progressText.html('100%');
                $progressBar.width('100%');
                start();
            }
        }
        function loadAnimation(){
            var percent = loadingNumber + '%';
            $progressText.html(percent);
            $progressBar.width(percent);
            loadingNumber+= 4;
            if(loadingNumber>95){
                isLoadingAnimationEnd = true;
                loadEnd()
            } else {
                sliding(loadAnimation, 80)
            }

        }
        loader.addEvent('complete', function(){
            isLoadingResourceEnd = true;
            loadEnd();
        });
        loadAnimation();
    }
    function initFloater(){
        var floater = new MovieClip(Resource.getRes('floater_png'), McData.floater, 'floater', 'floater');
        floater.gotoAndPlay(1);
        var $hover = $('.floaterHover');
        $('#floater').hover(function(){
            $hover.fadeIn();
        }, function(){
            $hover.hide();
        })
    }
    function loadLoading(){
        var loader = new Resource.loadGroup("loading", resData);
        loader.addEvent('complete', function(){
            Resource.el('#evt_loading').style.display = 'block';
            var mc = new MovieClip(Resource.getRes('loading-slide_png'), McData.loadingSlide, 'loadingSlide', 'loading-slide');
            mc.gotoAndPlay(1);
            initFloater();
            loadResource();
        })
    }
    loadLoading();
})()