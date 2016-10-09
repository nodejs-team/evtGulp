(function($, window, undefined){
	window.App = window.App || {};
	App.page = {};
	App.lib = {};
	
	var _provide = function (methods) {
        for (var i in methods) {
            if (methods.hasOwnProperty(i)) {
                App[i] = methods[i];
            }
        }
    };

    var _extend = function (source) {
        var props = Array.prototype.slice.call(arguments, 1);
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

	App.events = (function(){
		var isMobile = 'ontouchstart' in document,
		events = {
			start: isMobile ? "touchstart" : "mousedown",
			move: isMobile ? "touchmove" : "mousemove",
			end: isMobile ? "touchend" : "mouseup"
		};
		return events;
	})();
		
	_extend(App.events, {
		_events: {},
		guid: 0,
		on: function(name, cb){
			if( name == undefined ) return;
			if( !this._events[name] )
				this._events[name] = [];	
			
			cb.guid = ++this.guid;
			this._events[name].push(cb);
		},
		one: function(name, cb){
			var that = this;
			this.on(name, function(){
				cb && cb.apply(window, arguments);
				that.off(name, arguments.callee);
			});
		},
		off: function(name, cb){
			var eventList = this._events[name];
			if( !eventList ) return;
			
			if( !cb )
			  return delete this._events[name];
			
			eventList.forEach(function(b, i){
				if( b && b.guid == cb.guid )
					eventList.splice(i, 1);
			});	
		},
		fire: function(name){
			var args = Array.prototype.slice.call(arguments, 1);
			var eventList = this._events[name];
			if( !eventList ) return;
			
			eventList.forEach(function(b, i){
				b.apply(window, args);	
			}); 	
		}	
	});
	
	App.lib.util = {
		isMobile: 'ontouchstart' in document,
		events: (function(){
			var isMobile = 'ontouchstart' in document,
			events = {
				start: isMobile ? "touchstart" : "mousedown",
				move: isMobile ? "touchmove" : "mousemove",
				end: isMobile ? "touchend" : "mouseup"
			};
			return events;
		})(),
		support3d: function(){
			if( this.has3d != undefined ) return this.has3d;
			if("checked" in arguments.callee){
				return arguments.callee.checked;
			}
			if('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())
				return true;
			else{
				var props = ['perspectiveProperty', 'MozPerspective', 'OPerspective', 'msPerspective'];
				for( var i in props )
					if(props[i] in document.documentElement.style)
						return true;
						
			}
			return false;
		},
		touchSwipe: function(cb){
			var events = App.lib.util.events;
			var startY;
			var touchStart = function(e){
				var target = this;
				startY = e.touches ? e.touches[0].pageY : e.pageY;
			};
			
			var touchMove = function(e){
				e.preventDefault();	
			};
			
			var touchEnd = function(e){
				var target = this;
				var endY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
				if( Math.abs(endY - startY) > 30 ){
					cb && cb(target, endY - startY);
				}
			};
			
			var $doc = $(document);
			
			var d = {
				dispose: function(page){
					$doc.on(events.start, page, touchStart);
					$doc.on(events.move, page, touchMove);
					$doc.on(events.end, page, touchEnd);	
				},
				destroy: function(page){
					$doc.off(events.start, page, touchStart);
					$doc.on(events.move, page, touchMove);
					$doc.off(events.end, page, touchEnd);		
				}
			};
			
			return d;
		}
	};
	
	App.lib.util.make3d = (App.lib.util.has3d = App.lib.util.support3d()) ? function( top ){
		top = /^[-\d]+$/.test(top) ? top + "px" : top;
		return "translate3d(0px, "+ top +", 0px)"
	} : function(top){
		top = /^[-\d]+$/.test(top) ? top + "px" : top;
		return "translateY("+ top +")";
	};
	
	App.page = {
		loader: function(){
			/**===资源加载器===**/
			var onLoad = function( src, callback ){
				var img = new Image();
				img.onload = function(){
					img.onload = new Function;
					callback && callback( img );
				};
				img.onerror = function(){
					img.onerror = new Function;
					console.log("load failed: " + src);
					callback && callback( img );
				};
				img.src = __config && __config.cdnHost ? __config.cdnHost + src : src;
			};
			
			var resLoader = function( list, progress ){
				if( !(list instanceof Array) ){
					list = list.split(",");	
				}
				var index = 0,
					length = list.length;
				
				onLoad(list[index], function( imgEl ){
					progress && progress(++index, length, imgEl);
					if( index > length - 1 )
						return;
					onLoad(list[index], arguments.callee);
				});
			}; 
			
			return resLoader;
		}(),
		scrollTo: function(index, dir){
			var target = $(".page").eq(index-1)[0];
			this.doScroll(target, dir);
		},
		doScroll: function(target, dir){
			if( this.isScrolling ) return;
			this.isScrolling = true;
			
			var that = this,
				$target = $(target),
				Util = App.lib.util,
				dist, $relaEl, relaEl, start;
			
			if( dir > 0 ){
				dist = "100%";
				start = "-100%";
				$relaEl = $target.prev();
			} else {
				dist = "-100%";
				start = "100%";
				$relaEl = $target.next();	
			}
			
			if( !(relaEl = $relaEl[0]) ) return;
			
			$target.css({
				"-webkit-transform": Util.make3d(dist)
			});
			
			$relaEl.css({
				"-webkit-transform": Util.make3d(start),
				"display": "block"
			});
			
			try{
				relaEl.offsetWidth;
			}catch(e){}
			
			$relaEl.css({
				"-webkit-transform": Util.make3d(0)
			});
			
			$target.on("webkitTransitionEnd", function(){
				target.style["-webkit-transform"] = "";
				relaEl.style["-webkit-transform"] = "";
				target.style.display = "none";
				$relaEl.addClass("active");
				$target.removeClass("active");
				
				var onNames = relaEl.getAttribute("data-on");
				var offNames = target.getAttribute("data-off");
				if( onNames ){
					onNames.split(" ").forEach(function(n, i){
						n = n.trim();
						App.events.fire(n, {target: relaEl});
					});
				}
				
				if( offNames ){
					offNames.split(" ").forEach(function(n, i){
						n = n.trim();
						App.events.fire(n, {target: target});
					});	
				}
				
				that.isScrolling = false;
				
				$target.off("webkitTransitionEnd", arguments.callee);
			});		
		}
	}
	
	App.page.lighter = {
	  init: function(){
		this.lighter = document.getElementById("wel-lighter");
		var b = "",
		w = (this.lighter.offsetWidth+4)/10,
		h = w,
		Left, Top, Right, Bottom;
		for(var i=0; i<30; i++){
			if( i < 10 ){
			  Left = i*w,
			  Top = 0,
			  Right = "";
			  Bottom = "";
			}
			else if( i>=10&&i<15 ){
				Left= "";
				Right = 0;
				Top = (i-10+1)*w;
				Bottom = "";
			}
			else if( i>=15&&i<25 ){
				Left = "";
				Right = (i-15)*w;
				Top = "";	
				Bottom = 0;
			} else {
				Left = 0;
				Right = "";
				Bottom = (4-(29-i)+1)*w;
				Top = "";	
			}
			
			b += "<b style='width:"+(w-4)+"px;height:"+(h-4)+"px;left:"+ Left +"px;top:"+ Top +"px;right:"+Right+"px;bottom:"+Bottom+"px'></b>";
		}
		this.lighter.innerHTML = b;
	
	 },
	 start: function(){
		if( !this.inited ){
			this.init();
			this.inited = true;
		}
		var bs = this.lighter.getElementsByTagName("b"),
		kypoint = [0,4,9,13,15,17,24,28],
		clspoint = ["red", "yellow", "yellow", "red", "red", "yellow", "red", "yellow"],
		goLighter = function(){
			for(var j=0; j<bs.length; j++){
				bs[j].className = "";	
			}
			for(var i=0; i<kypoint.length; i++){
				kypoint[i] += 1;
				if( kypoint[i]>29 )
					kypoint[i] = 0;
				bs[kypoint[i]].className = clspoint[i];
			};
		};
		this.timer = setInterval(goLighter, 300);
	 },
	 stop: function(){
		this.timer && clearInterval(this.timer);
	 }
 };
 
 _extend(App, {
	start: function(){
		var Util = App.lib.util;
		var touchSwipe = Util.touchSwipe(App.page.doScroll);
		touchSwipe.dispose(".page");
		
		App.page.scrollTo(1, -1);
		
		App.events.one("removeLoader", function(){
			document.getElementById("loader").parentNode.removeChild(loader);
		});
		
		App.events.one("welcome", function(){
			$("#a_enterGame").on(App.events.start, function(e){
				e.preventDefault();
				App.page.scrollTo(1, -1);	
			});
			$("#a_rule").on(App.events.start, function(e){
				e.preventDefault();
				$("#dialog-rule").show();	
			});
		});
				
		App.events.on("turnlight", function(){
			App.page.lighter.start();
		});
		
		App.events.on("offlight", function(e){
			App.page.lighter.stop();
		});
		
		App.events.on("center", function(){
			$("#getGameRule").show();
		});
		
		App.events.one("center", function(){
			$("#getGameRule").on(App.events.start, function(){
				$("#c_dialog").show();	
			});
		});
		
		App.events.on("hideBtn", function(e){
			$("#getGameRule").hide();
		});
		
		$(document).on(App.events.start, "[data-dismiss]", function(e){
			e.preventDefault();
			$(this).closest(".dialog").hide();	
		});
		
		$(".start-game").each(function(){
			var href = this.getAttribute("href");
			this.href = href + (href.indexOf("?")==-1 ? "?" : "&") + "openId=" + __config.openId;	
		});
	}	 
 });

WXApi.ready(function(){
	var recordShare = function(){
		$.ajax({
			url:"/sypro/gameInfoController.do?uploadShare&openId=" + __config.openId + "&eventId=16"
		});
	};
	WXApi.deploy(recordShare);
	
	//资源加载队列
	var loadArray = ["images/wel-logo.png", "images/cols-main.jpg", "images/horse1.png", "images/horse2.png", "images/horse3.png", "images/wel-footer.jpg", "images/center-logo.png", "images/logo-lighter.png", "images/jiazi.png", "images/boat.png", "images/start-btn.png", "images/zhangpeng.png", "images/flag.png", "images/center-foot-nav.png", "images/flip-logo.png", "images/shake-decorate.png", "images/shake-bottle.png", "images/award-hint-top.jpg", "images/rule-top.png", "images/ranking-top.png", "images/contact-top.png", "images/center-bg.jpg"];
	var loaderNum = document.getElementById("ld_percent");
	App.page.loader(loadArray, function(loaded, total){
		loaderNum.innerText = Math.floor((loaded/total)*100).toString() + "%";
		if( loaded == total ){
			App.start();
		}
	});
	
 });
 
})(this.jQuery||this.Zepto, window);