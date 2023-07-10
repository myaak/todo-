import { useCallback, useEffect, useState } from "react";
import Todo from "../../store/Todo";
import { Checkbox, TodoTitle, TodoWrapper } from "./TodoItem.style";
import TodoItemButtons from "./Buttons";
import TodoList from "../../store/TodoList";
import { observer } from "mobx-react";

interface ITodoItem {
  todo: Todo;
  onCheck: () => void;
}

const TodoItem: React.FC<ITodoItem> = observer(({todo, onCheck}) => {
  const {title, completed} = todo;

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleSaveResult = () => {
    TodoList.renewTitle({...todo, title: newTitle});
    setEditing(false);
  }

  const handleDeleteItem = () => {
    TodoList.removeTodo(todo);
  }

  const handleCancelEditing = useCallback(() => {
    setEditing(false);
    setNewTitle(title);
  }, [])

  useEffect(() => {
    setNewTitle(title);
  }, [title])

  return (
    <TodoWrapper>
      { editing ? 
        <input type="text" onChange={(e) => setNewTitle(e.target.value)} value={newTitle}/>
        :
        <>
          <Checkbox checked={completed} onChange={onCheck}></Checkbox>
          <TodoTitle done={String(completed)} onClick={() => setEditing(true)}>{title}</TodoTitle>
        </>
      }
      <TodoItemButtons 
        editing={editing}
        saveResult={handleSaveResult}
        deleteItem={handleDeleteItem}
        toggleEdit={() => setEditing(true)}
        cancelEdit={handleCancelEditing}
      />
    </TodoWrapper>
  )
})

export default TodoItem;
