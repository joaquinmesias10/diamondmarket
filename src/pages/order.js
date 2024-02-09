import React from 'react';
import { Modal } from '@redq/reuse-modal';
import { SEO } from '../components/seo';
import Order from '../features/user-profile/order/order';
import {
  PageWrapper,
  SidebarSection,
} from '../features/user-profile/user-profile.style';
import Sidebar from '../features/user-profile/sidebar/sidebar';


const OrderPage = () => {
  return (
    <>
      <SEO title="Order - Pos store" description="Order Details" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <Order />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrderPage;
