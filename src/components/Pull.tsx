import { useContext } from 'react';
import { TodoListsContext } from './providers/TodoListsProviders';

export const Pull = () => {
  const { state } = useContext(TodoListsContext);
  console.log(`Pull render()${state}`);

  return (
    <>
      <div>Pull: {state}</div>
      {/* <ul>
        {state !== undefined && state?.length > 0
          ? state.map((v, i) => {
              <li key={i.toString()} {...v} />;
            })
          : null}
      </ul> */}
    </>
  );
};
