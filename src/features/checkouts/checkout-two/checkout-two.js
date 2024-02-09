import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PaymentGroup from '../../../components/payment-group/payment-group';
import { CardHeader } from '../../../components/card-header/card-header';
import { handleModal } from '../../../features/checkouts/checkout-modal';
import { Button } from '../../../components/button/button';
import { CURRENCY } from '../../../utils/constant';
import { Scrollbar } from '../../../components/scrollbar/scrollbar';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  CouponCode,
  RemoveCoupon,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from './checkout-two.style';

import { NoCartBag } from '../../../assets/icons/NoCartBag';
import { AuthContext } from '../../../contexts/auth/auth.context';
import { useCart } from '../../../contexts/cart/use-cart';
import { useLocale } from '../../../contexts/language/language.provider';
import { useWindowSize } from '../../../utils/useWindowSize';
import Coupon from '../../../features/coupon/coupon';
import Userpoints from '../../../features/userpoints/userpoints';
import { getDiscountedPrice } from '../../../utils/product';
import StripePaymentForm from '../../../features/payment/stripe-form';
import { db } from '../../../utils/firebase'
import { NEW_ORDER, Orders_Coll } from '../../../utils/constant'
import { conforms, fromPairs } from 'lodash';
import StripeModal from '../../../components/modal/stripeModal'
import moment from 'moment'
import { createOrder } from '../../../apis/order'
import { updateCouponUsedBy } from '../../../apis/coupon'
import { updateEarning, updateProduct } from '../../../apis/statistics';
import { updateProfile } from '../../../apis/user';
import { API_GET_USER_PROFILE, API_IMPNOTES, SHOW_ALERT, SHOW_LOAD, DISMISS_LOAD } from '../../../redux_helper/constants/action-types';

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const OrderItem = ({ cartItem }) => {
  const { id, quantity, title, name, unit, price, salePrice } = cartItem.product;

  const displayPrice = getDiscountedPrice(cartItem.product);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
      <Items key={id}>
        <Quantity>{cartItem.quantity}</Quantity>
        <Multiplier>x</Multiplier>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ItemInfo>
            {name ? name : title}
          </ItemInfo>
          <ItemInfo>
            {cartItem.subProduct != null ? cartItem.subProduct.title : ''}
          </ItemInfo>
        </div>
        <Price>
          {CURRENCY}
          {addCommas(displayPrice * cartItem.quantity)}
        </Price>
      </Items>
    </div>
  );
};

const CheckoutWithSidebar = (props) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const history = useHistory();
  const { isRtl } = useLocale();
  const {
    items,
    removeCoupon,
    coupon,
    points,
    removePoints,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [stripe_open, OpenStripeModal] = useState(false)
  const [curPaymentMethod, SetPaymentMethod] = useState('cash_on_delivery')
  
  const size = useWindowSize();

  useEffect(() => {
    if ((authState.access_token || '') == '') {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "請先登入網站" } })
      history.push('/')
      return;
    }

    if ((authState.access_token || '') != '') {
      props.dispatch({ type: API_GET_USER_PROFILE, payload: authState.access_token })
    }

    props.dispatch({ type: API_IMPNOTES, payload: '' })

    removeCoupon()
    removePoints()

  }, [])

  useEffect(() => {
    if (
      props.user_profile != null &&
      props.user_profile.address != null &&
      props.imp_notes != null &&
      getTotalPrice() > 0 &&
      cartItemsCount > 0 
    ) {
      setIsValid(true);
    }
    else {
      setIsValid(false);
    }
 
  }, [props.user_profile, props.imp_notes])

const handleSubmit = async () => {
  if (curPaymentMethod != 'cash_on_delivery') {
    if (getTotalPrice() < 4) {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "You can not use this payment method under $4!" } })
      return;
    }
    OpenStripeModal(true);
    // handleModal(
    //   <StripePaymentForm
    //     onCreatedToken={(stripe_token) => {
    //       if (typeof stripe_token != "string") {
    //         props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "Invalid stripe token" } })
    //         return
    //       }
    //       console.log('stripe_token', stripe_token)
    //       // let order = getOrderData(false)
    //       // order.amount = calculatePrice() * 100
    //       // order.token = stripe_token
    //       // makeOrder(order);
    //     }}
    //   />,
    //   { totalPrice: calculatePrice() },
    //   'add-address-modal stripe-modal'
    // );
  }
  else {
    let order = getOrderData(true)
    makeOrder(order);
  }
};

const onCreatedStripeToken = (stripe_token) => {
  console.log('token result', stripe_token)
  if (stripe_token.error != null) {
    props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "Invalid stripe token" } })
    return
  }
  console.log('stripe_token', stripe_token.token.id)
  // console.log('stripe_token', stripe_token)
  let order = getOrderData(false)
  order.amount = getTotalPrice() * 100
  order.token = stripe_token.token.id
  makeOrder(order);
}

const calculateOrderNo = () => { 

  var datecode = moment(new Date()).format("DDHHmmss")
  var id_last4 = props.user_profile.id.slice(props.user_profile.id.length - 4, props.user_profile.id.length)
  return "#" + datecode + "-" + id_last4
}

const getOrderData = (isCod) => {
  let order = {
    id: db.collection(Orders_Coll).doc().id,
    no: calculateOrderNo(),
    cod: isCod,
    createdAt: new Date(),
    customer: props.user_profile,
    products: items,
    coupon: coupon,
    points: (parseInt(points) || 0),
    points_discount: getUserpointsDiscount(),
    shipping_cost: getShippingCost(),
    subTotal: '' + (calculateSubTotalPrice() || 0),
    total: '' + (getTotalPrice() || 0),
    date: new Date(),
    order_date: new Date().getTime(),
    status: NEW_ORDER,
    ifbooking: false
  }
  return order;
}

const orderDone = (new_orderId) => {
  clearCart()
  removeCoupon()
  removePoints()
  history.push('/created_order/' + new_orderId);
  props.dispatch({ type: DISMISS_LOAD, payload: '' });
}

const updateEarningStatics = (new_orderId, order_param) => {
  var all_promises = []
  all_promises.push(updateEarning("meta", "order_stats", parseInt(order_param.total) || 0, order_param))
  all_promises.push(updateEarning("meta", "booking_stats", parseInt(order_param.total) || 0, order_param))
  all_promises.push(updateEarning("userOrderStats", (order_param.customer.id || ""), (parseInt(order_param.products.length) || 0), order_param))

  order_param.products.map(p_item => {
    all_promises.push(updateEarning("productStats", p_item.product.id, (p_item.quantity || 0), order_param))
  })

  Promise.all(all_promises)
    .then(results => {
      updateProductSalescnt(new_orderId, order_param)
    })
    .catch(err => {
      updateProductSalescnt(new_orderId, order_param)
    });
}

const updateProductSalescnt = (new_orderId, order_param) => {

  var all_promises = []

  order_param.products.map(cartItem => {
    let product_id = cartItem.product.id
    let qty = cartItem.quantity

    let new_sales_cnt = qty
    if (cartItem.product.salesCnt != null) {
      new_sales_cnt = new_sales_cnt + cartItem.product.salesCnt
    }

    all_promises.push(updateProduct(product_id, { salesCnt: new_sales_cnt }))
  })

  Promise.all(all_promises)
    .then(results => {
      orderDone(new_orderId)
    })
    .catch(err => {
      orderDone(new_orderId)
    });
}

const updateUserPoints = (new_orderId, order_param) => {

  var new_points = 0
  if (props.user_profile.user_points != null) {
    new_points = props.user_profile.user_points
  }

  if (props.imp_notes != null && props.imp_notes.userPoint != null && props.imp_notes.userPoint > 0) {
    new_points += parseInt(props.imp_notes.userPoint * order_param.total)
  }

  new_points -= (order_param.points || 0);

  updateProfile(authState.access_token, { user_points: new_points }).then(response => {
    updateEarningStatics(new_orderId, order_param)
  })
    .catch(err => {
      updateEarningStatics(new_orderId, order_param)
    })
}

const updateCouponUsed = (new_orderId, order_param) => {
  updateCouponUsedBy(authState.access_token, coupon.id).then(res => {
    updateUserPoints(new_orderId, order_param)
  }).catch(err => {
    console.log('updateCouponUsedBy', err)
    updateUserPoints(new_orderId, order_param)
  })
}

const makeOrder = (order_param) => {
  // console.log('makeorder', order_param)
  // return;
  props.dispatch({ type: SHOW_LOAD, payload: '處理中 …' });
  // setLoading(true);
  createOrder(order_param).then(response => {
    // setLoading(false);
    if (coupon != null) {
      updateCouponUsed(response.data.orderId, order_param)
    }
    else {
      updateUserPoints(response.data.orderId, order_param)
    }
    props.dispatch({ type: SHOW_ALERT, payload: { type: 'success', msg: response.data.message } })
  })
    .catch(err => {
      // setLoading(false);
      props.dispatch({ type: DISMISS_LOAD, payload: '' });
      if (err.response != null && err.response.data != null && err.response.data.message != null) {
        props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: err.response.data.message } });
      }
      else {
        props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: 'something went wrong!' } });
      }
    })
}

const isEnabledUserPoints = () => {
  if (props.imp_notes != null && props.imp_notes.enableUserPoints == true) {
    return true;
  }
  return false;
}

const getShippingCost = () => {
  let shipping_cost = 0

  var total_weight = 0.0
  items.map(item => {
    if (item.product.product_kg != null) {
      total_weight = total_weight + item.product.product_kg * item.quantity
    }
  })

  if (total_weight > 0 && props.imp_notes != null && props.imp_notes.shippings != null) {
    props.imp_notes.shippings.map(it => {
      if (it.weight_from != null && it.weight_to != null && it.price != null) {
        if ((total_weight >= it.weight_from) && (total_weight < it.weight_to)) {
          shipping_cost = it.price
        }
        else if (total_weight >= it.weight_to) {
          shipping_cost = it.price
        }
      }
    })
  }

  var sub_total = calculatePrice()
  if (props.imp_notes != null && props.imp_notes.freeshipping != null && sub_total >= props.imp_notes.freeshipping) {
    shipping_cost = 0
  }

  return shipping_cost;
}

const isFreeShipping = () => {
  var sub_total = calculatePrice()
  if (props.imp_notes != null && props.imp_notes.freeshipping != null && sub_total >= props.imp_notes.freeshipping) {
    return true;
  }
  return false;
}

const getAvailaleUserpoints = () => {
  let available_points = 0
  if (props.imp_notes != null && props.imp_notes.userPoint != null && props.imp_notes.userPoint > 0) {
    items.map(item => {
      available_points = available_points + (parseInt(item.product.userPoints) || 0) * item.quantity
    })
  }
  return available_points
}

const getUserpointsDiscount = () => {
  if (props.imp_notes == null || props.imp_notes.userPoint == null || isEnabledUserPoints() != true) { return 0 }
  let onepoint_price = 1.0 / props.imp_notes.userPoint
  return parseInt(onepoint_price * (parseInt(points) || 0)) || 0
}

const getTotalPrice = () => {
  return calculatePrice() - getUserpointsDiscount() + getShippingCost()
}

return (
  <form>
    <CheckoutWrapper>
      <CheckoutContainer>
        <CheckoutInformation>
          <InformationBox>
            <TextWrapper>
              <CardHeader>
                郵寄地址
              </CardHeader>
              <Link to='/profile' style={{ paddingTop: 14, textDecoration: 'underline' }}>編輯</Link>
            </TextWrapper>
            <div style={{ paddingLeft: 30, paddingRight: 30 }}> 
              <TextWrapper>
                <Bold>地址</Bold>
                <Text>{props.user_profile.address}</Text>
              </TextWrapper>
            </div>
          </InformationBox>
 

          <InformationBox
            className='paymentBox'
            style={{ paddingBottom: 30 }}
          >
            <>
              <CardHeader  >
                <FormattedMessage
                  id="selectPaymentText"
                  defaultMessage="Select Payment Option"
                />
              </CardHeader>
              <PaymentGroup
                name="payment"
                curPaymentMethod={curPaymentMethod}
                onChange={(item) =>
                  SetPaymentMethod(item)
                }
              />
            </>

            {/* Coupon start */}
            {coupon ? (
              <CouponBoxWrapper>
                <CouponCode>
                  <FormattedMessage id='couponApplied' />
                  <span>{coupon.code}</span>

                  <RemoveCoupon
                    onClick={(e) => {
                      e.preventDefault();
                      removeCoupon();
                      setHasCoupon(false);
                    }}
                  >
                    移除優惠碼
                  </RemoveCoupon>
                </CouponCode>
              </CouponBoxWrapper>
            ) : (
              <CouponBoxWrapper>
                <HaveCoupon >
                  使用優惠碼
                </HaveCoupon>
                <CouponInputBox>
                  <Coupon errorMsgFixed={true} className='normalCoupon' />
                </CouponInputBox>
              </CouponBoxWrapper>
            )}

            {isEnabledUserPoints() && (points ? (
              <CouponBoxWrapper>
                <CouponCode>
                  用戶點已申請 :
                  <span>{points}</span>
                  <RemoveCoupon
                    onClick={(e) => {
                      e.preventDefault();
                      removePoints();
                    }}
                  >
                    移除用戶點
                  </RemoveCoupon>
                </CouponCode>
              </CouponBoxWrapper>
            ) : (
              <CouponBoxWrapper>
                <HaveCoupon >
                  用戶點數 : <span style={{ fontSize: 16, color: 'red' }}>{getAvailaleUserpoints()}</span>
                </HaveCoupon>
                <CouponInputBox>
                  <Userpoints availalblePoints={getAvailaleUserpoints()} errorMsgFixed={true} className='normalCoupon' />
                </CouponInputBox>
              </CouponBoxWrapper>
            ))
            }


            {/* <TermConditionText>
                <FormattedMessage
                  id='termAndConditionHelper'
                  defaultMessage='By making this purchase you agree to our'
                />
                <Link to='#'>
                  <TermConditionLink>
                    <FormattedMessage
                      id='termAndCondition'
                      defaultMessage='terms and conditions.'
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText> */}

            {/* CheckoutSubmit */}
            <CheckoutSubmit>
              <Button
                type='button'
                onClick={handleSubmit}
                disabled={!isValid}
                size='big'
                loading={loading}
                style={{ width: '100%' }}
              >
                結帳
              </Button>
            </CheckoutSubmit>
          </InformationBox>
        </CheckoutInformation>

        <CartWrapper>
          <Sticky
            enabled={size.width >= 768 ? true : false}
            top={120}
            innerZ={999}
          >
            <OrderInfo>
              <Title>
                <FormattedMessage
                  id='nav.order'
                  defaultMessage='Your Order'
                />
              </Title>

              <Scrollbar className='checkout-scrollbar'>
                <ItemsWrapper>
                  {cartItemsCount > 0 ? (
                    items.map((item) => (
                      <OrderItem key={`cartItem-${item.id}`} cartItem={item} />
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
                </ItemsWrapper>
              </Scrollbar>

              <CalculationWrapper>
                {
                  isFreeShipping() == false && props.imp_notes != null && props.imp_notes.freeshipping != null &&
                  <div style={{ fontSize: 14, color: '#f00', fontWeight: 'bold' }}>*買滿${addCommas(props.imp_notes.freeshipping)}可享免費送貨</div>
                }
                <TextWrapper>
                  <Text>
                    運費
                  </Text>
                  {
                    isFreeShipping() ?
                      <Text>
                        <div>已買滿${addCommas(props.imp_notes.freeshipping)}可享免費送貨</div>
                      </Text>
                      :
                      <Text>
                        {CURRENCY}
                        {addCommas(getShippingCost())}
                      </Text>
                  }
                </TextWrapper>

                <TextWrapper>
                  <Text>
                    <FormattedMessage
                      id='subTotal'
                      defaultMessage='Subtotal'
                    />
                  </Text>
                  <Text>
                    {CURRENCY}
                    {addCommas(calculateSubTotalPrice())}
                  </Text>
                </TextWrapper>

                <TextWrapper>
                  <Text>
                    <FormattedMessage
                      id='discountText'
                      defaultMessage='Discount'
                    />
                  </Text>
                  <Text>
                    -{CURRENCY}
                    {addCommas(calculateDiscount())}
                  </Text>
                </TextWrapper>

                {
                  isEnabledUserPoints() && <TextWrapper>
                    <Text>
                      用戶積分折扣
                    </Text>
                    <Text>-{CURRENCY}{addCommas(getUserpointsDiscount())}</Text>
                  </TextWrapper>
                }


                <TextWrapper style={{ marginTop: 20 }}>
                  <Bold>
                    <FormattedMessage id='totalText' defaultMessage='Total' />
                  </Bold>
                  <Bold>
                    {CURRENCY}
                    {addCommas(getTotalPrice())}
                  </Bold>
                </TextWrapper>
              </CalculationWrapper>
            </OrderInfo>
          </Sticky>
        </CartWrapper>
      </CheckoutContainer>
    </CheckoutWrapper>
    <StripeModal open={stripe_open} onClose={() => OpenStripeModal(false)} onPay={onCreatedStripeToken} />
  </form>
);
};


const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
    cart_payment_method: state.cartReducer.cart_payment_method,
    cart_total_summary: state.cartReducer.cart_total_summary,
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(CheckoutWithSidebar);
