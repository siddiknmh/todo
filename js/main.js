/*
parentNode, removeChild, insertBefore,  createElement

*/


// Remove and complate icon in fontawosome version
var removeIcon = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
var complateIcon = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';

// User clicked on the add button
// If there have any text inside of item field, add that text in to do list
document.getElementById('add').addEventListener('click', function(){
	var value = document.getElementById('item').value;
	if (value){
		addItemToDo(value);
		document.getElementById('item').value = '';

	} 
});

function removeItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;

	parent.removeChild(item);
}

function complateItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;

	var target = (id == 'todo') ? document.getElementById('complated') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

}

// Add a new item to the to do list
function addItemToDo(text){
	var list = document.getElementById('todo');

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