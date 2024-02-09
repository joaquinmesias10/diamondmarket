import {db, fieldValue} from '../utils/firebase';
import {Coupons_Coll} from '../utils/constant';

export const getCoupon = (coupon_code, deliveryDate= new Date(), user_id, onResult, onError) =>{
    db.collection(Coupons_Coll).where("code", "==", coupon_code).get().then(response => {
        if(response.docs.length > 0 ) {
            let coupon = response.docs[0].data();
            let curSeconds = Math.round(deliveryDate.getTime() / 1000) 

            if (curSeconds >= coupon.from.seconds && curSeconds <= coupon.to.seconds) {
                if (coupon.usedBy != null) {
                    let cat_item = coupon.usedBy.filter(item => item == user_id) 

                    console.log('cat_item',cat_item)

                    if(cat_item.length > 0) {
                        onError("You already used this coupon.")
                    }
                    else {
                        onResult(coupon)
                    }
                }
                else {
                    onResult(coupon)
                }
            }
            else {
                onError("Expired coupon")
            }
        }
        else {
            onError("Invalid coupon")
        }
    })
    .catch(error => {
        onError(JSON.stringify(error))
    })
}

export const updateCouponUsedBy = (user_id, couponId) =>{
    return db.collection(Coupons_Coll).doc(couponId).update({
        usedBy : fieldValue.arrayUnion(user_id)
    }).then(response => {return response})
}