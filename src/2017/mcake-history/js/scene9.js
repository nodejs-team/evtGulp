/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene9 = Element.extend({
    initialize: function () {
      Scene9.superclass.initialize.apply(this, arguments);

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("9-2_png", {width: 2033})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("9-3_png", {width: 1427})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<p>在每一个重要的时刻，我们都希望与你相伴。<br>距离，近一点，<br>再近一点。<br>愿你的心意能出现在我的邮箱，<br>那么，<br>你与Mcake奇妙缘分在这一刻延续。<br></p>' + ImgElement("logo_png")
      });

      this.addChild(bg1);
      this.addChild(bg2);
      this.addChild(text);
    },
    initEvents: function () {

    }
  });

  window.Scene9 = Scene9;

})(window);