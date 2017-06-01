(function(){
	var tClient = $("#tClient").dataTable({
		"aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "Semua"]],
		"iDisplayLength": 5
	});
	$("#addClient").click(function(){
		$("#updateClient").hide();
		$("#saveClient").show();
		$("#dAddClient").modal();
	});
	$("#confirmYes").click(function(){
		$.ajax({
			url:thisdomain+"removeclient",
			data:{id:$("#tClient tbody tr.selected").attr("trid")},
			type:"post"
		}).done(function(){
			$("#tClient tbody tr.selected").remove();
		});
	});
	//$("#description").cleditor();
	$("#tClient").on("click","tr .btn_remove",function(){
		thistr = $(this).stairUp({level:4});
		thisid = thistr.attr("trid");
		$("#tClient tbody.tr").each(function(){
			$(this).removeClass("selected");
		});
		thistr.addClass("selected");
		$("#confirm").html("Apakah yakin akan menghapus "+$("#tClient tr.selected .url").html()+" ?");
		$("#dConfirm").modal();
		console.log("tr clicked"+thistr.attr("trid"));
	});
	$("#tClient").on("click","tr .btn_edit",function(){
		thistr = $(this).stairUp({level:4});
		thisid = thistr.attr("trid");
		console.log("thisid : "+thisid);
		thistr.parent().find("tr").each(function(){
			console.log("trid : "+$(this).attr("trid"));
			$(this).removeClass("selected");
		});
		thistr.addClass("selected");
		$("#url").val("");
		$("#updateClient").show();
		$("#saveClient").hide();
		$.ajax({
			url:thisdomain+"getclient/"+thisid,
			type:"get"
		}).done(function(data){
			$("#url").val(data.url);
			$("#pic").val(data.pic);
			$("#packagetype").val(data.packagetype);
			thisdate = new Date(data.expdate);
			$("#expdate").val(thisdate.getDate()+"/"+(thisdate.getMonth()+1)+"/"+thisdate.getFullYear());
			$("#description").val(data.description);
			console.log("Data : "+data);
			$("#dAddClient").modal();
		});
	});
	$("#saveClient").click(function(){
		$(".inpclient").makekeyvalparam();
		console.log($(".inpclient").attr("keyval"));
		$.ajax({
			url:thisdomain+"zaveclient",
			data:JSON.parse('{'+$(".inpclient").attr("keyval")+'}'),
			type:'post',
			dataType:'json'
		}).done(function(data){
			console.log("result : "+data.result);
				out = tClient.fnAddData([$("#url").val(),$("#pic").val(),$("#packagetype").val(),$("#description").val(),$("#expdate").val(),'<div class="btn-group"><button data-toggle="dropdown" class="btn dropdown-toggle" >Action <span class="caret"></span></button><ul class="dropdown-menu pull-right"><li class="btn_edit pointer" ><a>Edit</a></li><li class="divider"></li><li class="btn_remove pointer"><a>Hapus</a></li></ul></div>']);
				row = tClient.fnGetNodes(out);
				$(row).attr('trid', data.result);
		}).fail(function(){
			console.log("tidak dapat menyimpan data");
		});
	});
	$("#updateClient").click(function(){
		$(".inpclient").makekeyvalparam();
		clid = $("#tClient tbody tr.selected").attr("trid");
		$.ajax({
			url:thisdomain+"update",
			data:{
				id:clid,
				url:$("#url").val(),
				pic:$("#pic").val(),
				packagetype:$("#packagetype").val(),
				expdate:reversedate($("#expdate").val()),
				description:$("#description").val()
			},
			type:"post"
		}).done(function(data){
			thisdate = new Date(data.expdate);
			$("#tClient tbody tr.selected").html('<td class="url">'+data.url+'</td><td>'+data.pic+'</td><td>'+data.packagetype+'</td><td>'+data.description+'</td><td>'+thisdate.getDate()+"/"+(thisdate.getMonth()+1)+"/"+thisdate.getFullYear()+'</td><td><div class="btn-group"><button data-toggle="dropdown" class="btn dropdown-toggle" >Action <span class="caret"></span></button><ul class="dropdown-menu pull-right"><li class="btn_edit pointer" ><a>Edit</a></li><li class="divider"></li><li class="btn_remove pointer"><a>Hapus</a></li></ul></div></td>');
		});
	});
	$(".closemodal").click(function(){
		$(this).stairUp({level:5}).modal("hide");
	});
	$(".dtpicker").datepicker({
		dateFormat:"d/mm/yy",
		changeYear:true,
		changeMonth:true,
		minDate:null,
		maxDate:'+10Y'
	});
	function reversedate(str){
		var arr=str.split("/");
		return arr[2]+"-"+arr[1]+"-"+arr[0];
	}
}(jQuery))
