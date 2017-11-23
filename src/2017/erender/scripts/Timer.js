/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var Timer = EC.Event.extend({
        initialize: function(delay, repeatCount){
            Timer.superclass.initialize.call(this);

            this._currentCount = 0;
            this._lastTime = 0;
            this._repeatCount = repeatCount;
            this._waitTime = 0;
            this._ticker = new EC.Ticker();
            this.delay = delay;

            this._initEvents();
        },

        start: function(){
            this._lastTime = Date.now();
            this._ticker.start();

            return this;
        },
        stop: function (){
            if( this._ticker ) {
                this._ticker.stop();

                if( this._waitTime > 0 ){
                    var self = this;
                    setTimeout(function(){
                        self.dispatch('complete');
                        self.reset();
                    }, this._waitTime);
                }
                else {
                    this.dispatch('complete');
                    this.reset();
                }

            }

            return this;
        },
        wait: function( waitTime ){
            this._waitTime = waitTime;
            return this;
        },
        pause: function( dur ){
            if( this._ticker ) {
                this._ticker.stop();
                this.dispatch('pause');
            }

            if( typeof dur === 'number' && dur > 0 ){
                var self = this;
                setTimeout(function () {
                    self._ticker.start();
                }, dur);
            }
            return this;
        },
        setRepeatCount: function(repeatCount){
            this._repeatCount = repeatCount;
            return this;
        },
        _timerHandle: function(){
            var now = Date.now();

            if( now - this._lastTime >= this.delay ){
                if( this._repeatCount && (++this._currentCount == this._repeatCount) ){
                    this.stop();
                    return;
                }

                this._lastTime = now;
                this.dispatch('timer', now);
            }
        },
        _initEvents: function(){
            this._ticker.on("ticker", this._timerHandle, this);
        },
        reset: function(){
            this._currentCount = 0;
            this._ticker = null;
            return this;
        }

    });

    EC.provide({
        Timer: Timer
    });

})(window.EC);