import {doPost} from '../utils/http';
import {db} from '../utils/firebase';
import {Orders_Coll, Bookings_Coll, APP_ID } from '../utils/constant'

export const createOrder = (order_params) =>{
    let post_param = {
        app_id : APP_ID,
        ...order_params
    }
    return doPost('createOrder', post_param).then(response => {return response})
}

export const createBooking = (order_params) =>{
    let post_param = {
        app_id : APP_ID,
        ...order_params
    }
    return doPost('createBooking', post_param).then(response => {return response})
}

export const getMyOrders = (user_id) =>{
    return db.collection(Orders_Coll).where("customer.id", "==", user_id).get().then(response => {return response})
}

export const getMyBookings = (user_id) =>{
    return db.collection(Bookings_Coll).where("customer.id", "==", user_id).get().then(response => {return response})
}

export const getOrderDetail = (order_id) =>{
    return db.collection(Orders_Coll).doc(order_id).get().then(response => {return response})
}

export const getBookingDetail = (booking_id) =>{
    return db.collection(Bookings_Coll).doc(booking_id).get().then(response => {return response})
}