import React, { useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { CouponBoxWrapper, Error } from './userpoints.style';
import { Input } from '../../components/forms/input';
import { Button } from '../../components/button/button';
import {AuthContext} from '../../contexts/auth/auth.context';
import { useCart } from '../../contexts/cart/use-cart';
import {getCoupon} from '../../apis/coupon';
 
const Userpoints  = ({
  disabled,
  className,
  style,
  availalblePoints, 
  user_profile,
  errorMsgFixed = false,
  ...props
}) => {
  const intl = useIntl();
  const { authState, authDispatch } = useContext(AuthContext);
  const { applyPoints, removePoints } = useCart();
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplyCoupon = () => { 
    if(points == null) {return }
    if(user_profile.user_points != null && user_profile.user_points >= points ) {
      if (points <= availalblePoints ){
        applyPoints(points);
        setError(null)
      }
      else {
        setError('Invalid points')
      }
    }
    else {
      setError("You don't have enough points")
    } 
  };
  const handleOnChange = (e) => {
    setPoints(e.currentTarget.value);
  };
  return (
    <>
      <CouponBoxWrapper
        className={className ? className : 'boxedCoupon'}
        style={style}
      >
        <Input
          onChange={handleOnChange}
          value={points}
          inputMode='numeric'
          placeholder={'輸入用戶點數'}
          {...props}
        />
        <Button
          type='button'
          onClick={handleApplyCoupon}
          disabled={disabled}
          padding='0 30px'
          loading={loading}
        >
          <FormattedMessage id='voucherApply' defaultMessage='Apply' />
        </Button>
      </CouponBoxWrapper>
      {error && (
        <Error errorMsgFixed={errorMsgFixed}>
          {error}
        </Error>
      )}
    </>
  );
};

const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile, 
  }
}

export default connect(mapstate_props)(Userpoints); 
