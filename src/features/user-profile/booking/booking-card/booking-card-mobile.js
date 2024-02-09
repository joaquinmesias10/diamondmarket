import React from 'react';
import Table from 'rc-table';
import moment from 'moment';
import Collapse, { Panel } from 'rc-collapse';
import Progress from '../../../../components/progress-box/progress-box';
import {
  BookingListHeader,
  TrackID,
  Status,
  BookingMeta,
  Meta,
  CardWrapper,
  BookingDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  BookingTable,
  BookingTableMobile,
} from './booking-card.style';

import { CURRENCY } from '../../../../utils/constant';
 
const components = {
  table: BookingTable,
};

const BookingCard = ({
  onClick,
  className,
  columns,
  progressData,
  bookings,
}) => {
  return (
    <>
      <Collapse
        accordion={true}
        className={`accordion ${className}`}
        defaultActiveKey="active"
      >
        {bookings.map((booking) => (
          <Panel
            header={
              <CardWrapper onClick={() => onClick(booking)}>
                <BookingListHeader>
                  <TrackID>
                  訂單編號 <span>{booking.no}</span>
                  </TrackID>
                  <Status>{progressData[booking.status]}</Status>
                </BookingListHeader>

                <BookingMeta>
                  <Meta>
                  預約日期: <span>{moment(new Date(booking.order_date)).format('MM/DD/YYYY')}</span>
                  </Meta>
                  <Meta className="price">
                  總金額:
                    <span>
                      {CURRENCY}
                      {booking.total}
                    </span>
                  </Meta>
                </BookingMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={booking.id}
          >
            <BookingDetail>
              <DeliveryInfo>
                <DeliveryAddress>
                  <h3>預約特別指引</h3>
                  <Address>{booking.order_note}</Address>
                </DeliveryAddress>

                <CostCalculation>
                  <PriceRow>
                  小計金額
                    <Price>
                      {CURRENCY}
                      {booking.subTotal}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                  折扣優惠
                    <Price>
                      {CURRENCY}
                      {parseInt(booking.total) - parseInt(booking.subTotal)}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                  總金額
                    <Price>
                      {CURRENCY}
                      {booking.total}
                    </Price>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              {/* <ProgressWrapper>
                <Progress data={progressData} status={booking.status + 1} />
              </ProgressWrapper> */}

              <BookingTableMobile>
                <Table
                  columns={columns}
                  data={booking.bookings}
                  rowKey={(record) => record.id}
                  components={components}
                  scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </BookingTableMobile>
            </BookingDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default BookingCard;
