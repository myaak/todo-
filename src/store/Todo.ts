import { makeAutoObservable } from 'mobx';
import { ITodo } from '../models/ITodo'; 

class Todo {
  id: number;
  title: string;
  completed: boolean;

  constructor({id, title, completed }: ITodo) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    makeAutoObservable(this);
  }
}

export default Todo;
