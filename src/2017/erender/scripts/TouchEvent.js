/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var doc = document,
        dob = doc.body,
        doe = doc.documentElement;

    var isTouch = 'ontouchstart' in document;
    var pointerEnabled = window.navigator.msPointerEnabled;

    isTouch = isTouch || pointerEnabled;

    var EVENTS = pointerEnabled ? {
        START: 'MSPointerDown',
        MOVE: 'MSPointerMove',
        END: 'MSPointerCancel'
    } : {
        START: isTouch ? 'touchstart' : 'mousedown',
        MOVE: isTouch ? 'touchmove' : 'mousemove',
        END: isTouch ? 'touchend' : 'mouseup'
    };

    var TouchEvent = function(){
        this.enableStack = [];
        this._touchX = 0;
        this._touchY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._bound = {};
        this._touchTimer = null;
    };

    TouchEvent.prototype = {
        attach: function(stage){
            this.stage = stage;
            this.element = stage.canvas;
            this._startTime = 0;
            this._bindEvents();
        },
        _bindEvents: function(){
            this.element.addEventListener(EVENTS.START, this._onTouchStart.bind(this), false);
            this.element.addEventListener(EVENTS.MOVE, this._onTouchMove.bind(this), false);
            this.element.addEventListener(EVENTS.END, this._onTouchEnd.bind(this), false);
        },
        _onTouchStart: function(event){
            event = isTouch ? event.targetTouches[0] : event;

            this._startTime = Date.now();
            this._offsetX = window.pageXOffset || doe.scrollLeft || dob.scrollLeft || 0;
            this._offsetY = window.pageYOffset || doe.scrollTop || dob.scrollTop || 0;
            this._bound = this.element.getBoundingClientRect();

            this._clearTouchTimer();
            this._setTouchXY(event);
            this.enableStack = this._getTouchEnables();

            this._triggerEvent("touchstart", event);

            this._touchTimer = setTimeout(function(){
                this._triggerEvent("longtouch", event);
            }.bind(this), 500);
        },
        _onTouchMove: function(event){
            event = isTouch ? event.changedTouches[0] : event;
            this._clearTouchTimer();
            this._setTouchXY(event);
            this._triggerEvent("touchmove", event);
        },
        _onTouchEnd: function(event){
            event = isTouch ? event.changedTouches[0] : event;
            this._clearTouchTimer();
            this._setTouchXY(event);
            this._triggerEvent("touchend", event);

            var diffTime = Date.now() - this._startTime;

            if( diffTime < 200 ){
                this._triggerEvent("touch", event);
            }
        },
        _clearTouchTimer: function(){
            if( this._touchTimer ) {
                clearTimeout(this._touchTimer);
            }
        },
        _triggerEvent: function(type, event){
            var self = this;
            var ratio = this.stage.scaleRatio;
            var enableObj = this.enableStack.find(function(obj){
                return EC.util.isPointInPath({x: self._touchX * ratio, y: self._touchY * ratio}, obj);
            });

            if( enableObj ) {
                var eventObj = {
                    type: type,
                    stageX: this._touchX,
                    stageY: this._touchY,
                    target: enableObj
                };
                enableObj.dispatch(type, EC.extend(eventObj, this._getOriginalEvent(event)));
            }
        },
        _getTouchEnables: function(){
            var enableSatck = [];

            function getItems( obj ) {
                var childs = obj.getChilds();
                var i = childs.length;
                while (i--) {
                    if( !childs[i].visible ) continue;
                    if (childs[i].touchEnabled) {
                        enableSatck.push(childs[i]);
                    }
                    if( childs[i].$type === "Sprite" ){
                        getItems(childs[i]);
                    }
                }
            }

            getItems(this.stage);

            if( this.stage.touchEnabled ){
                enableSatck.push(this.stage);
            }

            return enableSatck;
        },
        _getOriginalEvent: function(event){
            var props = {};
            ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY", "radiusX", "radiusY", "rotationAngle"].forEach(function(prop){
                props[prop] = event[prop];
            });

            return props;
        },
        _setTouchXY: function(event){
            this._touchX = event.pageX - this._bound.left - this._offsetX;
            this._touchY = event.pageY - this._bound.top - this._offsetY;
        }
    };

    EC.provide({
        TouchEvent: TouchEvent
    });

})(window.EC);