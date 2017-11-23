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

if( !window.getComputedStyle ){
  window.getComputedStyle = function (element) {
    return {
      getPropertyValue: function (props) {
        return element.currentStyle[props];
      }
    }
  }
}

// addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
  if(win.addEventListener)return;		//No need to polyfill

  function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
  function addEvent(on, fn, self){
    return (self = this).attachEvent('on' + on, function(e){
      var e = e || win.event;
      e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
      e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
      if( typeof fn === 'function') {
        fn.call(self, e);
      }
    });
  }
  function addListen(obj, i){
    if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
    else obj.addEventListener = addEvent;
    return obj;
  }

  addListen([doc, win]);
  if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
  else{																			//IE < 8
    doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
    docHijack('getElementsByTagName');
    docHijack('getElementById');
    docHijack('createElement');
    addListen(doc.all);
  }
})(window, document);

// removeEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
  if(win.removeEventListener)return;		//No need to polyfill

  function docHijack(p){var old = doc[p];doc[p] = function(v){return removeListen(old(v))}}
  function removeEvent(on, fn, self){
    return (self = this).detachEvent('on' + on, function(e){
      var e = e || win.event;
      e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
      e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
      if( typeof fn === 'function') {
        fn.call(self, e);
      }
    });
  }
  function removeListen(obj, i){
    if(i = obj.length)while(i--)obj[i].removeEventListener = removeEvent;
    else obj.removeEventListener = removeEvent;
    return obj;
  }

  removeListen([doc, win]);
  if('Element' in win)win.Element.prototype.removeEventListener = removeEvent;			//IE8
  else{																			//IE < 8
    doc.attachEvent('onreadystatechange', function(){removeListen(doc.all)});		//Make sure we also init at domReady
    docHijack('getElementsByTagName');
    docHijack('getElementById');
    docHijack('createElement');
    removeListen(doc.all);
  }
})(window, document);