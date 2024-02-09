import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  ErrorText,
  Divider,
} from './authentication-form.style';
import { AuthContext } from '../../contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { Input } from '../../components/forms/input';
import {fb_auth, auth, serverTime} from '../../utils/firebase';
import {registerProfile, getProfilePhone} from '../../apis/user';

export default function SignInModal() {
  const { authDispatch } = useContext(AuthContext);
  const [phone, setPhone] = React.useState('');
  const [err_msg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  // const loginCallback = () => {
  //   if (typeof window !== 'undefined') {
  //     // localStorage.setItem('access_token', `${email}.${password}`);
  //     // authDispatch({ type: 'SIGNIN_SUCCESS' });
  //     // closeModal();
  //   }
  // };

  
  React.useEffect(() => {
    if (window.recaptchaVerifier == null)
    {
      window.recaptchaVerifier = new fb_auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSubmit();
        }
      });
    }
    setErrMsg('')
    setLoading(false)
    setPhone('')
  }, [])

  const onSubmit=()=>{
    setLoading(true)
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber("+852" + window.phone_number, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setErrMsg('')
          setLoading(false)
          authDispatch({
            type: 'VERIFICATION', payload: 'login'
          });
        }).catch((error) => {
          console.log(error)
          // Error; SMS not sent
          setLoading(false)
          setErrMsg('Something went wrong! SMS not sent.')
        });
  }
  
  const onClickSubmit=()=>{
    if (phone.length < 8) {
      setErrMsg('Enter valid phone number')
      return
    }
    setErrMsg('')
    window.phone_number = phone

    setLoading(true)
    getProfilePhone("+852" + window.phone_number).then(response => {
      setLoading(false)
      if(response.size > 0) {
        onSubmit()
      }
      else {
        setErrMsg('This phone number does not exist!')
      }
    })
    .catch(error => {
      setLoading(false)
      console.log(error)
      setErrMsg('Something went wrong!')
    }) 
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back' />
        </Heading>

        <SubHeading>
        使用您的電話號碼登錄
        </SubHeading>
          <Input
            type='text'
            placeholder={'電話號碼'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <ErrorText mb='30px'>{err_msg}</ErrorText>
          <Button
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            onClick={()=> onClickSubmit()} 
            loading ={loading}
            mt='20px'
          >
            登入
          </Button>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='dontHaveAccount'
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
          </LinkButton>
        </Offer>
      </Container>

    </Wrapper>
  );
}
