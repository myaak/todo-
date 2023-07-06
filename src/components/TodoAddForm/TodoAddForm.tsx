import { useState } from "react";
import { Button } from "../Buttons/Buttons.style";
import { AddForm, AddFormInput } from "./TodoAddForm.style";
import TodoList from "../../store/TodoList";

const TodoAddForm = () => {

  const [newTitle, setNewTitle] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle === '') return;
    TodoList.addTodo(newTitle);
    setNewTitle('');
  }

  return (
    <AddForm onSubmit={handleAddTodo}>
      <AddFormInput value={newTitle} onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)}></AddFormInput>
      <Button>Add new Todo</Button>
    </AddForm> 
  )
}

export default TodoAddForm;
