import { useEffect, useState } from 'react';
import { ToDoFormat } from './types/ToDoFormat';
import './App.css';
import './style.css';

let idCount = 0;

export const App = () => {
  const [text, setText] = useState<string>('');
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);
  const [doneArray, setdoneArray] = useState<ToDoFormat[]>([]);
  const [allTodoArray, setAllTodoArray] = useState<ToDoFormat[]>([]);

  const createTodo = () => {
    idCount++;
    const addTodo: ToDoFormat = {
      value: text,
      id: idCount,
      isChecked: false,
      isRemoved: false,
    };
    if (todoArray.length > 0) {
      setTodoArray((prev) => [...prev, addTodo]);
    } else {
      setTodoArray([addTodo]);
    }
    setText(() => '');
  };
  const createDoneTodos = (id: number) => {
    const doneTodo: ToDoFormat | undefined = todoArray.find((v) => v.id === id);
    if (doneTodo !== undefined) {
      doneTodo.isChecked = true;
      setdoneArray((prev) => [...prev, doneTodo]);
    }
    setTodoArray((prev) => prev.filter((v) => v.id !== id));
  };

  useEffect(() => {
    setAllTodoArray([...todoArray, ...doneArray]);
  }, [todoArray, doneArray]);

  // 1. todoの修正、クリックしたら
  let tasks: JSX.Element[] | undefined;
  if (todoArray.length > 0) {
    tasks = allTodoArray.map((v) => {
      return (
        <li key={v.id.toString()} className={`${v.isChecked ? 'done' : ''}`}>
          {v.value}
          <button onClick={() => createDoneTodos(v.id)}>x</button>
        </li>
      );
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input
        type="input"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={createTodo}>add task</button>
      <ul>{tasks}</ul>
    </>
  );
};
