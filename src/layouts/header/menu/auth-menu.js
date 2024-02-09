import React from 'react';
import { Button } from '../../../components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from '../../../components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';
 
const AuthMenu = ({ isAuthenticated, onJoin, onLogout, avatar , user_profile}) => {
  return !isAuthenticated ? (
    <Button variant="primary" onClick={onJoin}>
      <FormattedMessage id="joinButton" defaultMessage="join" />
    </Button>
  ) : (
    <Popover
      direction="right"
      // className="user-pages-dropdown"
      // handler={<img src={avatar} alt="user" />}
      handler={<div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, borderRadius: 6, color: '#fff', fontWeight: 'bold', backgroundColor: '#009E7F'}}>
        {user_profile != null && user_profile.name}
      </div>}
      content={<AuthorizedMenu onLogout={onLogout} />}
    />
  );
};
export default AuthMenu;
