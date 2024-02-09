import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/forms/input';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  ErrorText,
  Divider,
  LinkButton,
} from './authentication-form.style';
import { AuthContext } from '../../contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateEmail } from '../../utils/common';
import { fb_auth, auth, serverTime } from '../../utils/firebase';
import { registerProfile, getProfilePhone } from '../../apis/user';

export default function SignOutModal() {
  const intl = useIntl();
  const { authDispatch } = useContext(AuthContext);
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [err_msg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };


  React.useEffect(() => {
    if (window.recaptchaVerifier == null) {
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

  const onSubmit = () => {
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
          type: 'VERIFICATION', payload: 'register'
        });
      }).catch((error) => {
        console.log(error)
        // Error; SMS not sent
        setLoading(false)
        setErrMsg('Something went wrong! SMS not sent.')
      });
  }


  const onClickSubmit = () => {
    if (name.length < 1) {
      setErrMsg('Enter valid name')
      return
    }
    if (validateEmail(email) == false) {
      setErrMsg('Enter valid email')
      return
    }
    if (phone.length < 8) {
      setErrMsg('Enter valid phone number')
      return
    }
    setErrMsg('')
    window.name = name
    window.phone_number = phone
    window.email = email

    setLoading(true)
    getProfilePhone("+852" + window.phone_number).then(response => {
      setLoading(false)
      if (response.size > 0) {
        setErrMsg('This phone number already exist!')
      }
      else {
        onSubmit()
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
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>
        <SubHeading>
          使用您的電話號碼註冊
        </SubHeading>
        <Input
          type='text'
          placeholder={'你的名字'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
        />
        <Input
          type='email'
          placeholder={'你的郵件'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
        />
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
        <ErrorText >{err_msg}</ErrorText>

        <HelperText style={{ padding: '20px 0 30px' }}>
          註冊即表示您同意  
          &nbsp;
          <Link to='/terms'>
            <a>
              <FormattedMessage
                id='termsConditionText'
                defaultMessage='Terms &amp; Condition'
              />
            </a>
          </Link>
        </HelperText>

        <Button variant='primary' size='big' width='100%' loading={loading} onClick={() => onClickSubmit()} >
          註冊
        </Button>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
