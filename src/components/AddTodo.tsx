import { useContext } from 'react';
import { TodoListsContext } from './providers/TodoListsProviders';
import { TodoListType } from '../types/ProviderTodoListType';

export const AddTodo = () => {
  const { createTodo } = useContext<TodoListType>(TodoListsContext);
  console.log('AddTodo render()');

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
