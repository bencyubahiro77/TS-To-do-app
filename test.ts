const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const addTodoButton = document.getElementById('addTodo') as HTMLButtonElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;

const todos: string[] = [];

function addTodo() {
  const task = todoInput.value.trim();

  if (task !== '') {
    todos.push(task);
    renderTodoList();
    todoInput.value = '';
  }
}

function removeTodo(index: number) {
  todos.splice(index, 1);
  renderTodoList();
}

function editTodo(index: number) {
  const updatedTask = prompt('Edit task:', todos[index]);
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
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTodo(index));
    editButton.style.backgroundColor = 'green';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeTodo(index));
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.color = '#fff';
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

addTodoButton.addEventListener('click', addTodo);
renderTodoList();
