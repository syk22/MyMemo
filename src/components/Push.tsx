import { useContext } from 'react';
import { TodoListsContext } from './providers/TodoListsProviders';

export const Push = () => {
  const { setState } = useContext(TodoListsContext);

  const functionState = () => {
    const textValue = document.getElementById('textType') as HTMLInputElement;
    setState(textValue.value);
  };
  console.log(`Push render()`);
  return (
    <>
      {/* Push: <input type="text" onChange={setStateFunc} id="textType" /> */}
      Push: <input type="text" id="textType" />
      <button onClick={functionState}>PUSH</button>
      {/* Push: <input type="text" onChange={setStateFunc} id="textType" /> */}
    </>
  );
};
