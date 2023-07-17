import { useEffect, useState } from "react";
import Todo from "../../store/Todo";
import TodoListComponent from "./TodoListComponent";
import TodoAddForm from "../TodoAddForm/TodoAddForm";
import TodoList from "../../store/TodoList";
import { FilterInput } from "./TodoListSearch";
import { observer } from "mobx-react";
import { action } from "mobx";

const TodoListWrapper = () => {
  const [filterString, setFilterString] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(TodoList.todos);

  const handleFilterTodos = action(() => {
    if (filterString === "") {
      setTodos(TodoList.todos);
      return;
    }

    const filteredTodos: Todo[] = TodoList.todos.filter((item: Todo) =>
      item.title.toLowerCase().includes(filterString.toLowerCase())
    );

    setTodos(filteredTodos);
  });

  const handleAddTodo = action((title: string) => {
    if (title === "") return;
    TodoList.addTodo(title);
    handleFilterTodos();
  });

  useEffect(() => {
    handleFilterTodos();
  }, [filterString, TodoList.todos]);

  return (
    <>
      <FilterInput
        value={filterString}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setFilterString(e.currentTarget.value);
        }}
      ></FilterInput>
      <TodoListComponent todos={todos} />
      <TodoAddForm onAdd={(title: string) => handleAddTodo(title)} />
    </>
  );
};

export default observer(TodoListWrapper);
