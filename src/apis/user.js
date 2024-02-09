import {db} from '../utils/firebase';
import {Customers_Coll,} from '../utils/constant';

export const registerProfile = (user_id, params) =>{
    return db.collection(Customers_Coll).doc(user_id).set(params).then(response => {return response})
}

export const getProfilePhone = (phone_number) =>{
    return db.collection(Customers_Coll).where("phone", "==", phone_number).get().then(response => {return response})
}

export const getProfile = (user_id) =>{
    return db.collection(Customers_Coll).doc(user_id).get().then(response => {return response})
}

export const updateProfile = (user_id, params) =>{
    return db.collection(Customers_Coll).doc(user_id).update(params).then(response => {return response})
}
