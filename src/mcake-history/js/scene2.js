/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene2 = Element.extend({
    initialize: function () {
      Scene2.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'Rosette'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("2-1_png", {width: 719})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("2-2_png", {width: 3046})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("2-3_png", {width: 1703})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2013</span><p>你说，<br>就算一个人也要把生日过得普天同庆，<br>Pink 罗赛特<br>满足一切少女心。</p>'
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

  window.Scene2 = Scene2;

})(window);