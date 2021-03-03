function Bridge(options){
  /*函数内容部设置属性*/
  this.__init(options);
}

Bridge.prototype={
  __init:function(options){  /*只允许内部调用的方法【仅内部调用】*/
    /*console.log(options);*/

    var bridge = document.getElementById(options.ele),
      bridgeCanvas = bridge.getContext('2d'),
      brushRadius = (bridge.width / 100) * 5,
      img = new Image();

    /*console.log(brushRadius);*/
    if (brushRadius < 20) { brushRadius = 20 }

    img.onload = function(){
      bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
    }
    img.loc = options.src;
    img.filename = options.img;
    if (window.devicePixelRatio >= 2) {
      var nameParts = img.filename.split('.');
      img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
    } else {
      img.src = img.loc + img.filename;
    }

    function detectLeftButton(event) {
      if ('buttons' in event) {
        return event.buttons === 1;
      } else if ('which' in event) {
        return event.which === 1;
      } else {
        return event.button === 1;
      }
    }

    function getBrushPos(xRef, yRef) {
      var bridgeRect = bridge.getBoundingClientRect();
      return {
        x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
        y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
      };
    }

    function drawDot(mouseX,mouseY){
      bridgeCanvas.beginPath();
      bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
      bridgeCanvas.fillStyle = '#000';
      bridgeCanvas.globalCompositeOperation = "destination-out";
      bridgeCanvas.fill();
      /*擦除结束后，执行函数*/
     percent = getPercent();

    if(percent >= percented){
      callback(function () {
        bridgeEnd(options.ele, options.money); /* 擦除结束，执行一个函数*/
      });
    }
      /*console.log(percent);*/

    }

    var percent=null;
    var percented = 3; /*涂画的比例*/
    /*补充函数,判断涂抹到30%的时候，涂抹结束*/
    function getPercent() {
      var percent;
      var counter = 0;  /*number of pixels clear*/
      var imageData = bridgeCanvas.getImageData(0, 0, bridge.width, bridge.height);

      var imageDataLength = imageData.data.length;

      for(var i = 0; i < imageDataLength; i += 4) {
        if (imageData.data[i] === 0 && imageData.data[i+1] === 0 && imageData.data[i+2] === 0 && imageData.data[i+3] === 0) {
          counter++;
        }
      }

      if (counter >= 1) {
        percent = (counter / (bridge.width * bridge.height)) * 100;

      } else {
        percent = 0;
      }

      return percent;
    }


    function callback(callback) {
      if (callback != null && percent >= percented) {
        callback();
      }
    }


    bridge.addEventListener("mousemove", function(e) {
      var brushPos = getBrushPos(e.clientX, e.clientY);
      var leftBut = detectLeftButton(e);
      if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
      }
    }, false);

    bridge.addEventListener("touchmove", function(e) {
      e.preventDefault();
      var touch = e.targetTouches[0];
      if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);

      }
    }, false);

  }

};

/*
var Bridge1 = new Bridge({
 ele:'bridge1',
  src:'../images/',
  img:'guagua-cover.png',
  money:"40"
});

var Bridge2 = new Bridge({
 ele:'bridge2',
  src:'../images/',
  img:'guagua-cover.png',
  money:"50"
});

var Bridge3 = new Bridge({
 ele:'bridge3',
  src:'../images/',
  img:'guagua-cover.png',
  money:"58"
});
*/



/*
(function () {

  var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = (bridge.width / 100) * 5,
    img = new Image();

  /!*console.log(brushRadius);*!/
  if (brushRadius < 20) { brushRadius = 20 }

  img.onload = function(){
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
  }
  img.loc = '../images/';
  img.filename = 'guagua-cover.png';
  if (window.devicePixelRatio >= 2) {
    var nameParts = img.filename.split('.');
    img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
  } else {
    img.src = img.loc + img.filename;
  }

  function detectLeftButton(event) {
    if ('buttons' in event) {
      return event.buttons === 1;
    } else if ('which' in event) {
      return event.which === 1;
    } else {
      return event.button === 1;
    }
  }

  function getBrushPos(xRef, yRef) {
    var bridgeRect = bridge.getBoundingClientRect();
    return {
      x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
      y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
    };
  }

  function drawDot(mouseX,mouseY){
    bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
    /!*执行函数*!/
    percent = getPercent();
    console.log(percent);
    callback(function () {
      $("#bridge").fadeOut(100);
    });
  }

  var percent=null;
  var percented = 30; /!*画的比例*!/
  /!*补充函数*!/
  function getPercent() {
    var percent;
    var counter = 0;  /!*number of pixels clear*!/
    var imageData = bridgeCanvas.getImageData(0, 0, bridge.width, bridge.height);

    var imageDataLength = imageData.data.length;

    for(var i = 0; i < imageDataLength; i += 4) {
      if (imageData.data[i] === 0 && imageData.data[i+1] === 0 && imageData.data[i+2] === 0 && imageData.data[i+3] === 0) {
        counter++;
      }
    }

    if (counter >= 1) {
      percent = (counter / (bridge.width * bridge.height)) * 100;

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


  bridge.addEventListener("mousemove", function(e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
      drawDot(brushPos.x, brushPos.y);
    }
  }, false);

  bridge.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
      var brushPos = getBrushPos(touch.pageX, touch.pageY);
      drawDot(brushPos.x, brushPos.y);
    }
  }, false);


})();
*/
