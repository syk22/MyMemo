import { auth } from '../lib/firebase';

type P = {
  userInfo: {
    email: string;
    displayName: string;
  };
  isSignUp: () => void;
};

export const Header = (props: P) => {
  const { email, displayName } = props.userInfo;
  const { isSignUp } = props;

  const signout = async () => {
    try {
      await auth;
      await auth.signOut();
      return await isSignUp();
    } catch (e: any) {
      console.log(e.message as string);
    }
  };
  console.log('Header render()');
  return (
    <>
      <header>
        <h1>My Memo to subdivide tasks from goals.</h1>
        <p>vite + React + TypeScript</p>
      </header>
      <div>
        Hello {displayName}, from {email}
        <br />
        <br />
        <button onClick={signout}>ログアウト</button>
      </div>
    </>
  );
};
