import { createContext, useState } from 'react';
import { ToDoFormat } from '../../types/ToDoFormat';

export const TodoListsContext = createContext([]);
export const TodoListsProvider = (props: any) => {
  const { children } = props;
  // const sampleObj = { sampleValue: 'sample' };
  const [state, setState] = useState<string>('');
  const [todoList, setTodoList] = useState<ToDoFormat[] | null>([]);

  return (
    <TodoListsContext.Provider value={{ state, setState, todoList, setTodoList }}>{children}</TodoListsContext.Provider>
  );
};
