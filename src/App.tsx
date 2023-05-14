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
  // const [closedArray, setClosedArray] = useState<ToDoFormat[]>([]);

  const retrieveTargetTodo = (id: number, from: string) => {
    switch (from) {
      case 'todo':
        return todoArray.find(v => v.id === id);
      case 'done':
        return doneArray.find(v => v.id === id);
      // case 'closed':
      //   return closedArray.find(v => v.id === id);
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
  const createDoneTodos = (id: number, from: string) => {
    nowTime = new Date();
    const doneTodo: ToDoFormat | undefined = retrieveTargetTodo(id, from);
    if (doneTodo !== undefined) {
      doneTodo.isDone = true;
      doneTodo.doneDateTime = nowTime;
      setDoneArray(prev => [...prev, doneTodo]);
    }
    setTodoArray(prev => prev.filter(v => v.id !== id));
  };

  let tasksTodo: JSX.Element[] | undefined;
  if (todoArray.length > 0) {
    tasksTodo = todoArray.map(v => {
      return (
        <li key={v.id.toString()}>
          {v.value}
          <button onClick={() => createDoneTodos(v.id, 'todo')}>done</button>
          {/* <button onClick={() => createDoneTodos(v.id)}>close</button> */}
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
          {/* <button onClick={() => createDoneTodos(v.id)}>close</button> */}
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
      </ul>
    </>
  );
};
