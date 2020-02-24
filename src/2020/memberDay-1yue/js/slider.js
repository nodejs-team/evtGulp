(function () {

  var discount = 0;   //满198减99
  var disArr = [20,40,60,80];   //满198减99
  var zhekou = 1;   //折扣

  function initNum() {
    var items = [];
    $(".products li").each(function(i,el){
      var ponds = $(el).attr('data-pond');
      var ids = $(el).attr('data-price');
      var postId = $(el).attr('data-postid');
      var weight = $(el).attr('data-weight');

      if(ponds){
        items.push({
          ponds: ponds.split(','),
          ix: 0,
          ids: ids.split(','),
          weight: weight.split(','),
          postId: postId.split(',')
        })
      }

      var index = i;
      var currentItem = items[index];


      var num = 1;
      var bs = 2;
      var totalPrice = 0;
      var oldPrice = 0;

      /*判断是否有折扣*/
      function isDiscount(total,mix,discount,zhekou) {
        if(total>=mix){
          total = (total - discount)*zhekou;
          return total;
        }
        return total*zhekou;
      }

      /*折扣：通过判断磅数决定减多少   增加1.5磅，2.5磅，3.5磅立减*/
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
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/

        $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+'('+currentItem.weight[ix]+')');
        $(this).parents("li").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents("li").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents("li").find(".old-price").html(oldPrice.toFixed(2));

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
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/


        $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+'('+currentItem.weight[ix]+')');
        $(this).parents("li").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents("li").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents("li").find(".old-price").html(oldPrice.toFixed(2));
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
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/


        $(this).parents("li").find(".num").html(num);
        $(this).parents("li").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents("li").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents("li").find(".old-price").html(oldPrice.toFixed(2));



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
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/


        $(this).parents("li").find(".num").html(num);
        $(this).parents("li").find(".bang").data("postid", currentItem.postId[ix]);
        $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
        $(this).parents("li").find(".dis-price").html(totalPrice.toFixed(2));
        $(this).parents("li").find(".old-price").html(oldPrice.toFixed(2));


      });


      /*初始化默认值*/
      /*是否有折扣*/


      if(currentItem.ponds.length==1){
        totalPrice = currentItem.ids[0]; /*总价格*/
        oldPrice = totalPrice-0;
        bs = currentItem.ponds[0].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/

        $(this).find(".bang").html(currentItem.ponds[0]+'('+currentItem.weight[0]+')');
        $(this).find(".dis-price").html(totalPrice.toFixed(2));
        $(this).find(".old-price").html(oldPrice.toFixed(2));
        $(this).find(".bang").data("postid", currentItem.postId[0]);
      }else{
        /*设置默认显示2磅*/
        currentItem.ix=1;/*默认显示2磅*/
        totalPrice = currentItem.ids[1]; /*总价格*/
        oldPrice = totalPrice-0; /*原价*/
        bs = currentItem.ponds[1].replace(/[^\d|.]/g, '')-0;
        totalPrice = isDiscount(totalPrice,1,disFun(bs,disArr),zhekou); /*满足条件折扣*/

        $(this).find(".bang").html(currentItem.ponds[1]+'('+currentItem.weight[1]+')');
        $(this).find(".dis-price").html(totalPrice.toFixed(2));
        $(this).find(".old-price").html(oldPrice.toFixed(2));
        $(this).find(".bang").data("postid", currentItem.postId[1]);

      }


      var self = $(this);

      /*$(this).find(".buybtn").click(function () {
        alert(self.find(".postid").data("postid"));
      });*/

    });
  };


  initNum();

})();