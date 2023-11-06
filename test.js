var todoInput = document.getElementById('todoInput');
var addTodoButton = document.getElementById('addTodo');
var todoList = document.getElementById('todoList');
var todos = [];
function addTodo() {
    var task = todoInput.value.trim();
    if (task !== '') {
        todos.push(task);
        renderTodoList();
        todoInput.value = '';
    }
}
function removeTodo(index) {
    todos.splice(index, 1);
    renderTodoList();
}
function editTodo(index) {
    var updatedTask = prompt('Edit task:', todos[index]);
    if (updatedTask !== null) {
        todos[index] = updatedTask.trim();
        renderTodoList();
    }
}
function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach(function (todo, index) {
        var li = document.createElement('li');
        li.textContent = todo;
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () { return editTodo(index); });
        editButton.style.backgroundColor = 'green';
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () { return removeTodo(index); });
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = '#fff';
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
addTodoButton.addEventListener('click', addTodo);
renderTodoList();
