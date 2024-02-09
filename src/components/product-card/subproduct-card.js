import React from 'react';
import { Link } from 'react-router-dom';
import { SelectSubProductItem } from '../../components/select-subproductitem';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '../../components/box';
import Image from '../../components/image/image'
import { getDiscountedPrice, getDiscountPercent, getDiscount } from '../../utils/product'

const Card = styled.div({
  backgroundColor: '#fff',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '0',
  cursor: 'pointer',
  transition: '0.25s ease-in-out',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-5px)',
  },
});
const ImageWrapper = styled.div(
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    img: {
      display: 'block',
      maxHeight: '85px',
      maxWidth: '85px',
      width: 'auto',
      height: 'auto',
    },
  })
);
const Discount = styled.div(
  css({
    position: 'absolute',
    zIndex: 1,
    top: '10px',
    left: '10px',
    backgroundColor: 'primary.regular',
    color: '#fff',
    overflow: 'hidden',
    padding: '0.25rem 0.5rem',
    fontSize: 12,
    borderRadius: 6,
    pointerEvents: 'none',
  })
);

const CounterWrapper = styled.div(
  css({
    position: 'absolute',
    zIndex: 1,
    top: '10px',
    right: '10px',
  })
);

const PriceWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
});

const Price = styled.span(
  css({
    display: 'block',
    color: 'text.bold',
    fontSize: 16,
    fontWeight: 'semiBold',
  })
);

const SalePrice = styled.span(
  css({
    color: 'text.regular',
    fontSize: 13,
    lineHeight: 1,
    fontWeight: 'regular',
    padding: '0 5px',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',

    ':before': {
      content: '""',
      width: '100%',
      height: 1,
      display: 'inline-block',
      backgroundColor: 'text.regular',
      position: 'absolute',
      top: '50%',
      left: 0,
    },
  })
);

const Title = styled.h2(
  css({
    color: 'text.regular',
    fontSize: 'sm',
    fontWeight: 'regular',
  })
);

export const SubProductCard = (props) => {
  const { title, image, price, id, stock, } = props.data;
  const { onAddSubProduct } = props;

  const salePrice = getDiscountedPrice(props.data)
  const discounted = getDiscount(props.data)

  let discountInPercent = 0
  if (discounted > 0) {
    discountInPercent = getDiscountPercent(props.data);
  }

  const getStockString = () => {
    if (parseInt(stock) > 3) {
      return "有存貨"
    }
    else if (parseInt(stock) > 0 && parseInt(stock) <= 3) {
      return <div style={{ color: '#f00' }}>只剩下少量 : {parseInt(stock)}</div>
    }
    else {
      return "暫時售罄"
    }
  }

  const onAddCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onAddSubProduct(props.data);
  }; 

  return (
    // <Link  >
    //   <a>
    <div position="relative" style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f0f0f0' }}  >
      <ImageWrapper>
        <Image url={image} alt={title} className="subproduct_img" />
      </ImageWrapper>
      <div style={{ flex: 1, paddingLeft: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', }}>
        <div style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }} className="mobile_font_13">{title}</div>
        <Title style={{ fontSize: 16, fontWeight: 'bold', }} className="mobile_font_13">{getStockString()}</Title>
      </div>
      <div className="addCartBtn" onClick={onAddCartClick}>
        {parseInt(stock) > 0 ? '加到購物籃' : '暫時售罄'}
      </div>
      {/* <SelectSubProductItem data={props.data} /> */}
    </div>
    //   </a>
    // </Link>
  );
};
