import React from 'react';
import moment from 'moment';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';
import { CURRENCY } from '../../../../utils/constant';


const OrderCard = ({
  orderId,
  onClick,
  className,
  status,
  date,
  amount,
}) => {
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
            訂單編號
            <span>{orderId}</span>
          </TrackID>
          <Status>{status}</Status>
        </OrderListHeader>

        <OrderMeta>
          <Meta>
            訂單日期
            : <span>{moment(new Date(date)).format('MM/DD/YYYY')}</span>
          </Meta>
          <Meta className="price">
            總金額
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
