import React, {useEffect, useState} from 'react';
import {CardElement, injectStripe, Elements} from 'react-stripe-elements';

const CheckoutForm =(props)=> {
    const handleSubmit = (ev) => {
        ev.preventDefault();
   
        // Use Elements to get a reference to the Card Element mounted somewhere
        // in your <Elements> tree. Elements will know how to find your Card Element
        // because only one is allowed.
        // See our getElement documentation for more:
        // https://stripe.com/docs/stripe-js/reference#elements-get-element
        const cardElement = props.elements.getElement('card');
    
        // From here we can call createPaymentMethod to create a PaymentMethod
        // See our createPaymentMethod documentation for more:
        // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
        // props.stripe.createPaymentMethod({
        //   type: 'card',
        //   card: cardElement
        // })
        // .then(({paymentMethod}) => {
        //   props.onPay(paymentMethod)
        // })
        // .catch(error => {
        //     console.log(error)
        // })

        props.stripe.createToken().then((payload) => {
            props.onPay(payload)
        });
        
    };
   
    return (
        <form onSubmit={handleSubmit}>
            <div className="Stripe_Element">
                <CardElement style={{base: {fontSize: '18px'}}} />
            </div>
            <div style={{width : '100%', textAlign : 'center', marginTop : 40}}>
                <button className="pay_btn">現在付款</button>
            </div>
        </form>
    );
}
   
export default injectStripe(CheckoutForm);