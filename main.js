let input = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let array = [];
///////////////////////////////
if (localStorage.getItem("task")) {
  array = JSON.parse(localStorage.getItem("task"));
}
appendToDiv(array);
///////////////////////////////

btn.onclick = function () {
  if (input.value != "") {
    addValue(input.value);
    input.value = "";
  }
};

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteDiv(e.target.parentElement, e.target.parentElement.dataset.id);
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    check(e.target.dataset.id, array);
  }
});
/////////////////////////////////
function addValue(e) {
  let note = {
    id: Date.now(),
    title: e,
    finished: false,
  };
  array.push(note);
  appendToDiv(array);
  addToLocal(JSON.stringify(array));
}
//////////////////////////////
function appendToDiv(taskData) {
  tasks.innerHTML = "";
  taskData.forEach((e) => {
    let task = document.createElement("div");
    task.className = "task";
    if (e.finished) {
      task.className = "task done";
    }
    task.setAttribute("data-id", e.id);
    let del = document.createElement("span");
    del.className = "del";
    ////////////////////////////////////////
    task.append(e.title);
    del.append(document.createTextNode("del"));
    ////////////////////////////////////////
    task.append(del);
    tasks.append(task);
    ////////////////////////////////////////
  });
}

////////////////////////////////////
function deleteDiv(div, id) {
  div.remove();
  array = array.filter((e) => e.id != id);
  addToLocal(JSON.stringify(array));
}

/////////////////////////////////
function addToLocal(localArr) {
  window.localStorage.setItem("task", localArr);
}

function check(id) {
  for (i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      console.log(array[i].finished);
      array[i].finished == false
        ? array[i].finished = true
        : array[i].finished = false;
        console.log(array)
    }
}
addToLocal(JSON.stringify(array))
}
