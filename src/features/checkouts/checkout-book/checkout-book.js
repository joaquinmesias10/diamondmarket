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
  RemoveButton,
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
} from './checkout-book.style';

import { NoCartBag } from '../../../assets/icons/NoCartBag';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { AuthContext } from '../../../contexts/auth/auth.context';
import { useCart } from '../../../contexts/cart/use-cart';
import { useLocale } from '../../../contexts/language/language.provider';
import { useWindowSize } from '../../../utils/useWindowSize';
import Coupon from '../../../features/coupon/coupon';
import Userpoints from '../../../features/userpoints/userpoints';
import { getDiscountedPrice } from '../../../utils/product';
import { getTimeString } from '../../../utils/date';
import StripePaymentForm from '../../../features/payment/stripe-form';
import { db } from '../../../utils/firebase'
import { NEW_ORDER } from '../../../utils/constant'
import { conforms, fromPairs } from 'lodash';
import StripeModal from '../../../components/modal/stripeModal'
import moment from 'moment'
import { createBooking } from '../../../apis/order'
import { updateCouponUsedBy } from '../../../apis/coupon'
import { updateEarning, updateProduct } from '../../../apis/statistics';
import { updateProfile } from '../../../apis/user';
import { Bookings_Coll, Orders_Coll } from '../../../utils/constant'
import { API_GET_USER_PROFILE, API_IMPNOTES, SHOW_ALERT, SHOW_LOAD, DISMISS_LOAD } from '../../../redux_helper/constants/action-types';

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const ServiceItem = ({ service }) => {
  const { id, title, } = service;
  const displayPrice = getDiscountedPrice(service);
  return (
    <Items key={id} >
      <Quantity>
        {title}
      </Quantity>
      <Price>
        {CURRENCY}
        {displayPrice.toFixed(2)}
      </Price>
    </Items>
  );
};

const ServiceDateItem = ({ date, timeslot, onRemove }) => {
  let start_time = getTimeString(timeslot.start_hour, timeslot.start_min)
  let end_time = getTimeString(timeslot.end_hour, timeslot.end_min)
  return (
    <Items key={date}>
      <Quantity>{date}</Quantity>
      <Multiplier> / </Multiplier>
      <ItemInfo>
        {start_time + ' - ' + end_time}
      </ItemInfo>
      {/* <RemoveButton onClick={() => onRemove(date, timeslot)}>
        <CloseIcon />
      </RemoveButton> */}
    </Items>
  );
};

const CheckoutWithSidebar = (props) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const history = useHistory();
  const { isRtl } = useLocale();
  const {
    booking,
    ApplyBooking,
    RemoveBooking,
    calculateBookingTotalPrice,
    calculateBookingDiscount,
    calculateBookingPrice,
    coupon,
    removeCoupon,
    points,
    removePoints,
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
      props.imp_notes != null &&
      getTotalPrice() > 0 &&
      (booking.booking_dates || []).length > 0 
    ) {
      setIsValid(true);
    }
    else {
      setIsValid(false);
    } 
  
  }, [props.user_profile, props.imp_notes])


  const handleSubmit = async () => {
    if ( getTotalPrice() > 0 && (booking.booking_dates || []).length > 0 ) {
      setIsValid(true);
    }
    else {
      setIsValid(false);
      return
    }

    if (curPaymentMethod != 'cash_on_delivery') {
      if (getTotalPrice() < 4) {
        props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "You can not use this payment method under $4!" } })
        return;
      }
      OpenStripeModal(true);
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
      id: db.collection(Bookings_Coll).doc().id,
      no: calculateOrderNo(),
      cod: isCod,
      createdAt: new Date(),
      customer: props.user_profile,
      coupon: coupon,
      points: (parseInt(points) || 0),
      points_discount: getUserpointsDiscount(),
      shipping_cost : 0,
      subTotal: '' + (calculateBookingPrice() || 0),
      total: '' + (getTotalPrice() || 0),
      date: new Date(),
      order_date: new Date().getTime(),
      status: NEW_ORDER,
      ifbooking: true,
      bookings: [booking]
    }
    return order;
  }

  const orderDone = (new_orderId) => {
    RemoveBooking()
    removeCoupon()
    removePoints()
    history.push('/created_booking/' + new_orderId);
    props.dispatch({ type: DISMISS_LOAD, payload: '' });
  }

  const updateEarningStatics = (new_orderId, order_param) => {
    var all_promises = []
    all_promises.push(updateEarning("meta", "order_stats", parseInt(order_param.total) || 0, order_param))
    all_promises.push(updateEarning("meta", "booking_stats", parseInt(order_param.total) || 0, order_param))

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
    createBooking(order_param).then(response => {
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

  const onRemoveTimeSlot = (date, timeslot) => {
    let tmpBooking = Object.assign({}, booking);
    console.log('tmpBooking', tmpBooking)
    let date_index = (tmpBooking.booking_dates || []).findIndex(item => item.name == date)

    if (date_index >= 0) {
      console.log('date_index', date_index)
      let timeslot_id = (tmpBooking.booking_dates[date_index].timeslots || []).findIndex(item => item.id == timeslot.id)
      if (timeslot_id >= 0) {
        console.log('timeslot_id', timeslot_id)
        tmpBooking.booking_dates[date_index].timeslots.splice(timeslot_id, 1)
      }
    }
    if ((tmpBooking.booking_dates || []).length == 0) {
      tmpBooking = {}
    }
    else {
      let tmp_cnt = 0
      tmpBooking.booking_dates.forEach(date_item => {
        tmp_cnt = tmp_cnt + (date_item.timeslots || []).length
      });
      if (tmp_cnt == 0) {
        tmpBooking = {}
      }
    }

    ApplyBooking(tmpBooking)
  }

  const isEnabledUserPoints = () => {
    if (props.imp_notes != null && props.imp_notes.enableUserPoints == true) {
      return true;
    }
    return false;
  }

  const getAvailaleUserpoints = () => {
    let available_points = 0
    if (props.imp_notes != null && props.imp_notes.userPoint != null && props.imp_notes.userPoint > 0 && booking.booking_service != null) {
      available_points = (parseInt(booking.booking_service.userPoints) || 0)
    }
    return available_points
  }

  const getUserpointsDiscount = () => {
    if (props.imp_notes == null || props.imp_notes.userPoint == null || isEnabledUserPoints() != true) { return 0 }
    let onepoint_price = 1.0 / props.imp_notes.userPoint
    return parseInt(onepoint_price * (points || 0)) || 0
  }

  const getTotalPrice = () => {
    return calculateBookingTotalPrice() - getUserpointsDiscount()
  }

  return (
    <React.Fragment>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
         
            <InformationBox
              className='paymentBox'
              style={{ paddingBottom: 30 }}
            >
              <>
                <CardHeader >
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

              {
                isEnabledUserPoints() && (
                  points ? (
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
                  )
                )
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
                <Title>您的預約服務</Title>
                <Scrollbar className='checkout-scrollbar'>
                  <ItemsWrapper>
                    {
                      booking.booking_service != null &&
                      <ServiceItem service={booking.booking_service} />
                    }
                    <div style={{ height: 1, backgroundColor: '#4D4136', marginTop: -12, marginBottom: 12 }} />
                    {(booking.booking_dates || []).length > 0 ? (
                      (booking.booking_dates || []).map((date_item, index) => (
                        (date_item.timeslots || []).map((timeslot_item, index) => (
                          <ServiceDateItem key={`cartItem-${index}`} date={date_item.name} timeslot={timeslot_item} onRemove={onRemoveTimeSlot} />
                        ))
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
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {addCommas(calculateBookingPrice())}
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
                      {addCommas(calculateBookingDiscount())}
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
    </React.Fragment>
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
