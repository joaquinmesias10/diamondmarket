import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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
} from './product-details-five.style';
import { Button } from '../../../components/button/button';
import { CartIcon } from '../../../assets/icons/CartIcon';
import ReadMore from '../../../components/truncate/truncate';
import CarouselWithCustomDots from '../../../components/multi-carousel/multi-carousel';
import { CURRENCY } from '../../../utils/constant';
import { useLocale } from '../../../contexts/language/language.provider';
import { useCart } from '../../../contexts/cart/use-cart';
import { Counter } from '../../../components/counter/counter';
import SubproductList from '../../../components/product-grid/subproduct-list';
import { getDiscountedPrice, getDiscount } from '../../../utils/product';
import {  SHOW_ALERT, SHOW_LOAD, DISMISS_LOAD } from '../../../redux_helper/constants/action-types';
import { get_subproducts } from '../../../apis/products';
import ErrorMessage from '../../../components/error-message/error-message';

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const ProductDetails = (props) => {
  const { product, deviceType, } = props
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem, subProducts, clearSubProduct } = useCart();
  const [count, setCount] = useState(1)
  const [allSubProducts, setSubProducts] = useState([])

  const data = product;

  const handleAddClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isOkRequired() == false) { 
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "選擇子產品。" } })
      return 
    }
    let cartItem = {
      catName: data.category.title,
      product: data,
      quantity: count,
      subProducts: subProducts,
      note: ""
    }
    addItem(cartItem);
    setCount(1)
    clearSubProduct()
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  const isOkRequired = () => {
    var tmp_cat_list = []
    allSubProducts.map(item => {
      if (tmp_cat_list.findIndex(i => i == item.catId) == -1) {
        tmp_cat_list.push(item.catId)
      }
    })

    console.log('isOkRequired',tmp_cat_list,  )

    var isOk = true
    tmp_cat_list.map(cat_item => {
      var curCnt = subProducts.filter(i => i.catId == cat_item).length
      var tmpArr = cat_item.split("=@=")
      console.log('isOkRequired',curCnt,  )
      if (tmpArr.length > 3) {
        let requiredCnt = parseInt(tmpArr[3])
        
        if (curCnt < requiredCnt) {
          isOk = false
        }
      }
    })

    return isOk
  }

  const onAddSubProduct=(sub_product)=>{
    let cartItem = {
      catName: data.category.title,
      product: data,
      quantity: 1,
      subProduct: sub_product,
      note: ""
    }
    addItem(cartItem);
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  useEffect(() => {
    loadSubProducts(product.id);
  }, [product.id])

  const loadSubProducts = (p_id) => {
    get_subproducts(p_id).then((response) => {
      let allItems = []
      response.forEach((doc) => {
        allItems.push(doc.data())
      }) 
      setSubProducts(allItems)
    })
      .catch((err) => {
        console.error(err)
        return <ErrorMessage message={err.message} />;
      })
  }
 
  return (
    <>
      <ProductDetailsWrapper className='product-card' dir='ltr'>
        {!isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.photos || []}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle className="mobile_font_18">{product.title}</ProductTitle>
          </ProductTitlePriceWrapper>

          <ProductPriceWrapper>
            <ProductPrice className="mobile_font_15">
              {CURRENCY}
              {
                addCommas(getDiscountedPrice(product))
              }
            </ProductPrice>

            {getDiscount(product) ? (
              <SalePrice>
                {CURRENCY}
                {addCommas(product.price)}
              </SalePrice>
            ) : null}
          </ProductPriceWrapper>

          <ProductDescription className="mobile_font_13">
            <ReadMore character={600}>{product.desc}</ReadMore>
          </ProductDescription>

          <SubproductList
            allSubProducts={allSubProducts}
            loadMore={false}
            fetchLimit={5}
            onAddSubProduct={onAddSubProduct}
          />
{/* 
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
            <Counter
              value={count}
              onDecrement={() => {
                if (count > 1) {
                  setCount(count - 1)
                }
              }}
              onIncrement={() => setCount(count + 1)}
              className='card-counter'
              variant='altHorizontal'
            />
            <Button
              className='cart-button'
              variant='primary'
              size='big'
              onClick={handleAddClick}
              style={{ marginLeft: 20 }}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage
                  id='addToCartButton'
                  defaultMessage='Add to cart'
                />
              </ButtonText>
            </Button>
          </div> */}

          {/* <ProductCartWrapper>
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
          </ProductCartWrapper> */}

          {/* <ProductMeta>
            <MetaTitle>Tags:</MetaTitle>
            <MetaSingle>
              {product?.categories?.map((item) => (
                <Link to={`/${product.id.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  <a>
                    <MetaItem>{item.title}</MetaItem>
                  </a>
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta> */}


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

    </>
  );
};


const mapstate_props = (state) => {
  return {
    all_cats: state.productsReducer.all_cats,
  }
}

export default connect(mapstate_props)(ProductDetails)
 