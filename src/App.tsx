import { useState } from 'react'
import './App.css'


export const App = () => {
  const [task, setTask] = useState<string>("");
  const [taskArray, setTaskArray] = useState<string[]>([]);
  const createTask = () => {
    setTaskArray(() => taskArray.concat(task));
    setTask(() => "");
  }
  let tasks: JSX.Element[] | undefined;
  if (taskArray.length > 0) {
    tasks = taskArray.map((v, i) => {
      return (<li key={i.toString()+v.toString()}>{v}</li>);
    });
  }

  return (
    <>
      <header>Welcome to vite + React + TypeScript</header>
      <input type='input' value={task} onChange={event=>setTask(event.target.value)}/>
      <button onClick={createTask}>add task</button>
      <ul>
        {tasks}
      </ul>
    </>
  );
}
