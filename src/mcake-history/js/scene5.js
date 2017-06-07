/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene5 = Element.extend({
    initialize: function () {
      Scene5.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'Luke'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("5-1_png", {width: 560})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("5-2_png", {width: 2056})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("5-3_png", {width: 1288})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2016</span><p>你说，<br>天使的到来，<br>让幸福加磅，<br>卢克和咚咚是他最好的玩伴，<br>不过你先替他品尝。</p>'
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

  window.Scene5 = Scene5;

})(window);