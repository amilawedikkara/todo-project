import { rejects } from 'assert';
import { Task } from './Task.js';
import { response } from 'express';

class Todos {
  #backendUrl;
  #tasks = [];

  constructor(backendUrl) {
    this.#backendUrl = backendUrl;
  }

  getTasks = async () => {
return new Promise(async(resolve, reject)=> {
(await fetch(this.#backendUrl))
.then((response) => response.json())
.then((json) => {
  this.#readJson(json);
  resolve(error);
})
})
  };

  addTask = async (description) => {
    try {
      const response = await fetch(`${this.#backendUrl}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      return await this.#handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to add task: ${error.message}`);
    }
  };

  #handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    
    if (Array.isArray(data)) {
      return data.map(item => new Task(item.id, item.description));
    }
    return new Task(data.id, data.description);
  };
}

export { Todos } ;