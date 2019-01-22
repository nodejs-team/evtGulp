// 倒计时
;(function(){
	 var _ordertimer = null;
 function leftTimer(enddate,ele,callback) {
        var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if(days > 0  && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(days + "天  " + hours + ":" + minutes + ":" + seconds);
        }
        else if(days==0 && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(hours + ":" + minutes + ":" + seconds);
        }else if(days<=0 || hours <= 0 || minutes <= 0 || seconds <= 0){
            $(ele).html('已结束');
            callback && callback();
            clearInterval(_ordertimer);
            _ordertimer = null;
        }
        else{
            $(ele).html('已结束');
            callback && callback();
            clearInterval(_ordertimer);
            _ordertimer = null;
        }

    }

 function checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


function goTime(v,ele,callback){
        var date1=new Date(),data2=new Date(v);
        if(data2<date1){
            $(ele).html('已结束！');
            callback && callback();
            clearInterval(_ordertimer);
            return;
        }/*设置的时间小于现在时间退出*/
        _ordertimer = setInterval(function(){leftTimer(data2,ele,callback)}, 1000);

    }

    window.goTime = goTime;
})();



/*使用方法*/

   /*
   <b id="timer"></b>
   
    function actEnd() {
        $(".tuanbtn").addClass("none").html("<span>拼团结束！</span>")
    }
   
    __END_DATE__ = '2018-9-25 09:44:30';
    goTime(__END_DATE__,'#timer',actEnd);
*/