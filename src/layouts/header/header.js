import React from 'react';
import { openModal } from '@redq/reuse-modal';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth.context';
import AuthenticationForm from '../../features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from '../../assets/images/logo.png';
import UserImage from '../../assets/images/user.jpg';
import Search from '../../features/search/search';
 

const Header = ({ className, user_profile }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);

  const history = useHistory()

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      history.push('/');
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: false,
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
  const showSearch = true;
    // isCategoryPage(query.type) ||
    // pathname === '/furniture-two' ||
    // pathname === '/grocery-two' ||
    // pathname === '/bakery';
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />
      {showSearch && <Search minimal={true} className="headerSearch" />}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
        user_profile={user_profile}
      />
    </HeaderWrapper>
  );
};

export default Header;
