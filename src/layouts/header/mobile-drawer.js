import React, { useContext } from 'react';
import { openModal } from '@redq/reuse-modal';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Scrollbar } from '../../components/scrollbar/scrollbar';
import Drawer from '../../components/drawer/drawer';
import { Button } from '../../components/button/button';
import NavLink from '../../components/nav-link/nav-link';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { AuthContext } from '../../contexts/auth/auth.context';
import AuthenticationForm from '../../features/authentication-form';
import {
  DrawerBody,
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from './header.style';
import {
  MOBILE_DRAWER_MENU,
  PROFILE_PAGE,
} from '../../site-settings/site-navigation';
import { useCart } from '../../contexts/cart/use-cart';
import { useApp } from '../../contexts/app/use-app';

const MobileDrawer = () => {

  const { isDrawerOpen, toggleDrawer } = useApp();
  const history = useHistory();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  const {
    items,
    cartItemsCount,
  } = useCart();

  const toggleHandler = () => {
    console.log('toggleHandler')
    toggleDrawer()
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      history.push('/');
    }
  };

  const signInOutForm = () => {
    toggleDrawer();

    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  return (
    <Drawer
      width='316px'
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <DrawerBody>
        <Scrollbar className='drawer-scrollbar'>
          <DrawerContentWrapper>
            {/* <DrawerProfile>
              {isAuthenticated ? (
                <LoginView>
                  <UserAvatar>
                    <img src={UserImage} alt='user_avatar' />
                  </UserAvatar>
                  <UserDetails>
                    <h3>David Kinderson</h3>
                    <span>+990 374 987</span>
                  </UserDetails>
                </LoginView>
              ) : (
                <LogoutView>
                  <Button variant='primary' onClick={signInOutForm}>
                    <FormattedMessage
                      id='mobileSignInButtonText'
                      defaultMessage='join'
                    />
                  </Button>
                </LogoutView>
              )}
            </DrawerProfile> */}

            <DrawerMenu>
              {MOBILE_DRAWER_MENU.map((item) => (
                item.id != 'nav.checkout' ?
                  <DrawerMenuItem key={item.id}>
                    <NavLink
                      onClick={toggleHandler}
                      href={item.href}
                      label={item.defaultMessage}
                      intlId={item.id}
                      className='drawer_menu_item'
                    />
                  </DrawerMenuItem>
                  :
                  (
                    cartItemsCount > 0 ?
                      <DrawerMenuItem key={item.id}>
                        <NavLink
                          onClick={toggleHandler}
                          href={item.href}
                          label={item.defaultMessage}
                          intlId={item.id}
                          className='drawer_menu_item'
                        />
                      </DrawerMenuItem>
                      : null
                  )
              ))}
            </DrawerMenu>

            {isAuthenticated ? (
              <UserOptionMenu>
                {/* <DrawerMenuItem>
                  <NavLink
                    href={PROFILE_PAGE}
                    label='Your Account Settings'
                    className='drawer_menu_item'
                    intlId='navlinkAccountSettings'
                  />
                </DrawerMenuItem> */}
                <DrawerMenuItem>
                  <div onClick={handleLogout} className='drawer_menu_item'>
                    <span className='logoutBtn'>
                      登出
                    </span>
                  </div>
                </DrawerMenuItem>
              </UserOptionMenu>
            )
              :
              <UserOptionMenu>
                <DrawerMenuItem>
                  <div onClick={signInOutForm} className='drawer_menu_item'>
                    <span className='logoutBtn'>
                      <FormattedMessage
                        id='mobileSignInButtonText'
                        defaultMessage='join'
                      />
                    </span>
                  </div>
                </DrawerMenuItem>
              </UserOptionMenu>
            }
          </DrawerContentWrapper>
        </Scrollbar>
      </DrawerBody>
    </Drawer>
  );
};

export default MobileDrawer;
