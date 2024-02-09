// product card for book
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Image from 'components/image/image';
import {
  BookCardWrapper,
  BookImageWrapper,
  BookInfo,
  ProductName,
  AuthorInfo,
  DiscountPercent,
} from '../product-card.style';

const ProductCard = ({
  title,
  image,
  name,
  discountInPercent,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  return (
    <BookCardWrapper onClick={onClick} className="book-card">
      <BookImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {discountInPercent ? (
          <DiscountPercent>{discountInPercent}%</DiscountPercent>
        ) : null}
      </BookImageWrapper>
      <BookInfo>
        <ProductName>{title}</ProductName>
        <AuthorInfo>
          <FormattedMessage id="intlTextBy" defaultMessage="by" /> {name}
        </AuthorInfo>
      </BookInfo>
    </BookCardWrapper>
  );
};

export default ProductCard;
