import { useContext, useEffect, useState } from 'react';
import '../assets/styles/style.css';
import { TodoListsContext } from './providers/TodoListsProviders';
import { TodoFormat } from '../types/TodoFormat';

export const TodoTask = () => {
  console.log('TodoList render()');
  const { todoList, doneTodo } = useContext(TodoListsContext);
  const [displayArray, setDisplayArray] = useState([] as JSX.Element[]);
  useEffect(() => {
    if (todoList !== undefined) {
      if (todoList.length > 0) {
        const tempArray = todoList.map((v: TodoFormat) => {
          return (
            <>
              <dt key={v.id.toString()}>{v.id.toString()}</dt>
              <dd>{v.todoText}</dd>
              <dd>
                <button onClick={() => doneTodo(v.id)}>Done</button>
              </dd>
            </>
          );
        });
        setDisplayArray(tempArray);
      } else setDisplayArray([]);
    }
  }, [todoList]);

  return <>{displayArray.length > 0 ? <dl className="todo-list">{displayArray}</dl> : <div></div>}</>;
};
