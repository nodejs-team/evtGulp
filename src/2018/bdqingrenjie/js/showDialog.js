var sub=function(str,n){
    var r=/[^\x00-\xff]/g;
    if(str.replace(r,"mm").length<=n){return str;}
    var m=Math.floor(n/2);
    for(var i=m;i<str.length;i++){
        if(str.substr(0,i).replace(r,"mm").length>=n){
            return str.substr(0,i);
        }
    }
    return str;
}


// JavaScript Document
$(function () {

    $.My_order = function (msg) {
        try {
            $("div[class='tc-con-order']").remove();
            $("div[class='tc-order-cover']").remove();
            $cover = $("<div class='tc-order-cover' id='myCover'>&nbsp;</div>");
            $main = $("<div class=\"tc-con-order\" id='maximPanel'></div>");
            $close = $("<a href='javascript:void(0);'class='close2 close_2'>关闭</a>");
            $content = $("<div  class='tc-con-1'></div>");
            $content.html(msg);
            $main.append($close);
            $main.append($content);
            $(document.body).append($cover);
            $(document.body).append($main);
            $main.show(400);
            $main.focus();




            //注册登录用户中心文本框聚焦
            $(".input_txt,#Reply,.brand_txt").each(function(){
                var thisVal=$(this).val();
                //判断文本框的值是否为空，有值的情况就隐藏提示语，没有值就显示
                if(thisVal!=""){
                    $(this).siblings("label").hide();
                }else{
                    $(this).siblings("label").show();
                }
                //聚焦型输入框验证
                $(this).focus(function(){
                    $(this).siblings("label").hide();
                }).blur(function(){
                    var val=$(this).val();
                    if(val!=""){
                        $(this).siblings("label").hide();
                    }else{
                        $(this).siblings("label").show();
                    }
                });
            })

            $(".tc-con-order").css({"margin-left":-($(".tc-con-order").innerWidth()/2),"margin-top":-($(".tc-con-order").innerHeight()/2)});

            $cover.height($("html").height());

            $close.click(function () {
                $main.hide(500);
                $main.remove();
                $cover.remove();
            });
        }
        catch (ex) { alert(ex); }
    }


    $.Alert = function (msg) {
        try {
            $("div[class='tc-con']").remove();
            $("div[class='tc-cover']").remove();
            $cover = $("<div class='tc-cover'id='myCover'>&nbsp;</div>");
            $main = $("<div class=\"tc-con\" id='maximPanel'></div>");
            $close = $("<a href='javascript:void(0);' class='close close_2'>关闭</a>");
            $content = $("<div  class='tc-con-1'></div>");
            $content.html(msg);
            $main.append($close);
            $main.append($content);
            $(document.body).append($cover);
            $(document.body).append($main);
            $cover.height($(document.body).height());
            $main.show(400);
            $main.focus();
 

		
            $close.click(function () {
                $main.hide(300);
                $main.remove();
                $cover.remove();
                $(".embed").remove();
            });
        }
        catch (ex) { alert(ex); }

    };
	
	$('#Carousel').jCarouselLite({
        btnPrev: '#leftbtn',
        btnNext: '#rightbtn',
        auto: 3000,
        speed: 1000
    });	
   
   
   
	/*定时刷新剩余蛋糕数*/
	window.setInterval(function(){ 
				
		var num_a=new Array();
		var num=$("#num").attr("data-name"); 
		var img="";
		num_a=(''+num).split('');

		for(i=0;i<num_a.length;i++){
			img+="<li><img src='http://edm.mcake.com/fangli/2018-pc/bdqingrenjie/images/number_"+num_a[i]+".png'></li>"
			$("#num").html(img);
		}
	}, 1000); 
	
	/*点击磅数*/
	  $(".cakelist_box dl dd").on("click",function(){
		   $(this).siblings().removeClass("cur");
		   $(this).addClass("cur");
		   $(this).parents(".cakelist_box li").find(".cake_price_buy b").html($(this).attr("data-price"));
	   });
	   
	   
	$("#music").on("click",function(){
           var row;
			row="<div class='Keytime'>"
			row=row+"<p>除了微信、电话，这个世界上还有另外一种沟通方式<br>"
			row=row+"你写过情书吗？你收到过情书吗？<br>"
			row=row+"学生时期的那一封封情书<br>"
			row=row+"是多么美好又纯真的记忆<br>"
			row=row+"最传统的形式 却传递着最真诚的爱意<br>"
			row=row+"你认真写情书时的感觉，Ta收到情书时的娇羞<br>"
			row=row+"多值得怀念<br>"
			row=row+"让时光倒回 回到那个纯真年代<br>"
			row=row+"为Ta写一封情书吧</p>"
			row=row+'<input type="text" value="" id="loveID" class="input-num" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\D/g,\'\')" />'
			row=row+"<input type='button' value='确定' id='' class='input-q' onclick='loveBtn()' />"
			
			row=row+"</div>"
			$.Alert(row)

	});

    /*1-29修改*/
    $("#music").on("click",function(){
        $("body").append("<div class='embed'><audio autoplay><source src='/shop/theme/xth1/images/activity/valentine_BD/music.mp3' type='audio/mp3' /><embed src='/shop/theme/xth1/images/activity/valentine_BD/music.mp3' type='audio/mp3'/></audio></div>");
        $(".Keytime p").animate({"opacity":'1'},2000);
    });





/*
$(".love_letters textarea").each(function(){
	   var default_value = this.value;

       $(this).focus(function(){
               if(this.value == default_value) {
                       this.value = '';
					   $(this).css("color","#502a02");
               }
       });

       $(this).blur(function(){
               if(this.value == '') {
                       this.value = default_value;
					   $(this).css("color","#b5b5b6");
               }
       });

	});
*/

    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.html() == input.attr('placeholder')) {
                input.html('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.html() == '' || input.html() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.html(input.attr('placeholder'));
            }
        }).blur();
    };



    String.prototype.len = function()
    {
        return this.replace(/[^\x00-\xff]/g, "xx").length;
    }

    $(document).on("keyup","textarea",function(){

        $(this).val(sub($(this).val(),400));

        $(".love_letters samp").html("最多可输入200个字("+parseInt(($("textarea").val().len())/2)+"\/200)");
    });

});

function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

//根据秘钥显示情书
function loveBtn(){

    if($("#loveID").val()==""){
        E.alert('请输入"爱情秘钥"！');
        return;
    }else{
        E.loadding.open("正在提交，请稍后...");
        E.ajax_post({
            action: 'activity',
            operFlg:29,
            data: {
                secret_key: $("#loveID").val()
            },
            call: function( o ) {
                if (o.code == 200) {
                    E.loadding.close();
                    var row;
                    row="<div class='Keytime'>"
                    row=row+"<p> <textarea class='textarea2' disabled='disabled'>"+o.data["love_letter"]+"</textarea></p>"
                    row=row+'<input type="text" value="" id="loveID" class="input-num" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\D/g,\'\')" />'
                    row=row+"<input type='button' value='确定' id='' class='input-q' onclick='loveBtn()' />"

                    row=row+"</div>";
                    $.Alert(row);
                    $(".Keytime p").animate({"opacity":'1'},2000);
                } else {
                    E.loadding.close();
                    E.alert(o.message);
                }
            }
        });

    }
}



