import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Image,
  Content,
  Title,
  ContentRow,
  Description, 
} from './banner.style';
import { Waypoint } from 'react-waypoint';
import { Button } from '../../components/button/button';
import { useApp } from '../../contexts/app/use-app';
import Search from '../../features/search/search';
import CategoryIconNav from '../../components/type-nav/type-nav';
import SpringModal from '../../components/spring-modal/spring-modal';


export const MobileBanner = ({ type, title }) => {
  const [isOpen, setOpen] = useState(false);
  const {setSticky} = useApp();
 
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky(true);
    }
  };
  return (
    <Box display={['flex', 'flex', 'none']}>
      <Content>
        <ContentRow>
          <Description>
            {title}
          </Description>

          <Button
            variant="text"
            onClick={() => setOpen(true)}
            style={{ textTransform: 'capitalize' }}
          >
            {type}
          </Button>
        </ContentRow>
 
        <Waypoint
          onEnter={()=>setSticky(false)}
          onLeave={()=>setSticky(true)}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <CategoryIconNav />
      </SpringModal>
    </Box>
  );
};
