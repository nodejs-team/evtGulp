/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  var Scene8 = Element.extend({
    initialize: function () {
      Scene8.superclass.initialize.apply(this, arguments);

      var mainFlag1 = new Element({
        className: "scene-flag flag1",
        html: ImgElement("award_1_png", {width: 256})
      }).attr("data-swiper-parallax", "-1600");

      var mainFlag2 = new Element({
        className: "scene-flag flag2",
        html: ImgElement("award_2_png", {width: 270})
      }).attr("data-swiper-parallax", "-2600");

      var mainFlag3 = new Element({
        className: "scene-flag flag3",
        html: ImgElement("award_3_png", {width: 271})
      }).attr("data-swiper-parallax", "-3600");

      var bg1 = new Element({
        className: "scene-bg1",
        html: ImgElement("8-2_png", {width: 2004})
      }).attr("data-swiper-parallax", "-300");

      var bg2 = new Element({
        className: "scene-bg2",
        html: ImgElement("8-3_png", {width: 966})
      }).attr("data-swiper-parallax", "-600");

      var text = new Element({
        className: "scene-text",
        html: '<h3>Mcake中文名征集</h3>\
        <p><strong>活动时间：</strong><br>征集：2017年6月7日——2017年6月22日<br>\
          评选：2017年6月30日，将评选出10个入围（内部筛选）；<br>\
          2017年7月3日---2017年7月14日，评选出最终方案（微信，微博粉丝投票）。<br>\
          公示：2017年8月3日在网站上正式宣布确定的中文名称。<br><br>\
          <strong>奖项设置：</strong><br>\
          <span style="color:#ff0000;">一等奖(1名):3000元现金</span><br>\
          入围奖(9名):298元蛋糕卡*1+玛丽黛佳限量版唇膏(颜色随机)<br>\
          粉丝回馈奖(20名):猿始人套盒一份(身体乳+面膜)\
          <br><br>\
          <strong>参与方式：</strong><br>\
          中文名称命名征集参赛者，请将命名方案以word格式发送至mingna.xu@mcake.com<br>\
          方案内容包括：创意名称，创意说明，联系人，联系电话。<br><br>\
          <strong>评选要求：</strong><br>\
          1.	创意性：创意内容立意新颖，构思巧妙。<br>\
          2.	品牌性：切合品牌调性与产品特性；提升消费者对品牌好感度。<br>\
          3.	传播性：易于传播，能够引起共鸣。\
        </p>'
    });

      this.addChild(bg1);
      this.addChild(mainFlag1);
      this.addChild(mainFlag2);
      this.addChild(mainFlag3);
      this.addChild(bg2);
      this.addChild(text);
    },
    initEvents: function () {

    }
  });

  window.Scene8 = Scene8;

})(window);