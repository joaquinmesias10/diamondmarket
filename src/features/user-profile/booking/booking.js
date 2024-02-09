import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbar } from '../../../components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  BookingBox,
  BookingListWrapper,
  BookingList,
  BookingDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoBookingFound,
} from './booking.style';
import { AuthContext } from '../../../contexts/auth/auth.context';
import BookingDetails from './booking-details/booking-details';
import BookingCard from './booking-card/booking-card';
import BookingCardMobile from './booking-card/booking-card-mobile';
import useComponentSize from '../../../utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import { getMyBookings } from '../../../apis/order'
import { getDiscountedPrice } from '../../../utils/product';
import { API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE, API_IMPNOTES, SHOW_ALERT } from '../../../redux_helper/constants/action-types';

const progressData = ['最新', '處理中', '訂單已完成'];

const orderTableColumns = [
  {
    title: '服務',
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.booking_service.image} alt={record.booking_service.title} />
          </ImageWrapper>
          <ItemDetails>
            <ItemName>{record.booking_service.title}</ItemName>
            {/* <ItemPrice>${getDiscountedPrice(record.booking_service)}</ItemPrice> */}
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: '預約日期',
    dataIndex: '',
    key: 'dates',
    align: 'center',
    width: 120,
    render: (text, record) => {
      return record.booking_dates.map((_date, index) =>
        record.booking_dates[index].timeslots.map((_time, index1) =>
          <ItemName>{record.booking_dates[index].name +
            ' / ' + _time.start_hour + ':' + _time.start_min
            + ' - ' + _time.end_hour + ':' + _time.end_min}</ItemName>
        )
      )
    },
  },
  {
    title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${getDiscountedPrice(record.booking_service)}</p>;
    },
  },
];

const BookingsContent = (props) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const [bookings, setBookings] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if ((authState.access_token || '') != '') {
      // props.dispatch({ type: SHOW_LOAD, payload: '' });
      getMyBookings(authState.access_token).then((response) => {
        let all_bookings = []
        response.forEach((doc) => {
          all_bookings.push(doc.data())
        })
        all_bookings.sort(function compare(a, b) {
          var dateA = new Date(a.order_date);
          var dateB = new Date(b.order_date);
          return dateB - dateA;
        });

        setBookings(all_bookings);

        if (all_bookings.length > 0) {
          setSelection(all_bookings[0]);
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
    <BookingBox>
      <DesktopView>
        <BookingListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            我的預訂
          </Title>

          <Scrollbar className='order-scrollbar'>
            <BookingList>
              {bookings.length !== 0 ? (
                bookings.map((current) => (
                  <BookingCard
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
                <NoBookingFound>
                  <FormattedMessage
                    id='intlNoOrderFound'
                    defaultMessage='No order found'
                  />
                </NoBookingFound>
              )}
            </BookingList>
          </Scrollbar>
        </BookingListWrapper>
        {selection &&
          <BookingDetailsWrapper ref={targetRef}>
            <Title style={{ padding: '0 20px' }}>
            預訂詳細
            </Title>
            <BookingDetails
              progressStatus={selection.status}
              progressData={progressData}
              bookingNote={selection.order_note}
              subtotal={selection.subTotal}
              discount={parseInt(selection.total) - parseInt(selection.subTotal)}
              grandTotal={selection.total}
              tableData={selection.bookings}
              columns={orderTableColumns}
            />
          </BookingDetailsWrapper>
        }
      </DesktopView>

      <MobileView>
        <BookingList>
          <BookingCardMobile
            bookings={bookings}
            // className={order && order.id === active ? 'active' : ''}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={setSelection}
          />
        </BookingList>
      </MobileView>
    </BookingBox>
  );
};

const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(BookingsContent)
