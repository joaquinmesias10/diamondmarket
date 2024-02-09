import {db} from '../utils/firebase';
import {Services_Coll, ServiceCats_Coll} from '../utils/constant';

export const get_services = () =>{
    return db.collection(Services_Coll).get().then(response => {return response})
}
export const get_services_cat = (category_id) =>{
    return db.collection(Services_Coll).where('catId', '==', category_id).get().then(response => {return response})
}
export const get_Service_detail = (service_id) =>{
    return db.collection(Services_Coll).doc(service_id).get().then(response => {return response})
}
export const get_serviceDates = (service_id) =>{
    return db.collection(Services_Coll).doc(service_id).collection('Dates').get().then(response => {return response})
}
export const get_everyday_serviceDates = (service_id) =>{
    return db.collection(Services_Coll).doc(service_id).collection('everyday').get().then(response => {return response})
}

export const get_serviceCats = () =>{
    return db.collection(ServiceCats_Coll).get().then(response => {return response})
}