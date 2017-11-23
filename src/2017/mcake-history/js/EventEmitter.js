/**
 * Created by semdy on 2016/9/6.
 */
(function(window){
  "use strict";

  /**
   * Extend
   * **/
  var Extend = function (source) {
    var props = [].slice.call(arguments, 1);
    var prop, p;
    for (var i = 0; i < props.length; i++) {
      for (p in (prop = props[i])) {
        if (prop.hasOwnProperty(p)) {
          source[p] = prop[p];
        }
      }
    }

    return source;
  };

  /**
   * 类的继承封装
   * **/
  var ClassExtend = function (protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function () {
        return parent.apply(this, arguments);
      };
    }

    Extend(child, parent, staticProps);

    child.prototype = Object.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    child.superclass = parent.prototype;

    return child;
  };

  var Event = function() {
    this.initialize.apply(this, arguments);
  };

  Event.prototype = {

    initialize: function(){
      this._eventPool = {};
      return this;
    },

    on: function(name, callback, ctx){
      var e = this._eventPool;

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx || this
      });

      return this;
    },

    once: function(name, callback, ctx){
      var self = this;

      function listener () {
        self.off(name, listener);
        callback.apply(this, arguments);
      }

      listener._ = callback;

      return this.on(name, listener, ctx);
    },

    off: function(name, callback){
      var e = this._eventPool;
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        liveEvents = evts.filter(function(evt){
          return evt.fn !== callback && evt.fn._ !== callback;
        });
      }

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    },

    dispatch: function( name ){
      var args = [].slice.call(arguments, 1);
      var evts = (this._eventPool[name] || []).slice();

      if( evts.length ) {
        evts.forEach(function (evt) {
          evt.fn.apply(evt.ctx, args);
        });
      }

      return this;
    },

    clear: function(){
      this._eventPool = {};
      return this;
    }
  };

  Event.extend = ClassExtend;

  window.EventEmitter = Event;
})(window);