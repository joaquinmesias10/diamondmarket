import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaTitle,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from './product-details-four.style';
import { Button } from '../../../components/button/button';
import { CartIcon } from '../../../assets/icons/CartIcon';
import ReadMore from '../../../components/truncate/truncate';
import CarouselWithCustomDots from '../../../components/multi-carousel/multi-carousel';
import { CURRENCY } from '../../../utils/constant';
import { useLocale } from '../../../contexts/language/language.provider';
import { useCart } from '../../../contexts/cart/use-cart';
import { Counter } from '../../../components/counter/counter';
import { ProductGrid } from '../../../components/product-grid/product-grid';

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const ProductDetails = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const data = product;

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className='product-card' dir='ltr'>
        {!isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
          </ProductTitlePriceWrapper>

          <ProductPriceWrapper>
            <ProductPrice>
              {CURRENCY}
              {addCommas(product.salePrice ? product.salePrice : product.price)}
            </ProductPrice>

            {product.discountInPercent ? (
              <SalePrice>
                {CURRENCY}
                {addCommas(product.price)}
              </SalePrice>
            ) : null}
          </ProductPriceWrapper>

          <ProductDescription>
            <ReadMore character={600}>{product.description}</ReadMore>
          </ProductDescription>

          <ProductCartWrapper>
            <ProductCartBtn>
              {!isInCart(data.id) ? (
                <Button
                  className='cart-button'
                  variant='primary'
                  size='big'
                  onClick={handleAddClick}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage
                      id='addToCartButton'
                      defaultMessage='Add to cart'
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(data.id).quantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                  className='card-counter'
                  variant='altHorizontal'
                />
              )}
            </ProductCartBtn>
          </ProductCartWrapper>

          <ProductMeta>
            <MetaTitle>Tags:</MetaTitle>
            <MetaSingle>
              {product?.categories?.map((item) => (
                <Link to={`/${product.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  <a>
                    <MetaItem>{item.title}</MetaItem>
                  </a>
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      <RelatedItems>
        <h2>
          <FormattedMessage
            id='intlRelatedItems'
            defaultMessage='Related Items'
          />
        </h2>

        <ProductGrid
          type={product.type.toLowerCase()}
          loadMore={false}
          fetchLimit={5}
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        />
      </RelatedItems>
    </>
  );
};

export default ProductDetails;
