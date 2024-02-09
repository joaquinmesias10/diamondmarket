import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FormControl, Select } from '@material-ui/core';
import { AuthContext } from '../../../contexts/auth/auth.context';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
} from './settings.style';
import { FormattedMessage } from 'react-intl';
import { Button } from '../../../components/button/button';
import { Input } from '../../../components/forms/input';
import { Label } from '../../../components/forms/label';
import Contact from '../../../features/contact/contact';
import Address from '../../../features/address/address';
import Payment from '../../../features/payment/payment';
import { API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE, API_IMPNOTES, SHOW_ALERT } from '../../../redux_helper/constants/action-types';

const selectStyle = {
  width: '100%',
  padding: '0 18px',
  fontSize: 15,
  lineHeight: 'inherit',
  border: '1px solid',
  borderColor: '#f1f1f1',
  borderRadius: 6,
  backgroundColor: '#F7F7F7',
  color: '#0D1136',
  height: 48,
}

const SettingsContent = (props) => {
  const history = useHistory();
  const { authState, authDispatch } = useContext(AuthContext);
  const [isChanged, setChangedFlag] = useState(false)
  const [state, setState] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    region: '',
    area: '',
  });
 

  useEffect(() => {
    if ((authState.access_token || '') == '') {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "請先登入網站" } })
      history.push('/')
      return;
    }

    if ((authState.access_token || '') != '') {
      props.dispatch({ type: API_GET_USER_PROFILE, payload: authState.access_token })
    }

    props.dispatch({ type: API_IMPNOTES, payload: '' })
  
  }, [])

  useEffect(() => {
    if (props.user_profile != null) {
      setState({
        ...state,
        name: props.user_profile.name,
        phone: props.user_profile.phone,
        email: props.user_profile.email,
        address: props.user_profile.address || '', 
      })
    }
  }, [props.user_profile ])

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });

    setChangedFlag(true)
  };

  const onProfileSave = () => {
    if ((authState.access_token || '') == '') { return }

    if (((state.name || '') == '') ||
      ((state.phone || '') == '') ||
      ((state.email || '') == '') ||
      ((state.address || '') == '')  
      ) {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: 'Please set all information!' } })
      return
    }

    props.dispatch({
      type: API_UPDATE_USER_PROFILE, payload: {
        user_id: authState.access_token,
        params: state
      }
    })
  }


  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            您的帳戶
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label>您的名稱</Label>
            <Input
              type='text'
              name='name'
              value={state.name} onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label>電子郵件</Label>
            <Input
              type='email'
              name='email'
              value={state.email}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label> 電話 </Label>
            <Input
              type='text'
              label='Name'
              name="phone" value={state.phone} disabled
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label>郵寄地址</Label>
            <Input
              type='text'
              name="address" value={state.address} onChange={handleChange}
              backgroundColor='#F7F7F7'
            />
          </Col>
          {/* <Col xs={12} sm={6} md={6} lg={4}>
            <Label>City</Label>
            <Select
              native
              value={state.city}
              onChange={handleChange}
              inputProps={{
                name: "city",
                id: 'outlined-age-native-simple',
              }}
              style={selectStyle}
            >
              <option value={''}></option>
              {
                props.imp_notes != null && props.imp_notes.cities_level1.map((item, index) =>
                  <option key={index} value={item.name}>{item.name}</option>
                )
              }
            </Select>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label>Region</Label>
            <Select
              native
              value={state.region}
              onChange={handleChange}
              label="Region"
              inputProps={{
                name: "region",
                id: 'outlined-age-native-simple',
              }}
              style={selectStyle}
            >
              <option value={''}></option>
              {
                props.imp_notes != null && props.imp_notes.cities_level2.map((item, index) =>
                  <option key={index} value={item.name}>{item.name}</option>
                )
              }
            </Select>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label>Area</Label>
            <Select
              native
              value={state.area}
              onChange={handleChange}
              label="Area"
              inputProps={{
                name: "area",
                id: 'outlined-age-native-simple',
              }}
              style={selectStyle}
            >
              <option value={''}></option>
              {
                props.imp_notes != null && props.imp_notes.cities_level3.map((item, index) =>
                  <option key={index} value={item.name}>{item.name}</option>
                )
              }
            </Select>
          </Col> */}
        </Row>

        <HeadingSection>
          <Title>
            用戶點數
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Label style={{ fontSize: 42, fontWeight: 'bold' }}>{props.user_profile.user_points}</Label>
          </Col>
        </Row>

        <Col xs={12} sm={2} md={2} lg={2}>
          <Button disabled={isChanged == false} size='big' style={{ width: '100%' }} onClick={onProfileSave}>
            確認
          </Button>
        </Col>


      </SettingsFormContent>
    </SettingsForm>
  );
};



const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(SettingsContent)
