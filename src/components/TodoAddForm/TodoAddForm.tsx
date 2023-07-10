import { useState } from "react";
import { Button } from "../Buttons/Buttons.style";
import { AddForm, AddFormInput } from "./TodoAddForm.style";

interface ITodoAddForm {
  onAdd: (title: string) => void;
}

const TodoAddForm: React.FC<ITodoAddForm> = ({onAdd}) => {

  const [newTitle, setNewTitle] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(newTitle);
    setNewTitle('');
  }

  return (
    <AddForm onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleAddTodo(event)}>
      <AddFormInput value={newTitle} onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)}></AddFormInput>
      <Button>Add new Todo</Button>
    </AddForm> 
  )
}

export default TodoAddForm;
