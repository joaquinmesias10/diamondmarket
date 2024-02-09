import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { LogoBox, LogoImage } from './logo.style';
 
const Logo = ({ imageUrl, alt, onClick }) => {
  const history = useHistory();
  
  function onLogoClick() {
    history.push('/');
    if (onClick) {
      onClick();
    }
  }
  return (
    <LogoBox onClick={onLogoClick}>
      <LogoImage src={imageUrl} alt={alt} />
    </LogoBox>
  );
};

export default Logo;
