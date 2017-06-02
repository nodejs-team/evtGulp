/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene1 = Element.extend({
    initialize: function () {
      Scene1.superclass.initialize.apply(this, arguments);

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("1-1_png", {width: 638})
      });

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("1-2_png", {width: 1691})
      });

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("1-3_png", {width: 1420})
      });

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2012</span><h3>Napoleon aux myrtilles</h3><p>2012年，<br>你说，<br>没有什么失恋是一块蓝莓拿破仑解决不了，<br>如果有，<br>来两块。</p>'
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

  window.Scene1 = Scene1;

})(window);