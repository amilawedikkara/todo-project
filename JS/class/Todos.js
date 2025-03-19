import { Task } from "./Task.js";

class Todos {
  #backendUrl;
  #tasks = [];

  constructor(backendUrl) {
    this.#backendUrl = backendUrl;
  }

  getTasks = async () => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backendUrl)
        .then((response) => response.json())
        .then(
          (json) => {
            this.#readJson(json);
            resolve(this.#tasks);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson = (taskAsJson) => {
    taskAsJson.forEach((node) => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };

  #addToArray = (id,text) =>{
    const task=new Task(id,text);
    this.#tasks.push(task);
    return task;

  }

addTask =(text)=>{
  return new Promise(async(resolve,reject) =>{
    const json = JSON.stringify({description:text })//{description:description }
    fetch(this.#backendUrl + '/new',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: json
    })
    .then((response) => response.json())
    .then((json) => {
      resolve(this.#addToArray(json.id,text));//json.id,json.description
    },
    (error) => {
      reject(error);
     });
  });
}
  
  //   addTask = async (description) => {
  //     try {
  //       const response = await fetch(`${this.#backendUrl}/new`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ description })
  //       });
  //       return await this.#handleResponse(response);
  //     } catch (error) {
  //       throw new Error(`Failed to add task: ${error.message}`);
  //     }
  //   };

  //   #handleResponse = async (response) => {
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.error || 'Request failed');

  //     if (Array.isArray(data)) {
  //       return data.map(item => new Task(item.id, item.description));
  //     }
  //     return new Task(data.id, data.description);
  //   };
}

export { Todos };
