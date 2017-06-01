$.fn.getdate = function(){/*indonesian format only*/
	data = $(this).val().split("/");
	out = data[2]+'-'+data[1]+'-'+data[0];
	$(this).attr('datetime',out);
	//alert(out);
	return $(this);
}
$.fn.makekeyvalparam = function(){
	thisval = '';
	thiselm = $(this);
	var myarray = [];
	$(this).each(function(){
		switch($(this).attr('type')){
			case 'select':
			thisval = $(this).find('option:selected').text();
			break;
			case 'selectid':
			thisval = $(this).find('option:selected').val();
			break;
			case 'text':
				if($(this).hasClass('datepicker')){
					thisid = $(this).attr('id');
					$(this).getdate().addhour($(this).stairUp({level:2}).find('.dttime[parent="'+thisid+'"]').filter(':first')).addminute($(this).stairUp({level:2}).find('.dttime[grandparent="'+thisid+'"]').filter(':first'));
					var d = new Date();
					thisval = $(this).attr('datetime')+':'+d.getSeconds();
				}
				else if($(this).hasClass('dtpicker')){
					$(this).getdate();
					thisval = $(this).attr('datetime');
				}
				else{
					thisval = $(this).val();
				}
			break;
			case 'hidden':
			thisval = $(this).val();
			break;
			case 'selectable':
			thisval = $.trim($(this).attr('myval'));
			break;
			case 'textarea':
			thisval = $.trim($(this).val());
			break;
		}
		myarray.push('"'+$(this).attr('name')+'":"'+thisval+'"');
	});
	obj = myarray.join();
	thiselm.attr('keyval',obj);
	return thiselm;
}
$.fn.showModal = function(options){
	var settings = $.extend({
		element : 'dModal',
		title : 'Konfirmasi',
		titleElement : 'myModalLabel',
		labelElement : 'modalMessage',
		labelAlignment:'center',
		message : 'Data sudah tersimpan',
		expire : 1000,
		nextUrl : 'null'
	},options);
	console.log("message : "+settings.message);
	$('#'+settings.labelElement).html(settings.message);
	$("#"+settings.labelElement).css("text-align",settings.labelAlignment);
	$('#'+settings.titleElement).html(settings.title),
	$('#'+settings.element).modal().hideafter({
		timeout : settings.expire,
		nexturl : settings.nextUrl
	});
}
$.fn.stairUp = function(opt){
	var settings = $.extend({
		level:1
	},opt);
	out=$(this);
	for(i=0;i<settings.level;i++){
		out=out.parent();
	}
	return out;
}
