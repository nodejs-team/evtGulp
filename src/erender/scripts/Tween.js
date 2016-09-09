/**
 * Created by mcake on 2016/9/6.
 */
(function(EC){
    "use strict";

    /**
     * Tween 动画类
     * **/

    var Tween = function(obj, cfg){
        this.tweenObj = obj;
        this._updateCb = [];
        this._completeCb = [];

        this.cfg = cfg || {};
        this._repeatIndex = 0;
        this._repeatCount = 0;

        if( this.cfg.reverse ){
            this._repeatCount = 2;
        }

        if( this.cfg.loop ){
            if( EC.isNumber(this.cfg.loop) ){
                this._repeatCount = this.cfg.loop;
            } else {
                this._repeatCount = -1;
            }
        }
    };

    Tween.cache = {};
    Tween.timerCache = {};
    Tween.uuid = 0;
    Tween.expando = '@Tween-' + +new Date;
    Tween.get = function(obj, cfg){
        return new Tween(obj, cfg);
    };

    Tween.removeTweens = function(target){
        if( target && target[ Tween.expando ] && Tween.timerCache[target[ Tween.expando ]] ) {
            Tween.get(target).stop();
        }

        return this;
    };

    Tween.removeAllTweens = function(container){
        container.getChilds().forEach(function(target){
            Tween.removeTweens(target);
        });

        return this;
    };

    Tween.prototype = {
        to: function(){
            var self = this,
                args = arguments;

            this.queue(function(){
                self.anim.apply(self, args);
            });

            return this;

        },
        wait: function(time){
            if( EC.isNumber(time) ){
                this.queue( time );
            }

            return this;
        },
        anim: function(attrs, duration, easing){
            var self = this,
                startTime = +new Date,
                timer = Tween.timerCache[self.tweenObj[ Tween.expando ]],
                per;

            this.duration = duration || 600;
            this.easing = easing;
            this.startAttrs = EC.extend({}, this.tweenObj);
            this.endAttrs = attrs;

            if( timer ){
                return this;
            }

            var callUpdate = function(){
                per = (+new Date - startTime)/self.duration;
                per = per >=1 ? 1 : per;
                self.percent = per;

                timer = requestAnimationFrame(callUpdate);
                Tween.timerCache[self.tweenObj[ Tween.expando ]] = timer;
                self.update(self.tweenObj);

                if( per == 1 ){
                    self.stop();
                    self.dequeue();
                }
            };

            callUpdate();

            return this;
        },
        update: function( obj ){
            for( var i in this.endAttrs ){
                if( this.endAttrs[i] == this.startAttrs[i] ) continue;
                obj[i] = this.startAttrs[i] + (this.endAttrs[i] - this.startAttrs[i])*(this.easing||EC.Easing.linear)(this.percent);
            }

            this._triggerUpdate(this.tweenObj);
        },
        stop: function(){
            cancelAnimationFrame(Tween.timerCache[this.tweenObj[ Tween.expando ]]);
            delete Tween.timerCache[this.tweenObj[ Tween.expando ]];

            return this;
        },
        onUpdate: function(callback, context){
            var self = this;
            this._updateCb.push(function(){
                EC.isFunction(callback) && callback.apply(context||self, arguments);
            });

            return this;
        },
        call: function(callback, context){
            var self = this;
            this._completeCb.push(function(){
                EC.isFunction(callback) && callback.apply(context || self, arguments);
            });

            return this;
        },
        _triggerUpdate: function( tweenObj ){
            this._updateCb.forEach(function(cb){
                cb(tweenObj);
            });
        },
        _triggerComplete: function( tweenObj ){
            this._completeCb.forEach(function(cb){
                cb(tweenObj);
            });
        },
        queue: function( data ){
            if( !this.tweenObj[ Tween.expando ] )
                this.tweenObj[ Tween.expando ] = ++Tween.uuid;

            var fx = Tween.cache[ Tween.uuid ];
            if( fx == undefined ){
                fx = Tween.cache[ Tween.uuid ] = [];
            }
            if( data ){
                fx.push( data );
            }

            if( fx[0] !== 'running' ){
                this.dequeue();
            }

            return this;
        },

        dequeue: function() {
            var self = this,
                fx = Tween.cache[ this.tweenObj[ Tween.expando ] ] || [],
                delay,
                fn = fx.shift();

            if( fn === 'running' ){
                fn = fx.shift();
            }

            if( fn ){
                fx.unshift( 'running' );
                if( EC.isNumber(fn) ){
                    delay = window.setTimeout(function(){
                        window.clearTimeout( delay );
                        delay = null;
                        self.dequeue();
                    }, fn );
                }
                else if( EC.isFunction(fn) ){
                    fn.call(self.tweenObj, function(){
                        self.dequeue();
                    });
                }
            }

            if( !fx.length ){

                if( this._repeatCount == -1 || ++this._repeatIndex < this._repeatCount ){
                    this.to(this.startAttrs, this.duration, this.easing);
                }
                else {
                    delete Tween.cache[ this.tweenObj[ Tween.expando ] ];
                }

                this._triggerComplete(this.tweenObj);
            }

            return this;
        },

        clearQueue: function(){
            delete Tween.cache[ this.tweenObj[ Tween.expando ] ];
            return this;
        }
    };

    EC.provide({
        Tween: Tween
    });

})(window.EC);