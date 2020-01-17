function get_file(){
	var code = $.trim($('#code').val());
	  if(code==''){
		$('#code').focus();
		atips('下载验证码不正确,请重新输入。');
		return false;
	  }
	$('#s1').attr('disabled',true);
	$('#s1').val('Loading...');
	$.ajax({
		type : 'post',
		url : 'ajax.php',
		data : 'action=check_code&code='+code+'&t='+Math.random(),
		dataType : 'text',
		success:function(msg){
			var arr = msg.split('|');
			if(arr[0]=='true'){
				$('#addr_box').hide();
				//load_down_addr1('736965');
                console.log("IT FUCKIN WORKS");
			}else{
				chg_imgcode();
				$('#s1').attr('disabled',false);
				$('#s1').val('验证下载');
				$('#code').val('');
				$('#code_tips').html('验证码不正确。');
				$('#code_tips').addClass('txtred');
				setTimeout(function(){
					$('#code_tips').html('请输入左侧验证码：');
					$('#code_tips').removeClass('txtred');
				},2000);
			}
			$('#s1').attr('disabled',false);
			$('#s1').val('验证下载');
		},
		error:function(){
		}
	});
}