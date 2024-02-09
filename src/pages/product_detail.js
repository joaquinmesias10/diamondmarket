import React, { useEffect, useState } from 'react';
import { Modal } from '@redq/reuse-modal';
import { connect } from 'react-redux'
import ProductSingleWrapper, {
  ProductSingleContainer,
} from '../assets/styles/product-single.style';
import ProductDetails from '../components/product-details/product-details-four/product-details-four';
import ProductDetailsBakery from '../components/product-details/product-details-five/product-details-five';
import ProductDetailsGrocery from '../components/product-details/product-details-six/product-details-six';
import CartPopUp from '../features/carts/cart-popup'
import { get_product_detail } from '../apis/products';
import { useCart } from '../contexts/cart/use-cart'


const PAGE_TYPE = 'products';
const ProductDetailsPage = (props) => {
  const { deviceType, ...others } = props;
  const [product, setProduct] = useState({})
  const { clearSubProduct } = useCart();

  useEffect(() => {
    if (props.match != null) {

      clearSubProduct();
      if (props.all_cats != null) {
        get_product_detail(props.match.params.id).then((response) => {
          if (response.data() == null) {
            setProduct({})
          }
          else {
            let p = response.data()
            let category = props.all_cats.find(item => item.id == p.catId)
            p.category = category

            setProduct(p)
          }
        })
          .catch((err) => {
            console.error(err)
          })
      }

    }
  }, [props.match, props.all_cats])

  const getProductView = () => {
    if (product.id == null) { return <div/> }
    let content = <ProductDetailsBakery product={product} deviceType={deviceType} /> 
    return content
  }

  return (
    <Modal>
      <ProductSingleWrapper>
        <ProductSingleContainer>
          {getProductView()}
          <CartPopUp deviceType={deviceType} />
        </ProductSingleContainer>
      </ProductSingleWrapper>
    </Modal>
  );
};

const mapstate_props = (state) => {
  return {
    all_cats: state.productsReducer.all_cats,
  }
}

export default connect(mapstate_props)(ProductDetailsPage)
