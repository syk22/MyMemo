import { createContext, useState } from 'react';
import { TodoFormat } from '../../types/TodoFormat';
import { TodoListType } from '../../types/ProviderTodoListType';

let idCount = 0;

export const TodoListsContext = createContext({} as TodoListType);
export const TodoListsProvider = (props: any) => {
  const { children } = props;
  const [todoList, setTodoList] = useState([] as TodoFormat[]);
  const createTodo = () => {
    const returnNowTime = () => new Date();
    const textValue = document.getElementById('todoText') as HTMLInputElement;
    idCount++;
    if (textValue !== undefined) {
      const addTodo: TodoFormat = {
        value: textValue.value,
        todoText: textValue.value,
        id: idCount,
        isDone: false,
        isClosed: false,
        isModifing: false,
        createdDateTime: returnNowTime(),
      };
      if (todoList !== null && todoList.length > 0) setTodoList((prev) => [...(prev as TodoFormat[]), addTodo]);
      else setTodoList([addTodo]);
    }
    textValue.value = '';
  };

  return <TodoListsContext.Provider value={{ todoList, createTodo }}>{children}</TodoListsContext.Provider>;
};
