class Task {
    #id;
    #text;
  
    constructor(id, text) {
      this.#id = id;
      this.#text = text;
    }
  
    getid() {
      return this.#id;
    }
  
    getText() {
      return this.#text;
    }
  }
  
  export { Task };