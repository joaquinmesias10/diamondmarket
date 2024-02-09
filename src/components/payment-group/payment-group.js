import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from '../../components/carousel/carousel';
import PaymentCard from '../payment-card/payment-card';
import { Plus } from '../../assets/icons/PlusMinus';
import { Button } from '../../components/button/button';
import {
  Header,
  PaymentCardList,
  IconWrapper,
  SavedCard,
  OtherPayOption,
} from './payment-group.style';


const PaymentGroup = ({
  name,
  curPaymentMethod,
  onChange,
}) => {
  // RadioGroup State

  // Handle onChange Func
  const handleChange = (item) => {
    onChange(item);
  };
  return (
    <>
      <Header>
        <SavedCard>付款方式</SavedCard>
      </Header>

      <OtherPayOption>
        <label
          htmlFor="mobile-wallet"
          key="${name}-mobile-wa"
          className="other-pay-radio"
        >
          <input
            type="radio"
            id="mobile-wallet"
            name={name}
            checked={true}
            value="mobile-wallet"
            checked={curPaymentMethod != 'cash_on_delivery'}
            onChange={()=>onChange('card_payment')}
          />
          <span>信用卡</span>
        </label>

        <label
          htmlFor="cash-on-delivery"
          key="${name}-cash"
          className="other-pay-radio cash-on-delivery"
        >
          <input
            type="radio"
            id="cash-on-delivery"
            name={name}
            value="cash-on-delivery"
            checked={curPaymentMethod == 'cash_on_delivery'}
            onChange={()=>onChange('cash_on_delivery')}
          />
          <span>親臨付款</span>
        </label>
      </OtherPayOption>
    </>
  );
};

export default PaymentGroup;
