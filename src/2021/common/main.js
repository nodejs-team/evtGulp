/**
 * Created by mcake on 2016/3/31.
 */
!function(a,b,c){"use strict";var j,k,l,m,n,o,p,q,r,s,t,u,v,d=function(){},e=Array.prototype,f=String.prototype,g=Object.prototype,h=e.slice,i=/^https?:\/\//;a.console||(a.console={log:d,error:d}),Date.now||(Date.now=function(){return+new Date}),a.JSON||function(){a.JSON={parse:function(a){return Function("return "+a)()}}}(),e.forEach||(e.forEach=function(a){for(var b=0,c=this.length;c>b;b++)!a||a(this[b],b,this)!==!1}),e.filter||(e.filter=function(a){var b=[];return this.forEach(function(c,d,e){a&&a(c,d,e)===!0&&b.push(c)}),b}),e.find||(e.find=function(a){for(var b=0,c=this.length;c>b;b++)if(a&&a(this[b],b,this)===!0)return this[b]}),e.map||(e.map=function(a){var b=[];return this.forEach(function(c,d,e){a&&b.push(a(c,d,e))}),b}),e.indexOf||(e.indexOf=function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1}),e.contains=e.includes||function(a){return this.indexOf(a)>-1},f.trim||(f.trim=function(){return this.replace(/(^\s+)|(\s+$)/g,"")}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===g.toString.call(a)}),j=["webkit","moz"],k=a.requestAnimationFrame,l=a.cancelAnimationFrame,k||j.forEach(function(b){k=a[b+"RequestAnimationFrame"],l=a[b+"CancelAnimationFrame"]||a[b+"CancelRequestAnimationFrame"]}),k||(k=function(b){return a.setTimeout(b,1e3/60)}),l||(l=function(a){clearTimeout(a)}),m=function(a){var c,d,e,b=h.call(arguments,1);for(e=0;e<b.length;e++)for(d in c=b[e])c.hasOwnProperty(d)&&(a[d]=c[d]);return a},n=function(a,b,c){var d,e;return"object"==typeof b?(d=h.call(arguments,1),d.unshift(a.prototype),m.apply(null,d),a):(e=function(){},e.prototype=b.prototype,a.prototype=new e,a.prototype.constructor=a,a.prototype.superClass=b.prototype,b.prototype.constructor==Object.prototype.constructor&&(b.prototype.constructor=b),m(a.prototype,c),m(a,b),a)},o=function(){this._eventPool={}},o.prototype={on:function(a,b,c){var d=this._eventPool;return(d[a]||(d[a]=[])).push({fn:b,ctx:c||this}),this},addEvent:function(){return this.on.apply(this,arguments)},once:function(a,b,c){function e(){d.off(a,e),b.apply(this,arguments)}var d=this;return e._=b,this.on(a,e,c)},off:function(a,b){var c=this._eventPool,d=c[a],e=[];return d&&b&&(e=d.filter(function(a){return a.fn!==b&&a.fn._!==b})),e.length?c[a]=e:delete c[a],this},dispatch:function(a){var b=h.call(arguments,1),c=(this._eventPool[a]||[]).slice();return c.length&&c.forEach(function(a){a.fn.apply(a.ctx,b)}),this},emit:function(){return this.dispatch.apply(this,arguments)},success:function(a){return this.on("success",a)},complete:function(a){return this.on("complete",a)},error:function(a){return this.on("error",a)},progress:function(a){return this.on("progress",a)},clear:function(){return this._eventPool={},this}},p=function(a,b){this._currentCount=0,this._lastTime=0,this._repeatCount=b,this._waitTime=0,this.timer=null,this.delay=a,this.superClass.constructor.call(this)},n(p,o,{start:function(){var a=this;return this._lastTime=Date.now(),+function b(){a.timer=k(b),a._timerHandle()}(),this},stop:function(){if(this.timer)if(l(this.timer),this._waitTime>0){var a=this;setTimeout(function(){a.dispatch("complete"),a.reset()},this._waitTime)}else this.dispatch("complete"),this.reset();return this},wait:function(a){return this._waitTime=a,this},pause:function(a){if(this.timer&&(l(this.timer),this.dispatch("pause")),"number"==typeof a&&a>0){var b=this;setTimeout(function(){b.start()},a)}return this},setRepeatCount:function(a){return this._repeatCount=a,this},_timerHandle:function(){var a=Date.now();if(a-this._lastTime>=this.delay){if(this._repeatCount&&++this._currentCount==this._repeatCount)return this.stop(),void 0;this._lastTime=a,this.dispatch("timer",a)}this.dispatch("enterframe",a)},reset:function(){return this._currentCount=0,this.timer=null,this}}),q=function(a,c,d,e){if(this.el="string"==typeof d?b.getElementById(d):d,!this.el)throw new Error('element "'+d+'" can not found!');this._startFrame=0,this._startTime=0,this._playTimes=-1,this._resKey=String(e),this.currentFrame=0,this.isPlaying=!1,this.setRES(a,c),Array.isArray(this.RESUrl)?(this.totalFrames=this.RESUrl.length,this.setFrame=this.setFrameByPath,this.elImg=b.createElement("img"),this.el.appendChild(this.elImg)):this.setFrame=this.setFrameBySprite,this.superClass.constructor.call(this),this._timer=new p(this.frameRate,this._repeatCount),this._initEvents()},n(q,o,{getMovieClipData:function(a){return this.RES.mc[a]||[]},gotoAndPlay:function(a,b,c){return a=Math.max(0,a-1),this._startFrame=a,this._playTimes=b,this.currentFrame=a,this._playTimes>0&&(this._repeatCount=this._playTimes*this.totalFrames,this._timer.setRepeatCount(this._repeatCount)),c&&this.setFrameRate(Math.round(1e3/c)),this.setFrame(this.currentFrame),this.play(),this},gotoAndStop:function(a){return this.setFrame(a)},prevFrame:function(){return this.setFrame(--this.currentFrame)},nextFrame:function(){return this.setFrame(++this.currentFrame)},play:function(){return this.isPlaying?this:(this._startTime=Date.now(),this._timer.start(),this.isPlaying=!0,this)},stop:function(){return this._timer.stop(),this.isPlaying=!1,this},pause:function(a){return this._timer.pause(a),this._startTime+=a,this.isPlaying=!1,this},wait:function(a){return this._timer.wait(a),this},setFrameRate:function(a){this.frameRate=a},setRES:function(a,b,c){this.RESUrl=s(a),this.RES=t(b,this._resKey,this.el),this.currentFrame=0,this.frame=this.getMovieClipData(this._resKey),this.frameRate=Math.round(1e3/(this.frame.frameRate||24)),this.totalFrames=this.frame.frames.length,c&&this.setFrameRate(c)},setFrameBySprite:function(a){var b=this.frame.frames[a]||{},d=this.RES.res[b.res];if(d!=c)return this._timer.delay=(b.duration||0)*this.frameRate,this.el.style.width=d.w+"px",this.el.style.height=d.h+"px",this.el.style.marginLeft=(b.x||0)+"px",this.el.style.marginTop=(b.y||0)+"px",this.el.style.background="url("+this.RESUrl+") no-repeat "+-d.x+"px "+-d.y+"px",this},setFrameByPath:function(a){var b=this.frame.frames[a]||{};return this._timer.delay=(b.duration||0)*this.frameRate,this.el.style.marginLeft=(b.x||0)+"px",this.el.style.marginTop=(b.y||0)+"px",this.elImg.src=this.RESUrl[a],this},clear:function(){return this.el.style.width="",this.el.style.height="",this.el.style.marginLeft="",this.el.style.marginTop="",this.el.style.background="",this.elImg&&(this.el.removeChild(this.elImg),delete this.elImg),this},_initEvents:function(){this._timer.on("timer",function(){++this.currentFrame>this.totalFrames-1&&(this.currentFrame=this._startFrame,this.dispatch("loopcomplete")),this.setFrame(this.currentFrame)},this),this._timer.on("enterframe",function(a){this.dispatch("enterframe",this.currentFrame,a-this._startTime)},this),this._timer.on("complete",function(){this.dispatch("complete")},this)}}),r=function(b,c){return a.getComputedStyle?a.getComputedStyle(b,null)[c]:b.currentStyle[c]},s=function(a){return/_(png|jpg|jpeg|gif|bmp|)$/.test(a)?v.getRes(a):a},t=function(a,b,d){var e,f,g,h,i,j,k,l,m;if("string"==typeof a)return e=v.getRes(a),"object"!=typeof e||e.mc?e:t(e,b,d);if(Array.isArray(a))return f=[],g={},h={mc:{},res:{}},i=parseFloat(r(d,"width")),j=parseFloat(r(d,"height")),a.forEach(function(a){var b=a.split(" "),c=u();f.push({res:c,x:0,y:0,duration:1}),g[c]={x:-1*b[0],y:-1*b[1],w:i,h:j}}),h.mc[b]={frames:f,frameRate:24},h.res=g,h;if("object"==typeof a&&!a.mc){f=[],g={},h={mc:{},res:{}},a.file&&a.frames&&(a=a.frames);for(k in a)l=a[k],m=u(),f.push({res:m,key:k,x:l.offX,y:l.offY,duration:l.duration===c?1:l.duration}),g[m]={x:l.x,y:l.y,w:l.w,h:l.h};return f=f.sort(function(a,b){return parseInt(a.key.replace(/^[^\d]+/,""))-parseInt(b.key.replace(/^[^\d]+/,""))}),h.mc[b]={frames:f,frameRate:24},h.res=g,h}return a},u=function(a){var b="",c=0;for(a=a||8;c++<a;)b+=Math.floor(16*Math.random()).toString(16);return b.toUpperCase()},v=function(){var g,h,j,k,l,p,q,s,t,u,d={},e=function(a,b,c){var d=new Image;d.onload=function(){d.onload=new Function,b&&b(d)},d.onerror=function(){d.onerror=new Function,c&&c(d),console.error("fail load:"+a)},a=i.test(a)?a:v.baseUrl+a,d.src=a},f=function(a){var b=this;this.superClass.constructor.call(this),e(a,function(a){b.dispatch("success",a)},function(a){b.dispatch("error",a)})};return n(f,o),g=function(b,c,d){var e=function(){if(a.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHttp")}catch(b){return null}}();if(e)return b=i.test(b)?b:v.baseUrl+b,e.open("GET",b,!0),e.onreadystatechange=function(){if(4==e.readyState)if(200==e.status)try{c&&c(JSON.parse(e.responseText.replace(/\s*('|")?duration('|")?/gim,'"duration"')))}catch(a){throw new Error(a.message)}else d&&d(e),console.error("fail load:"+b)},e.send(null),e},h=function(a){var b=this;this.superClass.constructor.call(this),g(a,function(a){b.dispatch("success",a)},function(a){b.dispatch("error",a)})},n(h,o),j=function(a,b){"object"==typeof a&&("image"==a.type?e(a.url,function(){l(a.name,a),b&&b(a)}):"json"==a.type||"sheet"==a.type?g(a.url,function(c){var f,g,d=m({},a,{data:c});l(a.name,d),"sheet"==a.type?(f=a.url.replace(/\.json$/,".png"),g=a.name.replace(/_json$/,"_png"),e(f,function(){var c=m({},a,{url:f,name:g,type:"image"});l(g,c),b&&b(c)})):b&&b(d)}):(l(a.name,a),b&&b(a)))},k=function(){return d},l=function(a,b){if("object"==typeof a)for(var c in a)d[c]=a[c];else d[a]=b},p=function(a,b){var g,h,j,k,l,m,n,e=/\[(\d+\-\d+)\]/,f=e.exec(a);if(f){for(g=[],h=RegExp.$1.split("-"),j=a.replace(e,"").split("_"),k=Number(h[0]);k<Number(h[1])+1;k++)l=j[0]+k+"_"+j[1],m=i.test(d[l].url)?d[l].url:v.baseUrl+d[l].url,g.push(m);return g}return n=d[a],n===c?console.error(a+" does not exist!"):"json"==n.type||"sheet"==n.type?b?n.data.frames[b]:n.data:n.url?i.test(n.url)?n.url:v.baseUrl+n.url:n},q=function(a,c){var d,f,g;if("string"!=typeof a)return a;if(!/^(#|\.)/.test(a))return null;if(d=a.charAt(0),c=c||b,"#"==d)return b.getElementById(a.substr(1,a.length));if(b.querySelectorAll)return c.querySelectorAll(a);try{return c.getElementsByClassName(a)}catch(e){return f=[],g=c.getElementsByTagName("*"),g.forEach(function(b){(" "+b.className+" ").indexOf(" "+a+" ")>-1&&f.push(b)}),f}},s=function(a,b){var e,d=b.groups.find(function(b){return b.name==a});return d===c?console.error('group "'+a+'" dose not exsit!'):e=d.keys.split(",").map(function(a){return a.trim()})},t=function(a,b){var c=[];return a.forEach(function(a){b.indexOf(a.name)>-1&&c.push(a)}),c},u=function(a,b){var e,f,g,h,d=s(a,b);d!==c&&(e=t(b.resources,d),f=this,g=0,h=e.length,this.superClass.constructor.call(this),setTimeout(function(){e.forEach(function(a){j(a,function(){f.dispatch("progress",++g,h,a),g>h-1&&f.dispatch("complete")})})},0))},n(u,o),{IMGloader:f,JSONloader:h,loadGroup:u,getAsset:k,setAsset:l,getRes:p,getStyle:r,el:q}}(),v.baseUrl="images/",a.Extend=a.Extend||m,a.CustEvent=o,a.ClassExtend=n,a.Timer=p,a.MovieClip=q,a.Resource=v}(window,window.document);