import React from 'react';
import Table from 'rc-table';
import { FormattedMessage } from 'react-intl';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  BookingTableWrapper,
  BookingTable,
} from './booking-details.style';
import Progress from '../../../../components/progress-box/progress-box';
import { CURRENCY } from '../../../../utils/constant';

const components = {
  table: BookingTable,
};


const BookingDetails = ({
  tableData,
  columns,
  bookingNote,
  progressStatus,
  progressData,
  subtotal,
  discount,
  grandTotal,
}) => {
  return (
    <>
      <DeliveryInfo>
        <DeliveryAddress>
          <h3>預訂特別指引</h3>
          <Address>{bookingNote}</Address>
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            小計金額
            <Price>
              {CURRENCY}
              {subtotal}
            </Price>
          </PriceRow>
          <PriceRow>
            折扣優惠
            <Price>
              {CURRENCY}
              {discount}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            總金額
            <Price>
              {CURRENCY}
              {grandTotal}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo>

      {/* <ProgressWrapper>
        <Progress data={progressData} status={progressStatus + 1} />
      </ProgressWrapper> */}

      <BookingTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="bookingDetailsTable"
        // scroll={{ y: 350 }}
        />
      </BookingTableWrapper>
    </>
  );
};

export default BookingDetails;
