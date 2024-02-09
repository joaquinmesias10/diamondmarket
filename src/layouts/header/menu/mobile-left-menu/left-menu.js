import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import Popover from '../../../../components/popover/popover';
import Logo from '../../../../layouts/logo/logo';
import { MenuDown } from '../../../../assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS } from '../../../../site-settings/site-navigation';
import * as categoryMenuIcons from '../../../../assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  IconWrapper,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryMenu = (props) => {
  const history = useHistory()
  const handleOnClick = (item) => {
    history.push(item.href)
    props.onClick(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          {/* <IconWrapper>
            <i className={item.icon}  ></i>
          </IconWrapper> */}
          {item.label}
        </MenuItem>
      ))}
    </div>
  );
};


export const LeftMenu = ({ logo }) => {
  const location = useLocation();

  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => location.pathname.includes(item.href)
  );

  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );

  return (
    <LeftMenuBox>

      <MainMenu>
        <Popover
          className='right'
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <i className={activeMenu?.icon}  ></i>
                </Icon>
                <span>
                  {activeMenu?.label}
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
    </LeftMenuBox>
  );
};
