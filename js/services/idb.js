import { openDB } from "idb";

export default class IdbService {

  async initDb() {
    this.db = null;
  }

  async setTodos(todos) {
    if(!this.db) { await this.initDb() }
    const tx = this.db.transaction('todos', 'readwrite');
    tx.store.clear();
    for (const todo of todos) {
      tx.store.put(todo)
    }
    await tx.done;
  }

  async getTodos() {
    if(!this.db) { await this.initDb() }
    return await this.db.getAll('todos')
  }

  async addOrUpdateTodo(todo) {
    if(!this.db) { await this.initDb() }
    const tx = this.db.transaction('todos', 'readwrite');
    tx.store.put(todo)
    await tx.done;
  }

  async deleteTodo(id) {
    if(!this.db) { await this.initDb() }
    await this.db.delete('todos', id)
  }

  async clearDb() {
    await this.db.clear('todos');
  }
}
