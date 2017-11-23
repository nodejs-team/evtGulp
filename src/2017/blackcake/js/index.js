  
$(function(){
  $(".san").css("left",($(window).width()/2)-3);
  $(".layer_alert").css("left",($(window).width()/2)-60);
  $(".layer_alert").css("top",$(window).height()-65);
  //预加载配置
  options={backgroundColor:'#F4F4F4',barColor:"#000000",barHeight:2};
  $("body").queryLoader2(options);
 
  options={autoScrolling:false,scrollOverflow:true,anchors: 
  [
    'page01',
    'page02',
    'page03',
    'page04',
    'page05',
    'page06',
    'page07',
    'page08',
    'page09',
    'page10',
    ]}


  $('#dowebok').fullpage(options);
  $(".top").on("click",function (){
    $('body,html').animate({scrollTop:0},1000); 
  });
  var $height=$(window).height();
  $(".dow").delay(3000).fadeIn().animate({'top':$height-30},300).animate({'top':$height-15},400);
  $(window).scroll(function (){
    $(".layer_alert").fadeTo(400,0);
  });
  $(window).click(function (){
    $(window).trigger("scroll");
  });
});

  
  $(".add_to").click(function(){
    var id=$(this).attr("data-id");

    $.get("/detailed.php",{act:'get_info',id:id},function (data){
      if(data.status == 0){
        layer.msg(data.info, {shift: 6}); 
        return;
      }

      $(".su-x").html(data.data);
    },'json');
    $(".su-x").show();
    $(".su-x").addClass("block");
    $(".main").addClass("mh");
  });

  
  $(document).click(function(e){ 
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if ($(obj).is(".su-x")) { 
      $(".wudianguanbijian").trigger("click");
    }else{
      //alert('你的点击不在目标区域');
    } 
  });
  $(".s-x li span").live("click",function(){
      if($(this).hasClass("on")){ 
          $(this ).parent().removeClass("on");
      }else{ 
          $(this ).parent().addClass("on");
      }
  })
  $(".anniu1").click(function (){
    $(".center").fadeOut(1000);
  });
  $(".anniu2").click(function (){
    $(".center").fadeOut(1000);
  });
  $(".gb").click(function (){
    $(".center").fadeOut(1000);
  });
  $("ol i").live("click",function(){
    var data=$(this).text();//获取文本
    //获取可选属性
    var id=$(this).attr("data-id");
    if(typeof id != 'undefined'){
      $.post("/detailed.php",{act:'attr',id:id},function (data){
        if(data.status == 1){
          $(".canju").html(data.data);
          $("input[name=spec_can]").val(data.str_can);
        }
      },'json');
      var select=$(this).attr("select-id");
      $(".spec"+select).val(id);
    }else{
      $("input[name=spec_can]").val(data);
    }
    $(this).parent("ol").prev("span").text("");// 清空数据
    $(this).parent("ol").prev("span").append(data);
    $(".s-x li").removeClass("on");
  });

  $(".wudianguanbijian").live("click",function(){
    $(".su-x").hide();
    $(".main").removeClass("mh");
  });


var swiper = new Swiper('.blackcake-02', {
    pagination : '.blackcake-02-pagination',
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay : 5000,
    paginationClickable: true,
    spaceBetween: 0,
    // mousewheelControl: true
});

var swiper = new Swiper('.blackcake-06', {
    pagination : '.blackcake-06-pagination',
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay : 5000,
    paginationClickable: true,
    spaceBetween: 0,
    // mousewheelControl: true
});

var swiper = new Swiper('.blackcake-07', {
    pagination : '.blackcake-07-pagination',
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay : 5000,
    paginationClickable: true,
    spaceBetween: 0,
    // mousewheelControl: true
});
