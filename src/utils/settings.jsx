import { createContext } from 'react';

export const UserContext = createContext({});

export function transrateErrors(code) {
  const error = { title: 'エラー', description: '時間をおいてお試し下さい' };
  switch (code) {
    case 'auth/invalid-email':
      error.description = 'ユーザーID形式が不正です。';
      break;
    case 'auth/user-not-found':
      error.description = 'ユーザーが存在しません。';
      break;
    case 'auth/wrong-password':
      error.description = 'パスワードが間違っています';
      break;
    case 'auth/email-already-in-use':
      error.description = 'ユーザーIDがすでに使用されています';
      break;
    default:
      break;
  }
  return error;
}
