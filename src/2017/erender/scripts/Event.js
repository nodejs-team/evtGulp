/**
 * Created by mcake on 2016/9/6.
 */
(function(EC){
    "use strict";

    var slice = Array.prototype.slice;

    var Event = function() {
        this.initialize.apply(this, arguments);
    };

    EC.extend(Event.prototype, {

        initialize: function(){
            this._eventPool = {};
            this._guid = 0;
        },

        on: function(eventName, handle, scope){
            var self = this;

            if( !(eventName in this._eventPool) ){
                this._eventPool[eventName] = [];
            }

            handle._guid = this._guid++;

            var scopeHandle = function(){
                return handle.apply(scope || self, arguments);
            };

            scopeHandle._guid = handle._guid;

            this._eventPool[eventName].push(scopeHandle);

            return this;
        },

        once: function(eventName, handle, scope){
            var handler = function(){
                handle.apply(scope||this, arguments);
                this.off(eventName, handler);
            };

            this.on(eventName, handler, this);

            return this;
        },

        off: function(eventName, handle, scope){
            if( handle === undefined ){
                delete this._eventPool[eventName];
                return this;
            }

            var events = this._eventPool[eventName];

            if( !events ) return this;

            for(var i=0; i<events.length; i++){
                if( events[i]._guid === handle._guid ){
                    events.splice(i, 1);
                }
            }

            return this;
        },

        dispatch: function( eventName ){
            var events = this._eventPool[eventName];

            if( !events ) return this;

            var args = slice.call(arguments, 1);

            for(var i = 0; i<events.length; i++){
                typeof events[i] == 'function' && events[i].apply(this, args);
            }

            return this;
        },

        dispatchAll: function(){
            var args = slice.call(arguments);

            for(var i in this._eventPool){
                args.unshift(i);
                this.dispatch.apply(this, args);
            }

            return this;
        },

        success: function(cb){
            return this.on('success', cb);
        },

        complete: function(cb){
            return this.on('complete', cb);
        },

        error: function(cb){
            return this.on('error', cb);
        },

        progress: function(cb){
            return this.on('progress', cb);
        },

        clear: function(){
            this._eventPool = {};
            return this;
        }
    });

    Event.extend = EC.classExtend;

    EC.provide({
        Event: Event
    });

})(window.EC);