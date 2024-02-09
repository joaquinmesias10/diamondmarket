import React from 'react';
import { Modal } from '@redq/reuse-modal';
import { SEO } from '../components/seo';
import Booking from '../features/user-profile/booking/booking';
import {
  PageWrapper,
  SidebarSection,
} from '../features/user-profile/user-profile.style';
import Sidebar from '../features/user-profile/sidebar/sidebar';


const BookingPage = () => {
  return (
    <>
      <SEO title="Booking - Pos store" description="Booking Details" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <Booking />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default BookingPage;
