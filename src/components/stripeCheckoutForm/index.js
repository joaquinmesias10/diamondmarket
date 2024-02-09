import React from 'react';
import {CardElement, injectStripe, Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
 
const MyStoreCheckout =(props)=> {
    return (
        <Elements>
          <InjectedCheckoutForm onPay={props.onPay}/>
        </Elements>
    );
}
 
export default MyStoreCheckout;
 