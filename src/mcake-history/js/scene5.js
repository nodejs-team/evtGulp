/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene5 = Element.extend({
    initialize: function () {
      Scene5.superclass.initialize.apply(this, arguments);

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("5-1_png", {width: 560})
      });

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("5-2_png", {width: 2056})
      });

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("5-3_png", {width: 1288})
      });

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2016</span><h3>Luke et dondon</h3><p>2016年，<br>你说，<br>天使的到来，<br>让幸福加磅，<br>卢克和咚咚是她最好的玩伴，<br>不过你先替他品尝。</p>'
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

  window.Scene5 = Scene5;

})(window);