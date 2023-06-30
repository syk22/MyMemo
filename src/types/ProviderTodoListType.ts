import { MouseEventHandler } from 'react';
import { TodoFormat } from './TodoFormat';

export type TodoListType = {
  todoList: TodoFormat[];
  todoDone: TodoFormat[];
  todoClosed: TodoFormat[];
};
export type TodoActionType = {
  createTodo: MouseEventHandler;
  doneTodo: Function;
  closedTodo: Function;
};
