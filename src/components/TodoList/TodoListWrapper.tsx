import { useEffect, useState } from 'react';
import Todo from "../../store/Todo";
import TodoListComponent from './TodoListComponent';
import TodoAddForm from "../TodoAddForm/TodoAddForm";
import TodoList from "../../store/TodoList";
import { FilterInput } from './TodoListSearch';
import { observer } from 'mobx-react';

const TodoListWrapper = observer(() => {
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

  const handleAddTodo = (title: string) => {
    if (title === '') return;
    TodoList.addTodo(title);
    handleFilterTodos();
  }

  useEffect(() => {
    handleFilterTodos();
  }, [filterString, TodoList.todos]);

  return (
    <>
      <FilterInput value={filterString} onChange={(e: React.FormEvent<HTMLInputElement>) => setFilterString(e.currentTarget.value)}></FilterInput>
      <TodoListComponent todos={todos}/>
      <TodoAddForm 
        onAdd={(title: string) => handleAddTodo(title)}
      />
    </>
  )
})

export default TodoListWrapper;
