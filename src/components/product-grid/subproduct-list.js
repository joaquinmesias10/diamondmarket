import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { connect } from 'react-redux';
// custom 
import { useCart } from '../../contexts/cart/use-cart';
import { SubProductCard } from '../../components/product-card/subproduct-card';
 
function compare1(a, b) {
  var aArr = a.split("=@=")
  var bArr = b.split("=@=")

  var w1 = 0
  var w2 = 0

  if (aArr.length > 1) {
    w1 = parseInt(aArr[1])
  }
  if (bArr.length > 1) {
    w2 = parseInt(bArr[1])
  }

  if (w1 > w2) {
    return -1;
  }
  if (w1 < w2) {
    return 1;
  }
  return 0;
}

function compare2(a, b) {
  var w1 = a.weight == null ? 0 : a.weight
  var w2 = b.weight == null ? 0 : b.weight

  if (w1 > w2) {
    return -1;
  }
  if (w1 < w2) {
    return 1;
  }
  return 0;
}

const ProductGrid = (props) => {
  const { style, type, fetchLimit = 16, loadMore = true, allSubProducts, onAddSubProduct, ...others } = props;
  // const router = useRouter();
 
  const [loading, setLoading] = useState(false); 
   
  const getSortedSubPlist = (products) => {
    var tmp_cat_list = []
    products.map(item => {
      if (tmp_cat_list.findIndex(i => i == item.catId) == -1) {
        tmp_cat_list.push(item.catId)
      }
    })
    tmp_cat_list.sort(compare1);

    var sorted_sub_plist = []
    tmp_cat_list.map(cat_item => {
      var tmp_one_categ_products = products.filter(p_item => cat_item == p_item.catId)
      tmp_one_categ_products.sort(compare2);
      sorted_sub_plist.push({
        cat: cat_item,
        items: tmp_one_categ_products
      })
    })

    return sorted_sub_plist
  }

  const getsubCatstring = (sub_catId) => {
    if (sub_catId == null) {
      return ""
    }
    var tmpArr = sub_catId.split("=@=") 
    var catName = ""
    if (tmpArr.length > 0) {
      catName = tmpArr[0]
    }
    if (tmpArr.length > 3) {
      return <div style={{display: 'flex', }}>{catName} 
      {/* <div style={{paddingTop: 3, marginLeft: 12, fontSize: 14,}}>(選擇 {tmpArr[3]} 產品)</div> */}
      </div>
    }
    return catName
  }

  return (
    <section className="subp_container">
      {
        getSortedSubPlist(allSubProducts).map((data, idx) => (
          <div key={idx}>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 35, marginBottom: 15, }} className="mobile_font_13" >
              {getsubCatstring(data.cat)}
            </div>
            {
              data.items.map(product =>
                <SubProductCard data={product} key={product.id} onAddSubProduct={onAddSubProduct}/>
              )
            }
          </div>
        ))
      }
    </section>
  );
}

const mapstate_props = (state) => {
  return {
    all_products: state.productsReducer.all_products,
    all_cats: state.productsReducer.all_cats,
    all_service_cats: state.servicesReducer.all_service_cats,
  }
}

export default connect(mapstate_props)(ProductGrid)