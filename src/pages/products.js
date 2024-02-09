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
import HorizontalCategoryTabs from '../layouts/horizontal-category-menu/horizontal-category-tabs';
import { Title, } from '../layouts/horizontal-category-menu/horizontal-category-card-menu.style';
import { MobileBanner } from '../components/banner/mobile-banner';
import { Box } from '../components/box';
import CartPopUp from '../features/carts/cart-popup';
import { API_IMPNOTES } from '../redux_helper/constants/action-types';
import { db } from '../utils/firebase';
import { Contents_Coll, PushMessages_Coll, } from '../utils/constant';

export const Main = styled.div(
  css({
    backgroundColor: '#FFFFFF',
    position: 'relative',
  })
);

const PAGE_TYPES = ['產品分類', '預約服務']
function ProductsPage(props) {
  const { deviceType, ...others } = props;

  const [catId, setCatId] = useState('')
  const [tabs, setTabs] = useState([])
  const [pageType, setPageType] = useState('products')

  useEffect(() => {
    const unsubscribe = db.collection(Contents_Coll).doc("Important Notes").onSnapshot(snap => {
      const impInfo = snap.data()
      if (impInfo != null) {
        if (impInfo.showProducts == true && impInfo.showServices == true) {
          setTabs(['products', 'services'])
          setPageType('products')
        }
        else if (impInfo.showProducts == true && impInfo.showServices != true) {
          setTabs(['products'])
          setPageType('products')
        }
        else if (impInfo.showProducts != true && impInfo.showServices == true) {
          setTabs(['services'])
          setPageType('services')
        }
        else if (impInfo.showProducts != true && impInfo.showServices != true) {
          setTabs([])
          setPageType('')
        }
      }
    });

    return () => unsubscribe()
  }, [])

  return (
    <Modal>
      {/* <MobileBanner title={''} type={pageType} /> */}
      <Banner />
      <Main>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 25, }}>
          {
            tabs.map((type, idx) => (
              <Title key={idx} onClick={() => setPageType(type)}
                style={{ marginTop: 12, marginBottom: 12, color: type == pageType ? '#0D1136' : '#aaaaaa', borderBottomWidth: type == pageType ? '2px' : '0px', }}
              >
                {PAGE_TYPES[idx]}
              </Title>
            ))
          }
        </div>
        {
          tabs.length > 0 && <HorizontalCategoryTabs type={pageType} curCat={catId} setCurCat={setCatId} />
        }
        {
          tabs.length > 0 &&
          <Box padding={['0 15px 100px ']}>
            <ProductGrid type={pageType} catId={catId} />
          </Box>
        }
      </Main>
      <CartPopUp />
    </Modal>
  );
}

const mapstate_props = (state) => {
  return {
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(ProductsPage)