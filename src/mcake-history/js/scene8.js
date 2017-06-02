/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene8 = Element.extend({
    initialize: function () {
      Scene8.superclass.initialize.apply(this, arguments);

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("8-2_png", {width: 2004})
      });

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("8-3_png", {width: 966})
      });

      var text = new Element({
        className: "scene-text",
        html: '<h3>你眼中的的Mcake</h3><p>2017年，<br>你说，<br>每一个重要的时刻，<br>都需要甜蜜的鉴证，<br>安逸兔与属兔的你是冥冥之中的约定。</p>'
      });

      this.addChild(bg1);
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

  window.Scene8 = Scene8;

})(window);