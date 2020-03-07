todo_list = [];
value = ['kanda', 'batata', 'vanga', 'chana', 'shengdana'];
chrome.storage.sync.set({key: value}, function() {
    console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['todo_list'], result => {
		console.log('Value from storage is ' + result.todo_list);
		todo_list = result.todo_list;
	}
);

console.log({todo_list});
