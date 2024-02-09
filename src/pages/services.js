import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Modal } from '@redq/reuse-modal';
import { connect } from 'react-redux';
// custom import
import { useMedia } from '../utils/use-media';
import Banner from '../components/banner/banner';
import ProductGrid from '../components/product-grid/product-grid-two';
import { sitePages } from '../site-settings/site-pages';
import HorizontalCategoryCardMenu from '../layouts/horizontal-category-menu/horizontal-category-card-menu';
import { MobileBanner } from '../components/banner/mobile-banner';
import { Box } from '../components/box';
import CartPopUp from '../features/carts/cart-popup';
import { API_IMPNOTES } from '../redux_helper/constants/action-types';

export const Main = styled.div(
  css({
    backgroundColor: 'gray.200',
    position: 'relative',
  })
);

function ServicesPage(props) {
  const { deviceType, ...others } = props;

  const [catId, setCatId] = useState('')
  useEffect(() => {
    if (props.match != null) {
      setCatId(props.match.params.catid)
    }
  }, [props.match])

  return (
    <Modal>
      <MobileBanner title={''} type='services' />
      <Banner  />
      <Main>
        {/* <HorizontalCategoryCardMenu type={'services'} curCat={catId} />
        <Box padding={['0 15px 100px ', '0 15px 30px ', '0 30px 30px']}>
          <ProductGrid type={'services'} catId={catId} />
        </Box> */}
      </Main>
      <CartPopUp />
    </Modal>
  );
}

const mapstate_props = (state) => {
  return {
    imp_notes: state.contentReducer.imp_notes,
    all_service_cats: state.servicesReducer.all_service_cats,
  }
}

export default connect(mapstate_props)(ServicesPage)