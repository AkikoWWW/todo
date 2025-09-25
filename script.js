const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const delAll = document.getElementById("delAll");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();
function addTodo() {
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
}
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (event) => {
  z;
  if (event.key === "Enter") {
    addTodo();
  }
});
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });
    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("completed");
    }
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });
}
delAll.addEventListener("click", () => {
  if (todos.length === 0) return;
  const confDelete = confirm("Видалити все?");
  if (confDelete) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
