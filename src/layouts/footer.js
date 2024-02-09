import styled from 'styled-components';
import css from '@styled-system/css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
const Box = styled.div(
  css({
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'regular',
    color: 'text.regular',
    px: 20,
    flexWrap: 'wrap',
    a: {
      color: 'primary.regular',
    },
  }),
  {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <Box>
      <div>
        <Link to={'/aboutus'} >關於我們</Link>
        <span style={{ marginLeft: 12, marginRight: 12 }}>|</span>
        <Link to={'/terms'} >條款及細則</Link>
        <span style={{ marginLeft: 12, marginRight: 12 }}>|</span>
        <Link to={'/privacy'} >私隱政策</Link>
        <span style={{ marginLeft: 12, marginRight: 12 }}>|</span>
        <Link to={'/delivery-terms'} >送貨時間說明</Link>
      </div>
      <div style={{ marginTop: 18, }}>
        <span style={{ marginRight: 4 }}>{new Date().getFullYear()}</span>
        &copy;
        <span style={{ marginLeft: 4, marginRight: 30 }}>Copyright</span>
      </div>
    </Box>
  );
};
export default Footer;
