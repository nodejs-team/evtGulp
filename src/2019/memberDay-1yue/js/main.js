/**
 * Created by mcake on 2016/5/24.
 */
(function($){



  var loadComplete = function () {

    /*商品价格计算*/
    new Price('.js_price',{
      add:'.add',
      reduce:'.reduce'
    },[20,40,60,0],1);


    /*购物清单*/
    $(".floater").fadeOut(10);
    $("html,body").animate({scrollTop: 0},500,function () {
      floater();
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



function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

/*倒计时*/
+!(function () {

  var Stamp;
  Stamp = new Date();

  if (Stamp.getDay() == 2){
    __END_DATE__ = getNowFormatDate() +' 10:00:00';
  } else {
    var num = 7-Stamp.getDay()+2;
    Stamp.setDate(Stamp.getDate() + num);

    var year = Stamp.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = Stamp.getMonth() +1; //获取当前月份(0-11,0代表1月)
    var mvar ='';
    if(month<10){
      mvar = '0' + month;
    }else{
      mvar = month+'';
    }
    var day = Stamp.getDate();
    var dvar ='';
    if(day<10){
      dvar = '0' + day;
    }else{
      dvar = day+'';
    }
    __END_DATE__ = year+"-"+mvar+'-'+dvar +' 10:00:00';    /*手机上需要转换成时间戳*/
  }


  var data = new Date(__END_DATE__).getTime();
  /*console.log(__END_DATE__);*/
  function actEnd1() {
    status = 1;
    $(".no-buy1").fadeOut(0);
    $(".now-buy1").fadeIn(0);
    $(".no-buy2").fadeOut(0);
    $(".now-buy2").fadeIn(0);
  }
  goTime(data,'#timer1',actEnd1);


})();




