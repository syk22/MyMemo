import { MouseEventHandler } from 'react';
import { ToDoFormat } from './ToDoFormat';

export type TodoListType = {
  todoList: ToDoFormat[];
  createTodo: MouseEventHandler;
};
