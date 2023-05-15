import { useState } from 'react';
// import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { ToDoFormat } from './types/ToDoFormat';
import './styles/App.css';
import './styles/style.css';

let idCount = 0;

export const App = () => {
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);
  const [doneArray, setDoneArray] = useState<ToDoFormat[]>([]);
  const [closedArray, setClosedArray] = useState<ToDoFormat[]>([]);
  // const [modifiedTodoMap, setModifiedTodoMap] = useState<Map<number, string>>();

  const returnNowTime = () => new Date();
  const resetTodoLists = (id: number, from: string) => {
    switch (from) {
      case 'todo':
        return setTodoArray(prev => prev.filter(v => v.id !== id));
      case 'done':
        return setDoneArray(prev => prev.filter(v => v.id !== id));
      case 'closed':
        return setClosedArray(prev => prev.filter(v => v.id !== id));
      default:
        return;
    }
  };
  const retrieveTargetTodo = (id: number, from: string) => {
    switch (from) {
      case 'todo':
        return todoArray.find(v => v.id === id);
      case 'done':
        return doneArray.find(v => v.id === id);
      case 'closed':
        return closedArray.find(v => v.id === id);
      default:
        return;
    }
  };
  const createTodo = () => {
    idCount++;
    const getAddTodoText: HTMLInputElement = document.getElementById(
      'new-add-todo'
    ) as HTMLInputElement;
    const addTodoText: string | undefined = getAddTodoText?.value;
    if (addTodoText !== undefined) {
      const addTodo: ToDoFormat = {
        value: addTodoText,
        id: idCount,
        isDone: false,
        isClosed: false,
        isModifing: false,
        createdDateTime: returnNowTime(),
      };
      if (todoArray.length > 0) setTodoArray(prev => [...prev, addTodo]);
      else setTodoArray([addTodo]);
    }
    getAddTodoText.value = '';
  };
  const refreshReturnTodos = (id: number, from: string) => {
    const returnTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (returnTodo !== undefined) {
      returnTodo.isDone = false;
      returnTodo.isClosed = false;
      returnTodo.lastModifiedDateTime = returnNowTime();
      setTodoArray(prev => [...prev, returnTodo]);
    }
    resetTodoLists(id, from);
  };
  const refreshDoneTodos = (id: number, from: string) => {
    const doneTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (doneTodo !== undefined) {
      doneTodo.isDone = true;
      doneTodo.doneDateTime = returnNowTime();
      setDoneArray(prev => [...prev, doneTodo]);
    }
    resetTodoLists(id, from);
  };
  const refreshClosedTodos = (id: number, from: string) => {
    const closedTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (closedTodo !== undefined) {
      closedTodo.isClosed = true;
      closedTodo.closedDateTime = returnNowTime();
      setClosedArray(prev => [...prev, closedTodo]);
    }
    resetTodoLists(id, from);
  };

  /*
  編集モード
  Componentに分配するとき、編集するかどうかのisEditingもそれぞれのStateで渡す事はできるのか？
  Contextで管理しようと思うと困る気がする。。。。
  やはりもう一度、Map型で管理してみることを考える

  const modifiedTodo = (id: number) => {
    // ひとまずTodoからのみ
    const tempArray: ToDoFormat[] = [];
    todoArray.forEach(v => {
      if (v.id === id) v.isModifing = true;
      tempArray.push(v);
    });
    setTodoArray(tempArray);
  };
  const fixedTodo = (id: number, idName: string) => {
    idCount++;
    const getFixTodoText: HTMLInputElement = document.getElementById(
      `modifiedTodo${idName}`
    ) as HTMLInputElement;
    const fixTodoText: string | undefined = getFixTodoText?.value;
    console.log(fixTodoText);

    const returnArray: ToDoFormat[] = [];
    if (fixTodoText !== undefined) {
      todoArray.forEach(v => {
        if (v.id === id) {
          v.value = fixTodoText;
          v.lastModifiedDateTime = returnNowTime();
          v.isModifing = false;
        }
        returnArray.push(v);
      });
    }
    setTodoArray(returnArray);
  };
  */

  let tasksTodo: JSX.Element[] | undefined;
  if (todoArray.length > 0) {
    tasksTodo = todoArray.map(v => {
      if (v.isModifing) {
        const idName = `modifiedTodo${v.id.toString()}`;
        const todoText = v.value;
        return (
          <li key={v.id.toString()}>
            <input type="type" id={idName} value={todoText} />
            {/* <button onClick={() => fixedTodo(v.id, idName)}>fix</button> */}
          </li>
        );
      }
      return (
        <li key={v.id.toString()}>
          {v.value}
          {/* <button onClick={() => modifiedTodo(v.id)}>modify</button> */}
          <button onClick={() => refreshDoneTodos(v.id, 'todo')}>done</button>
          <button onClick={() => refreshClosedTodos(v.id, 'todo')}>close</button>
        </li>
      );
    });
  }
  let tasksDone: JSX.Element[] | undefined;
  if (doneArray.length > 0) {
    tasksDone = doneArray.map(v => {
      return (
        <li key={v.id.toString()} className={`${v.isDone ? 'done' : ''}`}>
          {v.value}
          <button onClick={() => refreshReturnTodos(v.id, 'done')}>return</button>
          <button onClick={() => refreshClosedTodos(v.id, 'done')}>close</button>
        </li>
      );
    });
  }
  let tasksClosed: JSX.Element[] | undefined;
  if (closedArray.length > 0) {
    tasksClosed = closedArray.map(v => {
      return (
        <li key={v.id.toString()} className={`${v.isClosed ? 'done closed' : ''}`}>
          {v.value}
          <button onClick={() => refreshReturnTodos(v.id, 'closed')}>return</button>
          <button onClick={() => refreshDoneTodos(v.id, 'closed')}>done</button>
        </li>
      );
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input
        type="input"
        id="new-add-todo"
        // value={newTodoText}
        // onChange={event => setNewTodoText(event.target.value)}
      />
      <button onClick={createTodo}>add task</button>
      <ul>
        {tasksTodo !== undefined && tasksTodo?.length > 0 ? tasksTodo : null}
        {tasksDone !== undefined && tasksDone?.length > 0 ? tasksDone : null}
        {tasksClosed !== undefined && tasksClosed?.length > 0 ? tasksClosed : null}
      </ul>
    </>
  );
};
