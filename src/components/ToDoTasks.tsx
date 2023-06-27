import { useState } from 'react';
// import { Header } from './Header';
import { ToDoFormat } from '../types/ToDoFormat';
import { List } from './List';
import '../assets/styles/style.css';

let idCount = 0;

export const ToDoTasks = () => {
  const [todoArray, setTodoArray] = useState<ToDoFormat[]>([]);

  const returnNowTime = () => new Date();
  const createTodo = () => {
    idCount++;
    const getAddTodoText: HTMLInputElement = document.getElementById('new-add-todo') as HTMLInputElement;
    const addTodoText: string | undefined = getAddTodoText?.value;
    if (addTodoText !== undefined) {
      const addTodo: ToDoFormat = {
        value: addTodoText,
        todoText: addTodoText,
        id: idCount,
        isDone: false,
        isClosed: false,
        isModifing: false,
        createdDateTime: returnNowTime(),
      };
      if (todoArray.length > 0) setTodoArray((prev) => [...prev, addTodo]);
      else setTodoArray([addTodo]);
    }
    getAddTodoText.value = '';
  };
  console.log('ToDoTasks render()');

  return (
    <>
      <br />
      <input type="input" id="new-add-todo" />
      <button onClick={createTodo}>add task</button>
      <ul className="todo-lists">
        {todoArray !== undefined && todoArray?.length > 0
          ? todoArray.map((v) => {
              return <List key={v.id.toString()} {...v} />;
            })
          : null}
      </ul>
      <ul className="done-lists">
        {todoArray !== undefined && todoArray?.length > 0
          ? todoArray.map((v) => {
              return <List key={v.id.toString()} {...v} />;
            })
          : null}
      </ul>
      <ul className="remove-lists">
        {todoArray !== undefined && todoArray?.length > 0
          ? todoArray.map((v) => {
              return <List key={v.id.toString()} {...v} />;
            })
          : null}
      </ul>
    </>
  );
};
