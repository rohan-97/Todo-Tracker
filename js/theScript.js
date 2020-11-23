chrome.storage.sync.get(['todo_list'], result => {
	if(result.todo_list instanceof Array){
		result.todo_list.forEach(element => addToList(element))
	}
});

// fetch("https://jira.protegrity.com:8443/rest/api/2/search?jql=key%20in%20(PTY-75548%2C%20PTY-75547)")
// .then(data=>{return data.json()})
// .then(data=>console.log(data))
chrome.runtime.sendMessage({action: "authenticate"}, function(response) {
	console.log(response.resp);
});


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
	chrome.storage.sync.get(['todo_list'], result => chrome.storage.sync.set({todo_list: result.todo_list.filter(ele=>ele.id!=task_id)}));
}

function add_to_local_storage(stuff_to_add) {
	chrome.storage.sync.get(['todo_list'], result => {
		todo_arr = (result.todo_list instanceof Array)? result.todo_list : [];
		todo_arr.unshift(stuff_to_add);
		chrome.storage.sync.set({todo_list: todo_arr});
	});
}

function toggleIsDoneStatus(task_id) {
	chrome.storage.sync.get(['todo_list'], result => {
		result.todo_list.map(element => {
			if(element.id == task_id){
				element.isdone = !element.isdone;
			}
		})
		chrome.storage.sync.set({todo_list: result.todo_list});
	});
}