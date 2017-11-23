/**
 * Created by mcake on 2017/6/1.
 */

(function(window, undefined){
  "use strict";

  var Element = EventEmitter.extend({
    initialize: function (attrs) {
      Element.superclass.initialize.apply(this, arguments);
      attrs = attrs || {};
      this.children = [];
      this.el = document.createElement("div");
      this.moveRatio = 1;
      this._setProps(attrs);
    },
    attr: function(key, value){
      if( typeof key === 'object' ) {
        for (var i in key) {
          this.el.setAttribute(i, key[i]);
        }
      } else {
        this.el.setAttribute(key, value);
      }
      return this;
    },
    css: function (key, value) {
      if( typeof key === 'object' ) {
        for (var i in key) {
          this.el.style[i] = key[i];
        }
      } else {
        this.el.style[key] = value;
      }
      return this;
    },
    find: function (selector) {
      return this.el.querySelector(selector);
    },
    findAll: function (selector) {
      return [].slice.call(this.el.querySelectorAll(selector));
    },
    _setProps: function (attrs) {
      if( typeof attrs !== 'object' ) return;

      for(var i in attrs){
        if( i === "className" ){
          this.el.className = attrs[i];
        }
        else if( i === "html" ){
          if( typeof attrs[i] === "object" && attrs[i].nodeType !== undefined ){
            this.el.appendChild(attrs[i]);
          } else {
            this.el.innerHTML = attrs[i];
          }
        }
        else if( i === "style" || i === "cssText" ){
          this.el.style.cssText = attrs[i];
        }
        else {
          this.attr(attrs);
        }
      }
    },
    addChild: function (element) {
      if( !(element instanceof Element) ){
        throw new Error("the element you added is not instance of Element");
      }
      element.parent = this;
      this.children.push(element);
      return this;
    },
    removeChild: function (element) {
      var elIndex = this.children.indexOf(element);
      if( elIndex > -1 ) {
        this.children.splice(elIndex, 1);
        this.el.removeChild(element.el);
      }
      return this;
    },
    renderTo: function (rootEl) {
      if( !rootEl ) throw new Error("render el is not found");

      this.renderer(this);
      rootEl.appendChild(this.el);

      this.broadcast("addToPage");

      return this;
    },
    renderer: function (element) {
      var fragment = document.createDocumentFragment();
      element.children.forEach(function(element){
        this.renderer(element);
        fragment.appendChild(element.el);
      }.bind(this));
      element.el.appendChild(fragment);
    },
    broadcast: function (name) {
      function _triggerEvent(element, name) {
        element.dispatch(name);
        element.children.forEach(function (element) {
          _triggerEvent(element, name);
        });
      }
      _triggerEvent(this, name);

      return this;
    },
    emit: function (name) {
      this.dispatch(name);
      var parent = this.parent;
      while (parent){
        parent.dispatch(name);
        parent = parent.parent;
      }

      return this;
    },
    initEvents: function () {
      this.on("scrolling", function (value) {
        
      });
    }
  });

  window.Element = Element;

})(window);