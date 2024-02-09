import React from 'react';
import moment from 'moment';
import {
  SingleBookingList,
  BookingListHeader,
  TrackID,
  Status,
  BookingMeta,
  Meta,
} from './booking-card.style';
import { FormattedMessage } from 'react-intl';
import { CURRENCY } from '../../../../utils/constant';
 

const BookingCard = ({
  bookingId,
  onClick,
  className,
  status,
  date,
  amount,
}) => {
  return (
    <>
      <SingleBookingList onClick={onClick} className={className}>
        <BookingListHeader>
          <TrackID>
          訂單編號
            <span>{bookingId}</span>
          </TrackID>
          <Status>{status}</Status>
        </BookingListHeader>

        <BookingMeta>
          <Meta>
          預約日期
            : <span>{moment(new Date(date)).format('MM/DD/YYYY')}</span>
          </Meta>
          <Meta className="price">
            <FormattedMessage
              id="intlOrderCardTotalText"
              defaultMessage="Total Price"
            />
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </BookingMeta>
      </SingleBookingList>
    </>
  );
};

export default BookingCard;
