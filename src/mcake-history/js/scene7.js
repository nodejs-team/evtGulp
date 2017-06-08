/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene7 = Element.extend({
    initialize: function () {
      Scene7.superclass.initialize.apply(this, arguments);

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("7-2_png", {width: 1909})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("7-3_png", {width: 1263})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<h3>你眼中的Mcake</h3>' +
        '<p>六年时光，<br>' +
        '我们很幸运，成为一个聆听者，<br>' +
        '鉴证每一个或难过或感动的瞬间，<br>' +
        '一直以来，Mcake以英文名称存在，<br>' +
        '多了点洋气，少了点亲民，<br>' +
        '我们希望能够有更多的共鸣。<br><br>' +
        '所以有了一个很酷的想法，<br>' +
        '在一路陪伴Mcake成长的用户中，<br>' +
        '<strong>征集Mcake的中文名称，</strong><br>' +
        '我相信有趣的故事从此刻开始，<br>' +
        '这一次，<br>' +
        '是我们最近的距离。</p>'
      });

      this.addChild(bg1);
      this.addChild(bg2);
      this.addChild(text);
    },
    initEvents: function () {

    }
  });

  window.Scene7 = Scene7;

})(window);