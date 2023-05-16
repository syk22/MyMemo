// import React from 'react';
import { ToDoFormat } from '../types/ToDoFormat';

export const List = (props: ToDoFormat) => {
  const { id, todoText, isDone, isClosed } = props;
  return (
    <li key={id.toString()} className={`${isDone ? 'done' : ''} ${isClosed ? 'closed' : ''}`}>
      {todoText}
      {!isDone ? <button>done</button> : null}
      {!isClosed ? <button>closed</button> : null}
    </li>
  );
};