import React, { useEffect, useContext} from 'react';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux'
import Header from './header/header';
import Footer from './footer';
import { LayoutWrapper } from './layout.style';
import { AuthContext } from '../contexts/auth/auth.context';
import MobileHeader from './header/mobile-header';
import { get_categories } from '../apis/products'
import { get_serviceCats } from '../apis/services'
import { SET_ALL_CATEGORY, SET_ALL_SERVICE_CATEGORY, API_IMPNOTES, API_GET_USER_PROFILE } from '../redux_helper/constants/action-types'

const Layout = (props) => {
  const { className, children, token, } = props

  const { authState, authDispatch } = useContext(AuthContext);

  const isSticky = false;
  // useAppState('isSticky') ||
  // pathname === '/furniture-two' ||
  // pathname === '/grocery-two';

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    get_categories().then((response) => {
      let all_cats = []
      response.forEach((doc) => {
        all_cats.push(doc.data())
      })
      all_cats.sort(compare);
      props.dispatch({ type: SET_ALL_CATEGORY, payload: all_cats })
    })
      .catch((err) => {
        console.error(err)
        // return <ErrorMessage message={err.message} />;
      })

    get_serviceCats().then((response) => {
      let all_servicecats = []
      response.forEach((doc) => {
        all_servicecats.push(doc.data())
      })
      all_servicecats.sort(compare);
      props.dispatch({ type: SET_ALL_SERVICE_CATEGORY, payload: all_servicecats })
    })
      .catch((err) => {
        console.error(err)
        // return <ErrorMessage message={err.message} />;
      })

    props.dispatch({ type: API_IMPNOTES, payload: '' })

    if (props.user_profile.id == null) {
      if ((authState.access_token || '') != '') {
        props.dispatch({ type: API_GET_USER_PROFILE, payload: authState.access_token })
      }
    }
  }

  function compare( a, b ) {
    let a_value = a.weight == null ? 0 : a.weight
    let b_value = b.weight == null ? 0 : b.weight

    if ( a_value < b_value ){
      return -1;
    }
    if ( a_value > b_value ){
      return 1;
    }
    return 0;
  }
   

  const isHomePage = true; //isCategoryPage(query.type) || pathname === '/bakery';
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        {props.imp_notes != null && props.imp_notes.text != '' &&
          <div className="banner_text">
            {props.imp_notes.text}
          </div>
        }
        <MobileHeader
          className={`unSticky desktop`}
        />
        <Header
          className={`unSticky`}
          user_profile={props.user_profile}
        />
      </Sticky>
      {children}
      <Footer />
    </LayoutWrapper>
  );
};


const mapstate_props = (state) => {
  return {
    all_cats: state.productsReducer.all_cats,
    imp_notes: state.contentReducer.imp_notes,
    user_profile: state.userReducer.user_profile,
  }
}

export default connect(mapstate_props)(Layout)
