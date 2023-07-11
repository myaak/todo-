import Todo from "../../store/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { observer } from "mobx-react";
import TodoList from "../../store/TodoList";
import { useEffect } from "react";
import { action } from "mobx";

interface ITodoListComponent {
  todos: Todo[];
}

const TodoListComponent: React.FC<ITodoListComponent> = observer(({todos}) => {

  const handleCompleteTodo = action((todo: Todo) => {
    TodoList.completeTodo(todo);
  });

  useEffect(() => {
  }, [])
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCheck={action(() => handleCompleteTodo(todo))}
        />
      ))  
      }
    </ul>
  )
});

export default TodoListComponent;
