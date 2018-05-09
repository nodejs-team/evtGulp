/**
 * Created by mcake on 2016/5/24.
 */
(function($){
  function refreshNumber(ix){}
  function initNum(){
    var $input = $('.pro-num input'),
      $minus = $input.siblings('.minus'),
      $plus = $input.siblings('.plus');
    var items = [];
    $('.slideItem').each(function(ix, el){
      var ponds = $(el).attr('data-pond');
      var ids = $(el).attr('data-postID');
      if(ponds){
        items.push({
          ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
          ix: 0,
          ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
        })
      }
    });
    var currentItem = items[0];
    $minus.on('click', function(){
      var ix = --currentItem.ix;
      if(ix<0){
        ix = currentItem.ix = currentItem.ponds.length-1;
      }
      $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);
    });
    $plus.on('click', function(){
      var ix = ++currentItem.ix;
      if(ix>currentItem.ponds.length-1){
        ix = currentItem.ix = 0;
      }
      $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);
    })
    return function(ix){
      currentItem = items[ix];
      $input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix])
    }
  }

  function BDSlider(el, options){
    //console.log(options)
    this.$wrapper = $(el);
    this.$items = this.$wrapper.children();
    this.percentage = 0.8;
    this.$next = $(options.next);
    this.$prev = $(options.prev);
    this.wrapWidth = this.$wrapper.width();
    this.wrapHeight = this.$wrapper.height();
    this.itemWidth = this.$items.width();
    this.itemHeight = this.$items.height();
    this.isSliding = false;
    this.slideEnd = options.slideEnd || function(ix){};
    // console.log(this.wrapHeight,this.itemHeight)
    this.position = {
      center: {
        top:0,
        left:(this.wrapWidth-this.itemWidth)/2,
        width: this.itemWidth,
        height: this.itemHeight
      },
      left: {
        top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
        left: 0,
        width: this.itemWidth * this.percentage,
        height: this.itemHeight * this.percentage
      },
      right: {
        top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
        left: this.wrapWidth - this.itemWidth * this.percentage,
        width: this.itemWidth * this.percentage,
        height: this.itemHeight * this.percentage
      },
      hide: {
        top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
        left: (this.wrapWidth - this.itemWidth*this.percentage) /2,
        width: this.itemWidth * this.percentage,
        height: this.itemHeight * this.percentage
      }
    };
    this.current = 0;
    this.total = this.$items.length;
    this.autoplay = options.autoplay || false;
    this.init();
  }
  BDSlider.prototype = {
    constructor: BDSlider,
    next: function(){
      if(this.isSliding) return;
      this.current--;
      if(this.current<0){
        this.current = this.total-1;
      }
      this.sliding('right');
    },
    prev: function(){
      if(this.isSliding) return;
      this.current++;
      if(this.current>=this.total){
        this.current = 0;
      }
      this.sliding('left');
    },
    auto:function () {
      if(!this.autoplay) return;
      var self = this;
      function delay(){
        self.timer = setTimeout(function(){
          self.next();
          delay();
        }, 5000)
      }
      delay();
    },
    sliding: function(direction){

      this.isSliding = true;
      var self = this;
      this.$items.each(function(ix, el){
        if(ix == self.current){
          $(el).css('z-index',4).animate(self.position.center,500, function(){
            self.isSliding = false;
            self.slideEnd(self.current);
          }).removeClass('slideRight slideLeft slideHide').addClass('slideCenter').find('span').animate({
            bottom: '28px',
            'font-size': '14px'
          });
          return;
        }
        if(ix == (self.current+1)%self.total){
          $(el).css('z-index', direction=='right' ? 3 : 2).animate(self.position.right,500)
            .removeClass('slideCenter slideLeft slideHide').addClass('slideRight').find('span').animate({
            bottom: '21px',
            'font-size': '12px'
          });
          return;
        }
        if(ix == (self.current-1+self.total)%self.total){
          $(el).css('z-index', direction=='left' ? 3 : 2).animate(self.position.left, 500)
            .removeClass('slideCenter slideRight slideHide').addClass('slideLeft').find('span').animate({
            bottom: '21px',
            'font-size': '12px'
          });
          return;
        }
        $(el).css('z-index', 1).animate(self.position.hide, 500)
          .removeClass('slideCenter slideRight slideLeft').addClass('slideHide')
        // console.log(direction, ix)
        // if((direction == 'right' && ix == (self.current+2)%self.total) || (direction == 'left' && ix == (self.current-2+self.total)%self.total)){
        //
        //     return;
        // }
      })
    },
    init: function(){
      var self = this;
      this.sliding('right');
      this.$next.on('click', function(){
        self.next();
      })
      this.$prev.on('click', function(){
        self.prev();
      })
      this.$wrapper.on('mouseenter', function(){
        clearTimeout(self.timer);
      })
      this.$wrapper.on('mouseleave', function(){
        self.auto();
      })
      this.auto();
    }
  }

  function initSlider(){
    new BDSlider('#bdSlider', {
      prev: '.slidePrev',
      next: '.slideNext',
      autoplay: true,
      slideEnd: function(ix){
        refreshNumber(ix);
      }
    })
  }


  /*领取优惠券*/
  var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
    $rules=$(".quan"),
    $goUse=$(".go-use"),
    $closes=$(".closes");

  function QuanDialog(n) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
  }

  /*关闭*/
  $closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });


  window.QuanDialog = QuanDialog;



  function IEVersion() {
    var userAgent = navigator.userAgent; /*取得浏览器的userAgent字符串*/
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; /*判断是否IE<11浏览器*/
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; /*判断是否IE的Edge浏览器*/
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion == 7) {
        return 7;
      } else if(fIEVersion == 8) {
        return 8;
      } else if(fIEVersion == 9) {
        return 9;
      } else if(fIEVersion == 10) {
        return 10;
      } else {
        return 6;//IE版本<=7
      }
    } else if(isEdge) {
      return 'edge';//edge
    } else if(isIE11) {
      return 11; //IE11
    }else{
      return -1;//不是ie浏览器
    }
  }


  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);

    refreshNumber = initNum();
    initSlider();


    /*浏览器判断*/
    if(IEVersion() > 0 && IEVersion() < 11){
      $("#file-btn").hide();
      $(".zp-btn").click(function () {
        alert("您的浏览器版本过低，\n因此无法上传照片参与抽奖活动，\n请及时更换最新的浏览器！");
      });

    }

  };

  var loadResource = function(){
    if( typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
      startLoader(resData);
    } else {
      var resLoader = new Resource.JSONloader('res.json');
      resLoader.on("success", function (res) {
        startLoader(res);
      });
      resLoader.on("error", function () {
        console.error("资源配置加载失败...");
      });
    }

    function startLoader(data) {
      var loader = new Resource.loadGroup("preload", data);
      var spin = Resource.el('#evt_spin');

      loader.on("progress", function (loaded, total) {
        spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
      });

      loader.on("complete", function () {
        Resource.el('#evt_loading').style.display = "none";
        Resource.el('#evt_container').style.display = 'block';
        correctPNG($('#evt_container').get(0));
        bindScroll('#evt_container');
        loadComplete();
      });
    }

  };

  $(function(){
    loadResource();
  });

})(jQuery);