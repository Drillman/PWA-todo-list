import IdbService from './idb';
const generateUUID = () => new Date().getTime().toString(16);

class TodoListService {
  idbService = null;
  constructor() {
    this.idbService = new IdbService();
  }
  async getTodos() {
    if (navigator.onLine) {
      const todos =  await fetch('http://localhost:3000/todos').then(res => res.json());
      this.idbService.setTodos(todos)
      return todos;
    }
    return this.idbService.getTodos();
  }

  async addTodo(content) {
    const addedTodo = await fetch('http://localhost:3000/todos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: generateUUID(),
        content,
        done: false,
        isSync: false
      })
    }).then(res => res.json());
    return addedTodo;
    // if (navigator.onLine) {
    //   this.idbService.setTodos(todos)
    //   return todos;
    // }
    // return this.idbService.getTodos();
  }

  async changeDoneState(todo, state = true) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...todo,
        done: state
      })
    }).then(res => res.json()).finally(console.log);
  }
}

export default new TodoListService();
