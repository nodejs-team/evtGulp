/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene4 = Element.extend({
    initialize: function () {
      Scene4.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'Fraisier'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("4-1_png", {width: 770})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("4-2_png", {width: 2255})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("4-3_png", {width: 1532})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2015</span><h3>Fraisier</h3><p>2015年，<br>你说，<br>感恩遇见，<br>感谢有你，<br>最美的姑娘，<br>今天的莓红1893有泪水的味道。</p>'
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

  window.Scene4 = Scene4;

})(window);