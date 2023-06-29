import { MouseEventHandler } from 'react';
import { TodoFormat } from './TodoFormat';

export type TodoListType = {
  todoList: TodoFormat[];
  createTodo: MouseEventHandler;
};
