import React, { useContext } from 'react';
import SignInForm from './login';
import SignOutForm from './register';
import ForgotPassForm from './forgot-password';
import VerificationForm from './verification';
import { AuthContext } from '../../contexts/auth/auth.context';

export default function AuthenticationForm() {
  const { authState } = useContext(AuthContext);
  let RenderForm;

  if (authState.currentForm === 'signIn') {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === 'signUp') {
    RenderForm = SignOutForm;
  }

  if (authState.currentForm === 'forgotPass') {
    RenderForm = ForgotPassForm;
  }

  if (authState.currentForm === 'verification') {
    RenderForm = VerificationForm;
  }
  
  return <RenderForm />;
}
