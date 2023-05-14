import { useState } from 'react';
// import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { ToDoFormat } from './types/ToDoFormat';
import './App.css';
import './style.css';

let idCount = 0;
let nowTime: Date;

export const App = () => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);
  const [doneArray, setDoneArray] = useState<ToDoFormat[]>([]);
  const [closedArray, setClosedArray] = useState<ToDoFormat[]>([]);

  const setTodoLists = (id: number, from: string) => {
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
    nowTime = new Date();
    const addTodo: ToDoFormat = {
      value: newTodoText,
      id: idCount,
      isDone: false,
      isClosed: false,
      isModifing: false,
      createdDateTime: nowTime,
    };
    if (todoArray.length > 0) setTodoArray(prev => [...prev, addTodo]);
    else setTodoArray([addTodo]);
    setNewTodoText(() => '');
  };
  const setReturnTodos = (id: number, from: string) => {
    nowTime = new Date();
    const returnTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (returnTodo !== undefined) {
      returnTodo.isDone = false;
      returnTodo.isClosed = false;
      returnTodo.lastModifiedDateTime = nowTime;
      setTodoArray(prev => [...prev, returnTodo]);
    }
    setTodoLists(id, from);
  };
  const setDoneTodos = (id: number, from: string) => {
    nowTime = new Date();
    const doneTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (doneTodo !== undefined) {
      doneTodo.isDone = true;
      doneTodo.doneDateTime = nowTime;
      setDoneArray(prev => [...prev, doneTodo]);
    }
    setTodoLists(id, from);
  };
  const setClosedTodos = (id: number, from: string) => {
    nowTime = new Date();
    const closedTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (closedTodo !== undefined) {
      closedTodo.isClosed = true;
      closedTodo.closedDateTime = nowTime;
      setClosedArray(prev => [...prev, closedTodo]);
    }
    setTodoLists(id, from);
  };

  let tasksTodo: JSX.Element[] | undefined;
  if (todoArray.length > 0) {
    tasksTodo = todoArray.map(v => {
      return (
        <li key={v.id.toString()}>
          {v.value}
          <button onClick={() => setDoneTodos(v.id, 'todo')}>done</button>
          <button onClick={() => setClosedTodos(v.id, 'todo')}>close</button>
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
          <button onClick={() => setReturnTodos(v.id, 'done')}>return</button>
          <button onClick={() => setClosedTodos(v.id, 'done')}>close</button>
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
          <button onClick={() => setReturnTodos(v.id, 'closed')}>return</button>
          <button onClick={() => setDoneTodos(v.id, 'closed')}>done</button>
        </li>
      );
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input
        type="input"
        value={newTodoText}
        onChange={event => setNewTodoText(event.target.value)}
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
