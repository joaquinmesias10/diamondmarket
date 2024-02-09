import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth/auth.context';
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from './sidebar.style';
import { FormattedMessage } from 'react-intl';
import {PROFILE_SIDEBAR_BOTTOM_MENU} from '../../../site-settings/site-navigation';

const PROFILE_SIDEBAR_TOP_MENU = [
  { name : '查看訂單', href : '/order' },
  { name : '查看預約服務', href : '/booking' },
]
const SidebarCategory  = () => {
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      history.push('/');
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop>
          {PROFILE_SIDEBAR_TOP_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} label={item.name} />
          ))}
        </SidebarTop>

        <SidebarBottom>
          {PROFILE_SIDEBAR_BOTTOM_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} intlId={item.id} />
          ))}
          <LogoutButton type="button" onClick={handleLogout}>
            <FormattedMessage id="nav.logout" defaultMessage="Logout" />
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
