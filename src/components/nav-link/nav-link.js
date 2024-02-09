import React from 'react';
import styled from 'styled-components';
import {Link, withRouter, useLocation} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = ({
  href,
  label,
  intlId,
  icon,
  className,
  onClick,
  iconClass,
  dynamic,
}) => {
  const location = useLocation();
  console.log(' location.pathname ',  location.pathname )
  const isCurrentPath = location.pathname == href;
  return (
    <div onClick={onClick} className={className ? className : ''}>
      {dynamic ? (
        <Link to={'/[type]'} as={href} className={isCurrentPath ? ' current-page' : ''}
        style={{ display: 'flex', alignItems: 'center' }}>
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

            <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : 'defaultNavLinkId'}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span>
        </Link>
      ) : (
        <Link to={href}  className={isCurrentPath ? ' current-page' : ''}
        style={{ display: 'flex', alignItems: 'center' }}>
        
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

            <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : 'defaultNavLinkId'}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span>
        </Link>
      )}
    </div>
  );
};

export default NavLink;
