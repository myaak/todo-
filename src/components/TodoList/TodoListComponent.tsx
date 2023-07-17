import Todo from "../../store/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { observer } from "mobx-react";

interface ITodoListComponent {
  todos: Todo[];
}

const TodoListComponent: React.FC<ITodoListComponent> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
export default observer(TodoListComponent);
