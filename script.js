// Disable right-click functionality
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  
  // Prevent opening developer tools or saving/viewing source via shortcuts
  document.addEventListener("keydown", function (e) {
    // Block Ctrl+Shift+J or Cmd+Shift+J
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyJ") {
      e.preventDefault();
    }
  
    // Block Ctrl+Shift+I or Cmd+Shift+I
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyI") {
      e.preventDefault();
    }
  
    // Block F12 key
    if (e.code === "F12") {
      e.preventDefault();
    }
  
    // Block Ctrl+U or Cmd+Option+U
    if ((e.ctrlKey || e.metaKey) && (e.code === "KeyU" || e.altKey)) {
      e.preventDefault();
    }
  
    // Block Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
      e.preventDefault();
    }
  });

const taskInput = document.querySelector(".task-input input"),
      filters = document.querySelectorAll(".filters span"),
      clearAll = document.querySelector(".clear-btn"),
      taskBox = document.querySelector(".task-box");

let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// Event listeners for filter buttons
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// Function to show tasks based on filter
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status === "completed" ? "checked" : "";
            if(filter === todo.status || filter === "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

// Function to show the task menu
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.querySelector(".task-menu");
    menuDiv.classList.toggle("active");
}

// Function to update the status of a task
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Function to edit a task
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

// Function to delete a task
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

// Clear all tasks
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

// Add or update a task
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key === "Enter" && userTask) {
        if(!isEditTask) {
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            todos[editId].name = userTask;
            isEditTask = false;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

// Close task menu when clicking outside
document.addEventListener("click", e => {
    if (!e.target.closest('.settings')) {
        document.querySelectorAll('.task-menu.active').forEach(menu => menu.classList.remove('active'));
    }
});
