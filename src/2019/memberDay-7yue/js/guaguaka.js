/**
 * Created by mcake on 2016/5/24.
 */
(function(bodyStyle) {

 /* bodyStyle.mozUserSelect = 'none';

  bodyStyle.webkitUserSelect = 'none';*/

  if(!isSupportCss3){

    $(".cover").fadeIn(0);
    $(".guaka").fadeOut(0);
    $(".pct .cover").click(function () {
      $(".cover").fadeOut(500);

    });
    return;
  }

  var img = new Image();

  var canvas = document.querySelector('canvas');

  canvas.style.backgroundColor='transparent';

  canvas.style.position = 'absolute';



  img.addEventListener('load', function(e) {

    var ctx;

    var w = img.width,

      h = img.height;

    var offsetX = canvas.offsetLeft,

      offsetY = canvas.offsetTop;

    var mousedown = false;


    function layer(ctx) {

      ctx.fillStyle = 'red';

     /* ctx.fillRect(0, 0, w, h);*/



      ctx=canvas.getContext("2d");
      var img=document.getElementById("tulip");

      ctx.drawImage(img,0, 0, w, h);

    }



    function eventDown(e){

      e.preventDefault();

      mousedown=true;

    }



    function eventUp(e){

      e.preventDefault();

      mousedown=false;

    }



    function eventMove(e){

      e.preventDefault();



      if(mousedown) {

        if(e.changedTouches){

          e=e.changedTouches[e.changedTouches.length-1];

        }

        var rect = canvas.getBoundingClientRect();

        var x = (e.clientX + document.body.scrollLeft || e.pageX) - rect.left * (canvas.width / rect.width) || 0,

          y = (e.clientY + document.body.scrollTop || e.pageY) - rect.top * (canvas.height / rect.height) || 0;



        with(ctx) {

          beginPath()

          arc(x, y, 30, 0, Math.PI * 2);

          /*画*/
          fill();

          /*执行函数*/
          percent = getPercent();
          callback(function () {
            $(".guaka").fadeOut(100);
          });

        }

      }

    }



    canvas.width=w;

    canvas.height=h;

    canvas.style.backgroundImage='url('+img.src+')';

    ctx=canvas.getContext('2d');

    ctx.fillStyle='transparent';

    ctx.fillRect(0, 0, w, h);

    layer(ctx);



    ctx.globalCompositeOperation = 'destination-out';



    canvas.addEventListener('touchstart', eventDown);

    canvas.addEventListener('touchend', eventUp);

    canvas.addEventListener('touchmove', eventMove);

    canvas.addEventListener('mousedown', eventDown);

    canvas.addEventListener('mouseup', eventUp);

    canvas.addEventListener('mousemove', eventMove);


    var percent=null;
    var percented = 10; /*画的比例*/
    /*补充函数*/
    function getPercent() {
      var percent;
      var counter = 0;  /*number of pixels clear*/
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      var imageDataLength = imageData.data.length;

      for(var i = 0; i < imageDataLength; i += 4) {
        if (imageData.data[i] === 0 && imageData.data[i+1] === 0 && imageData.data[i+2] === 0 && imageData.data[i+3] === 0) {
          counter++;
        }
      }

      if (counter >= 1) {
        percent = (counter / (canvas.width * canvas.height)) * 100;
      } else {
        percent = 0;
      }

      return percent;
    }


    function callback(callback) {
      if (callback != null && percent >= percented) {
        callback();
      }
    };



  });

  img.src = 'http://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/pct-txt.png';



})(document.body.style);