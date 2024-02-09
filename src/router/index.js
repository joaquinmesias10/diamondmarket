import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import ProductsPage from '../pages/products';
import ProductDetailsPage from '../pages/product_detail';
import CheckoutPage from '../pages/checkout';
import ProfilePage from '../pages/profile';
import OrderPage from '../pages/order';
import BookingPage from '../pages/booking';
import CreatedOrderPage from '../pages/order-received';
import ServicePage from '../pages/services';
import ServiceDetailsPage from '../pages/service_detail';
import CheckoutBookingPage from '../pages/book';
import CreatedBookingPage from '../pages/booking-received';
import AboutusPage from '../pages/about_us';
import TermsPage from '../pages/terms';
import PrivacyPage from '../pages/privacy';
import DeliveryPolicyPage from '../pages/delivery-policy';

export default class Routes extends React.Component {
    render() {
        return (

            // <Router >
            //     <Switch>
            <React.Fragment>
                <Route exact path="/" component={ProductsPage} />
                <Route exact path="/products" >
                    <ProductsPage />
                </Route>
                <Route exact path="/products/:catid" component={ProductsPage} />
                <Route exact path="/product_detail/:id" component={ProductDetailsPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/order" component={OrderPage} />
                <Route exact path="/booking" component={BookingPage} />
                <Route exact path="/created_order/:id" component={CreatedOrderPage} />
                {/* <Route exact path="/services" component={ServicePage} />
                <Route exact path="/services/:catid" component={ServicePage} /> */}
                <Route exact path="/service_detail/:id" component={ServiceDetailsPage} />
                <Route exact path="/book_service" component={CheckoutBookingPage} />
                <Route exact path="/created_booking/:id" component={CreatedBookingPage} />
                <Route exact path="/aboutus" component={AboutusPage} />
                <Route exact path="/terms" component={TermsPage} />
                <Route exact path="/privacy" component={PrivacyPage} />
                <Route exact path="/delivery-terms" component={DeliveryPolicyPage} /> 

                {/* 
            <Route exact path="/student" component={StudentPage} />
            <Route exact path="/office" component={OfficePage} />
            <Route exact path="/ready/:id" component={ReadyItemsPage} />
            <Route exact path="/promo" component={PromoPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/readyfood/:id" component={ProductPage} />
            */}

            </React.Fragment>
            //     </Switch>
            // </Router>
        )
    }
}
