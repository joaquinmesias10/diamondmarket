import React from 'react';
import { Link } from 'react-router-dom';
import { AddItemToCart } from '../../components/add-item-to-cart';
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
});
const ImageWrapper = styled.div(
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: ['190px', '210px'],

    img: {
      display: 'block',
      maxHeight: '100%',
      maxWidth: '100%',
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

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const ProductCard = (props) => {
  const { title, image, photos, price, id } = props.data;
  const salePrice = getDiscountedPrice(props.data)
  const discounted = getDiscount(props.data)

  let discountInPercent = 0
  if (discounted > 0) {
    discountInPercent = getDiscountPercent(props.data);
  }

  const detailLink = () => {
    if (props.type == 'sub_products') {
      return '#'
    }
    else if (props.type == 'products') {
      return `/product_detail/${id}`
    }
    else {
      return `/service_detail/${id}`
    }
  }

  return (
    <Link to={detailLink()} >
      <a>
        <Card>
          <Box position="relative">
            {/* {
              props.type != 'services' && <CounterWrapper>
                <AddItemToCart data={props.data} />
              </CounterWrapper>
            } */}
            <ImageWrapper>
              {
                props.type != 'services' ? 
                  <Image url={photos != null && photos.length > 0 ? photos[0] : ''} alt={title} />
                  :
                  <Image url={image} alt={title} /> 
              }
            </ImageWrapper>
            {discountInPercent > 0 ? (
              <Discount>{discountInPercent}%</Discount>
            ) : null}
          </Box>
          <Box padding={20}>
            <PriceWrapper>
              <Price>${addCommas(salePrice ? salePrice : price)}</Price>
              {discountInPercent > 0 ? <SalePrice>${addCommas(price)}</SalePrice> : null}
            </PriceWrapper>
            <Title>{title}</Title>
          </Box>
        </Card>
      </a>
    </Link>
  );
};
