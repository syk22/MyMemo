import { createContext, useState } from 'react';
import { TodoFormat } from '../../types/TodoFormat';
import { TodoListType } from '../../types/ProviderTodoListType';

let idCount = 0;

export const TodoListsContext = createContext({} as TodoListType);
export const TodoListsProvider = (props: any) => {
  const { children } = props;
  const [todoList, setTodoList] = useState([] as TodoFormat[]);
  const [todoDone, setTodoDone] = useState([] as TodoFormat[]);
  const returnNowTime = () => new Date();

  const createTodo = () => {
    const textValue = document.getElementById('todoText') as HTMLInputElement;
    idCount++;
    if (textValue !== undefined) {
      const addTodo: TodoFormat = {
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

  const doneTodo = (index: number) => {
    const addTodoDone = todoList.find((v) => v.id === index);
    if (addTodoDone !== undefined) {
      addTodoDone.doneDateTime = returnNowTime();
      const revTodoDone = todoDone.length > 0 ? [...todoDone, addTodoDone] : [addTodoDone];
      setTodoDone(revTodoDone);
    }
    const revTodoList = todoList.filter((v) => v.id !== index);
    setTodoList(revTodoList);
  };

  return (
    <TodoListsContext.Provider value={{ todoList, todoDone, createTodo, doneTodo }}>
      {children}
    </TodoListsContext.Provider>
  );
};
