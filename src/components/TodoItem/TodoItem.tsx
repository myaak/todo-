import React, { useEffect, useState } from "react";
import Todo from "../../store/Todo";
import { Checkbox, TodoTitle, TodoWrapper } from "./TodoItem.style";
import TodoItemButtons from "./Buttons";
import TodoList from "../../store/TodoList";
import { observer } from "mobx-react";
import { action } from "mobx";

interface ITodoItem {
  todo: Todo;
  onCheck: () => void;
}

const TodoItem: React.FC<ITodoItem> = ({todo, onCheck}) => {
  const {title, completed}: Omit<Todo, "id"> = todo;

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  console.log(`render ${todo.id}, ${todo.title}`);

  const handleSaveResult = action(() => {
    if (newTitle === '') return;
    TodoList.renewTitle({...todo, title: newTitle});
    setEditing(false);
  });

  const handleDeleteItem = action(() => {
    TodoList.removeTodo(todo);
  });

  const handleCancelEditing = action(() => {
    setEditing(false);
    setNewTitle(title);
  });

  useEffect(() => {
    setNewTitle(title);
  }, [title])

  return (
    <TodoWrapper>
      { editing ? 
        <input type="text" 
          onChange={(e) => setNewTitle(e.target.value)} 
          value={newTitle}
          maxLength={25}
        />
        :
        <>
          <Checkbox checked={completed} onChange={onCheck}></Checkbox>
          <TodoTitle done={String(completed)} onClick={() => setEditing(true)}>
              {title}
          </TodoTitle>
        </>
      }
      <TodoItemButtons 
        editing={editing}
        saveResult={handleSaveResult}
        deleteItem={handleDeleteItem}
        toggleEdit={action(() => setEditing(true))}
        cancelEdit={handleCancelEditing}
      />
    </TodoWrapper>
  )
}

export default React.memo(TodoItem);
