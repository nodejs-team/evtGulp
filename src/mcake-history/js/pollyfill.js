/**
 * Created by mcake on 2017/6/1.
 */

Function.prototype.bind || (Function.prototype.bind = function(){
  var self = this,
    context = [].shift.call(arguments),
    args = [].slice.call(arguments);
  return function(){
    return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
  }
});

Array.prototype.indexOf || (Array.prototype.indexOf = function(target){
  for(var i=0; l=this.length; i++){
    if( this[i] === target ) return i;
  }
  return -1;
});

Array.isArray || (Array.isArray = function(obj){
  return Object.prototype.toString.call(obj) === '[object Array]';
});

Object.create = function() {

  function Temp() {}

  return function(O) {

    if (typeof O !== "object") {
      throw TypeError("Object prototype may only be an Object or null");
    }

    Temp.prototype = O;
    var obj = new Temp();
    Temp.prototype = null;

    if (arguments.length > 1) {
      var Properties = Object(arguments[1]);
      for (var prop in Properties) {
        if (Properties.hasOwnProperty(prop)) {
          obj[prop] = Properties[prop];
        }
      }
    }

    return obj;
  };
}();