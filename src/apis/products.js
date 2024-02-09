import {db} from '../utils/firebase';
import {Products_Coll, Categories_Coll, } from '../utils/constant';

export const get_products = () =>{
    return db.collection(Products_Coll).get().then(response => {return response})
}
export const get_products_cat = (category_id) =>{
    return db.collection(Products_Coll).where('catId', '==', category_id).get().then(response => {return response})
}
export const get_product_detail = (product_id) =>{
    return db.collection(Products_Coll).doc(product_id).get().then(response => {return response})
}

export const get_categories = () =>{
    return db.collection(Categories_Coll).get().then(response => {return response})
}

export const get_subproducts = (product_id) =>{
    return db.collection(Products_Coll).doc(product_id).collection('sub_products').get().then(response => {return response})
}