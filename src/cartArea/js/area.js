(function(window, undefined){
  'use strict';

  var areaTpl = '<li><a href="javascript:;" data-id="{{index}}" data-cid="{{cid}}" data-role="{{role}}" data-name="{{name}}">{{name}}</a></li>';

  var AreaSelector = function(dom, dataSource){
    this.$dom = dom;
    this.areaLegend = this.$dom.find(".area-container");
    this.dropDown = this.$dom.find(".area-dropdown");
    this.areaList = this.$dom.find(".area-list");
    this.tabs = this.$dom.find(".area-tab");
    this.valueDom = this.$dom.find(".area-value");
    this.dataSource = dataSource;
    this.local = {
      prov: '',
      city: '',
      area: ''
    };

    this.setContent(this.getHtml(this.dataSource, "prov"));

    this.bindEvents();
  };

  AreaSelector.prototype = {
    setContent: function(content){
      this.areaList.html(content);
    },
    
    getHtml: function (data, role, cid) {
      var str = "<ul>";
      for(var i=0; i<data.length; i++){
        str += tplFormat(areaTpl, mix(data[i], {index: i, role: role, cid: cid}));
      }

      str += "</ul>";

      return str;
    },

    getCurrentData: function(id, type){
      return this.dataSource[id][type];
    },

    setTab: function (data) {
      var self = this;
      this.local[data.role] = data.name;

      var curTab = this.tabs.find("a[data-role="+ data.role +"]");
      curTab.find("span").text(data.name);
      if( data.role !== "area" ) {
        curTab.removeClass("cur").next().addClass("cur").data({id: data.id, cid: data.cid});
      }

      if( data.role === "prov" ){
        curTab.data({id: data.id});
      }

      curTab.nextAll().each(function () {
        var role = this.getAttribute("data-role");
        self.local[role] = "";
        $(this).find("span").text({prov: "省", city: "市", area: "区"}[role]);
      });
    },

    setResult: function (value) {
      this.valueDom.text(value);
    },

    show: function(){
      this.areaLegend.addClass("open");
      this.dropDown.show();
    },

    hide: function(){
      this.areaLegend.removeClass("open");
      this.dropDown.hide();
    },

    bindEvents: function(){
      var self = this;
      this.$dom.on("mouseenter", function(){
        self.show();
      });

      this.$dom.on("mouseleave", function(){
        self.hide();
      });

      var provId, cityId, areaId;

      this.areaList.on("click", "a", function() {
        var data = $(this).data();
        self.setTab(data);
        switch (data.role) {
          case "prov":
            var curData = self.getCurrentData(data.id, "city");
            provId = data.id;
            self.setContent(self.getHtml(curData, "city", data.id));
            break;
          case "city":
            var areaData = self.dataSource[data.cid]["city"][data.id]["area"];
            cityId = data.id;
            self.setContent(self.getHtml(formatAreaData(areaData), "area", data.cid));
            break;
          case "area":
            areaId = data.id;
            self.setResult(self.local.prov+self.local.city+self.local.area);
            self.hide();
            self.onChange && self.onChange.call(self, self.local, {provId: provId, cityId: cityId, areaId: areaId});
        }

      });

      this.tabs.on("click", "a", function () {
        var $this = $(this);
        if( $this.hasClass("cur") ) return;
        var data = $this.data();
        if( data.id === undefined ) return;
        $this.addClass("cur").siblings().removeClass("cur");
        switch (data.role) {
          case "prov":
            self.setContent(self.getHtml(self.dataSource, "prov"));
            break;
          case "city":
            var curData = self.getCurrentData(data.id, "city");
            self.setContent(self.getHtml(curData, "city", data.id));
            break;
          case "area":
            var areaData = self.dataSource[data.cid]["city"][data.id]["area"];
            self.setContent(self.getHtml(formatAreaData(areaData), "area", data.cid));
            break;
        }
      });
    }
  };

  function mix(dest, source){
    for(var i in source){
      dest[i] = source[i];
    }

    return dest;
  }

  function formatAreaData(data) {
    var areas = [];
    for(var i=0; i<data.length; i++){
      areas[areas.length] = {
        name: data[i]
      };
    }

    return areas;
  }

  function tplFormat(str, data){
    return str.replace(/\{\{([^}}]+)\}\}/gm, function(math, name){
      return data[name] === undefined ? "" : data[name];
    });
  }

  window.AreaSelector = AreaSelector;

})(window);