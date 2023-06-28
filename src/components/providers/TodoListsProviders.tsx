import { createContext, useState } from 'react';
import { ToDoFormat } from '../../types/ToDoFormat';
import { TodoListType } from '../../types/ProviderTodoListType';

let idCount = 0;

export const TodoListsContext = createContext({} as TodoListType);
export const TodoListsProvider = (props: any) => {
  const { children } = props;
  const [todoList, setTodoList] = useState([] as ToDoFormat[]);
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
      if (todoList !== null && todoList.length > 0) setTodoList((prev) => [...(prev as ToDoFormat[]), addTodo]);
      else setTodoList([addTodo]);
    }
    textValue.value = '';
  };

  return <TodoListsContext.Provider value={{ todoList, createTodo }}>{children}</TodoListsContext.Provider>;
};
