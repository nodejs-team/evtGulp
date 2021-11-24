/*
 *修改2020.3.10
 * 4月会员日之后的所有会员日立减活动，金额都去掉两位小数点
 */

(function () {

  var discount = 0;   //满198减99
  var disArr = [15,30,0,0];   //满198减99
  var zhekou = 1;   //折扣

  function initNum() {
    var items = [];
    $(".pro-list .row").each(function(i,el){
      var ponds = $(el).attr('data-pond'),
          ids = $(el).attr('data-price'),
          postId = $(el).attr('data-postid'),
          weight = $(el).attr('data-weight'),

          sku = $(el).attr('data-sku'),
          method = $(el).attr('data-method'),
          pid = $(el).attr('data-pid'),
          ptype = $(el).attr('data-ptype'),
          channel = $(el).attr('data-channel');



      if(ponds){
        items.push({
          ponds: ponds.split(','),
          ix: 0,
          ids: ids.split(','),
          weight: weight.split(','),
          postId: postId.split(','),

          sku: sku.split(','),
          method: method.split(','),
          pid: pid.split(','),
          ptype: ptype.split(','),
          channel: channel.split(','),
        })
      }

      var index = i;
      var currentItem = items[index];


      var num = 1;
      var bs = 2;
      var totalPrice = 0;
      var oldPrice = 0;

      /*判断是否有折扣*/
      function isDiscount(total,discount,zhekou) {
        if(total!=discount){
          total = discount;
          return total;
        }
        return total*zhekou;
      }

      /*折扣：通过磅数决定减多少 [不合理]  增加1.5磅，2.5磅，3.5磅立减*/
      var dis = 1;
      function disFun(bs,disArr) {
        switch (bs){
          case 1:
            dis = disArr[0];
            break;
          case 1.5:
            dis = disArr[0];
            break;
          case 2:
            dis = disArr[1];
            break;
          case 2.5:
            dis = disArr[1];
            break;
          case 3:
            dis = disArr[2];
            break;
          case 3.5:
            dis = disArr[2];
            break;
          case 5:
            dis = disArr[3];
            break;
          case 5.5:
            dis = disArr[3];
            break;
        }
        return dis;
      }

      /*根据价格参与满减*/
      var endPrice = 0;
      function disPrice(price,disArr) {
        if(price>=198 && price<298){
          endPrice = price - disArr[0];
        }else if(price>=298 && price<428){
          endPrice = price - disArr[1];
        }else if(price>=428 && price<728){
          endPrice = price - disArr[2];
        }else if(price>=728){
          endPrice = price - disArr[3];
        }

        return endPrice;
      }


      /*图片：计算立减金额*/
      function icon(price,disArr,ele) {
        if(price>=198 && price<298){
          $(ele).find(".icon").attr("class", "icon icon_"+disArr[0]);
        }else if(price>=298 && price<428){
          $(ele).find(".icon").attr("class", "icon icon_"+disArr[1]);
        }else if(price>=428 && price<728){
          $(ele).find(".icon").attr("class", "icon icon_"+disArr[2]);
        }else if(price>=728){
          $(ele).find(".icon").attr("class", "icon icon_"+disArr[3]);
        }
      }

      /*图片：计算折扣立减金额*/
      function iconzhe(oldPrice,totalPrice,ele) {
        var zhe = oldPrice-totalPrice;
        switch (zhe){
          case 49.5:
              $(ele).find(".iconzhe").attr("class", "iconzhe iconzhe_49");
            break;
          case 74.5:
            $(ele).find(".iconzhe").attr("class", "iconzhe iconzhe_74");
            break;
          case 99.5:
            $(ele).find(".iconzhe").attr("class", "iconzhe iconzhe_99");
            break;
        }
      }



      /*图片：计算积分：买蛋糕满100赠送200积分，满200赠送400积分，满300赠送600积分，满400赠送800积分*/
      function jf(price,disArr,ele) {
        if(price>=50 && price<200){
          $(ele).find(".jf").attr("class", "jf jf_"+disArr[0]);
        }else if(price>=200 && price<300){
          $(ele).find(".jf").attr("class", "jf jf_"+disArr[1]);
        }else if(price>=300 && price<400){
          $(ele).find(".jf").attr("class", "jf jf_"+disArr[2]);
        }else if(price>=400){
          $(ele).find(".jf").attr("class", "jf jf_"+disArr[3]);
        }
      }



      /*
       *蛋糕磅数加
       */
      $(this).find(".plus").on('click', function(){
        var ix = ++currentItem.ix;
        if(ix>=currentItem.ponds.length-1){
          ix =currentItem.ix = currentItem.ponds.length-1;
        }

        /*是否有折扣*/
        totalPrice = currentItem.ids[ix]*num; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[ix].replace(/[^\d|.]/g, '')-0;

        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou);/*价格满足条件折扣*/
        //totalPrice =disPrice(oldPrice,disArr);/*价格满足条件折扣*/



        $(this).parents(".row").find(".bang").html(currentItem.ponds[ix]+'('+currentItem.weight[ix]+')');
        $(this).parents(".row").find(".bang").data("postid", currentItem.postId[ix]);

        $(this).parents(".row").find(".dis-price").html(totalPrice);
        $(this).parents(".row").find(".old-price").html(oldPrice);

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);

        $(this).parents(".row").find(".buy_btn").attr("data-sku", currentItem.sku[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-method", currentItem.method[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-pid", currentItem.pid[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-ptype", currentItem.ptype[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-channel", currentItem.channel[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-num", 1);

        icon(oldPrice,disArr,$(this).parents(".row"));
        /*jf(totalPrice,disArr,$(this).parents(".row"));
        iconzhe(oldPrice,totalPrice,$(this).parents(".row"));*/


      });
      /*
       *蛋糕磅数减少
       */
      $(this).find(".minus").on('click', function(){
        var ix = --currentItem.ix;
        if(ix<=0){
          ix=currentItem.ix = 0;
        }

        /*是否有折扣*/
        totalPrice = currentItem.ids[ix]*num; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[ix].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou);/*价格满足条件折扣*/

        $(this).parents(".row").find(".bang").html(currentItem.ponds[ix]+'('+currentItem.weight[ix]+')');
        $(this).parents(".row").find(".bang").data("postid", currentItem.postId[ix]);

        $(this).parents(".row").find(".dis-price").html(totalPrice);
        $(this).parents(".row").find(".old-price").html(oldPrice);

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);


        $(this).parents(".row").find(".buy_btn").attr("data-sku", currentItem.sku[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-method", currentItem.method[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-pid", currentItem.pid[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-ptype", currentItem.ptype[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-channel", currentItem.channel[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-num", 1);

        icon(oldPrice,disArr,$(this).parents(".row"));
        /*jf(totalPrice,disArr,$(this).parents(".row"));*/
        /*iconzhe(oldPrice,totalPrice,$(this).parents(".row"));*/

      });

      /*数量加*/
      $(this).find(".add").on('click', function(){
        num++;
        var ix = currentItem.ix;
        
        if(num>=50){
            num=50;
        }

        /*是否有折扣*/
        totalPrice = currentItem.ids[ix]*num; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[ix].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou);/*价格满足条件折扣*/

        $(this).parents(".row").find(".num").html(num);
        $(this).parents(".row").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents(".row").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents(".row").find(".dis-price").html(totalPrice);
        $(this).parents(".row").find(".old-price").html(oldPrice);

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);

        icon(oldPrice,disArr,$(this).parents(".row"));
        /* jf(totalPrice,disArr,$(this).parents(".row"));*/
        /*iconzhe(oldPrice,totalPrice,$(this).parents(".row"));*/

      });

      /*数量减*/
      $(this).find(".reduce").on('click', function(){
        num--;
        if(num<=1){
          num = 1;
        }
        var ix = currentItem.ix;

        /*是否有折扣*/
        totalPrice = currentItem.ids[ix]*num; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[ix].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou);/*价格满足条件折扣*/

        $(this).parents(".row").find(".num").html(num);
        $(this).parents(".row").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents(".row").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents(".row").find(".dis-price").html(totalPrice);
        $(this).parents(".row").find(".old-price").html(oldPrice);

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);
        icon(oldPrice,disArr,$(this).parents(".row"));
        /*jf(totalPrice,disArr,$(this).parents(".row"));*/
        /*iconzhe(oldPrice,totalPrice,$(this).parents(".row"));*/
      });


      /*初始化默认值*/
      /*是否有折扣*/


      /*初始化*/
      if(currentItem.ponds.length==1){
        totalPrice = currentItem.ids[0]; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[0].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou); /*满足条件折扣*/

        /*只有一个磅数的时候，隐藏加减按钮，并居中显示*/
        $(this).find(".bangshu").fadeOut(0);
        $(this).find(".buy-btns").addClass("one");
        /*$(this).find(".d-pond").html('/'+currentItem.ponds[0]);*//*只有一个磅数时，跟多磅数一样2021.1.29*/

        $(this).find(".bang").html(currentItem.ponds[0]+'('+currentItem.weight[0]+')');
        $(this).find(".dis-price").html(totalPrice);
        $(this).find(".old-price").html(oldPrice);
        $(this).find(".p-bs").html(currentItem.ponds[0]);
        $(this).find(".p-weight").html(currentItem.weight[0]);

        $(this).find(".bang").data("postid", currentItem.postId[0]);

        $(this).find(".buy_btn").attr("data-sku", currentItem.sku[0]);
        $(this).find(".buy_btn").attr("data-method", currentItem.method[0]);
        $(this).find(".buy_btn").attr("data-pid", currentItem.pid[0]);
        $(this).find(".buy_btn").attr("data-ptype", currentItem.ptype[0]);
        $(this).find(".buy_btn").attr("data-channel", currentItem.channel[0]);
        $(this).find(".buy_btn").attr("data-num", 1);
        /*初始化的时候根据金额来判断小图标*/
        icon(oldPrice,disArr,$(this));
        /* jf(totalPrice,disArr,$(this));*/
        /*iconzhe(oldPrice,totalPrice,$(this));*/
        /*$(this).find(".icon").attr("class", "icon icon_"+disArr[0]);
        $(this).find(".jf").attr("class", "jf jf_"+disArr[0]);*/

      }else{
        /*设置默认显示2磅*/
        currentItem.ix=1;/*默认显示1磅*/
        totalPrice = currentItem.ids[currentItem.ix]; /*总价格*/
        oldPrice = totalPrice-0; /*原价*/
        bs = currentItem.ponds[currentItem.ix].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou); /*满足条件折扣*/



        $(this).find(".bang").html(currentItem.ponds[currentItem.ix]+'('+currentItem.weight[currentItem.ix]+')');
        $(this).find(".dis-price").html(totalPrice);
        $(this).find(".old-price").html(oldPrice);
        $(this).find(".p-bs").html(currentItem.ponds[currentItem.ix]);
        $(this).find(".p-weight").html(currentItem.weight[currentItem.ix]);
        $(this).find(".d-pond").html('');  /*多磅数，价格后面不要磅数2020.2.25*/
        $(this).find(".bang").data("postid", currentItem.postId[currentItem.ix]);

        $(this).find(".buy_btn").attr("data-sku", currentItem.sku[currentItem.ix]);
        $(this).find(".buy_btn").attr("data-method", currentItem.method[currentItem.ix]);
        $(this).find(".buy_btn").attr("data-pid", currentItem.pid[currentItem.ix]);
        $(this).find(".buy_btn").attr("data-ptype", currentItem.ptype[currentItem.ix]);
        $(this).find(".buy_btn").attr("data-channel", currentItem.channel[currentItem.ix]);
        $(this).find(".buy_btn").attr("data-num", num);  /*数量*/

        /*初始化的时候根据金额来判断小图标*/
        icon(oldPrice,disArr,$(this));
        /*jf(totalPrice,disArr,$(this));*/
       /* iconzhe(oldPrice,totalPrice,$(this));*/
      }

      var self = $(this);


    });
  };


  initNum();

})();