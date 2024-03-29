import React from 'react';
import Image from 'components/image/image';
import { PlusOutline } from 'assets/icons/PlusOutline';
import {
  CardWrapper,
  ImageWrapper,
  InfoWrapper,
  Title,
  Price,
  Unit,
  CartButton,
  Counter,
} from './product-card-five.style';
import { useCart } from 'contexts/cart/use-cart';


const ProductCard = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  // console.log(items, 'product-card');

  return (
    <CardWrapper onClick={onClick} className="medicine-card">
      <ImageWrapper className={isInCart(data?.id) && 'overlay'}>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />

        {!isInCart(data?.id) ? (
          <CartButton className="cart-button" onClick={handleAddClick}>
            <PlusOutline />
          </CartButton>
        ) : (
          <Counter
            value={getItem(data?.id).quantity}
            onDecrement={handleRemoveClick}
            onIncrement={handleAddClick}
          />
        )}
      </ImageWrapper>
      <InfoWrapper>
        <Price>
          {currency}
          {price}
        </Price>

        <Title>{title}</Title>
        <Unit>{weight}</Unit>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;
