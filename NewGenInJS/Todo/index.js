import { todos } from "./consts/todos.js";

//select
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const ul = document.querySelector(".list-group");
const liIntoUl = document.querySelector(".list-group li");
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
  li.append(document.createTextNode(todo), link);
  ul.appendChild(li);
  input.value = "";
}

//get todos
function getTodosFromStorage() {
  if (!localStorage.getItem(todos)) {
    return [];
  }
  return JSON.parse(localStorage.getItem(todos));
}

//Add todo to storage
function addStorage(todo) {
  console.log(todos);
  let todosLocal = getTodosFromStorage();
  todosLocal.push(todo);
  localStorage.setItem(todos, JSON.stringify(todosLocal));
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
function deleteTodoFromStorage(deletetodo) {
  let todosLocal = getTodosFromStorage();
  todosLocal.forEach(function (todo, idx) {
    if (todo === deletetodo) {
      todosLocal.splice(idx, 1);
    }
  });
  localStorage.setItem(todos, JSON.stringify(todosLocal));
}

//filter todos
filter.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();
  const lis = document.querySelectorAll(".list-group-item");
  lis.forEach(function (li) {
    const value = li.textContent.toLowerCase();
    if (value.indexOf(inputValue) === -1) {
      li.setAttribute("style", "display : none !important");
    }
    if (inputValue.trim() === "") {
      li.setAttribute("style", "display : block");
    }
  });
});
//value.includes(inputValue)

//clear
clear.addEventListener("click", (e) => {
  e.preventDefault();
  if (!liIntoUl) {
    showAlert("dark", "There is no todo");
  } else {
    localStorage.clear();
    ul.innerHTML = "";
    showAlert("success", "All todos deleted successfully");
  }
});
