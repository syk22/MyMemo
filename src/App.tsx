import { useState } from 'react';
import './App.css';

type ToDo = {
  value: string;
  readonly id: number;
  // checked: boolean;
  isRemoved: boolean;
};

let idCount = 0;

export const App = () => {
  const [task, setTask] = useState<string>('');
  const [taskArray, setTaskArray] = useState<ToDo[]>([]);

  const createTask = () => {
    idCount++;
    const addTask: ToDo = {
      value: task,
      id: idCount,
      isRemoved: false,
    };
    setTaskArray((prev) => [...prev, addTask]);
    setTask(() => '');
  };
  const removeTask = (index: number) => {
    setTaskArray((prev) => prev.filter((t) => t.id !== index));
  };

  let tasks: JSX.Element[] | undefined;
  if (taskArray.length > 0) {
    tasks = taskArray.map((v) => {
      return (
        <li key={v.id.toString()}>
          {v.value}
          <button onClick={() => removeTask(v.id)}>x</button>
        </li>
      );
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input
        type="input"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button onClick={createTask}>add task</button>
      <ul>{tasks}</ul>
    </>
  );
};
