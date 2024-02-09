import React, { useEffect, useState } from 'react';
import { Modal } from '@redq/reuse-modal';
import { connect } from 'react-redux'
import ProductSingleWrapper, {
  ProductSingleContainer,
} from '../assets/styles/product-single.style';
import ServiceDetails from '../components/service-details/service-details';
import CartPopUp from '../features/carts/cart-popup'
import { get_Service_detail } from '../apis/services';
import { useCart } from '../contexts/cart/use-cart'

 
const ServiceDetailsPage = (props) => {
  const { deviceType, ...others } = props;
  const [service, setService] = useState({})
  const { clearSubProduct } = useCart();

  useEffect(() => {
    if (props.match != null) {

      clearSubProduct();
      if (props.all_service_cats != null) {
        get_Service_detail(props.match.params.id).then((response) => {
          if (response.data() == null) {
            setService({})
          }
          else {
            let s = response.data()
            let category = props.all_service_cats.find(item => item.id == s.catId)
            s.category = category

            setService(s)
          }
        })
          .catch((err) => {
            console.error(err)
          })
      }

    }
  }, [props.match, props.all_service_cats])

  const getProductView = () => {
    if (service.id == null) { return <div /> }
    let content = <ServiceDetails service={service} deviceType={deviceType} />; 
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
    all_service_cats :  state.servicesReducer.all_service_cats,
  }
}

export default connect(mapstate_props)(ServiceDetailsPage)
