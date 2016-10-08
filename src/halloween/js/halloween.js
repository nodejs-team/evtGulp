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
                "keys":"loading-bg_jpg,loading-title_png,loading-slide_png",
                "name":"loading"
            },
            {
                "keys":"btn-glitch_png,btn-text_png,care-bg_jpg,care-btn-glitch_png,care-btn_png,care-lighting_png,care-pump_png,glitch-care_png,glitch_png,cake-btn_png,cake-btn-disable_png,cake-text_png,cake-bg2_jpg,heart1_png,heart2_png,heart3_png,heart4_png,heart5_png,ghost1_png,ghost2_png,ghost3_png,ghost4_png,ghost5_png,eye1_png,eye2_png,eye3_png,eye4_png,eye5_png,pumpkin1_png,pumpkin2_png,pumpkin3_png,pumpkin4_png,pumpkin5_png,pumpkin6_png,pumpkin7_png",
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
                "name":"care-lighting_png",
                "type":"image",
                "url":"care-lighting.png"
            },
            {
                "name":"care-pump_png",
                "type":"image",
                "url":"care-pump.png"
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
            },
            {
                "name":"cake-text_png",
                "type":"image",
                "url":"cake-text.png"
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
                "name":"cake-bg2_jpg",
                "type":"image",
                "url":"cake-bg2.jpg"
            },
            {
                "name":"heart1_png",
                "type":"image",
                "url":"heart1.png"
            },
            {
                "name":"heart2_png",
                "type":"image",
                "url":"heart2.png"
            },
            {
                "name":"heart3_png",
                "type":"image",
                "url":"heart3.png"
            },
            {
                "name":"heart4_png",
                "type":"image",
                "url":"heart4.png"
            },
            {
                "name":"heart5_png",
                "type":"image",
                "url":"heart5.png"
            },
            {
                "name":"ghost1_png",
                "type":"image",
                "url":"ghost1.png"
            },
            {
                "name":"ghost2_png",
                "type":"image",
                "url":"ghost2.png"
            },
            {
                "name":"ghost3_png",
                "type":"image",
                "url":"ghost3.png"
            },
            {
                "name":"ghost4_png",
                "type":"image",
                "url":"ghost4.png"
            },
            {
                "name":"ghost5_png",
                "type":"image",
                "url":"ghost5.png"
            },
            {
                "name":"eye1_png",
                "type":"image",
                "url":"eye1.png"
            },
            {
                "name":"eye2_png",
                "type":"image",
                "url":"eye2.png"
            },
            {
                "name":"eye3_png",
                "type":"image",
                "url":"eye3.png"
            },
            {
                "name":"eye4_png",
                "type":"image",
                "url":"eye4.png"
            },
            {
                "name":"eye5_png",
                "type":"image",
                "url":"eye5.png"
            },
            {
                "name":"pumpkin1_png",
                "type":"image",
                "url":"pumpkin1.png"
            },
            {
                "name":"pumpkin2_png",
                "type":"image",
                "url":"pumpkin2.png"
            },
            {
                "name":"pumpkin3_png",
                "type":"image",
                "url":"pumpkin3.png"
            },
            {
                "name":"pumpkin4_png",
                "type":"image",
                "url":"pumpkin4.png"
            },
            {
                "name":"pumpkin5_png",
                "type":"image",
                "url":"pumpkin5.png"
            },
            {
                "name":"pumpkin6_png",
                "type":"image",
                "url":"pumpkin6.png"
            },
            {
                "name":"pumpkin7_png",
                "type":"image",
                "url":"pumpkin7.png"
            }]
    };
    var McData = {
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
                    {src: 'images/cake-cake.png', y:197, duration:20}
                    ,{src: 'images/heart1.png', y:-50, duration:1}
                    ,{src: 'images/heart2.png', y:-42, duration:1}
                    ,{src: 'images/heart3.png', y:-22, duration:1}
                    ,{src: 'images/heart4.png', y:197, duration:1}
                    ,{src: 'images/heart5.png', y:197, duration:10}
                    ,{src: 'images/ghost1.png', y:-25, duration:1}
                    // ,{src: 'images/ghost2.png', y:-19, duration:1}
                    ,{src: 'images/ghost3.png', y:43, duration:1}
                    ,{src: 'images/ghost4.png', y:197, duration:1}
                    ,{src: 'images/ghost5.png', y:197, duration:10}
                    ,{src: 'images/eye1.png', y:-29, duration:1}
                    // ,{src: 'images/eye2.png', y:-29, duration:1}
                    ,{src: 'images/eye3.png', y:22, duration:1}
                    ,{src: 'images/eye4.png', y:197, duration:1}
                    ,{src: 'images/eye5.png', y:197, duration:10}
                    ,{src: 'images/pumpkin1.png', y:-34, duration:1}
                    // ,{src: 'images/pumpkin2.png', y:-23, duration:1}
                    ,{src: 'images/pumpkin3.png', y:-20, duration:1}
                    ,{src: 'images/pumpkin4.png', y:185, duration:1}
                    ,{src: 'images/pumpkin5.png', y:185, duration:1}
                    ,{src: 'images/pumpkin6.png', y:185, duration:1}
                    ,{src: 'images/pumpkin7.png', y:185, duration:10}
                ]
            }}}
    }
    function sliding(callback, duration){
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
        var $lighting = $('.evt_care .lighting').show();
        sliding(function(){
            $lighting.hide();
            sliding(function(){
                $lighting.show();
                sliding(function(){
                    $lighting.hide();
                    sliding(function(){
                        $lighting.show();
                    }, 300)
                }, 100)
            }, 100)
        }, 100);
    }

    function animateCake(){
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
        var $pumpContain = $('.care-contain');
        if(!transitionEnd){
            $pumpContain.addClass('restore');
            sliding(animateLighting, 1000);
        } else {
            $pumpContain.on(transitionEnd, function(){
                animateLighting();
            }).addClass('restore');
        }
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
        sliding(pumpShinning, 1000)
    }
    function animateGlitch(){
        var $glitch = $('.evt_care .glitch');
        var $careGlitch = $('.evt_care .care-glitch');
        function glitchStep(ticks){
            $glitch.css({
                'background-position': getRandom(0,500)+'px '+getRandom(0,500)+'px',
                'opacity': getRandom(0.05, 0.2, false)
            });
            $careGlitch.css({
                'top':getRandom(-100,100),
                'left':getRandom(-100,100),
                opacity: 1
            })
            if(ticks>0){
                sliding(function(){
                    glitchStep(ticks-1);
                }, 100)
            } else {
                $glitch.css('opacity',0);
                $careGlitch.css('opacity', 0);
            }
        }
        function glitch(){
            glitchStep(4);
            sliding(glitch, getRandom(3000,3500))
        }
        sliding(glitch, 3500);
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
        var imgSrc = [];
        var frameSrc = McData.cakemc.mc.cakemc.frames;
        for(var i=0, l=frameSrc.length; i<l; i++){
            imgSrc.push(frameSrc[i].src);
        }
        var mc = new MovieClip(imgSrc, McData.cakemc, 'cakemc', 'cakemc');
        mc.gotoAndPlay(1,1);
    }

    function start(){
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
            })
            startMovieClip()
        })
        // startMovieClip()
    }

    function loadResource(){
        var nowTime = new Date().getTime();
        var limitLoadingDuration = 2000;
        var $progressText = $('.loading-load .text'),
            $progressBar = $('.loading-load .progress span');
        var loader = new Resource.loadGroup("preload", resData);
        loader.addEvent('progress', function(loaded, total){
            var percent = Math.floor(loaded/total*100*0.9)+'%';
            $progressText.html(percent);
            $progressBar.width(percent)
        });
        loader.addEvent('complete', function(){
            var loadingTime = new Date().getTime() - nowTime;
            if(loadingTime<limitLoadingDuration){
                setTimeout(function(){
                    $progressText.html('100%');
                    $progressBar.width('100%');
                    start();
                }, limitLoadingDuration-loadingTime);
            } else {
                $progressText.html('100%');
                $progressBar.width('100%');
                start();
            }

        });
    }
    function loadLoading(){
        var loader = new Resource.loadGroup("loading", resData);
        loader.addEvent('complete', function(){
            Resource.el('#evt_loading').style.display = 'block';
            var mc = new MovieClip(Resource.getRes('loading-slide_png'), McData.loadingSlide, 'loadingSlide', 'loading-slide');
            mc.gotoAndPlay(1);
            loadResource();
        })
    }
    loadLoading();
})()