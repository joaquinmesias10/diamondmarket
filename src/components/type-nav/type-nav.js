import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import { CATEGORY_MENU_ITEMS } from '../../site-settings/site-navigation';
import * as categoryMenuIcons from '../../assets/icons/category-menu-icons';
import IconNavCard from './type-nav-card';


const CategoryWrapper = styled.div(
  css({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    // margin: '0 -7.5px',
  })
);

const Col = styled.div(
  css({
    width: '50%',
    padding: '0 7.5px',
    marginBottom: 15,

    '@media screen and (min-width: 768px)': {
      width: '33.333%',
    },
  })
);

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryIconNav = (props) => {
  const history = useHistory();
  const location = useLocation();

  const handleOnClick = (item) => {
    history.push(item.href);
  };

  return (
    <CategoryWrapper>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <Col key={item.id}>
          <IconNavCard
            onClick={() => handleOnClick(item)}
            icon={<CategoryIcon name={item.icon} />}
            intlId={item.id}
            defaultMessage={item.label}
            active={
              location.pathname === item.href  
            }
            {...props}
          />
        </Col>
      ))}
    </CategoryWrapper>
  );
};
export default CategoryIconNav;
