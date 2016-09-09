/**
 * Created by mcake on 2016/9/6.
 */
var requestAnimationFrame =
    window.requestAnimationFrame        ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    function (callback) {
        return setTimeout(callback, 1000 / 60);
    };

var cancelAnimationFrame =
    window.cancelAnimationFrame        ||
    window.webkitCancelAnimationFrame  ||
    window.mozCancelAnimationFrame     ||
    function (id) {
        return clearTimeout(id);
    };