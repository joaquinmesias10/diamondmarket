import React, {useEffect, useState} from 'react';
import { SEO } from '../components/seo';
import OrderReceived from '../features/order-received/order-received';
import {getOrderDetail, getBookingDetail} from '../apis/order';

const OrderReceivedPage = (props) => {
  const [order, setOrder] = useState({})
  useEffect(() => {
    if (props.match != null) {
      getOrderDetail(props.match.params.id).then((response) => {
          if (response.data() == null) {
            setOrder({})
          }
          else {
            setOrder(response.data())
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [props.match ])

  return (
    <>
      <SEO title="Invoice - Pos store" description="Invoice Details" />
      {
        order.id != null && <OrderReceived order= {order}/>
      }
    </>
  );
};

export default OrderReceivedPage;
