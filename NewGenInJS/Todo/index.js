const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const ul = document.querySelector(".list-group");
const firstBody = document.querySelector(".card-body")[1];
const secondBody = document.querySelector(".card-body")[2];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-todos");
//

form.addEventListener("submit", addTodo);

//
function addTodo(e) {
  e.preventDefault();
  const todo = input.value.trim();
  addUI(todo);
}

//

function addUI(todo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  const link = document.createElement("a");
  link.classList = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  li.appendChild(document.createTextNode(todo));
  li.appendChild(link);
  ul.appendChild(li);
}
