import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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


const HorizontalCategoryTabs = (props) => {

  useEffect(() => {
    if (props.type == 'products' && props.all_cats != null && props.all_cats.length > 0) {
      props.setCurCat(props.all_cats[0].id)
    }
    if (props.type == 'services' && props.all_service_cats != null && props.all_service_cats.length > 0) {
      props.setCurCat(props.all_service_cats[0].id)
    }
  }, [props.all_cats, props.all_service_cats, props.type])

  const getItems = () => {
    if (props.type == 'services') {
      return props.all_service_cats || [];
    }
    else if (props.type == 'products') {
      return props.all_cats || [];
    }
  }

  // const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    let items = getItems()
    if (newValue < items.length) {
      props.setCurCat(items[newValue].id)
    }

    console.log('handle change', newValue, items)
  };

  const getValue = () => {
    let found_index = 0
    getItems().map((c, index) => {
      if (props.curCat === c.id) {
        found_index = index;
      }
    })
    return found_index
  }


  return (
    <CategoryWrapper>
      <CategoryInner>
        <Tabs
          value={getValue()}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='#0D1136'
          variant="scrollable"
          scrollButtons="auto" 
          style={{justifyContent:'center'}}
          aria-label="scrollable auto tabs example"
        >
          {
            getItems().map((category, idx) => (
              <Tab key={idx} label={category.title} style={{fontSize: 14}}/>
            ))
          }
        </Tabs>
        {/* <div style={{ display: 'flex', justifyContent: 'center', flexWrap : 'wrap'}}>
          {
            getItems().map((category, idx) => (
              <Title key={idx} onClick={() => props.setCurCat(category.id)}
                style={{ borderBottomWidth: props.curCat === category.id ? '2px' : '0px', }}
              >
                {category.title}
              </Title>
            ))
          }
        </div> */}
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

export default connect(mapstate_props)(HorizontalCategoryTabs)