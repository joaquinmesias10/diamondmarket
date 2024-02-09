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
  OrderTableWrapper,
  OrderTable,
} from './order-details.style';
import Progress from '../../../../components/progress-box/progress-box';
import { CURRENCY } from '../../../../utils/constant';

const components = {
  table: OrderTable,
};

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const OrderDetails = ({
  tableData,
  columns,
  orderNote,
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
          <h3>訂單特別指引</h3>
          <Address>{orderNote}</Address>
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            小計金額
            <Price>
              {CURRENCY}
              {addCommas(subtotal)}
            </Price>
          </PriceRow>
          <PriceRow>
            折扣優惠
            <Price>
              {CURRENCY}
              {addCommas(discount)}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            訂單金額
            <Price>
              {CURRENCY}
              {addCommas(grandTotal)}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo>

      <ProgressWrapper>
        <Progress data={progressData} status={progressStatus + 1} />
      </ProgressWrapper>

      <OrderTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="orderDetailsTable"
        // scroll={{ y: 350 }}
        />
      </OrderTableWrapper>
    </>
  );
};

export default OrderDetails;
