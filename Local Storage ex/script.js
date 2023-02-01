console.clear();
const add = document.getElementById("add");
const input = document.getElementById("value");
const remove = document.getElementById("delete");
const localRead = JSON.parse(localStorage.getItem("list"));
const father = document.getElementById("div");
const description = document.getElementById("description");
let list = document.getElementById("list");
let counter = 0;
let ul;
let storage = [];
let id;

document.getElementById("menu").addEventListener("submit", (e) => {
  e.preventDefault();
});

if (localRead) {
  storage = localRead;
  for (let i = 0; i < storage.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("id", storage[i].id);
    const div = document.createElement("div");
    div.innerHTML = storage[i].description;
    li.innerHTML = storage[i].input;
    li.appendChild(div);
    list.appendChild(li);
    addButtons(li);
  }
}

value.addEventListener("click", () => {
  console.log("--");
  const div = document.createElement("div");
  const description = document.createElement("input");
  const date = document.createElement("input");
});

add.addEventListener("click", () => {
  const li = document.createElement("li");
  if (input.value === "") {
    li.innerHTML = "Untitled";
  } else {
    li.innerHTML = input.value;
  }
  const div = document.createElement("div");
  div.innerHTML = description.value;
  li.appendChild(div);
  li.setAttribute("id", counter);
  list.appendChild(li);
  storage.push({
    input: input.value,
    id: counter,
    description: description.value,
  });
  localStorage.setItem("list", JSON.stringify(storage));
  addButtons(li);
  input.value = "";
  description.value = "";
});

remove.addEventListener("click", () => {
  list.remove();
  ul = document.createElement("ul");
  ul.setAttribute("id", "list");
  father.appendChild(ul);
  storage = [];
  list = ul;
  localStorage.clear();
});

function edit(buttonEdit, li) {
  const editInput = document.createElement("input");
  const editDescription = document.createElement("input");
  editDescription.setAttribute("type", "textarea");
  const confirm = document.createElement("button");
  confirm.innerHTML = "ok";
  confirm.setAttribute("type", "submit");
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].id == buttonEdit.parentElement.id) {
      confirm.setAttribute("id", storage[i].id);
    }
  }
  buttonEdit.addEventListener("click", () => {
    li.innerHTML = "";
    li.appendChild(editInput);
    li.appendChild(editInput);
    li.appendChild(editDescription);
    li.appendChild(confirm);
    confirm.addEventListener("click", () => {
      for (let i = 0; i < storage.length; i++) {
        if (storage[i].id == confirm.id) {
          storage.splice(i, 1, {
            input: editInput.value,
            id: counter,
            description: editDescription.value,
          });
          counter++;
        }
      }
      console.log(storage);
      const inputValue = editInput.value;
      const inputDescription = editDescription.value;
      const div = document.createElement("div");
      li.innerHTML = "";
      li.innerHTML = inputValue;
      div.innerHTML = inputDescription;
      li.appendChild(div);
      addButtons(li);
      input.value = "";
      localStorage.setItem("list", JSON.stringify(storage));
    });
  });
}

function removeItems(button) {
  button.addEventListener("click", () => {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id == button.parentElement.id) {
        storage.splice(i, 1);
      }
    }
    localStorage.setItem("list", JSON.stringify(storage));
    button.parentElement.remove();
    if (storage.length == 0) {
      localStorage.clear();
    }
  });
}

function addButtons(li) {
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonEdit.setAttribute("class", "position");
  li.appendChild(buttonEdit);
  edit(buttonEdit, li);

  const button = document.createElement("button");
  button.innerHTML = "X";
  button.setAttribute("class", "position");
  li.appendChild(button);
  counter++;
  removeItems(button);
}
