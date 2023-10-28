import { create_task, list_active_tasks, remove_task_from_active_list, toggle_check, clean_yesterdays_tasks } from './controller.js';

function populate_screen() {
    clean_yesterdays_tasks();
	let res = list_active_tasks();
	res.forEach(element => addToList(element));	
}

populate_screen()

$("ul").on("click","li",function (argument) {
	$(this).toggleClass("check");
	toggle_check($(this).attr('id'));
});

$("ul").on("click" , "span" ,function(event) {
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	remove_task_from_active_list($(this).parent().attr('id'));
	event.stopPropagation();
});

$("input").on("keypress",function (argument) {
	if(argument.which===13){
		let element_obj = {
			value : $(this).val(),
			isdone : false
		};
		addToList(element_obj, true, true);
		$(this).val("");
	}
});

/**
 * @function addToList
 * @param  {object} stuff_to_add    {adds a specific entry to to-do list}
 * @param  {boolean} in_the_beninging {By default it is false, if it is set to true, adds to the starting of the list otherwise adds to the end of list}
 * @return {none} {Unfortunately this function returns nothing :)}
 */
function addToList(stuff_to_add, in_the_beninging = false, add_to_localstorage = false) {
	if (add_to_localstorage){
		stuff_to_add = create_task(stuff_to_add.value, stuff_to_add.isdone);
	}
	// console.log(stuff_to_add.isdone + " : " + stuff_to_add.value);
    let tag_to_add = ""
	if(stuff_to_add.isDone){
		tag_to_add = "<li id='"+stuff_to_add.id+"' class='check'><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.text + "</li>";
	} else {
		tag_to_add = "<li id='"+stuff_to_add.id+"'><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.text + "</li>";
	}
	if (in_the_beninging){
		$('ul').prepend(tag_to_add);
	} else {
		$('ul').append(tag_to_add);
	}
}



