import React from 'react';
import { Modal } from '@redq/reuse-modal';
import { SEO } from '../components/seo';
import Checkout from '../features/checkouts/checkout-two/checkout-two';
import { ProfileProvider } from '../contexts/profile/profile.provider';
import ErrorMessage from '../components/error-message/error-message';
import useUser from '../data/use-user';
 
const CheckoutPage = (props) => {

  return (
    <>
      <SEO title="Checkout - Posstore" description="Checkout Details" />
      <Modal>
        <Checkout  />
      </Modal>
    </>
  );
};

export default CheckoutPage;
