import React, { FormEvent, useState } from "react";
import Todo from "../../store/Todo";
import { Checkbox, TodoTitle, TodoWrapper } from "./TodoItem.style";
import TodoItemButtons from "./Buttons";
import TodoList from "../../store/TodoList";
import { observer } from "mobx-react";
import { action } from "mobx";

interface ITodoItem {
  todo: Todo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { title, completed } = todo;

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const handleSaveResult = action(() => {
    if (newTitle === "") return;
    TodoList.changeTodoTitle(todo, newTitle);
    setEditing(false);
  });

  const handleDeleteItem = action(() => {
    TodoList.removeTodo(todo);
  });

  const handleCancelEditing = action(() => {
    setEditing(false);
    setNewTitle(title);
  });

  const handleSetTodoCompletedStatus = action((todo: Todo) => {
    TodoList.setTodoCompletedStatus(todo);
  });

  const handleSubmit = action((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveResult();
  });

  return (
    <TodoWrapper>
      {editing ? (
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            maxLength={25}
          />
        </form>
      ) : (
        <>
          <Checkbox
            checked={completed}
            onChange={() => handleSetTodoCompletedStatus(todo)}
          ></Checkbox>
          <TodoTitle done={String(completed)} onClick={() => setEditing(true)}>
            {title}
          </TodoTitle>
        </>
      )}
      <TodoItemButtons
        editing={editing}
        saveResult={handleSaveResult}
        deleteItem={handleDeleteItem}
        toggleEdit={() => setEditing(true)}
        cancelEdit={handleCancelEditing}
      />
    </TodoWrapper>
  );
};

export default observer(TodoItem);
