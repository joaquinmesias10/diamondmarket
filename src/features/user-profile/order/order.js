import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbar } from '../../../components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';
import { AuthContext } from '../../../contexts/auth/auth.context';
import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from '../../../utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import { getMyOrders } from '../../../apis/order'
import { getDiscountedPrice } from '../../../utils/product';
import { API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE, API_IMPNOTES, SHOW_ALERT } from '../../../redux_helper/constants/action-types';

const progressData = ['最新', '處理中', '訂單已完成'];
const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const orderTableColumns = [
  {
    title: <FormattedMessage id='cartItems' defaultMessage='Items' />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.product.photos != null && record.product.photos.length > 0 ? record.product.photos[0] : ''} alt={record.product.title} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.product.title}</ItemName>
            <ItemName>{record.subProduct != null ? record.subProduct.title : ''}</ItemName>
            <ItemPrice>${addCommas(getDiscountedPrice(record.product))}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity' />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${addCommas(getDiscountedPrice(record.product) * record.quantity)}</p>;
    },
  },
];

const OrdersContent = (props) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const [orders, setOrders] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if ((authState.access_token || '') != '') {
      // props.dispatch({ type: SHOW_LOAD, payload: '' });
      getMyOrders(authState.access_token).then((response) => {
        let all_orders = []
        response.forEach((doc) => {
          all_orders.push(doc.data())
        })
        all_orders.sort(function compare(a, b) {
          var dateA = new Date(a.order_date);
          var dateB = new Date(b.order_date);
          return dateB - dateA;
        });

        setOrders(all_orders);

        if (all_orders.length > 0) {
          setSelection(all_orders[0]);
        }
        // props.dispatch({ type: DISMISS_LOAD, payload: '' });
      })
        .catch((err) => {
          console.error(err)
          // props.dispatch({ type: DISMISS_LOAD, payload: '' });
        })
    }
    else {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "請先登入網站" } })
      history.push('/')
      return;
    }
  }, [authState.access_token])

  return (
    <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id='intlOrderPageTitle'
              defaultMessage='My Order'
            />
          </Title>

          <Scrollbar className='order-scrollbar'>
            <OrderList>
              {orders.length !== 0 ? (
                orders.map((current) => (
                  <OrderCard
                    key={current.no}
                    orderId={current.no}
                    className={current.no === selection?.no ? 'active' : ''}
                    status={progressData[current.status]}
                    date={current.order_date}
                    amount={current.total}
                    onClick={() => setSelection(current)}
                  />
                ))
              ) : (
                <NoOrderFound>
                  找不到訂單
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbar>
        </OrderListWrapper>
        {selection &&
          <OrderDetailsWrapper ref={targetRef}>
            <Title style={{ padding: '0 20px' }}>
              訂單詳細
            </Title>
            <OrderDetails
              progressStatus={selection.status}
              progressData={progressData}
              orderNote={selection.order_note}
              subtotal={selection.subTotal}
              discount={(parseFloat(selection.total) - parseFloat(selection.subTotal)).toFixed(2)}
              grandTotal={selection.total}
              tableData={selection.products}
              columns={orderTableColumns}
            />
          </OrderDetailsWrapper>
        }
      </DesktopView>

      <MobileView>
        <OrderList>
          <OrderCardMobile
            orders={orders}
            // className={order && order.id === active ? 'active' : ''}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={setSelection}
          />
        </OrderList>
      </MobileView>
    </OrderBox>
  );
};

const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(OrdersContent)
