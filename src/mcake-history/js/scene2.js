/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene2 = Element.extend({
    initialize: function () {
      Scene2.superclass.initialize.apply(this, arguments);

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("2-1_png", {width: 719})
      });

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("2-2_png", {width: 3046})
      });

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("2-3_png", {width: 1703})
      });

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2013</span><h3>Pink Rosette</h3><p>2013年，<br>你说，<br>就算一个人也要把生日过得普天同庆，<br>Pink 罗赛特<br>满足一切少女心。</p>'
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

  window.Scene2 = Scene2;

})(window);