/**
 * Created by shimily on 2019/7/12.
 */
function setNumber(hours, minites, seconds) {
  hours = hours.toString();
  minites = minites.toString();
  seconds = seconds.toString();
  return '<span class="flip hour">' +
    '            <span style="background-position: 0 -'+ Number(hours.charAt(0))*31.5 +'px;"></span>' +
    '            <span style="background-position: 0 -'+ Number(hours.charAt(1))*31.5 +'px;"></span>' +
    '          </span>' +
    '          <span class="flip minite">' +
    '            <span style="background-position: 0 -'+ Number(minites.charAt(0))*31.5 +'px;"></span>' +
    '            <span style="background-position: 0 -'+ Number(minites.charAt(1))*31.5 +'px;"></span>' +
    '          </span>' +
    '          <span class="flip second">' +
    '            <span style="background-position: 0 -'+ Number(seconds.charAt(0))*31.5 +'px;"></span>' +
    '            <span style="background-position: 0 -'+ Number(seconds.charAt(1))*31.5 +'px;"></span>' +
    '          </span>';
}

function padZero(n){
  return n < 10 ? "0" + n : n
}

function countDown(date, onChange, onEnd){
  var targetTimes = new Date(date).getTime();
  var timer = null;

  function calculate() {
    var times = parseInt((targetTimes - new Date().getTime())/1000);

    if(times < 0) return stop();

    var hours = Math.floor(times / (60 * 60 ));
    var minites = Math.floor(times / 60 % 60);
    var seconds = times % 60;
    typeof onChange === 'function' && onChange(padZero(hours), padZero(minites), padZero(seconds));
  }

  function start(){
    calculate();
    timer = setInterval(calculate, 1000);
  }

  function stop(){
    clearInterval(timer);

    typeof onEnd === 'function' && onEnd();
  }

  return {
    start: start,
    stop: stop
  }

}

var fliper = document.getElementById("count_fliper");
countDown(__END_DATE__, function(hours, minites, seconds){
  fliper.innerHTML = setNumber(hours, minites, seconds);
},function () {

  /*活动时间从10点开始,十点前显示：未开始*/
  var hour = new Date().getHours();
  if(hour<10){
    $(".btn-n").addClass("end").html("<span>未开始</span>");
  }else{
    /*倒计时结束后，显示：已结束*/
    $(".btn-n").addClass("end").html("<span>已结束</span>");
  }

}).start();