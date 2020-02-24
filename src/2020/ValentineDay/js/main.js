/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  var sub=function(str,n){

    var r=/[^\x00-\xff]/g;
    if(str.replace(r,"mm").length<=n){return str;}
    var m=Math.floor(n/2);
    for(var i=m;i<str.length;i++){
      if(str.substr(0,i).replace(r,"mm").length>=n){
        return str.substr(0,i);
      }
    }
    return str;
  }
  String.prototype.len = function()
  {
    return this.replace(/[^\x00-\xff]/g, "xx").length;
  }

  var loadComplete = function () {
    $("html,body").animate({scrollTop: 0},500);
    /*获取当前日期*/
    var vDate = new Date();
    var myDate = vDate.getFullYear() + '.' + (vDate.getMonth() + 1) + '.' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
    $(".data-time").text(myDate);

    $(".closeX").click(function () {
      $(".letter-tip").fadeOut(100);
    });

    $(document).on("keyup","textarea",function(){
      $(this).val(sub($(this).val(),180));
      $(".tips samp").html("最多可输入90个字("+parseInt(($("textarea").val().len())/2)+"\/90)");
    });

    var swiper1 = new Swiper('.swiper1', {
      grabCursor: true,
      loop:true,
      autoplay : 3000,
      autoplayDisableOnInteraction : true
    });

    $(".chakan").click(function () {
      new Dialog(".Dialogbg",'.DialogBox',{
        close:'.closes',
        btn:'.go-use'
      },1,10);
    });

    /*加换购*/
    $(".row").find('.huangou').each(function () {
      var cakePrice = $(this).parents(".row").find(".dis-old").data("price");
      var hgPrice = $(this).parents(".row").find(".hg").data("price");
      $(this).parents(".row").find(".dis-price").text(cakePrice+hgPrice);
      $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
      var a = true;
      $(this).click(function () {
        if(!a){   /*换购*/
          $(this).find(".icon").addClass("on");
          $(this).parents(".row").find(".jia").fadeIn(100);
          $(this).parents(".row").find(".dis-price").text(cakePrice+hgPrice);
          $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
          $(this).parents(".row").find(".buy_btn").attr("data-repurchase",1);
          a = !a;
        }else{   /*不换购*/
          $(this).find(".icon").removeClass("on");
          $(this).parents(".row").find(".jia").fadeOut(0);
          $(this).parents(".row").find(".dis-price").text(cakePrice);
          $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice);
          $(this).parents(".row").find(".buy_btn").attr("data-repurchase",0);
          a = !a;
        }
      });
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
/*阻止页面内容被选中*/
document.body.onselectstart = function () {
  return false;
};






