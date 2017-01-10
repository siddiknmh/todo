
var data = (localStorage.getItem('toDoList')) ? JSON.parse(localStorage.getItem('toDoList')) : {
	todo: [],
	complated: []
};



/**
* @ Remove and complate icon in fontawosome version
*/
var removeIcon = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
var complateIcon = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';


randerToDoList();


/**
* @ User clicked on the add button
* @ If there have any text inside of item field, add that text in to do list
*/
document.getElementById('add').addEventListener('click', function(){
	var value = document.getElementById('item').value;
	if (value){

		addItem(value)

	} 

	dataObjectUpdated();
});


/**
* @If user press Enter key from kaybord then add a to-to ite
*/
document.getElementById('item').addEventListener('keydown', function(e){
	var value = this.value;

	if(e.code === 'Enter' && value){
		addItem(value);
	}
});


/**
* @ The function Add item by value
*/
function addItem(value){
	addItemToDo(value);
	document.getElementById('item').value = '';

	data.todo.push(value);
}


/**
* @ The function rander to-do item from localstoroge and show in page
*/
function randerToDoList(){
	if (!data.todo.length && !data.complated.length) return;

	for(var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemToDo(value);
	}

	for(var j = 0;  j < data.complated.length; j++) {
		var value = data.complated[j];
		addItemToDo(value, true);
	}
}


/**
* @ The function add or update in localstorage
*/
function dataObjectUpdated(){
	localStorage.setItem('toDoList', JSON.stringify(data));
}


/**
* @ The function remove item when click on delete icon 
*/
function removeItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id == 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	}else{
		data.complated.splice(data.todo.indexOf(value), 1);
	}

	dataObjectUpdated();

	parent.removeChild(item);
}

/**
* @ The function make sure item complition 
*/
function complateItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id == 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.complated.push(value);
	}else{
		data.complated.splice(data.todo.indexOf(value), 1);
		data.todo.push(value);
	}

	dataObjectUpdated();


	// Check if the item shold be added to the complated list or to re-added to the todo list
	var target = (id == 'todo') ? document.getElementById('complated') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

}

// Add a new item to the to do list
function addItemToDo(text, complated){
	var list = (complated) ? document.getElementById('complated') : document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeIcon;

	// Add click event for removing item
	remove.addEventListener('click', removeItem);

	var complate = document.createElement('button');
	complate.classList.add('complate');
	complate.innerHTML = complateIcon;

	// Add click event for completing item
	complate.addEventListener('click', complateItem);

	buttons.appendChild(remove);
	buttons.appendChild(complate);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]);
}