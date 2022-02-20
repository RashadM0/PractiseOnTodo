const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const ul = document.querySelector(".list-group");
const firstBody = document.querySelectorAll(".card-body")[0];
const secondBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-todos");
//
//eventListeners
form.addEventListener("submit", addTodo);

//create todo
function addTodo(e) {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") {
    showAlert("danger", "Add any todo!");
  } else {
    addUI(todo);
    addStorage(todo);
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
function getTodosFromStorage(){
  let todos;
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
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos))
}
