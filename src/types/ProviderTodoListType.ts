import { MouseEventHandler } from 'react';
import { TodoFormat } from './TodoFormat';

export type TodoListType = {
  todoList: TodoFormat[];
  todoDone: TodoFormat[];
  createTodo: MouseEventHandler;
  doneTodo: Function;
};
