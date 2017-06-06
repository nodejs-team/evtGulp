/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene6 = Element.extend({
    initialize: function () {
      Scene6.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'lapin'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("6-1_png", {width: 545})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("6-2_png", {width: 1580})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("6-3_png", {width: 1826})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2017</span><p>每一个重要的时刻，<br>都需要甜蜜的鉴证，<br>安逸兔与属兔的你是冥冥之中的约定。</p>'
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

  window.Scene6 = Scene6;

})(window);