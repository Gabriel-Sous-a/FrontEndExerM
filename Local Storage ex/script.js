console.clear();
const add = document.getElementById("add");
const input = document.getElementById("value");
const remove = document.getElementById("delete");
const localRead = JSON.parse(localStorage.getItem("list"));
const father = document.getElementById("div");
let list = document.getElementById("list");
let counter = 0;
let ul;
let storage = [];

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});


if (localRead) {
  storage = localRead;
  for (let i = 0; i < storage.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = storage[i].input;
    li.setAttribute("id", storage[i].id);
    list.appendChild(li);

    const buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.setAttribute("class", "position");
    li.appendChild(buttonEdit);

    const button = document.createElement("button");
    button.innerHTML = "X";
    button.setAttribute("class", "position");
    li.appendChild(button);
    removeItems(button);
    input.value = "";
  }
}

add.addEventListener("click", () => {
  if (input.value === "") {
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = input.value;
  li.setAttribute("id", counter);
  list.appendChild(li);
  storage.push({
    input: input.value,
    id: counter,
  });
  localStorage.setItem("list", JSON.stringify(storage));

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

  input.value = "";
});

function edit(buttonEdit, li) {
  const editInput = document.createElement("input");
  const confirm = document.createElement("button");
  confirm.innerHTML = "ok";
  confirm.setAttribute("type", "submit");
  let inputValue = "";
  buttonEdit.addEventListener("click", () => {
    console.log(li);
    li.innerHTML = "";
    li.appendChild(editInput);
    li.appendChild(confirm);
    confirm.addEventListener("click", () => {
      inputValue = editInput.value;
      li.innerHTML = "";
      li.innerHTML = inputValue;

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
      input.value = "";
    });
  });
}

function removeItems(button) {
  button.addEventListener("click", () => {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id == button.parentElement.id) {
        storage.splice(i, 1);
        console.log("in");
      }
    }
    localStorage.setItem("list", storage);
    console.log(storage);
    button.parentElement.remove();
    if (storage.length == 0) {
      localStorage.clear();
    }
  });
}

remove.addEventListener("click", () => {
  list.remove();
  ul = document.createElement("ul");
  ul.setAttribute("id", "list");
  father.appendChild(ul);
  storage = [];
  list = ul;
  localStorage.clear();
});
