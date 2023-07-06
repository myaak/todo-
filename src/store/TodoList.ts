import { makeAutoObservable } from "mobx";
import Todo from "./Todo";
import { ITodo } from "../models/ITodo";


class TodoList {
  todos: Todo[] = [
    {
      id: 1,
      title: "mobx",
      completed: false
    }
  ]

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(title: string) {

    let newId = 1;
    if (this.todos.length > 0) {
      newId = this.todos[this.todos.length - 1].id + 1;
    }
    const newTodo: ITodo = {
      id: newId,
      title: title,
      completed: false
    } 
    this.todos.push(new Todo(newTodo));
  }

  removeTodo({id}: Todo) {
    this.todos = this.todos.filter((item: Todo) => item.id !== id);
  }

  completeTodo({id, completed}: Todo) {
    this.todos = this.todos.map((item: Todo) => item.id === id ? {...item, completed: !completed} : item);
  }

  renewTitle({id, title}: Todo) {
    this.todos = this.todos.map((item: Todo) => item.id === id ? {...item, title: title} : item);
  }
}

export default new TodoList();
