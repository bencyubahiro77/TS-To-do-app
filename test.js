var todoInput = document.getElementById('todoInput');
var addTodoButton = document.getElementById('addTodo');
var todoList = document.getElementById('todoList');
var todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    var task = todoInput.value.trim();
    if (task !== '') {
        todos.push({ name: task, prioritized: false, done: false });
        saveToLocalStorage();
        renderTodoList();
        todoInput.value = '';
    }
}

function removeTodo(index) {
    todos.splice(index, 1);
    saveToLocalStorage();
    renderTodoList();
}

function editTodo(index) {
    var updatedTask = prompt('Edit task:', todos[index].name);
    if (updatedTask !== null) {
        todos[index].name = updatedTask.trim();
        saveToLocalStorage();
        renderTodoList();
    }
}

function prioritizeTask(index) {
    todos[index].prioritized = !todos[index].prioritized;
    saveToLocalStorage();
    renderTodoList();
}

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    saveToLocalStorage();
    renderTodoList();
}

function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.name;

        if (todo.done) {
            li.style.textDecoration = 'line-through';
        }

        li.addEventListener('click', () => {
            toggleDone(index);
            renderTodoList();
        });

        if (!todo.done) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';

            const prioritizeButton = document.createElement('button');
            prioritizeButton.textContent = todo.prioritized ? 'Unprioritize' : 'Prioritize';
            prioritizeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                prioritizeTask(index);
                renderTodoList();
            });

            li.style.color = todo.prioritized ? 'blue' : 'black';

            prioritizeButton.style.backgroundColor = 'black';
            prioritizeButton.style.color = '#fff';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (event) => {
                event.stopPropagation();
                editTodo(index);
            });
            editButton.style.backgroundColor = 'green';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                removeTodo(index);
                renderTodoList();
            });
            deleteButton.style.backgroundColor = 'red';
            deleteButton.style.color = '#fff';

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(prioritizeButton);
            buttonContainer.appendChild(deleteButton);

            li.appendChild(buttonContainer);
            todoList.prepend(li);
        } else {
            todoList.appendChild(li);
        }
    });
}
addTodoButton.addEventListener('click', addTodo);
renderTodoList();
