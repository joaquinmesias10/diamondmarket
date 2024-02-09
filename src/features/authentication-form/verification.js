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
import { connect } from 'react-redux'
import { closeModal } from '@redq/reuse-modal';
import { Input } from '../../components/forms/input';
import { fb_auth, auth, serverTime } from '../../utils/firebase';
import { registerProfile, getProfilePhone } from '../../apis/user';
import { API_GET_USER_PROFILE } from '../../redux_helper/constants/action-types'

function VerificationModal(props) {
  const { authState, authDispatch } = useContext(AuthContext);
  const [err_msg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [verify_code, setVerificationCode] = React.useState('');

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const onSuccess = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      if ((token || '') != '') {
        props.dispatch({ type: API_GET_USER_PROFILE, payload: token })
      }
      closeModal();
    }
  };


  React.useEffect(() => {
    setErrMsg('')
    setLoading(false)
    setVerificationCode('')
  }, [])

  const onVerifyCode = (code) => {
    if (code != null && code.length != null && code.length < 6) {
      setErrMsg('Enter valid code')
      return
    }
    setErrMsg('')
    setLoading(true)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      setErrMsg('')
      if (authState.loginType == 'login') {
        setLoading(false)
        onSuccess(user.uid)
      }
      else {
        // register user profile
        let params = {
          id: user.uid,
          name: window.name,
          phone: "+852" + window.phone_number,
          email: window.email,
          notifications: false,
          online: true,
          superAdmin: false,
          platform: "Web",
          token: "",
          createdAt: serverTime,
          lastSeen: serverTime
        }
        registerProfile(user.uid, params).then(response => {
          setLoading(false)
          onSuccess(user.uid)
        })
          .catch(err => {
            console.log(err)
            setLoading(false)
          })
      }
    }).catch((error) => {
      console.log(error)
      // User couldn't sign in (bad verification code?)
      setErrMsg('Verification code mismatch!')
      setLoading(false)
    });
  }


  return (
    <Wrapper>
      <Container>
        <Heading>
          確認
        </Heading>

        <SubHeading>
          驗證您的電話號碼
        </SubHeading>
        <Input
          type='text'
          placeholder={'驗證碼'}
          value={verify_code}
          onChange={(e) => setVerificationCode(e.target.value)}
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
          onClick={() => onVerifyCode(verify_code)}
          loading={loading}
          mt='20px'
        >
          確認
        </Button>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        <Offer style={{ padding: '20px 0' }}>
          使用其他電話號碼登錄 {'  '}
          <LinkButton onClick={toggleSignInForm}>
            登入
          </LinkButton>
        </Offer>
      </Container>

    </Wrapper>
  );
}


const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
  }
}

export default connect(mapstate_props)(VerificationModal);
