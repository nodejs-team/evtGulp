;
$(function(){

	$(".mobile_pwd").live("click",function (){
		var mobile=$("input[name=mobile]").val();
		if(!/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(mobile)){
			layer.msg('手机号格式错误' ,{shift: 5});
			return false;
		}
		window.location.href="user.php?act=mobile_pwd&mobile="+mobile;
	});
	$("#chkAll").live("change",function (){
		if($(this).is(":checked")){
			$("input[type=checkbox]").attr("checked","checked");
		}else{
			$("input[type=checkbox]").removeAttr("checked");
		}
	});
	$(".get_codes").live("click",function(){ 
		var mobile=$("input[name=mobile]").val();
		if(!/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(mobile)){
			layer.msg('手机号格式错误' ,{shift: 5});
			return false;
		}
		var token=$("input[name=token]").val();
		if(!token){
			layer.msg('网络异常' ,{shift: 5});
			return false;	
		}
		$.post("user.php",{act:'send_code',phone:mobile,token:token},function (data){
			if(data.status == 0){
				 layer.msg(data.info);	
				 $(".cx-yz").addClass('get_codes');
				 return false;
			}
			$(".cx-yz").removeClass('get_code');
			
			time($(".cx-yz"));
			layer.msg(data.info);
		},'json');
		$(this).css("display","none"); 
	$("#yzm").focus(); 
		$(".cx-yz").css("display","block"); 
	});
	$(".lj-zc").click(function(){ 
		$(".zc-form").css("display","block"); 
	});
	//ajax登出操作
	$('.logoutAjax').on('click', function(){
		$.get($(this).attr('href'), function(data){
			try{
				//var data = JSON.parse(data);
				var data = $.parseJSON(data);
			}catch (e){
				console.log('没请求到数据！');
			}
			layer.msg(data.message, {time:1000}, function(){
				if (data.url){
					window.parent.location.href = data.url;
				}else if (data.state == 'info'){
					window.parent.location.reload();
				}
			});
		});
		return false;
	});

	//ajax 按钮操作
	$('.opAjax').live('click', function(){
		var msg     = $(this).data('msg') ? $(this).data('msg') : '确定执行此操作吗？';
		var url     = $(this).data('uri') ? $(this).data('uri') : $(this).attr('href');
		var confirm = $(this).data('confirm') ? $(this).data('confirm') : 0;

		var config = {};
		if (typeof $(this).data('icon') != 'undefined'){
			config.icon = $(this).data('icon');
		}
		if (typeof $(this).data('title') != 'undefined'){
			config.title = $(this).data('title');
		}
		if (typeof $(this).data('shade') != 'undefined'){
			config.shade = $(this).data('shade');
		}
		if (typeof $(this).data('btn') != 'undefined'){
			config.btn = eval($(this).data('btn'));
		}

		layer.confirm(msg, config, function(index){
			$.get(url, function(data){
				try{
					var data = JSON.parse(data);
				}catch (e){}

				if (data.message){
					layer.msg(data.message);
				}
				if (data.url){
					window.parent.location.href = data.url;
				}else{
					if (data.state == 'info'){
						window.parent.location.reload();
					}
				}
			});
			layer.close(index);
		});
		return false;
	});
	$(".get_code").live("click",function (){
		var str=$("input[name=new_phone]").val();
		 if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(str)){
			layer.confirm('手机号格式错误', {
				conTit:"好利来提示：",
				btn: ['确定','取消'], //按钮
				shade: false //不显示遮罩
			}, function(){
			}, function(){
			});
			return false;
		}
		$.get("user.php",{act:'send_code',phone:str},function (data){
				layer.msg(data.info)
		},'json');

	});
	$(".sunmit_code").live("click",function (){
		$(".sunmit_code").val('提交中...');
		var old		=	$("input[name=old_phone]").val();
		var new_p	=	$("input[name=new_phone]").val();
		var vip		=	$("input[name=vip]").val();
		if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(new_p)){
			layer.msg('手机号格式错误');
			$(".sunmit_code").val('提交');
			return false;
		}
		if(vip.length !=4){
			layer.msg('验证码错误');
			$(".sunmit_code").val('提交');
			return false;
		}
		$.post("user.php",$("#theform").serialize(),function (data){
			layer.msg(data.info);
			$(".sunmit_code").val('提交');
				if(data.status == 1){
					location.reload();
				}
		},"json")
	})
	//ajaxfrom提交
	if ($.browser.msie) {
		//ie8及以下，表单中只有一个可见的input:text时，会整个页面会跳转提交
		$('form.ajaxFrom').on('submit', function (e) {
			//表单中只有一个可见的input:text时，enter提交无效
			e.preventDefault();
		});
	}
	$(".resert").on('click',function (e){
		document.fgmessageBoardForm.reset(); 
	});
	$('.submitbtn').on('click', function (e) {
		e.preventDefault();
		var btn  = $(this),
			form = btn.parents('form.ajaxForm');
			type = btn.attr('dataType') ? btn.attr('dataType') : 'json';
		form.ajaxSubmit({
			url: btn.data('action') ? btn.data('action') : form.attr('action'), //按钮上是否自定义提交地址(多按钮情况)
			dataType: type,
			beforeSubmit: function (arr, $form, options) {
				if (btn.data('flag')){
					if (btn.val()){
						var text = btn.val();
						btn.val(text + '中...').prop('disabled', true).addClass('disabled');
					}else{
						var text = btn.text();
						btn.text(text + '中...').prop('disabled', true).addClass('disabled');
					}
				}
			},
			success: btn.attr('callback') ? eval(btn.attr('callback')) : function (data, statusText, xhr, $form) {
				if (btn.data('flag')){
					if (btn.val()){
						var text = btn.val();
						btn.val(text.replace('中...', '')).prop('disabled', false).removeClass('disabled');
					}else{
						var text = btn.text();
						btn.text(text.replace('中...', '')).prop('disabled', false).removeClass('disabled');
					}
				}

				if (data.state === 'info') {
					if (data.message){
						parent.layer.msg(data.message);
					}
					
					if (data.url){
						window.parent.location.href = data.url;
					}else{
						window.parent.location.reload();
					}
				} else {
					layer.msg(data.message);
				}
			}
		});
	});

	//全选反选
	$('.checkAll').live('click', function(){
		var name = $(this).data('name') ? $(this).data('name') : 'selected';
		$('input[name="'+name+'"]').each(function(){
			if (this.checked == true){
				this.checked = false;
			}else{
				this.checked = true;
			}
		});
	});
});

var wait=60;
var int_obj;
function time(obj) {
	if (wait == 0) {
		wait = 60;
		$(obj).removeAttr("disabled");
		$(".cx-yz").addClass('get_codes');
		$(obj).text('重新获取');
		
		clearTimeout(int_obj);
	} else {
		$(obj).attr("disabled", "disabled");
		$(obj).text("剩余"+wait+"s");
		wait--;
		int_obj=setTimeout(function(){
			time(obj)
		}, 1000);
	}
}


/*登陆检测*/
function check_submit(obj){
	var name=obj.username.value;
	var pwd=obj.password.value;
	if(!name){
		 layer.msg('请输入登录手机号/用户名');
		 return false;
	}
	if(!pwd){
		 layer.msg('请输入登录密码');
		 return false;
	}
	var action=$("input[name=action]").val();
	$.post(action,$("#myforms").serialize(),function (data){
			if(data.status == 0){
				 layer.msg(data.info);	
				 return false;
			}
			window.location.href=data.data;
			return false;
	},'json');
	return false;
}

function CheckAll(form) {
	for (var i=0;i<form.elements.length;i++) {
		var e = form.elements[i];
		if (e.Name != "chkAll" && e.disabled!=true) 
		e.checked = form.chkAll.checked; 
	}
}


function check_pwd(obj){
	var pwd=obj.password.value;
	var c_pwd=obj.c_password.value;
	if(!pwd || pwd.length<6 || pwd.length>20){
		layer.msg('密码长度必须在6-20个字符');
		return false;
	}
	if(c_pwd  != pwd){
		layer.msg('两次密码不一致');
		return false;
	}
}
/*
	检索找回密码邮箱
*/
function check_mail(){
	var mail =$("input[name=mail]").val();
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!myreg.test(mail)){
		layer.msg('邮箱地址错误');
	}
	window.location.href="user.php?act=send_pwd_email&mail="+mail;
}

//导入更多数据
function request(url, type, params, datatype, callback){
	firstRow += listRows;
	if (typeof params == 'undefined'){
		params = {start: firstRow, pagesize:listRows};
	}else if (typeof params == 'object'){
		params.start    = firstRow;
		params.pagesize = listRows;
	}else if (typeof params == 'string'){
		params += ('&start='+firstRow+'&pagesize='+listRows);
	}
	$.ajax({
		url: url,
		type: type || 'get',
		data: params || '',
		dataType: datatype || 'json',
		success: callback || function(data){
			loading = false;
		}
	});
}