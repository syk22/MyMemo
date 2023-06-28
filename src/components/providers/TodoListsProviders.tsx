import { createContext, useState } from 'react';
import { ToDoFormat } from '../../types/ToDoFormat';

let idCount = 0;

export const TodoListsContext = createContext([]);
export const TodoListsProvider = (props: any) => {
  const { children } = props;
  const [todoList, setTodoList] = useState<ToDoFormat[] | null>([]);
  const createTodo = () => {
    const returnNowTime = () => new Date();
    const textValue = document.getElementById('todoText') as HTMLInputElement;
    idCount++;
    if (textValue !== undefined) {
      const addTodo: ToDoFormat = {
        value: textValue.value,
        todoText: textValue.value,
        id: idCount,
        isDone: false,
        isClosed: false,
        isModifing: false,
        createdDateTime: returnNowTime(),
      };
      if (todoList !== null && todoList.length > 0) setTodoList((prev) => [...prev, addTodo]);
      else setTodoList([addTodo]);
    }
    textValue.value = '';
  };

  return <TodoListsContext.Provider value={{ todoList, createTodo }}>{children}</TodoListsContext.Provider>;
};
