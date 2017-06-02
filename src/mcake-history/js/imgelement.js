/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";
  
  function ImgElement(src, attrs) {
    attrs = attrs || {};
    if( typeof src === "string" ){
      return '<img src="'+ Resource.getRes(src) +'" width="'+ Math.round(attrs.width/1920*100) +'%"/>';
    } else {
      return '';
    }
  }

  window.ImgElement = ImgElement;
})(window);