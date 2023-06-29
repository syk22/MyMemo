import { useContext } from 'react';
import { TodoListsContext } from './providers/TodoListsProviders';
import { TodoFormat } from '../types/TodoFormat';

export const List = () => {
  const { todoList } = useContext(TodoListsContext);
  let todoArray: JSX.Element[] | undefined;
  if (todoList.length > 0) {
    todoArray = todoList.map((v: TodoFormat) => {
      return (
        <>
          <dt key={v.id.toString()}>{v.id.toString()}</dt>
          <dd>{v.value}</dd>
        </>
      );
    });
  }

  return (
    <>
      <h2>TodoList</h2>
      <dl>{todoArray}</dl>
    </>
  );
};
