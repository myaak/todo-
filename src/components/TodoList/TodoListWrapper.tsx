import { useMemo, useState } from "react";
import Todo from "../../store/Todo";
import TodoListComponent from "./TodoListComponent";
import TodoAddForm from "../TodoAddForm/TodoAddForm";
import TodoList from "../../store/TodoList";
import { FilterInput } from "./TodoListSearch";
import { observer } from "mobx-react";
import { action } from "mobx";

const TodoListWrapper = () => {
  const [filterString, setFilterString] = useState<string>("");

  const filteredTodos: Todo[] = useMemo(
    () =>
      filterString === ""
        ? TodoList.todos
        : TodoList.todos.filter((item: Todo) => item.title.toLowerCase().includes(filterString.toLowerCase())),
    [filterString, TodoList.todos]
  );

  const handleAddTodo = action((title: string) => {
    if (title === "") return;
    TodoList.addTodo(title);
  });

  return (
    <>
      <FilterInput
        value={filterString}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setFilterString(e.currentTarget.value);
        }}
      ></FilterInput>
      <TodoListComponent todos={filteredTodos} />
      <TodoAddForm onAdd={(title: string) => handleAddTodo(title)} />
    </>
  );
};

export default observer(TodoListWrapper);
