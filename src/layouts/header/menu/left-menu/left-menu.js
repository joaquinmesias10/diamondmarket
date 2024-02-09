import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import Popover from '../../../../components/popover/popover';
import Logo from '../../../../layouts/logo/logo';
import { MenuDown } from '../../../../assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS } from '../../../../site-settings/site-navigation';
import * as categoryMenuIcons from '../../../../assets/icons/category-menu-icons';
import { 
  LeftMenuBox,
} from './left-menu.style';
 

export const LeftMenu = ({ logo }) => {
  const location = useLocation();
 
  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'} 
      />
 
    </LeftMenuBox>
  );
};
