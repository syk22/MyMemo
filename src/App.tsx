import { useEffect, useState } from 'react';
import { ToDoFormat } from './types/ToDoFormat';
import './App.css';
import './style.css';

let idCount = 0;
let nowTime: Date;

export const App = () => {
  const [text, setText] = useState<string>('');
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);
  const [doneArray, setDoneArray] = useState<ToDoFormat[]>([]);
  const [allTodoArray, setAllTodoArray] = useState<ToDoFormat[]>([]);

  const createTodo = () => {
    idCount++;
    nowTime = new Date();
    const addTodo: ToDoFormat = {
      value: text,
      id: idCount,
      isDone: false,
      isRemoved: false,
      isModifing: false,
      createdDateTime: nowTime,
    };
    if (todoArray.length > 0) setTodoArray(prev => [...prev, addTodo]);
    else setTodoArray([addTodo]);
    setText(() => '');
  };
  const createDoneTodos = (id: number) => {
    nowTime = new Date();
    const doneTodo: ToDoFormat | undefined = todoArray.find(v => v.id === id);
    if (doneTodo !== undefined) {
      doneTodo.isDone = true;
      doneTodo.doneDateTime = nowTime;
      setDoneArray(prev => [...prev, doneTodo]);
    }
    setTodoArray(prev => prev.filter(v => v.id !== id));
  };

  useEffect(() => {
    setAllTodoArray([...todoArray, ...doneArray]);
  }, [todoArray, doneArray]);

  let tasks: JSX.Element[] | undefined;
  if (allTodoArray.length > 0) {
    tasks = allTodoArray.map(v => {
      return (
        <li key={v.id.toString()} className={`${v.isDone ? 'done' : ''}`}>
          {v.value}
          <button onClick={() => createDoneTodos(v.id)}>done</button>
        </li>
      );
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input type="input" value={text} onChange={event => setText(event.target.value)} />
      <button onClick={createTodo}>add task</button>
      <ul>{tasks}</ul>
    </>
  );
};
