/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene6 = Element.extend({
    initialize: function () {
      Scene6.superclass.initialize.apply(this, arguments);

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("6-1_png", {width: 545})
      });

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("6-2_png", {width: 1580})
      });

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("6-3_png", {width: 1826})
      });

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2017</span><h3>lapin detendu</h3><p>2017年，<br>你说，<br>每一个重要的时刻，<br>都需要甜蜜的鉴证，<br>安逸兔与属兔的你是冥冥之中的约定。</p>'
      });

      this.addChild(bg1);
      this.addChild(mainFlag);
      this.addChild(bg2);
      this.addChild(text);
    },
    initEvents: function () {
      this.on("scrolling", function (value) {
        this.children.forEach(function(element){
          element.emit("scrolling", value);
        });
      }.bind(this));
    }
  });

  window.Scene6 = Scene6;

})(window);