import { useEffect, useState } from 'react';
import Todo from "../../store/Todo";
import TodoItem from "../TodoItem/TodoItem";
import TodoList from "../../store/TodoList";
import { observer } from "mobx-react";
import { FilterInput } from './TodoListSearch';

const TodoListItem: React.FC = observer(() => {

  const [filterString, setFilterString] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleFilterTodos = () => {
    if (filterString === '') {
      setTodos(TodoList.todos);
      return;
    }

    const filteredArray: Todo[] = 
      TodoList.todos.filter((item: Todo) => item.title.toLowerCase().includes(filterString.toLowerCase()));

    setTodos(filteredArray);
  }

  useEffect(() => {
    handleFilterTodos();
  }, [filterString])

  return (
    <div>
      <FilterInput value={filterString} onChange={(e: React.FormEvent<HTMLInputElement>) => setFilterString(e.currentTarget.value)}></FilterInput>
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
    </div>
  )
})

export default TodoListItem;
