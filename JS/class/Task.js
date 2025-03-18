class Task {
    #id;
    #description;
  
    constructor(id, description) {
      this.#id = id;
      this.#description = description;
    }
  
    get id() {
      return this.#id;
    }
  
    get description() {
      return this.#description;
    }
  }
  
  export { Task };