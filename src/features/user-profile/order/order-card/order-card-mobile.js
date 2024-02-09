import React from 'react';
import Table from 'rc-table';
import moment from 'moment';
import Collapse, { Panel } from 'rc-collapse';
import Progress from '../../../../components/progress-box/progress-box';
import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from '../../../../utils/constant';
 
const components = {
  table: OrderTable,
};

const OrderCard = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
}) => {
  return (
    <>
      <Collapse
        accordion={true}
        className={`accordion ${className}`}
        defaultActiveKey="active"
      >
        {orders.map((order) => (
          <Panel
            header={
              <CardWrapper onClick={() => onClick(order)}>
                <OrderListHeader>
                  <TrackID>
                  訂單編號 <span>{order.no}</span>
                  </TrackID>
                  <Status>{progressData[order.status]}</Status>
                </OrderListHeader>

                <OrderMeta>
                  <Meta>
                  訂單日期: <span>{moment(new Date(order.order_date)).format('MM/DD/YYYY')}</span>
                  </Meta>
                  <Meta className="price">
                  總金額:
                    <span>
                      {CURRENCY}
                      {order.total}
                    </span>
                  </Meta>
                </OrderMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={order.id}
          >
            <OrderDetail>
              <DeliveryInfo>
                <DeliveryAddress>
                  <h3>訂單特別指引</h3>
                  <Address>{order.order_note}</Address>
                </DeliveryAddress>

                <CostCalculation>
                  <PriceRow>
                  小計金額
                    <Price>
                      {CURRENCY}
                      {order.subTotal}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                  折扣優惠
                    <Price>
                      {CURRENCY}
                      {parseInt(order.total) - parseInt(order.subTotal)}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                  總金額
                    <Price>
                      {CURRENCY}
                      {order.total}
                    </Price>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              <ProgressWrapper>
                <Progress data={progressData} status={order.status + 1} />
              </ProgressWrapper>

              <OrderTableMobile>
                <Table
                  columns={columns}
                  data={order.products}
                  rowKey={(record) => record.id}
                  components={components}
                  scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </OrderTableMobile>
            </OrderDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default OrderCard;
