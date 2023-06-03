// import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../../firebase-config';

initializeApp(firebaseConfig);

const redirectToMyPageWhenLoginSuccess = async (provider: any) => {
  try {
    const auth = getAuth();
    await signInWithPopup(auth, provider);
    window.location.href = '/';
  } catch (e: any) {
    alert(`ログイン / 新規登録に失敗しました。\n${e.message}`);
  }
};

const googleLogin = () => {
  console.log('Google');
  redirectToMyPageWhenLoginSuccess(new GoogleAuthProvider());
};
(document.getElementById('googleLogin') as HTMLElement).addEventListener('click', googleLogin);
// const githubLogin = () => {
//   redirectToMyPageWhenLoginSuccess(new GithubAuthProvider());
// };
// (document.getElementById('githubLogin') as HTMLElement).addEventListener('click', githubLogin);
