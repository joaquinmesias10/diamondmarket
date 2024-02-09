import React, { useReducer } from 'react';
import { AuthContext } from './auth.context';
const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
  access_token : localStorage.getItem('access_token') || '',
  currentForm: 'signIn',
  loginType: 'login', // 'register'
};

function reducer(state, action) {
  console.log(state, 'auth state');
  console.log(action, 'auth action');

  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        access_token : localStorage.getItem('access_token') || '',
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        access_token : null,
      };
    case 'SIGNUP':
      return {
        ...state,
        currentForm: 'signUp',
      };
    case 'FORGOTPASS':
      return {
        ...state,
        currentForm: 'forgotPass',
      };
    case 'VERIFICATION':
      return {
        ...state,
        currentForm: 'verification',
        loginType: action.payload,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
