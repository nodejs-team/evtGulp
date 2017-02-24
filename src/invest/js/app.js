/**
 * Created by mcake on 2016/11/14.
 */

(function (window, undefined) {
    var App = {
        init: function () {
            this.index = 0;
            this.config = investConfig.slice();
            this.swiper = null;
            this.doc = $(document.body);
            this.create(this.index);
            this._initEvents();
        },
        create: function (index) {
            this.index = index;
            var self = this;
            var data = this.config[index];
            var _data = this._getPageData(data);

            if( _data.formData ){
                $.extend(data, _data);
            } else {
                data.items = _data;
            }

            data.pageIndex = index + 1;

            this.doc.find(".swiper-container").addClass("leave").transitionEnd(function () {
                $(this).remove();
            });

            var panel = $(this.renderTemplate(data)).addClass("out").prependTo(this.doc);
            document.body.offsetWidth;
            panel.removeClass("out").transitionEnd(function () {
                self._createSwiper( index == 3 );
            });
        },
        createNext: function () {
            this.create(++this.index);
        },
        renderTemplate: function (data) {
            return template('invest-secTpl', data);
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
            var isValid = true;
            for(var i=0; i<data.length; i++){
                var item = data[i];
                if( item.questionId == "10005574" || item.questionId == "10005575" || item.questionId == "10005576" ){
                  if( !/^[-\d.]+$/.test(item.itemValue) ){
                    isValid = false;
                    break;
                  }
                }
            }

            return isValid;
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
            this.swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                speed: 400,
                onInit: function (swiper) {
                  if( swiper.slides.length == 1 ){
                      swiper.paginationContainer.addClass("hidden");
                  }
                },
                onSlideChangeStart: function(swiper){
                    if( !hidePagenation ) return;
                    if(swiper.activeIndex == swiper.slides.length - 1){
                        swiper.paginationContainer.addClass("hidden");
                    } else {
                        swiper.paginationContainer.removeClass("hidden");
                    }
                }
            });
        },
        _initEvents: function () {
            var self = this;
            this.doc.on("click", "[data-action='skip']", function () {
                self.createNext();
            });

            this.doc.on("click", "[data-action='invest']", function () {
                var $this = $(this);
                var data = $this.data();
                self.setData(data.code, data.value, data.plain);
                var clsName = "";
                switch (self.index){
                    case 0:
                        clsName = "brown";
                        break;
                    case 1:
                        clsName = "green";
                        break;
                    case 2:
                        clsName = "blue";
                        break;
                    case 3:
                        clsName = "pink";
                        break;
                }

                clsName += " active";

                $this.addClass(clsName).siblings().removeClass(clsName);
                setTimeout(function () {
                    var content = $this.closest(".content");
                    var itemCount = content.find(".subject-item").length;
                    if( content.find("[data-action='invest'].active").length == itemCount ) {
                        if( self.swiper.activeIndex === self.swiper.slides.length - 1 ){
                            self.createNext();
                        } else {
                            self.swiper.slideNext();
                        }
                    }
                },200);
            });

            var dateRet = [(new Date().getFullYear()-100).toString(),"01","01"];
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
                if( self.validateForm(data) ) {
                  self.postData(data);
                } else {
                    alert("请将信息填写完整，并确保信息的有效性！");
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