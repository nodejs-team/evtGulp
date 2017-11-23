/**
 * Created by mcake on 2016/5/24.
 */
(function($){

  function setNumber(hours, minites, seconds) {
    hours = hours.toString();
    minites = minites.toString();
    seconds = seconds.toString();
    return '<span class="flip hour">' +
      '            <span style="background-position: 0 -'+ Number(hours.charAt(0))*48 +'px;"></span>' +
      '            <span style="background-position: 0 -'+ Number(hours.charAt(1))*48 +'px;"></span>' +
      '          </span>' +
      '          <span class="flip minite">' +
      '            <span style="background-position: 0 -'+ Number(minites.charAt(0))*48 +'px;"></span>' +
      '            <span style="background-position: 0 -'+ Number(minites.charAt(1))*48 +'px;"></span>' +
      '          </span>' +
      '          <span class="flip second">' +
      '            <span style="background-position: 0 -'+ Number(seconds.charAt(0))*48 +'px;"></span>' +
      '            <span style="background-position: 0 -'+ Number(seconds.charAt(1))*48 +'px;"></span>' +
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

  var loadComplete = function () {
    var fliper = document.getElementById("count_fliper");
    countDown(__END_DATE__, function(hours, minites, seconds){
      fliper.innerHTML = setNumber(hours, minites, seconds);
    }).start();

   /* var fliper2 = document.getElementById("count_fliper2");
    countDown(__END_DATE__, function(hours, minites, seconds){
      fliper2.innerHTML = setNumber(hours, minites, seconds);
    }).start();*/


  };

  var loadResource = function(){
    if( typeof resData === 'object' && Array.isArray(resData.resources) && resData.resources.length > 0 ){
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