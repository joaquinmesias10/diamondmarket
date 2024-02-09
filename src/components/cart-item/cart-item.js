import React from 'react';
import { Counter } from '../../components/counter/counter';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { CURRENCY } from '../../utils/constant';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';
import {getDiscountedPrice} from '../../utils/product'

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const CartItem = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { product, quantity, subProduct } = data;
  const displayPrice = getDiscountedPrice(product)

  const getImage=()=>{
    if(product.image != null && product.image != '') {
      return product.image
    }
    if(product.photos != null && product.photos.length > 0) {
      return product.photos[0]
    }
    return null
  }

  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      {/* <Image src={getImage(product.image)} /> */}
      <Information style={{marginLeft: 30}}>
        <Name>{product.title}</Name>
        <Name style={{marginTop: 6}}>{subProduct != null ? subProduct.title : ''}</Name>
        <Price>
          {CURRENCY}
          {addCommas(displayPrice)}
        </Price>
        {/* <Weight>
          {quantity} X {product}
        </Weight> */}
      </Information>
      <Total>
        {CURRENCY}
        {addCommas(quantity * displayPrice) }
      </Total>
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};
