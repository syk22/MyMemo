import { useContext, useEffect, useState } from 'react';
import '../assets/styles/style.css';
import { TodoListsContext } from './providers/TodoListsProviders';
import { TodoFormat } from '../types/TodoFormat';

export const TodoDone = () => {
  console.log('TodoDone render()');
  const { todoDone } = useContext(TodoListsContext);
  const [displayArray, setDisplayArray] = useState([] as JSX.Element[]);
  useEffect(() => {
    if (todoDone !== undefined) {
      if (todoDone.length > 0) {
        const tempArray = todoDone.map((v: TodoFormat) => {
          return (
            <>
              <dt key={v.id.toString()}>{v.id.toString()}</dt>
              <dd>{v.todoText}</dd>
            </>
          );
        });
        setDisplayArray(tempArray);
      } else setDisplayArray([]);
    }
  }, [todoDone]);

  return <>{displayArray.length > 0 ? <dl className="done-list">{displayArray}</dl> : <div></div>}</>;
};
