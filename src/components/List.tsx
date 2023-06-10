// import React from 'react';
import { ToDoFormat } from '../types/ToDoFormat';

export const List = (props: ToDoFormat) => {
  const { id, todoText, isDone, isClosed } = props;
  return (
    // <li key={id.toString()} className={`${isDone ? 'done' : ''} ${isClosed ? 'closed' : ''}`}>
    <li key={id.toString()}>
      {todoText}
      {isDone || isClosed ? <button>modified</button> : null}
      {!isDone ? <button>done</button> : null}
      {!isClosed ? <button>closed</button> : null}
    </li>
  );
};
