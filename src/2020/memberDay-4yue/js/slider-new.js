(function () {

  var discount = 0;   //满198减99
  var disArr = [20,40,60,80];   //满198减99
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

        $(this).parents(".row").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents(".row").find(".old-price").html(oldPrice.toFixed(2));

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);

        $(this).parents(".row").find(".buy_btn").attr("data-sku", currentItem.sku[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-method", currentItem.method[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-pid", currentItem.pid[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-ptype", currentItem.ptype[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-channel", currentItem.channel[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-num", 1);



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

        $(this).parents(".row").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents(".row").find(".old-price").html(oldPrice.toFixed(2));

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);


        $(this).parents(".row").find(".buy_btn").attr("data-sku", currentItem.sku[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-method", currentItem.method[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-pid", currentItem.pid[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-ptype", currentItem.ptype[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-channel", currentItem.channel[ix]);
        $(this).parents(".row").find(".buy_btn").attr("data-num", 1);

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
        $(this).parents(".row").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents(".row").find(".old-price").html(oldPrice.toFixed(2));

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);


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
        $(this).parents(".row").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents(".row").find(".old-price").html(oldPrice.toFixed(2));

        $(this).parents(".row").find(".p-bs").html(currentItem.ponds[ix]);
        $(this).parents(".row").find(".p-weight").html(currentItem.weight[ix]);

      });


      /*初始化默认值*/
      /*是否有折扣*/


      /*初始化*/
      if(currentItem.ponds.length==1){
        totalPrice = currentItem.ids[0]; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[0].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou); /*满足条件折扣*/

        $(this).find(".bangshu").fadeOut(0);
        $(this).find(".bang").html(currentItem.ponds[0]+'('+currentItem.weight[0]+')');
        $(this).find(".dis-price").html(totalPrice.toFixed(2));
        $(this).find(".old-price").html(oldPrice.toFixed(2));
        $(this).find(".p-bs").html(currentItem.ponds[0]);
        $(this).find(".p-weight").html(currentItem.weight[0]);
        $(this).find(".d-pond").html('/'+currentItem.ponds[0]);/*只有一个磅数时，价格后面显示磅数2020.2.25*/
        $(this).find(".bang").data("postid", currentItem.postId[0]);

        $(this).find(".buy_btn").attr("data-sku", currentItem.sku[0]);
        $(this).find(".buy_btn").attr("data-method", currentItem.method[0]);
        $(this).find(".buy_btn").attr("data-pid", currentItem.pid[0]);
        $(this).find(".buy_btn").attr("data-ptype", currentItem.ptype[0]);
        $(this).find(".buy_btn").attr("data-channel", currentItem.channel[0]);
        $(this).find(".buy_btn").attr("data-num", 1);

      }else{
        /*设置默认显示2磅*/
        currentItem.ix=1;/*默认显示2磅*/
        totalPrice = currentItem.ids[1]; /*总价格*/
        oldPrice = totalPrice-0; /*原价*/
        bs = currentItem.ponds[1].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,disPrice(oldPrice,disArr),zhekou); /*满足条件折扣*/



        $(this).find(".bang").html(currentItem.ponds[1]+'('+currentItem.weight[1]+')');
        $(this).find(".dis-price").html(totalPrice.toFixed(2));
        $(this).find(".old-price").html(oldPrice.toFixed(2));
        $(this).find(".p-bs").html(currentItem.ponds[1]);
        $(this).find(".p-weight").html(currentItem.weight[1]);
        $(this).find(".d-pond").html('');  /*多磅数，价格后面不要磅数2020.2.25*/
        $(this).find(".bang").data("postid", currentItem.postId[1]);

        $(this).find(".buy_btn").attr("data-sku", currentItem.sku[1]);
        $(this).find(".buy_btn").attr("data-method", currentItem.method[1]);
        $(this).find(".buy_btn").attr("data-pid", currentItem.pid[1]);
        $(this).find(".buy_btn").attr("data-ptype", currentItem.ptype[1]);
        $(this).find(".buy_btn").attr("data-channel", currentItem.channel[1]);
        $(this).find(".buy_btn").attr("data-num", 1);

      }


      var self = $(this);

      /*$(this).find(".buybtn").click(function () {
        alert(self.find(".postid").data("postid"));
      });*/

    });
  };


  initNum();

})();