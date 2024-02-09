import moment from 'moment';
import {db} from '../utils/firebase';
import {Products_Coll,} from '../utils/constant';

export const updateEarning = async (collection, doc, update_value, order_data) =>{
    try{
        let response = await db.collection(collection).doc(doc).get();
        var earningStats = response.data()
        if (earningStats != null) {
            if (earningStats.year_hist == null) {
                earningStats.year_hist = []
            }
            if (earningStats.month_hist == null) {
                earningStats.month_hist = []
            }
            if (earningStats.day_hist == null) {
                earningStats.day_hist = []
            }
        }
        else {
            earningStats = {
                year_hist : [],
                month_hist : [],
                day_hist : []
            }
        }
  
        let order_year = moment(new Date(order_data.order_date)).format("YYYY")
        let order_month = moment(new Date(order_data.order_date)).format("YYYY-MM")
        let order_day = moment(new Date(order_data.order_date)).format("YYYY-MM-DD")
  
        let y_i = earningStats.year_hist.findIndex(item => item.key == order_year) 
        if (y_i >= 0) {
            earningStats.year_hist[y_i].value = earningStats.year_hist[y_i].value + update_value
        }
        else {
            earningStats.year_hist.push({
                key : order_year,
                value : update_value
            })
        }

        let m_i = earningStats.month_hist.findIndex(item => item.key == order_month)  
        if(m_i >= 0)  {
            earningStats.month_hist[m_i].value = earningStats.month_hist[m_i].value + update_value
        }
        else {
            earningStats.month_hist.push({
                key : order_month,
                value : update_value
            }) 
        }
  
        let d_i = earningStats.day_hist.findIndex(item => item.key == order_day)  
        if (d_i >= 0) {
            earningStats.day_hist[d_i].value = earningStats.day_hist[d_i].value + update_value
        }
        else {
            earningStats.day_hist.push({
                key : order_day,
                value : update_value
            })  
        }

        await db.collection(collection).doc(doc).set(earningStats);
    }
    catch (err) {
        console.log(err)
    } 
}
 
export const updateProduct = async (product_id, params) =>{
    await db.collection(Products_Coll).doc(product_id).update(params);
}