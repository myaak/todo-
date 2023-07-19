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
  ];

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
    };
    this.todos = [...this.todos, new Todo(newTodo)];
  }

  removeTodo({ id }: Todo) {
    this.todos = this.todos.filter((item: Todo) => item.id !== id);
  }

  setTodoCompletedStatus(todo: Todo) {
    todo.completed = !todo.completed;
  }

  changeTodoTitle(todo: Todo, newTitle: string) {
    todo.title = newTitle;
  }
}

export default new TodoList();
