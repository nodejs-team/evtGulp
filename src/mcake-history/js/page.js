/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  function getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
  }

  var Page = Element.extend({
    initialize: function () {
      Page.superclass.initialize.apply(this, arguments);
      this.addChild(new Scene1({
        className: "swiper-slide scene scene1"
      }));
      this.addChild(new Scene2({
        className: "swiper-slide scene scene2"
      }));
      this.addChild(new Scene3({
        className: "swiper-slide scene scene3"
      }));
      this.addChild(new Scene4({
        className: "swiper-slide scene scene4"
      }));
      this.addChild(new Scene5({
        className: "swiper-slide scene scene5"
      }));
      this.addChild(new Scene6({
        className: "swiper-slide scene scene6"
      }));
      this.addChild(new Scene7({
        className: "swiper-slide scene scene7"
      }));
      this.addChild(new Scene8({
        className: "swiper-slide scene scene8"
      }));
      this.addChild(new Scene9({
        className: "swiper-slide scene scene9"
      }));

      this.cursor = new Element({
        className: "cursor-indictor",
        html: '<svg viewBox="0 0 59.3 63.2">' +
            '<circle cx="29.7" cy="31.6" r="4.8"></circle>' +
            '<path class="right" d="M39.9 40l8.6-8.3-8.7-8.4"></path>' +
            '<path class="left" d="M19.4 23.3l-8.6 8.3 8.7 8.4"></path>' +
          '</svg>'
      }).renderTo(document.body).el;

      this.on("addToPage", function () {
        this.initEvents();
      }, this);
    },

    initEvents: function () {
      var self = this;
      var $el = $(this.el);
      var oldClassName = this.cursor.className;
      $el.on("mousemove", function (e) {
        var itemW = getWindowWidth()/3;
        var pageX = e.pageX;
        var pageY = e.pageY;

        if( pageX > 0 && pageX <= itemW ){
          self.cursor.className = oldClassName + " cursor-prev";
          if( pageSwiper.activeIndex === 0 ){
            self.cursor.style.display = "none";
          } else {
            self.cursor.style.display = "";
          }
        }
        else if( pageX > itemW && pageX <= itemW*2 ){
          self.cursor.className = oldClassName;
          self.cursor.style.display = "";
        }
        else if( pageX > itemW*2 ){
          self.cursor.className = oldClassName + " cursor-next";
          if( pageSwiper.activeIndex === pageSwiper.slides.length - 1 ){
            self.cursor.style.display = "none";
          } else {
            self.cursor.style.display = "";
          }
        }
        self.cursor.style.left = pageX + 20 + "px";
        self.cursor.style.top = pageY + 20 + "px";
      });

      $el.on("click", function(e){
        var itemW = getWindowWidth()/3;
        var pageX = e.pageX;
        if( pageX > 0 && pageX <= itemW ){
          self.emit("leftClick");
        }
        else if( pageX > itemW*2 ){
          self.emit("rightClick");
        }
      });
    }
  });

  window.Page = Page;

})(window);