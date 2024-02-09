import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
} from './cart.style';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { ShoppingBagLarge } from '../../assets/icons/ShoppingBagLarge';
import { NoCartBag } from '../../assets/icons/NoCartBag';
import { CURRENCY } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '../../contexts/language/language.provider';

import { Scrollbar } from '../../components/scrollbar/scrollbar';
import { useCart } from '../../contexts/cart/use-cart';
import { CartItem } from '../../components/cart-item/cart-item';
import Coupon from '../../features/coupon/coupon';
 
const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const Cart  = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
}) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
  } = useCart();
  const [hasCoupon, setCoupon] = useState(false);
  // const { isRtl } = useLocale();


  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width='19px' height='24px' />
          <span>
            {cartItemsCount}
            &nbsp;
            {cartItemsCount > 1 ? (
              <FormattedMessage id='cartItems' defaultMessage='items' />
            ) : (
              <FormattedMessage id='cartItem' defaultMessage='item' />
            )}
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbar className='cart-scrollbar'>
        <ItemWrapper className='items-wrapper'>
          {!!cartItemsCount ? (
            items.map((item) => (
              <CartItem
                key={`cartItem-${item.product.id}`}
                onIncrement={() => {
                  addItem({...item, quantity: 1})
                }}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
            <>
              <NoProductImg>
                <NoCartBag />
              </NoProductImg>
              <NoProductMsg>
                <FormattedMessage
                  id='noProductFound'
                  defaultMessage='No products found'
                />
              </NoProductMsg>
            </>
          )}
        </ItemWrapper>
      </Scrollbar>

      <CheckoutButtonWrapper>
        {/* <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!hasCoupon ? (
                <button onClick={() => setCoupon((prev) => !prev)}>
                  <FormattedMessage
                    id='specialCode'
                    defaultMessage='Have a special code?'
                  />
                </button>
              ) : (
                <CouponBoxWrapper>
                  <Coupon
                    disabled={!items.length}
                    style={{
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              <FormattedMessage
                id='couponApplied'
                defaultMessage='Coupon Applied'
              />
              <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode> */}

        {cartItemsCount !== 0 ? (
          <Link to='/checkout'>
            <CheckoutButton onClick={onCloseBtnClick}>
              <>
                <Title style={{color: '#fff'}}>
                  <FormattedMessage
                    id='nav.checkout'
                    defaultMessage='Checkout'
                  />
                </Title>
                <PriceBox>
                  {CURRENCY}
                  {addCommas(calculatePrice()) }
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : (
          <CheckoutButton>
            <>
              <Title  style={{color: '#fff'}}>
                <FormattedMessage id='nav.checkout' defaultMessage='Checkout' />
              </Title>
              <PriceBox>
                {CURRENCY}
                {addCommas(calculatePrice()) }
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;
