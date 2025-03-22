import { Task } from "./Task.js";

class Todos {
  #tasks = [];
  #backend_url = "";
  constructor(url) {
    this.#backend_url = url;//added /todo-removed-"/todo"
  }
 
  getTasks() {
    return fetch(this.#backend_url)
      .then((response) => response.json())
      .then((data) => data.map((task) => new Task(task.id, task.description)));
  }

  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach((node) => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };

  #addToArray = (id, text) => {
    const task = new Task(id, text);
    this.#tasks.push(task);
    return task;
  };
  #removeFromArray = (id) => {
    const arrayWithoutRemoved = this.#tasks.filter((task) => task.id !== id);
    this.#tasks = arrayWithoutRemoved;
  };
  addTask = (text) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({ description: text }); //{description:description }
      fetch(this.#backend_url + "/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
        .then((response) => response.json())
        .then(
          (json) => {
            const task = new Task(json.id, json.description); // Ensure task object is created correctly
            resolve(task);
            //resolve(this.#addToArray(json.id, text)); //json.id,json.description
          },
          (error) => {
            reject(error);
          }
        );
    });
  };
  removeTask = (id) => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url + "/delete/" + id, {
        method: "delete",
      })
        .then((response) => response.json())
        .then(
          (json) => {
            this.#removeFromArray(id);
            resolve(json.id);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };
}

export { Todos };
