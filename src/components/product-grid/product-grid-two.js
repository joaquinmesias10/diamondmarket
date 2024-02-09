import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import {connect} from 'react-redux';
// custom
import ErrorMessage from '../../components/error-message/error-message';
import { ProductCard } from '../../components/product-card/product-card-six';
import { SubProductCard } from '../../components/product-card/subproduct-card';
import { Button } from '../../components/button/loadmore-button';
import { FormattedMessage } from 'react-intl';
import { Box } from '../../components/box';
import {get_products_cat, get_subproducts} from '../../apis/products';
import {get_services_cat} from '../../apis/services';

const Grid = styled.div(
  css({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',

    '@media screen and (min-width: 480px)': {
      gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
    },

    '@media screen and (min-width: 740px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 991px)': {
      gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1200px)': {
      gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1400px)': {
      gridTemplateColumns: 'repeat(6, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1700px)': {
      gridTemplateColumns: 'repeat(7, minmax(180px, 1fr))',
    },
  })
);
 
const ProductGrid = (props) => {
  const { style, type, fetchLimit = 16, loadMore = true, catId, pId, ...others } = props;
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [items, setData] = useState([]);

  useEffect(()=>{
    if (type == 'products') {
      if(catId != null && catId != '') {
        loadProducts(catId);
      }
      else if (props.all_cats != null && props.all_cats.length > 0) {
        loadProducts(props.all_cats[0].id);
      }
    } 
    else if (type == 'services') {
      if(catId != null && catId != '') {
        loadServices(catId);
      }
      else if (props.all_service_cats != null && props.all_service_cats.length > 0) {
        loadServices(props.all_service_cats[0].id);
      }
    }
    
  }, [catId, pId, type, props.all_cats, props.all_service_cats])

  const loadProducts=(cat_id)=>{
    if(props.all_cats == null) {return }
    let category = props.all_cats.find(item => item.id == cat_id)
    get_products_cat(cat_id).then((response) => {
      let allItems = []
      response.forEach((doc) => {
        let p = doc.data();
        p.category = category;
        allItems.push(p)
      })

      allItems.sort(function compare(a, b) {
        var a_w = a.weight == null ? 0 : a.weight;
        var b_w = b.weight == null ? 0 : b.weight; 
        return a_w - b_w;
      });
      setData(allItems)
    })
    .catch((err) => {
      console.error(err)
      return <ErrorMessage message={err.message} />;
    })
  }
 
  
  const loadServices=(cat_id)=>{
    if(props.all_service_cats == null) {return }
    let category = props.all_service_cats.find(item => item.id == cat_id)
    get_services_cat(cat_id).then((response) => {
      let allItems = []
      response.forEach((doc) => {
        let p = doc.data();
        p.category = category;
        allItems.push(p)
      })
      allItems.sort(function compare(a, b) {
        var a_w = a.weight == null ? 0 : a.weight;
        var b_w = b.weight == null ? 0 : b.weight; 
        return a_w - b_w;
      });
      setData(allItems)
    })
    .catch((err) => {
      console.error(err)
      return <ErrorMessage message={err.message} />;
    })
  }
 
  const handleLoadMore = async () => {
    setLoading(true);
    // await fetchMore(Number(data.length), fetchLimit);
    setLoading(false);
  };
  return (
    <section>
      <Grid style={style}>
        {
          items.map((product, idx) => ( 
            <ProductCard type = {type} data={product} key={product.id} />
          ))
        }
      </Grid>
      {/* {loadMore && data?.hasMore && (
        <Box style={{ textAlign: 'center' }} mt={'2rem'}>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant='secondary'
            style={{
              fontSize: 14,
              display: 'inline-flex',
            }}
            border='1px solid #f1f1f1'
          >
            <FormattedMessage id='loadMoreButton' defaultMessage='Load More' />
          </Button>
        </Box>
      )} */}
    </section>
  );
}

const mapstate_props = (state) => {
  return {
    all_products : state.productsReducer.all_products,
    all_cats : state.productsReducer.all_cats,
    all_service_cats :  state.servicesReducer.all_service_cats,
  }
}

export default connect(mapstate_props)(ProductGrid)