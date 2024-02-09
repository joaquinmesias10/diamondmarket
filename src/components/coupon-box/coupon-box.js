import React from 'react';
import {
  Display,
  CouponCode,
  DiscountPrice,
  CancelBtn,
} from './coupon-box.style';
import { CloseIcon } from 'assets/icons/CloseIcon';

export const CouponDisplay = ({
  code,
  currency,
  price,
  sign,
  onClick,
  style,
  btnStyle,
}) => {
  return (
    <Display style={style} className="couponDisplayBox">
      <CouponCode className="couponCodeText">{code}</CouponCode>
      <DiscountPrice className="discountedPrice">
        {sign}
        {currency}
        {price}
      </DiscountPrice>
      <CancelBtn onClick={onClick} style={btnStyle}>
        <CloseIcon />
      </CancelBtn>
    </Display>
  );
};
