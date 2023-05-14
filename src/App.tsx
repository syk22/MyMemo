import { useEffect, useState } from 'react';
// import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { ToDoFormat } from './types/ToDoFormat';
import './App.css';
import './style.css';

let idCount = 0;
let nowTime: Date;

export const App = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);
  const [doneArray, setDoneArray] = useState<ToDoFormat[]>([]);
  const [allTodoArray, setAllTodoArray] = useState<ToDoFormat[]>([]);

  // todo,done,closedそれぞれで検索するべきかな
  useEffect(() => {
    setAllTodoArray([...todoArray, ...doneArray]);
  }, [todoArray, doneArray]);
  const setTargetTodo = (id: number) => allTodoArray.find(v => v.id === id);

  const createTodo = () => {
    idCount++;
    nowTime = new Date();
    const addTodo: ToDoFormat = {
      value: newTodo,
      id: idCount,
      isDone: false,
      isClosed: false,
      isModifing: false,
      createdDateTime: nowTime,
    };
    if (todoArray.length > 0) setTodoArray(prev => [...prev, addTodo]);
    else setTodoArray([addTodo]);
    setNewTodo(() => '');
  };
  const createDoneTodos = (id: number) => {
    nowTime = new Date();
    const doneTodo: ToDoFormat | undefined = setTargetTodo(id);
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
          <button onClick={() => createDoneTodos(v.id)}>done</button>
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
          {/* <button onClick={() => createDoneTodos(v.id)}>done</button> */}
          {/* <button onClick={() => createDoneTodos(v.id)}>close</button> */}
        </li>
      );
    });
  }
  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input type="input" value={newTodo} onChange={event => setNewTodo(event.target.value)} />
      <button onClick={createTodo}>add task</button>
      <ul>
        {tasksTodo !== undefined && tasksTodo?.length > 0 ? tasksTodo : null}
        {tasksDone !== undefined && tasksDone?.length > 0 ? tasksDone : null}
      </ul>
    </>
  );
};
