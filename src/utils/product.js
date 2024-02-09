export const isDiscounted=(food)=>{
    return food.discount != null && food.discount != "" && food.discount != "0"
}
export const getDiscountedPrice = (food)=>{
    if (isDiscounted(food)){
        let price = parseInt(food.price)
        let discount = parseFloat(food.discount)
        let discounted = Math.round(price - price * (discount / 100))
        return price == discounted ? price : discounted
    }
    else {
        return parseInt(food.price)
    }
}
export const getDiscount = (food)=>{
    if (isDiscounted(food)){
        let price = parseInt(food.price)
        let discount = parseFloat(food.discount)
        return Math.round(price * (discount / 100))
    }
    else {
        return 0
    }
}
export const getDiscountPercent = (food)=>{
    if (isDiscounted(food)){
        return parseFloat(food.discount)
    }
    return 0
}