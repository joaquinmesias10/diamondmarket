import React, { useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CouponBoxWrapper, Error } from './coupon.style';
import { Input } from '../../components/forms/input';
import { Button } from '../../components/button/button';
import {AuthContext} from '../../contexts/auth/auth.context';
import { useCart } from '../../contexts/cart/use-cart';
import {getCoupon} from '../../apis/coupon';
 
const Coupon  = ({
  disabled,
  className,
  style,
  errorMsgFixed = false,
  ...props
}) => {
  const intl = useIntl();
  const { authState, authDispatch } = useContext(AuthContext);
  const { applyCoupon } = useCart();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplyCoupon = async () => {
    setLoading(true)
    getCoupon(code, new Date(), authState.access_token, (coupon)=>{
      console.log('coupon', coupon)
      applyCoupon(coupon);
      setLoading(false)
    },
    (err) => {
      setError(err);
      setLoading(false)
    })
  };
  const handleOnChange = (e) => {
    setCode(e.currentTarget.value);
  };
  return (
    <>
      <CouponBoxWrapper
        className={className ? className : 'boxedCoupon'}
        style={style}
      >
        <Input
          onChange={handleOnChange}
          value={code}
          placeholder={'輸入優惠碼'}
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
          優惠碼無效
        </Error>
      )}
    </>
  );
};

export default Coupon;
