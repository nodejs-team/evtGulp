$(function() {
    /*下红包雨*/
  var _top = $(window).height() - 100;
    function hobYU(callBack) {
        $('.hongbao-wrapper').fadeIn();
        var h_con = 0,
            speed = 500,/*下红包个数200*/
            isPc;
        var HONGBAO = setInterval(function() {
            var _r = ['88%', '90%', '98%', '100%'];
            var _w = ['49%','49.8%', '50%', '51%'];
            var _src = ['1','2', '3'];
            $(window).width() > 800 ? isPc = 0 : isPc = 1;

           /* var HTML_i = $('<i style="background-size:' + _r[parseInt(Math.random() * 4)] + ';top:' + -200+'px; left:' + (parseInt(Math.random() * 20) - isPc) * 20 + '%"><b>+1</b></i>');*/

            var min = 0;
            var max = 2400;
            var rand = (Math.floor(Math.random()*(max-min+1))+min)/2;
            var fw =  (parseInt(Math.random() * 20) - isPc) * 50;


            var HTML_i = $('<i style="background: url(https://act.mcake.com/fangli/2021/pc/summer/images/iceCream-'+_src[parseInt(Math.random() * 4)]+'.png) center no-repeat;  background-size:' + _r[parseInt(Math.random() * 4)] + ';top:' + -100+'px; left:80%; margin-left:-' + rand + 'px"><b></b></i>');

            $('.hongbao-wrapper').append(HTML_i);
            var _left = HTML_i.offset().left + 300;



            if(_left<=600){
                _left = 600
            }else if(_left>=800){
                _left = 800
            }

            HTML_i.animate({
                'top': _top,/*红包雨的整体高度*/
                'left':"80%",
                'marginLeft':  "-"+rand+"px"
            }, 5000, 'linear',function(){
                $(this).fadeOut(100);
            });   /*红包雨的速度  原来是：8000*/

            /*倒计时*/
           // $('.time').html(10 - parseInt(h_con / 20) + 's');   /*100除以20等于5分钟*/

          $('.time').html(10 - parseInt(h_con / 2) + 's');  /*1000（1分钟）/speed(200)=5*/

            if (h_con === 20) {  /* 20*5 = 1000*/
                clearTimeout(HONGBAO);
                var _x = $('.hob-inlet').offset().left - $(window).scrollLeft() + 60,
                    _y = $('.hob-inlet').offset().top - $(window).scrollTop() + 50;

                $('.hongbao-wrapper').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top': '50%',
                    'left': '50%',
                    'opacity': 0
                }, 500);
                $('.hongbao-wrapper *').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top':'50%',
                    'left': '50%',
                    'opacity': 0
                });

                callBack && callBack();
                /*红包雨结束*/
              /*$('.hongbao-wrapper').fadeOut(100);
              $(".hob-inlet").fadeOut(10);
              $(".modal,.shade").fadeIn(200);*/
            } else {
                h_con++;
            }
        }, speed);  /*下红包的个数*/
    }


    var _hob = $('.hongbao-wrapper');
    var _forget = $('.for-get-now');


    /*关闭红包雨*/
    $('.hob-close').click(function(event) {
      $(".modal,.shade").remove();
        var _x = $('.hob-inlet-02').offset().left - $(window).scrollLeft() + 60,
            _y = $('.hob-inlet-02').offset().top - $(window).scrollTop() + 50;
        $('.hongbao-wrapper').addClass('rotate').animate({
            'width': 0,
            'height': 0,
            'top': _y,
            'left': _x,
            'opacity': 0
        }, 500);
        $('.hongbao-wrapper *').addClass('rotate').animate({
            'width': 0,
            'height': 0,
            'top': _y,
            'left': _x,
            'opacity': 0
        }, 500, function() {
            $('.hongbao-wrapper').hide();
        });
        $(".hob-inlet").fadeOut();
        return false
    });
   /* _forget.click(function(event) {
        _hob.fadeOut();
        modal.show('#hobCoupon');
    });
*/


   window.hobYU=hobYU;

    /*开始抢红包*/
    /*$(".hob-inlet-01").click(function () {
      if(!isSupportCss3){
        alert("请升级你的浏览器，参与抽奖活动！");
      }else{
        hobYU();
      }
    });*/

    /*点击抢红包*/
    /*$(document).on("click","i",function(){
        $(this).addClass('gethb');
        $(this).find("b").text("+8元");
    });*/

    /*使用红包*/
    $(".go-use").click(function () {
      $(".hob-inlet").fadeOut();
      $(".modal,.shade,.shade1").fadeOut(10);
      scrollTopAni("#zhekou");
      return false;
    });
    $(".fls1,.mod-close").click(function () {
        $(".hob-inlet").fadeOut();
        $(".modal,.shade,.shade1").fadeOut(10);
        return false;
    });
});