/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"logo_dp_png,logo_in_png,nuts_png,nuts_arrow_png,nuts_cake_png,nuts_text_png,papa_png,picture_png,bulaji_png,bulaji_arrow_png,bulaji_text_png,cake2_arrow_png,cake2_info_png,cake-hint_png,chocolate_png,chocolate_arrow_png,chocolate_text_png,fly_papa_png,mango_png,mango_text_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"logo_dp_png",
                "type":"image",
                "url":"logo_dp.png"
            },
            {
                "name":"logo_in_png",
                "type":"image",
                "url":"logo_in.png"
            },
            {
                "name":"nuts_png",
                "type":"image",
                "url":"nuts.png"
            },
            {
                "name":"nuts_arrow_png",
                "type":"image",
                "url":"nuts_arrow.png"
            },
            {
                "name":"nuts_cake_png",
                "type":"image",
                "url":"nuts_cake.png"
            },
            {
                "name":"nuts_text_png",
                "type":"image",
                "url":"nuts_text.png"
            },
            {
                "name":"papa_png",
                "type":"image",
                "url":"papa.png"
            },
            {
                "name":"picture_png",
                "type":"image",
                "url":"picture.png"
            },
            {
                "name":"bulaji_png",
                "type":"image",
                "url":"bulaji.png"
            },
            {
                "name":"bulaji_arrow_png",
                "type":"image",
                "url":"bulaji_arrow.png"
            },
            {
                "name":"bulaji_text_png",
                "type":"image",
                "url":"bulaji_text.png"
            },
            {
                "name":"cake2_arrow_png",
                "type":"image",
                "url":"cake2_arrow.png"
            },
            {
                "name":"cake2_info_png",
                "type":"image",
                "url":"cake2_info.png"
            },
            {
                "name":"cake-hint_png",
                "type":"image",
                "url":"cake-hint.png"
            },
            {
                "name":"chocolate_png",
                "type":"image",
                "url":"chocolate.png"
            },
            {
                "name":"chocolate_arrow_png",
                "type":"image",
                "url":"chocolate_arrow.png"
            },
            {
                "name":"chocolate_text_png",
                "type":"image",
                "url":"chocolate_text.png"
            },
            {
                "name":"fly_papa_png",
                "type":"image",
                "url":"fly_papa.png"
            },
            {
                "name":"mango_png",
                "type":"image",
                "url":"mango.png"
            },
            {
                "name":"mango_text_png",
                "type":"image",
                "url":"mango_text.png"
            }]
    };

    var papaMcData = {"mc":{
        "papa":{
            "frameRate":24,
            "events":[

            ],
            "frames":[

                {
                    "res":"691FAFCB",
                    "x":2,
                    "y":2,
                    "duration":5
                },
                {
                    "res":"AEABFFB5",
                    "x":2,
                    "y":2,
                    "duration":5
                },
                {
                    "res":"3C3F9366",
                    "x":2,
                    "y":2,
                    "duration":5
                }
            ]
        }},
        "res":{
            "3C3F9366":{"x":0,"y":0,"w":674,"h":355},
            "691FAFCB":{"x":0,"y":357,"w":674,"h":355},
            "AEABFFB5":{"x":676,"y":0,"w":674,"h":355}
        }};

    var setAnimate = function(el, hasDelay){
        var anim = el.getAttribute('data-anim');
        var delay = Number(el.getAttribute('data-delay')||0)*1000;
        var delayAdjust = Number(el.getAttribute('data-delay-adjust')||0)*1000;
        var chain = el.getAttribute('data-chain');

        delay = hasDelay ? delay : 0;
        delay += delayAdjust;

        var chainHandle = function(){
            setAnimate($(chain).get(0));
            el.removeEventListener('webkitAnimationEnd', chainHandle, false);
            el.removeEventListener('animationend', chainHandle, false);
        };

        el.className = [el.className, anim].join(" ");
        el.style['-webkit-animation-delay'] = delay + "ms";
        el.style['animationDelay'] = delay + "ms";
        if( chain ) {
            el.addEventListener('webkitAnimationEnd', chainHandle, false);
            el.addEventListener('animationend', chainHandle, false);
        }
    };

    var setAllAnimate = function(container){
        $(container).find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    var setPapaMC = function(){
        var mc = new MovieClip(Resource.getRes('papa_png'), papaMcData, 'papa', 'super_papa');
        mc.gotoAndPlay(1, -1);
        return mc;
    };

    var bindScroll = function( container ){

        var checkOffset = 50;
        var $win = $(window);
        var winHeight = $win.height();
        var initScrollTop = $win.scrollTop();
        var elems = $(container).find('[data-anim]');
        var elemObj = [];

        elems.each(function(){
            elemObj.push({
                $elem: $(this),
                anim: this.getAttribute('data-anim'),
                scrollTop: $(this).offset().top,
                isAnimated: false
            });
        });

        $win.on('scroll', function(){
                var scrollTop = $win.scrollTop();
                var docHeight = document.documentElement.clientHeight;

                $.each(elemObj, function(i, obj){
                    if( !obj.isAnimated ) {
                        if( obj.$elem[0].getAttribute('data-ignore') ){
                            obj.isAnimated = true;
                            return;
                        }
                        if (scrollTop + docHeight - checkOffset > obj.scrollTop + initScrollTop) {
                            setAnimate(obj.$elem[0], obj.scrollTop < winHeight - checkOffset);
                            obj.isAnimated = true;
                        }
                    }
                });
            })
            .trigger('scroll');
    };

    var bindLayer = function(){
        $('#cake_info').on('touchend', function(){
            $('#cake_layer').show().one('touchstart', function(e){
                e.preventDefault();
                this.style.display = 'none';
            });
        });
    };

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            setPapaMC();
            bindLayer();
            bindScroll('#evt_container');
        };
        var loader = new Resource.loadGroup("preload", resData);
        var spin = Resource.el('#evt_spin');

        loader.addEvent("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.addEvent("complete", loadComplete);
    };

    $(function(){
        loadResource();
    });

})(jQuery);