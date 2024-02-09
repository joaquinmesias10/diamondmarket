import styled from 'styled-components';
import css from '@styled-system/css';

export const CategoryWrapper = styled.div(
  css({
    padding: ['20px 15px', '20px 15px', '20px'],
  })
);

export const CategoryInner = styled.div({
  position: 'relative',
});

export const ItemCard = styled.div((props) =>
  css({
    textAlign: 'center',
    borderRadius: 6,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid #fff',
    borderColor: props.active ? 'primary.regular' : '#fff',
  })
);

export const ImageWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 120,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: 10,

  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export const Title = styled.span((props) =>
  css({
    fontSize: 'base',
    fontWeight: 'semiBold',
    color: '#0D1136',
    textAlign: 'center',
    padding: '0 10px 4px', 
    marginLeft: 24, 
    marginRight: 24,
    marginTop: 12, 
    marginBottom: 12,
    cursor: 'pointer', 
    borderColor: '#0D1136',
    display : 'inline-flex',
    borderBottomStyle: 'solid',
  })
);

export const SliderNav = styled.button({
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'text.bold',
  backgroundColor: 'white',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
  outline: 0,
  padding: 0,
  border: 0,
  borderRadius: '50%',
  position: 'absolute',
  top: '50%',
  marginTop: '-15px',
  zIndex: 1,
  cursor: 'pointer',

  svg: {
    width: 18,
    maxHeight: 18,
  },

  '&.swiper-button-disabled': {
    display: 'none',
  },

  '&.banner-slider-prev': {
    left: -15,
  },

  '&.banner-slider-next': {
    right: -15,
  },
});
