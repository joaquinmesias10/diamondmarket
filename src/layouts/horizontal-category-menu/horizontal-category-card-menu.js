import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../../components/error-message/error-message';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from 'react-redux';
import Image from '../../components/image/image'; 
import {
  CategoryWrapper,
  CategoryInner,
  ItemCard,
  ImageWrapper,
  Title,
  SliderNav,
} from './horizontal-category-card-menu.style';
import { get_categories } from '../../apis/products';
import { SET_ALL_CATEGORY } from '../../redux_helper/constants/action-types';

SwiperCore.use([Navigation]);


const HorizontalCategoryCardMenu = (props) => {
   
  useEffect(() => {
    if (props.type != 'services' && props.all_cats != null && props.all_cats.length > 0) { 
      props.setCurCat(props.all_cats[0].id)
    }
    if (props.type == 'services' && props.all_service_cats != null && props.all_service_cats.length > 0){
      props.setCurCat(props.all_service_cats[0].id)
    } 
  }, [props.all_cats, props.all_service_cats, props.type])
 
  const getItems = () => {
    if (props.type == 'services') {
      return props.all_service_cats || [];
    }
    else {
      return props.all_cats || [];
    }
  } 

  return (
    <CategoryWrapper>
      <CategoryInner>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap : 'wrap'}}>
          {
            getItems().map((category, idx) => (
              <Title key={idx} onClick={() => props.setCurCat(category.id)}
                style={{ borderBottomWidth: props.curCat === category.id ? '2px' : '0px', }}
              >
                {category.title}
              </Title>
            ))
          }
        </div>
      </CategoryInner>
    </CategoryWrapper>
  );
}


const mapstate_props = (state) => {
  return {
    all_products: state.productsReducer.all_products,
    all_cats: state.productsReducer.all_cats,
    all_service_cats: state.servicesReducer.all_service_cats,
  }
}

export default connect(mapstate_props)(HorizontalCategoryCardMenu)