import { Button } from "../Buttons/Buttons.style";

interface ITodoItemButtons {
  editing: boolean;
  saveResult: () => void;
  toggleEdit: () => void;
  deleteItem: () => void;
  cancelEdit: () => void;
}

const TodoItemButtons = ({editing, saveResult, toggleEdit, deleteItem, cancelEdit}: ITodoItemButtons) => {
  return (
    <>
      { editing ?
        <>
          <Button onClick={saveResult}>Save</Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </>
        :
        <>
          <Button onClick={toggleEdit}>Edit</Button>
          <Button onClick={deleteItem}>Delete</Button>
        </>
      }
    </>
  )
}

export default TodoItemButtons
