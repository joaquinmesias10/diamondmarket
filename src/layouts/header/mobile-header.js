import React from 'react';
import queryString from 'query-string';
import { openModal, closeModal } from '@redq/reuse-modal';
import MobileDrawer from './mobile-drawer';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper, 
  SearchModalWrapper,
  SearchModalClose,
} from './header.style';
import Search from '../../features/search/search';
import LogoImage from '../../assets/images/logo.png';

import { SearchIcon } from '../../assets/icons/SearchIcon';
import { LongArrowLeft } from '../../assets/icons/LongArrowLeft';
import Logo from '../../layouts/logo/logo';
import LanguageSwitcher from './menu/language-switcher/language-switcher';
import { isCategoryPage } from '../is-home-page';
import useDimensions from '../../utils/useComponentSize';
import { LeftMenu } from './menu/mobile-left-menu/left-menu';

const SearchModal = () => {
  const onSubmit = () => {
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={onSubmit}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader = ({ className }) => {

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };
  // const type = pathname === '/restaurant' ? 'restaurant' : query.type;
  const type = 'restaurant';

  const isHomePage = isCategoryPage(type);

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <DrawerWrapper>
          <MobileDrawer />
        </DrawerWrapper>

        <LogoWrapper>
          <Logo imageUrl={LogoImage} alt="shop logo" />
        </LogoWrapper>
 
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
