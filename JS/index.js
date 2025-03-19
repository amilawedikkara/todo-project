import { Todos } from "./class/Todos.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const BACKEND_URL = "http://localhost:3001";
  const todos = new Todos(BACKEND_URL);

  // Initial state
  taskInput.disabled = true;

  const renderTask = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${task.description}
      <button class="btn btn-danger btn-sm">×</button>
    `;
    taskList.appendChild(li);
  };

  const loadTasks = async () => {
    try {
      const tasks = await todos.getTasks();
      taskList.innerHTML = "";
      tasks.forEach(renderTask);
      taskInput.disabled = false;
    } catch (error) {
      console.error("Error loading tasks:", error);
      taskInput.disabled = false;
    }
  };

  // const addTask = async (description) => {
  //   try {
  //     const newTask = await todos.addTask(description);
  //     renderTask(newTask);
  //     taskInput.value = "";
  //     taskInput.focus();
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //   }
  // };

  // Event Listeners
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const task = taskInput.value.trim();
      if (task !== "") {
        todos.addTask(task).then((task) => {
          renderTask(task);
          taskInput.value = "";
          taskInput.focus();
        });
      }
    }
  });

  // Initial load
  loadTasks();
});
