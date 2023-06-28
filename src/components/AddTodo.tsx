import { useContext } from 'react';
import { TodoListsContext } from './providers/TodoListsProviders';

export const AddTodo = () => {
  const { createTodo } = useContext(TodoListsContext);

  return (
    <>
      <h2>NewTodo</h2>
      <div>
        <input type="text" id="todoText" />
        <button onClick={createTodo} type="submit">
          Add Todo
        </button>
      </div>
    </>
  );
};
