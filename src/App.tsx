// import { memo } from 'react';
import { memo, useEffect, useState } from 'react';
import './assets/styles/App.css';
import './assets/styles/style.css';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Header } from './components/Header';
import { SignUp } from './components/SignUp';
import { TodoTasks } from './components/TodoTasks';
import { TodoListsProvider } from './components/providers/TodoListsProviders';
import { AddTodo } from './components/AddTodo';

const intialUserInfo = {
  email: '',
  displayName: '',
};

export const App = memo(() => {
  auth;
  const [userInfo, setUserInfo] = useState(intialUserInfo);
  const [goToSignUpFlag, setSignUpFlag] = useState(true);

  const isSignUp = () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setSignUpFlag(true);
        } else {
          setSignUpFlag(false);
          const curUserInfo = {
            displayName: user.displayName as string,
            email: user.email as string,
          };
          await setUserInfo(curUserInfo);
          // console.log(curUserInfo);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    isSignUp();
  }, []);

  console.log(goToSignUpFlag);
  console.log('App render');

  return (
    <>
      <TodoListsProvider>
        {goToSignUpFlag ? (
          <SignUp isSignUp={isSignUp} />
        ) : (
          <div>
            <Header userInfo={userInfo} isSignUp={isSignUp} />
            <AddTodo />
            <TodoTasks />
          </div>
        )}
      </TodoListsProvider>
    </>
  );
});
