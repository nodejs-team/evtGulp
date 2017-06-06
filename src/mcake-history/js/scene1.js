/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene1 = Element.extend({
    initialize: function () {
      Scene1.superclass.initialize.apply(this, arguments);

      var textBg = new Element({
        className: "scene-textbg",
        html: 'Napoléon'
      });

      var mainFlag = new Element({
        className: "scene-flag",
        html: ImgElement("1-1_png", {width: 638})
      }).attr("data-swiper-parallax", "-1600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("1-2_png", {width: 1691})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("1-3_png", {width: 1420})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<span class="scene-year">2012</span>' +
        '<p>你说，<br>没有什么失恋是<br>一块蓝莓拿破仑解决不了的，<br>如果有，<br>来两块。</p>'
      });

      var flagTexture = mainFlag.find("img");
      var bg1Texture = bg1.find("img");
      var bg2Texture = bg2.find("img");

      TweenMax.set(textBg.el, {x: "100%"});
      TweenMax.set([flagTexture, bg1Texture, bg2Texture], {y: "100%"});
      TweenMax.set(text.el, {opacity: 0});

      this.addChild(textBg);
      this.addChild(bg1);
      this.addChild(mainFlag);
      this.addChild(bg2);
      this.addChild(text);

      var easing = Sine.easeInExpo;
      this.on("addToPage", function () {
        TweenMax.to(text.el, .8, {opacity: 1, delay: .2});
        TweenMax.to(bg1Texture, .7, {y: "0%", delay: .9, ease: easing});
        TweenMax.to(bg2Texture, .7, {y: "0%", delay: 1, ease: easing});
        TweenMax.to(flagTexture, .7, {y: "0%", delay: 1.1, ease: easing});
        TweenMax.to(textBg.el, 1, {x: "0%", delay: 1.6, ease: easing});
      }, this);

    },
    initEvents: function () {

    }
  });

  window.Scene1 = Scene1;

})(window);