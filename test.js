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
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTodo(index));
        editButton.style.backgroundColor = 'green';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => removeTodo(index));
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = '#fff';

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(buttonContainer);
        todoList.appendChild(li);
    });
}
addTodoButton.addEventListener('click', addTodo);
renderTodoList();
