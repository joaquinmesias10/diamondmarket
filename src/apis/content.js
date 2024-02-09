import {db} from '../utils/firebase';
import {Contents_Coll, PushMessages_Coll,} from '../utils/constant';

export const get_aboutus = () =>{
    return db.collection(Contents_Coll).doc("About us").get().then(response => {return response})
}

export const get_privacy = () =>{
    return db.collection(Contents_Coll).doc("Privacy Policy").get().then(response => {return response})
}

export const get_terms = () =>{
    return db.collection(Contents_Coll).doc("Terms").get().then(response => {return response})
}

export const get_impnotes = () =>{
    return db.collection(Contents_Coll).doc("Important Notes").get().then(response => {return response})
}

export const get_pushmessages = () =>{
    return db.collection(PushMessages_Coll).get().then(response => {return response})
}
 