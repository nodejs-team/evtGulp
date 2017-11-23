/**
 * Created by mcake on 2016/9/6.
 */

(function(EC){
    "use strict";

    var Ticker = EC.Event.extend({
        initialize: function(){
            Ticker.superclass.initialize.call(this);
            this.ticker = null;
        },

        start: function(){
            var self = this;

            +function runTicker() {
                self.ticker = requestAnimationFrame(runTicker);
                self.dispatch('ticker');
            }();

            return this;
        },
        stop: function (){
            if( this.ticker ) {
                cancelAnimationFrame(this.ticker);
                delete this.ticker;
            }

            return this;
        }
    });

    EC.provide({
        Ticker: Ticker
    });

})(window.EC);