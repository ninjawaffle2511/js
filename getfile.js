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
				console.log("PHASE ONE COMPLETE. OBTAINING FILE ID");
				get_fileID('736965');
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

function get_fileID(file_id){
	console.log("PHASE TWO COMPLETE. FILE ID IS: "+file_id);
	$('#addr_list').html('<img src="images/ajax_loading.gif" align="absmiddle" />加载中...');
	$.ajax({
		type : 'post',
		url : 'ajax.php',
		data : 'action=load_down_addr1&file_id='+file_id,
		dataType : 'text',
		success:function(msg){
			var arr = msg.split('|');
			if(arr[0] == 'true'){
				$('#addr_list').html(arr[1]);
			}else{
				$('#addr_list').html(msg);
			}
		},
		error:function(){
		}
	});
}