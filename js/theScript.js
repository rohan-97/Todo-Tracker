function get_list() {
	res = localStorage.getItem('todo_list');
	if(res === null){
		return [];
	}
	return JSON.parse(res);
}

function set_list(stuff) {
	localStorage.setItem('todo_list', JSON.stringify(stuff));
}

function populate_screen() {
	res = get_list();
	res.forEach(element => addToList(element));	
}

populate_screen()

$("ul").on("click","li",function (argument) {
	$(this).toggleClass("check");
	toggleIsDoneStatus($(this).attr('id'));
});

$("ul").on("click" , "span" ,function(event) {
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	removeFromList($(this).parent().attr('id'));
	event.stopPropagation();
});

$("input").on("keypress",function (argument) {
	if(argument.which===13){
		element_obj = {
			id : Math.random().toString(36).substring(2),
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
		add_to_local_storage(stuff_to_add);
	}
	// console.log(stuff_to_add.isdone + " : " + stuff_to_add.value);
	if(stuff_to_add.isdone){
		tag_to_add = "<li id='"+stuff_to_add.id+"' class='check'><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.value + "</li>";
	} else {
		tag_to_add = "<li id='"+stuff_to_add.id+"'><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.value + "</li>";
	}
	if (in_the_beninging){
		$('ul').prepend(tag_to_add);
	} else {
		$('ul').append(tag_to_add);
	}
}

function removeFromList(task_id) {
	lst = get_list();
	set_list(lst.filter(ele=>ele.id!=task_id));
}

function add_to_local_storage(stuff_to_add) {
	arrey = get_list();
	arrey.unshift(stuff_to_add);
	set_list(arrey);
}

function toggleIsDoneStatus(task_id) {
	arrey = get_list();
	arrey.map(element => {
		if(element.id == task_id){
			element.isdone = !element.isdone;
		}
	});
	set_list(arrey);
}