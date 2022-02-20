//select
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const ul = document.querySelector(".list-group");
const firstBody = document.querySelectorAll(".card-body")[0];
const secondBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-todos");

//eventListeners
form.addEventListener("submit", addTodo);
secondBody.addEventListener("click", deleteTodo);
document.addEventListener("DOMContentLoaded", printAllTodosFromStorage);
// printAllTodosFromStorage()

//Print all todos from storage
function printAllTodosFromStorage() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addUI(todo);
  });
}

//create todo
function addTodo(e) {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") {
    showAlert("danger", "Add any todo!");
  } else {
    addStorage(todo);
    addUI(todo);
    showAlert("success", "Todo added successfully!");
  }
}

//create alert messages
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstBody.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 1000);
}

//Add todo to ui
function addUI(todo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  const link = document.createElement("a");
  link.classList = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  li.appendChild(document.createTextNode(todo));
  li.appendChild(link);
  ul.appendChild(li);
  input.value = "";
}

//get todos
function getTodosFromStorage() {
  // let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//Add todo to storage
function addStorage(todo) {
  let todos = getTodosFromStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Delete any todo
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo deleted successfully");
  }
}

//delete todo from storage
function deleteTodoFromStorage(deletetodo, index) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }


  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
