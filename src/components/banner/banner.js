import React, { useCallback, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'; 
import { useApp } from '../../contexts/app/use-app'; 

const Banner = (props) => {
  const { setSticky } = useApp();

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky(true);
    }
  };

  const [banners, setBanners] = useState([])
  useEffect(() => { 
    if (props.imp_notes != null) {
      setBanners(props.imp_notes.banners || [])
    }
  }, [props.imp_notes])

  return ( 
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} interval={4000} statusFormatter={()=>''}   >
      {
        banners.map((banner, index) =>
          <img key={index} src={banner} style={{ width: '100%', objectFit: 'cover' }} className="banners_home"/>
        )
      }
    </Carousel>
  );
};

const mapstate_props = (state) => {
  return {
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(Banner)