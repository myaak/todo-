import Todo from "../../store/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { observer } from "mobx-react";
import TodoList from "../../store/TodoList";

interface ITodoListComponent {
  todos: Todo[];
}

const TodoListComponent: React.FC<ITodoListComponent> = observer(({todos}) => {
  return (
    <ul>
      {todos.map((todo: Todo, index: number) => (
        <TodoItem
          key={index}
          todo={todo}
          onCheck={() => TodoList.completeTodo(todo)}
        />
      ))  
      }
    </ul>
  )
});

export default TodoListComponent;
