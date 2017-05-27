/**
 * Created by mcake on 2016/11/14.
 */

(function (window, undefined) {
  var App = {
    init: function () {
      this.index = 0;
      this.config = investConfig.slice();
      this.swiper = null;
      this.pageIndex = 1;
      this.doc = $(document.body);
      this.create(this.index);
      this._initEvents();
    },
    _getData: function ( index ) {
      this.index = index;
      var data = this.config[index];
      var _data = this._getPageData(data);

      if( _data.formData ){
        $.extend(data, _data);
      } else {
        data.items = _data;
      }

      data.pageIndex = index + 1;

      return data;
    },
    create: function (index) {
      var self = this;
      var data = this._getData(index);
      this.doc.find(".swiper-container").addClass("leave").transitionEnd(function () {
        $(this).remove();
      });

      var panel = $(this.renderTemplate('invest-secTpl', data)).addClass("out").prependTo(this.doc);
      document.body.offsetWidth;
      panel.removeClass("out").transitionEnd(function () {
        self._createSwiper( index == 3 );
      });
    },
    createNext: function () {
      //this.create(++this.index);
      if( ++this.index > 3 ){
        this.index = 3;
      }
      this.swiper.paginationContainer.css("display", "none");
      var data = this._getData(this.index);
      this.swiper.appendSlide(this.renderTemplate('secTpl-item', data) + ( data.lastPage ? this.renderTemplate('form-secTpl', data) : "" ));
    },
    renderTemplate: function (id, data) {
      return template(id, data);
    },
    setData: function( code, value, plain ){
      var retData = this.config[this.index].questions;
      for(var i=0; i<retData.length; i++){
        if( retData[i].questionCode == code ){
          retData[i].itemValue = plain ? value : [code, value].join(".");
          break;
        }
      }
    },
    getData: function(){
      var retData = [];
      this.config.forEach(function (item, i) {
        item.questions.forEach(function (question, j) {
          retData[retData.length] = {
            questionCode: question.questionCode,
            questionId: question.questionId,
            itemValue: question.itemValue
          };
        });
      });

      return retData;
    },
    postData: function( answer ){
      return $.ajax({
        type: 'POST',
        beforeSend: function () {
          showLoading();
        },
        url: __CONFIG.postUrl,
        data: {
          customerUid: __CONFIG.customerUid,
          wx_openid: __CONFIG.wx_openid,
          data: JSON.stringify({
            questionnaireCode: __CONFIG.questionnaireCode,
            versionNo: __CONFIG.versionNo,
            answer: answer
          })
        },
        success: function (res) {
          __CONFIG.onPostSuccess ? __CONFIG.onPostSuccess(res) : alert("data saved");
        },
        error: function(xhr, stauts, err){
          __CONFIG.onPostError ? __CONFIG.onPostError(xhr, stauts, err) : alert("error:" + err);
        },
        complete: function () {
          hideLoading();
        }
      });
    },
    validateForm: function (data) {
      var validObject = {
          isValid: true,
          msg: ""
        };
      for(var i=0; i<data.length; i++){
        var item = data[i];
        if( item.questionId == "10005575" ){
          if( !/^[-\d.]+$/.test(item.itemValue) ){
            validObject = {
              isValid: false,
              msg: "请填写有效的身高"
            };
            break;
          } else if( Number(item.itemValue) > 210 || Number(item.itemValue) < 150 ) {
            validObject = {
              isValid: false,
              msg: "身高不能低于150且不能高于210cm"
            };
            break;
          }

        }
        if( item.questionId == "10005576" ){
          if( !/^[-\d.]+$/.test(item.itemValue) ){
            validObject = {
              isValid: false,
              msg: "请填写有效的体重"
            };
            break;
          } else if( Number(item.itemValue) > 125 || Number(item.itemValue) < 35 ) {
            validObject = {
              isValid: false,
              msg: "体重不能低于35且不能高于125公斤"
            };
            break;
          }

        }
      }

      return validObject;
    },
    _getPageData: function (data) {
      if( !data ) return [];
      var items = [];
      var i;
      if( !data.lastPage ) {
        var secCount = Math.ceil(data.questions.length / 2);
        for (i = 0; i < secCount; i++) {
          items.push(data.questions.slice(i * 2, i * 2 + 2));
        }
      } else {
        var datas = data.questions.slice(0,2);
        for(i=0; i<datas.length; i++){
          items.push([datas[i]]);
        }
        return {
          items: items,
          formData: data.questions.slice(2),
          year: getDateData('year'),
          month: getDateData('month'),
          day: getDateData('day')
        }
      }

      return items;
    },
    _createSwiper: function (hidePagenation) {
      var self = this;
      var initX = 0;
      var initY = 0;
      this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        speed: 400,
        onInit: function (swiper) {
          if( swiper.slides.length == 1 ){
            swiper.paginationContainer.addClass("hidden");
          }
          swiper.lockSwipeToNext();
        },
        onSlideNextStart: function (swiper) {
          swiper.lockSwipeToNext();
        },
        onSlideNextEnd: function () {
          self.swiper.paginationContainer.css("display", "block");
        },
        onTouchStart: function (swiper, event) {
          var touch = event.targetTouches[0];
            initX = touch.pageX;
            initY = touch.pageY;
        },
        onTouchEnd: function(swiper, event){
          var touch = event.changedTouches[0];
          var diffX = touch.pageX - initX;
          var diffY = touch.pageY - initY;
          if( Math.abs(diffX) > Math.abs(diffY) ){
            if( diffX < -30 ){
              if( swiper.slides.eq(swiper.activeIndex).hasClass("actived") ){
                self.swiper.unlockSwipeToNext();
                self.swiper.slideNext();
              }
            }
          }
        },
        onSlideChangeStart: function(swiper){
          if( !hidePagenation ) return;
          if(swiper.activeIndex == swiper.slides.length - 1){
            swiper.paginationContainer.addClass("hidden");
          } else {
            swiper.paginationContainer.removeClass("hidden");
          }
        },
        onSlideChangeEnd: function (swiper) {
          var activeIndex = swiper.activeIndex;
          if( activeIndex < 4 ){
            self.pageIndex = 1;
            self._hideBullets(0, 4);
          } else if( activeIndex > 3 && activeIndex < 7 ){
            self.pageIndex = 2;
            self._hideBullets(4, 7);
          } else if( activeIndex > 6 && activeIndex < 8 ){
            self.pageIndex = 3;
            self._hideBullets(7, 8);
          } else {
            self.pageIndex = 4;
            self._hideBullets(8, swiper.bullets.length);
          }
          $("#pageIndex").text(self.pageIndex);
          if( activeIndex == 10 ){
            swiper.slides.eq(10).addClass("actived");
          }
        }
      });

      if( Array.isArray(this.swiper) ){
        this.swiper = this.swiper.shift();
      }
    },
    _hideBullets: function (start, end) {
      this.swiper.bullets.each(function (i, slide) {
        if( i >= start && i < end ) {
          slide.style.display = "inline-block";
        } else {
          slide.style.display = "none";
        }
      });
    },
    _initEvents: function () {
      var self = this;
      var timeout;

      this.doc.on("click", "[data-action='skip']", function () {
        self.createNext();
      });

      this.doc.on("click", "[data-action='invest']", function () {
        var $this = $(this);
        var data = $this.data();

        self.setData(data.code, data.value, data.plain);
        var clsName = "";
        switch (self.pageIndex){
          case 1:
            clsName = "brown";
            break;
          case 2:
            clsName = "green";
            break;
          case 3:
            clsName = "blue";
            break;
          case 4:
            clsName = "";
            break;
        }

        clsName += " active";

        $this.addClass(clsName).siblings().removeClass(clsName);
        if( timeout ) clearTimeout(timeout);
        timeout = setTimeout(function () {
          var content = $this.closest(".content");
          var itemCount = content.find(".subject-item").length;
          if (content.find("[data-action='invest'].active").length == itemCount) {
            if (self.swiper.activeIndex === self.swiper.slides.length - 1) {
              self.createNext();
            }
            self.swiper.slides.eq(self.swiper.activeIndex).addClass('actived');
            self.swiper.unlockSwipeToNext();
            self.swiper.slideNext();
          }
        }, 200);
      });

      var dateRet = ["1985","01","01"];
      this.doc.on("change", "select[data-code]", function () {
        var $this = $(this);
        var data = $this.data();
        dateRet[data.value] = this.value;
        self.setData(data.code, dateRet.join("-"), data.plain);
      });

      this.doc.on("input", "input[data-code]", function () {
        var data = $(this).data();
        self.setData(data.code, this.value, data.plain);
      });

      this.doc.on("click", "[data-action='sb-invest']", function(){
        var data = self.getData();
        var validate = self.validateForm(data);
        if( validate.isValid ) {
          self.postData(data);
        } else {
          alert(validate.msg);
        }
      });
    }
  };

  function getDateData(formatByType) {
    var options = [];
    switch (formatByType){
      case "year":
        var nowYear = new Date().getFullYear();
        for(var i=nowYear-100; i<nowYear + 1; i++){
          options[options.length] = i;
        }
        break;
      case "month":
        for(var i=1; i<13; i++){
          options[options.length] = i;
        }
        break;
      case "day":
        for(var i=1; i<32; i++){
          options[options.length] = i;
        }
        break;
    }

    return options;
  }

  function showLoading() {
    App.loading = $('<div class="app-loaidng"><span class="app-loading-modal"></span></div>').appendTo(document.body);
    App.loading.on("touchmove", function (e) {
      e.preventDefault();
    });

    return App.loading;
  }

  function hideLoading() {
    App.loading.remove();
  }

  $(function () {
    App.init();
  });

})(window);