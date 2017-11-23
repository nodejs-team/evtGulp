/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene3 = Element.extend({
    initialize: function () {
      Scene3.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'Joséphine'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("3-1_png", {width: 778})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("3-2_png", {width: 2670})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("3-3_png", {width: 1256})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2014</span><p>你说，<br>今年的520吃的不是狗粮<br>而是约瑟芬，<br>并且不用坐着高铁到上海，<br>开心。</p>'
      });

      this.addChild(textBg);
      this.addChild(bg1);
      this.addChild(mainFlag);
      this.addChild(bg2);
      this.addChild(text);
    },
    initEvents: function () {

    }
  });

  window.Scene3 = Scene3;

})(window);