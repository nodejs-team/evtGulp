
  Function.prototype.bind = Function.prototype.bind || function(){
      var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
      return function(){
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
      }
    };

  function getRandom(min, max) {
    return min + Math.random()*(max-min);
  }

  function getWindowSize() {
    return {
      clientW: window.innerWidth || document.documentElement.clientWidth,
      clientH: window.innerHeight || document.documentElement.clientHeight
    }
  }

  var clientSize = getWindowSize();
  var body = document.body;

  function Snow(container, opts) {
    this.container = container;
    this.opts = opts;
    this.create();
  }

  Snow.prototype = {
    create: function () {
      this.el = document.createElement("div");
      this.el.className = 'snow';
      this.el.style["width"] = this.opts.snowWidth + "px";
      this.el.style["height"] = this.opts.snowHeight + "px";
      this.el.style["top"] = -this.opts.snowHeight + "px";
      this.el.style["-webkit-transition"] = "all " + this.opts.speed + "ms linear";
      this.el.style["transition"] = "all " + this.opts.speed + "ms linear";

      this.container.appendChild(this.el);
      this.fall();
    },
    fall: function () {
      var self = this;
      var left = getRandom(0, clientSize.clientW - this.opts.snowWidth);
      var destLeft = getRandom(-300, 300);
      var scale = getRandom(0.6, 1);

      this.el.style["left"] = left + "px";
      this.el.style["-ms-transform"] = "scale("+ scale +")";
      this.el.style["-webkit-transform"] = "scale("+ scale +")";
      this.el.style["transform"] = "scale("+ scale +")";

      body.offsetWidth;
      var transformStyle = "scale("+ scale +") translate3d("+ destLeft +"px,"+ (clientSize.clientH + this.opts.snowHeight)*2 +"px,0px)";
      this.el.style["-webkit-transform"] = transformStyle;
      this.el.style["transform"] = transformStyle;

      /*当前页面失去焦点时，通过transitionend的方式移除this.el会有问题，因此通过这种方式移除*/
      $({y: -this.opts.snowHeight, left: left}).animate({
        y: (clientSize.clientH + this.opts.snowHeight)*(1/scale),
        left: left + destLeft
      }, {
        easing: 'linear',
        duration: this.opts.speed,
        step: function ( value, obj) {

          if( !isSupportCss3 ){
            if( obj.prop == 'y' ) {
              self.el.style.top = obj.now + "px";
            }
            if( obj.prop == 'left' ){
              self.el.style.left = obj.now + "px";
            }
          }
        },
        complete: function () {
          self.reset();
        }
      });
    },
    reset: function () {
      try {
        this.container.removeChild(this.el);
      } catch (e){
        console.error(e.message);
      }
    }
  };

  function SnowFall(opts){

    this.opts = $.extend({
      interval: 100,
      speed: 15000,
      snowWidth: 8,
      snowHeight: 8
    }, opts||{});

    this.timer = null;
    this.body = document.body;
    this.init();
  }

  SnowFall.prototype = {
    init: function () {
      this.createLayout();
      this.start();
    },
    start: function () {
      new Snow(this.container, this.opts);
      this.timer = setTimeout(function () {
        this.start();
      }.bind(this), this.opts.interval);
    },
    createLayout:function () {
      this.container = document.createElement("div");
      this.container.className = 'snow-container';
      this.body.appendChild(this.container);
    },
    destroy: function () {
      if( this.timer ) clearTimeout(this.timer);
      this.container.parentNode.removeChild(this.container);
    }
  };

  $(function () {
    $(window).on("resize", function () {
      clientSize = getWindowSize();
    });
  });

  /*实例化 new SnowFall(); */
  
