/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  /*主页磅数选择
   * 1磅减40元，
   * 2磅减60元，
   * 3磅减80元，
   * 5磅减140元
   * */
  function Price(els,opts,disArr,percent) {
    this.$els = $(els);
    this.$add = this.$els.find(opts.add);
    this.$reduce = this.$els.find(opts.reduce);
    this.num=0;
    this.max=50;
    this.oldPrice =0;
    self.bs = 0;
    this.totalOldprice =0;
    this.totalPrice =0;
    this.dis = 0;
    this.disArr = disArr;
    this.percent = percent;
    this.disCount = 0;
    this._init();
  }

  Price.prototype={
    add:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if(self.num<self.max){
        self.num++;
      }
      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    reduce:function (ele) {
      var self = this;
      self.num = ele.parents(".price").find('.num').text()-0;
      if(self.num>1){
        self.num--;
      }
      ele.siblings().find('.num').text(self.num);
      self.numCounts(ele);
    },
    /*数量加减后计算价格*/
    numCounts:function (ele) {
      var self = this;
      var cur = ele.parents(".price").find('.price_p li.cur');
      self.oldPrice = cur.data('oldprice');
      self.num = ele.parents(".price").find('.num').text()-0;
      var ix = parseInt(self.num / 2);

      self.bs = cur.data('bs');
      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;

      ele.parents(".price").find('.old-price').html(self.totalOldprice);  /*原价*/
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2)); /*现价*/
    },
    /*磅数选择后计算价格*/
    counts:function (ele) {
      var self = this;
      self.oldPrice = ele.data('oldprice');
      self.num = ele.parents(".price").find('.num').text()-0;
      /* var ix = parseInt(self.num / 2);*/

      self.bs = ele.data('bs');
      self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

      self.totalOldprice =self.oldPrice * self.num;
      self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
      ele.parents(".price").find('.old-price').html(self.totalOldprice);
      ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
    },
    /*折扣：通过判断磅数决定减多少*/
    disFun:function (bs,discount) {
      switch (bs){
        case 1:
          this.dis = discount[0];
          break;
        case 2:
          this.dis = discount[1];
          break;
        case 3:
          this.dis = discount[2];
          break;
        case 5:
          this.dis = discount[3];
          break;
      }
      return this.dis;
    },
    /*磅数选择*/
    bsSelect:function (ele) {
      var self = this;

      ele.hover(function () {
        ele.addClass('hover').siblings().removeClass('hover');
      },function () {
        ele.removeClass('hover');
      });
      ele.click(function () {
        ele.addClass('cur').siblings().removeClass('cur');
        self.counts($(this));
      });
    },
    /*初始化数量和价格*/
    numInit:function () {
      var self = this;
      var Oldprice = 0;

      this.$els.each(function () {
        Oldprice = $(this).find('.price_p li.cur').data('oldprice');
        var totalNum = $(this).find(".num").text()-0;
        var totalOldprice = Oldprice * totalNum;
        /*var ix = parseInt(totalNum / 2);*/

        self.bs = $(this).find('.price_p li.cur').data('bs');
        self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
        var totalPrice =(Oldprice - self.disCount) * self.percent * totalNum;

        $(this).find('.old-price').html(totalOldprice);
        $(this).find('.now-price').html(totalPrice.toFixed(2));
      });

    },

    _init:function () {
      var self = this;
      this.numInit();

      this.$els.find('.price_p li').each(function () {
        self.bsSelect($(this));
      });

      /*换购*/
      this.$els.find('.huangou').each(function () {
        var a = false;
        $(this).click(function () {
          if(a){
            $(this).find(".icon").addClass("on");
            a = false;
          }else{
            $(this).find(".icon").removeClass("on");
            a = true;
          }
        });
      });

      this.$add.hover(function () {
        $(this).addClass("on");
      },function () {
        $(this).removeClass("on");
      });
      this.$reduce.hover(function () {
        $(this).addClass("on");
      },function () {
        $(this).removeClass("on");
      });

      this.$add.click(function () {
        self.add($(this));
      });
      this.$reduce.click(function () {
        self.reduce($(this));
      });
    }
  };

  /*点击复制地址*/
  function copyUrl(str){
    var Url = document.getElementById(str);
    Url.select();
    document.execCommand("Copy");
    alert("已复制好，可贴粘。");
  }



  $(".voteItem").each(function (i) {
    var tHTML = $(this).html();
    if(i===0){
      $(this).html('<div class="mark mark-1 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-1"></div>'+ tHTML);
      $(this).find(".buy_btn_box").before('<h2><p class="p-new"><em>吃货价</em><i>￥</i><span class="now-price">298</span></p><p class="p-old  delete"> ￥<b class="old-price">298</b>.00</p></h2>');
    }else if(i===1){
      $(this).html('<div class="mark mark-2 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-2"></div>'+ tHTML);
      $(this).find(".buy_btn_box").before('<h2><p class="p-new"><em>吃货价</em><i>￥</i><span class="now-price">298</span></p><p class="p-old delete"> ￥<b class="old-price">298</b>.00</p></h2>');
    }else if(i===2){
      $(this).html('<div class="mark mark-3 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-3"></div>'+ tHTML);
      $(this).find(".buy_btn_box").before('<h2><p class="p-new"><em>吃货价</em><i>￥</i><span class="now-price">298</span></p><p class="p-old delete"> ￥<b class="old-price">298</b>.00</p></h2>');
    }else if(i<8){
      $(this).html('<div class="mark"><span>'+(i+1)+'</span></div>'+tHTML);
      $(this).find(".buy_btn_box").before('<h2><p class="p-old bigfont"><i>￥</i><b class="old-price">298</b>.00</p></h2>');
    }
  });


  /*领取优惠券*/
  var $Dialogbg = $(".Dialogbg-tip"),
    $Dialog=$(".Dialog-tip"),
    $rules=$(".tip"),
    $goUse=$(".go-wait"),
    $closes=$(".closes");

  function QuanDialog(n) {
    if(n==2){
      $closes.fadeOut(0);
    }else{
      $closes.fadeIn(0);
    }
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".tip-"+n).fadeIn(300).siblings().not(".closes").hide();

  }

  /*关闭*/
  $closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
    $(".CodeRight").fadeIn(200);
  });

  $goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
  });


  window.QuanDialog = QuanDialog;


  /*投票*/
  var Vote = {
    totalNum:MaxVoteNum,
    voteNum:0,
    percent: 0,
    voteAni:function (ele) {
      var self = ele;
      this.voteNum = self.siblings('.ptxt').find(".voteNum").text()-0;

      this.voteNum++;
      this.percent = this.voteNum / this.totalNum;

      if(this.percent >=1){
        this.percent=1;
        this.voteNum = this.totalNum;
      }

      self.siblings('.ptxt').find(".voteNum").text(this.voteNum);
      self.siblings(".percent").stop().animate({
        width:(this.percent*100)+"%"
      },500);

    },

    vote:function (ele) {

      this.voteNum = ele.parent(".voteItem").find('.ptxt').find(".voteNum").text()-0;
      this.voteNum++;
      Vote.percent = this.voteNum / Vote.totalNum;

      if(Vote.percent >=1){
        Vote.percent=1;
       /* this.voteNum = Vote.totalNum;*/
      }

      ele.parent(".voteItem").find('.ptxt').find(".voteNum").text(this.voteNum);
      ele.parent(".voteItem").find(".percent").stop().animate({
        width:(Vote.percent*100)+"%"
      },500);

    },

    init:function () {
      var self = this;

     /* $(".vote-btn").click(function () {
        self.vote($(this));
      });*/
      /*刷新初始化*/
      $(".voteItem").each(function () {
        self.voteNum = $(this).find(".voteNum").text()-0;
        self.percent = self.voteNum / self.totalNum;
        $(this).find(".voteNum").text(self.voteNum);
        $(this).find('.percent').stop().animate({
          width:(self.percent*100)+"%"
        },500);
      });
    }
  };
  window.voteFun = Vote.vote;
  Vote.init();


  var loadComplete = function () {
    /*刚进入页面，自动滚动到顶部*/
    $("html,body").animate({scrollTop: 0},500);
    /*banner适配第一屏*/
    new BannerRedraw(".sec-banner", ['.evt-content','.banner-bg','.cake-title','.b-cake-1','.b-cake-2','.b-cake-3']);

    /*3,5,7的倍数，去掉右margin*/
    $('.vote-cake .row:nth-child(2n+1)').addClass("noMargin");
    $('.vote-cake .row:nth-child(2n+1)').css('margin-right',0);

     if(IEVersion() == 8){
       $(".ewm-box").html('<p>请升级浏览器，<br> 或直接复制链接<br>参与投票！</p>');
       $(".code-wrap").html('<p>请升级<br>浏览器</p>');
    }

   /*电话号码中间4位用*代替*/
    $(".vote-txt li").each(function () {
      var mobile = $(this).find('.tel-phone').text();
      var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
      var tel = mobile.replace(reg, "$1****$3");
      $(this).find('.tel-phone').text(tel);
    });

    /*价格计算*/
    new Price('.js_price1',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0.8);

    new Price('.js_price2',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0.85);

    new Price('.js_price3',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0.9);

    new Price('.js_price',{
      add:'.add',
      reduce:'.reduce'
    },[0,0,0,0],0);



    $(".fuli-btn-1,.fuli-1-hover").hover(function () {
      $(".fuli-1-hover").addClass("DBlock");
    },function () {
      $(".fuli-1-hover").removeClass("DBlock");
    });

    $(".fuli-1-hover,.fuli-2-hover").removeClass("DBlock");
    $(".fuli-btn-2,.fuli-2-hover").hover(function () {
      $(".fuli-2-hover").addClass("DBlock");
    },function () {
      $(".fuli-2-hover").removeClass("DBlock");
    });

    $(".vote-btn,.more,.buy_btn_box li").hover(function () {
      $(this).addClass("hover");
    },function () {
      $(this).removeClass("hover");
    });

    $(".copyBtn1").click(function () {
      copyUrl("ewmUrl1");
    });


    $(".copyBtn2").click(function () {
      copyUrl("ewmUrl2");
    });

    $(".code-url").click(function () {
      var val= $(this).find("input").data("val");
      $(this).find("input").val(val);
    });

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


