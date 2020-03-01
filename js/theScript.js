$("ul").on("click","li",function (argument) {
	$(this).toggleClass("check");
});

$("ul").on("click" , "span" ,function(argument) {
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	argument.stopPropogation();
});

$("input").on("keypress",function (argument) {
	if(argument.which===13){
		$('ul').append("<li><span> <i class='fa fa-trash'></i> </span>" + $(this).val() + "</li>");
		$(this).val("");
	}
});