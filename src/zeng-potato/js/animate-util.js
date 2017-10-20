(function(window, $, undefined){
  Function.prototype.bind = Function.prototype.bind || function(){
      var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
      return function(){
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
      }
    };

  $.extend($.easing, {
    easeInCubic:function(e,f,a,h,g){
      return h*(f/=g)*f*f+a;
    },
    easeOutCubic: function(e,f,a,h,g){
      return h*((f=f/g-1)*f*f+1)+a;
    }
  });

  var isOldIE = !!!window.getComputedStyle;

  function getNoneStaticNodes(el) {
    var stacks = [];
    if( isOldIE ){
      var els = el.getElementsByTagName("*");
      for(var i=0; i<els.length; i++){
        if( els[i].currentStyle['position'] != 'static' ){
          stacks.push([els[i], els[i].currentStyle['filter']||null]);
        }
      }
    }

    return stacks;
  }

  function setNoneStaticNodesOpacity(stacks, opacity) {
    for(var i = 0; i < stacks.length; i++){
      stacks[i][0].style.filter = "alpha(opacity= " + opacity * 100 + ")";
    }
  }

  function removeNoneStaticNodesOpacity(stacks, extraEl) {
    if( extraEl && isOldIE ){
      stacks.unshift([extraEl, extraEl.currentStyle['filter']||null]);
    }
    for(var i = 0; i < stacks.length; i++){
      if( !stacks[i][1] || /alpha\(opacity=\d+\)/.test(stacks[i][1]) ) {
        stacks[i][0].style.filter = "none";
      }
    }
  }

  var jqAnimateMap = {
    "slide-left": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: el.offsetWidth*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-right": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: -el.offsetWidth*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-down-l": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: -el.offsetWidth*0.3,
        marginTop: -el.offsetHeight*0.8
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-down-r": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: el.offsetWidth*0.15,
        marginTop: -el.offsetHeight*0.8
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-up-l": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: -el.offsetWidth*0.5,
        marginTop: el.offsetHeight*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-up-r": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginLeft: el.offsetWidth*0.5,
        marginTop: el.offsetHeight*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginLeft: 0,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-up": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginTop: el.offsetHeight*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "slide-down": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0,
        marginTop: -el.offsetHeight*0.5
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1,
          marginTop: 0
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);

    },
    "fade-in": function(el, delay, duration, cb){
      var $el = $(el);
      var addons = getNoneStaticNodes(el);
      setNoneStaticNodesOpacity(addons, 0);

      $el.css({
        opacity: 0
      });

      setTimeout(function(){
        $el.animate({
          opacity: 1
        }, {
          duration: duration,
          easing: 'easeOutCubic',
          complete: function(){
            removeNoneStaticNodesOpacity(addons, this);
            cb && cb.apply(this, arguments);
          },
          step: function (value, props) {
            if( props.prop == 'opacity' ){
              setNoneStaticNodesOpacity(addons, props.now);
            }
          }
        });
      }, delay);
    }
  };

  var isSupportCss3 = (function(){
    var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
    if( !ret || ret[1] > 9 ){
      return true;
    }
    return false;
  })();

  var setAnimate = function(el, hasDelay){
    var anim = el.getAttribute('data-anim');
    var delay = Number(el.getAttribute('data-delay')||0)*1000;
    var delayAdjust = Number(el.getAttribute('data-delay-adjust')||0)*1000;
    var chain = el.getAttribute('data-chain');
    var duration = parseInt(el.getAttribute('data-duration'));

    delay = hasDelay ? delay : 0;
    delay += delayAdjust;

    if( isSupportCss3 ){
      function chainHandle(){
        var $this = $(this);
        $this.trigger.apply($this, ["animatedone"].concat([].slice.call(arguments)));
        if( chain ) {
          $(chain).each(function () {
            setAnimate(this, true);
          });
        }

        el.removeEventListener('webkitAnimationEnd', chainHandle, false);
        el.removeEventListener('animationend', chainHandle, false);
      }

      el.className = [el.className, anim].join(" ");
      el.style['-webkit-animation-delay'] = delay + "ms";
      el.style['animationDelay'] = delay + "ms";
      if( duration ){
        el.style['-webkit-animation-duration'] = duration + "ms";
        el.style['animationDuration'] = duration + "ms";
      }

      el.addEventListener('webkitAnimationEnd', chainHandle, false);
      el.addEventListener('animationend', chainHandle, false);

    } else {
      duration = duration || 1000;
      (jqAnimateMap[anim] || jqAnimateMap['fade-in']).call(el, el, delay, duration, function(){
        var $this = $(this);
        $this.trigger.apply($this, ["animatedone"].concat([].slice.call(arguments)));
        if( chain ) {
          $(chain).each(function(){
            setAnimate(this, true);
          });
        }
      });
    }
  };

  var setAllAnimate = function(container){
    $(container).find("[data-anim]").each(function(){
      setAnimate(this);
    });
  };

  var bindScroll = function( container ){

    var $win = $(window);
    var winHeight = $win.height();
    var elems = $(container).find('[data-anim]');
    var elemObj = [];

    elems.each(function(){
      elemObj.push({
        $elem: $(this),
        anim: this.getAttribute('data-anim'),
        scrollTop: $(this).offset().top,
        checkOffset: Number(this.getAttribute('data-offset')),
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
          if (scrollTop + docHeight - obj.checkOffset > obj.scrollTop) {
            setAnimate(obj.$elem[0], obj.scrollTop + obj.checkOffset < winHeight);
            obj.isAnimated = true;
          }
        }
      });
    })
      .trigger('scroll');
  };

  var correctPNG = function(container){
    var arVersion = navigator.appVersion.split("MSIE");
    var version = parseFloat(arVersion[1]);
    if (version && (version >= 5.5 && version < 9) && (document.body.filters)) {
      var lee_i = 0;
      var docimgs=container.getElementsByTagName('img');
      for (var j = 0; j < docimgs.length; j++) {
        var img = docimgs[j];
        var imgName = img.src.toUpperCase();
        if (imgName.substring(imgName.length - 3, imgName.length) == "PNG" && !img.getAttribute("usemap")) {
          lee_i++;
          var SpanID = img.id || 'ra_png_' + lee_i.toString();
          var imgData = new Image();
          imgData.proData = SpanID;
          imgData.onload = function () {
            $("#" + this.proData).css("width", this.width + "px").css("height", this.height + "px");
          }
          imgData.src = img.src;
          var imgID = "id='" + SpanID + "' ";
          var imgClass = (img.className) ? "class='" + img.className + "' " : ""
          var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
          var imgStyle = "display:inline-block;" + img.style.cssText
          if (img.align == "left") imgStyle = "float:left;" + imgStyle
          if (img.align == "right") imgStyle = "float:right;" + imgStyle
          if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
          var strNewHTML = "<span " + imgID + imgClass + imgTitle
            + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
            + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
            + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
          img.outerHTML = strNewHTML;
          j = j - 1;
        }
      }
    }
  };

  $.extend(window, {
    isSupportCss3: isSupportCss3,
    setAnimate: setAnimate,
    setAllAnimate: setAllAnimate,
    bindScroll: bindScroll,
    correctPNG: correctPNG
  });

})(window, jQuery);