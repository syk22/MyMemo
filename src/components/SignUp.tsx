import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

type Props = {
  isSignUp: () => void;
};

export const SignUp = (props: Props) => {
  const { isSignUp } = props;
  const redirectToMemoWhenLoginSuccess = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      return await isSignUp();
    } catch (e: any) {
      console.log(e.message as string);
    }
  };
  console.log('SignUp render()');

  return (
    <div>
      <button onClick={() => redirectToMemoWhenLoginSuccess(new GoogleAuthProvider())}>
        Googleでサインアップ
      </button>
    </div>
  );
};
