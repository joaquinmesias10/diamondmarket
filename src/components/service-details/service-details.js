import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  ServiceDetailsWrapper,
  ServicePreview,
  ServiceInfo,
  ServiceTitlePriceWrapper,
  ServiceTitle,
  ServiceDescription,
  ButtonText,
  ServiceMeta,
  ServiceCartWrapper,
  ServicePriceWrapper,
  ServicePrice,
  SalePrice,
  ServiceCartBtn,
  MetaTitle,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from './service-details.style';
import { Button } from '../../components/button/button';
import { CartIcon } from '../../assets/icons/CartIcon';
import ReadMore from '../../components/truncate/truncate';
import CarouselWithCustomDots from '../../components/multi-carousel/multi-carousel';
import { CURRENCY } from '../../utils/constant';
import { useLocale } from '../../contexts/language/language.provider';
import { useCart } from '../../contexts/cart/use-cart';
import { getDiscountedPrice, getDiscount } from '../../utils/product';
import { getTimeString } from '../../utils/date';
import { get_serviceDates, get_everyday_serviceDates } from '../../apis/services';
import DatePicker from '../../components/horiz-datepicker/DatePicker';
import { SHOW_ALERT } from '../../redux_helper/constants/action-types';

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const ServiceDetails = (props) => {
  const { service, deviceType, } = props;
  const { isRtl } = useLocale();
  const history = useHistory();
  const { ApplyBooking, RemoveBooking, removeCoupon, removePoints} = useCart();
  const [date_loading, SetDateLoading] = useState(false)
  const [allServiceDates, SetAllServiceDates] = useState([])
  const [selectedDates, SetSelectedDates] = useState([])
  const [curServiceDate, SetCurServiceDate] = useState({})
 
  const [curDate, setCurDate] = useState(new Date())

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    if (service.everyday == true) {
      get_everyday_serviceDates(service.id).then(response => {

        let allItems = []
        response.forEach((doc) => {
          allItems.push(doc.data())
        })
        console.log('get_everyday_serviceDates response', allItems)
        SetAllServiceDates(allItems)
        updateCurServiceDate(allItems)
      })
        .catch((err) => {
          console.log('get all service dates', err)
        })
    }
    else {
      get_serviceDates(service.id).then(response => {

        let allItems = []
        response.forEach((doc) => {
          allItems.push(doc.data())
        })
        console.log('get_serviceDates response', allItems)
        SetAllServiceDates(allItems)
        updateCurServiceDate(allItems)
      })
        .catch((err) => {
          console.log('get all service dates', err)
        })
    }

  }, [service.id]);

  const updateCurServiceDate = (allDates, date = new Date()) => {
    setCurDate(date)
    if(service.everyday == true) {
      SetCurServiceDate(allDates.length > 0 ? allDates[0] : {})
    }
    else {
      let foundIndex = allDates.findIndex(date_item => date_item.name == moment(date).format("yyyy-MM-DD"))
      if (foundIndex < 0) {
        SetCurServiceDate({})
      }
      else {
        SetCurServiceDate(allDates[foundIndex])
      }
    } 
  }

  const isSelected = (timeSlot) => {  
    var flag = false;
    selectedDates.map(date_item => {
      (date_item.timeslots || []).map((item, index) => {
        if (item.id == timeSlot.id) { 
          console.log('isSelected', true)
          flag = true
        }
      })
    }) 
    return flag;
  }

  const onChangeDate = (date) => {
    updateCurServiceDate(allServiceDates, date)
  }

  const onClickTimeSlot = (timeslot) => {
   
    if (curServiceDate == null) { return false }

    // let tmpDates = selectedDates.slice(0, selectedDates.length)
    // let flag = false
    // for (var i = 0; i < tmpDates.length; i++) {
    //   var it = tmpDates[i]
    //   if (it.name == curServiceDate.name) {

    //     if (it.timeslots == null) {
    //       it.timeslots = []
    //     }
    //     let foundIndex = it.timeslots.findIndex(item => item.id == timeslot.id)
    //     if (foundIndex < 0) {
    //       tmpDates[i].timeslots.push(timeslot)
    //     }
    //     else {
    //       tmpDates[i].timeslots.splice(foundIndex, 1)
    //     }

    //     flag = true;
    //     break;
    //   }
    // }

    let tmpDates = []
    tmpDates.push({
      id: curServiceDate.id,
      name: service.everyday == true ? moment(curDate).format("yyyy-MM-DD") : curServiceDate.name,
      date: service.everyday == true ? curDate.getTime() : curServiceDate.date,
      capacity: curServiceDate.capacity,
      timeslots: [timeslot]
    })
    SetSelectedDates(tmpDates) 
  }

  const _renderTimeSlot = (timeslot_data, index) => {
    let start_time = getTimeString(timeslot_data.start_hour, timeslot_data.start_min)
    let end_time = getTimeString(timeslot_data.end_hour, timeslot_data.end_min)
    let disabled = timeslot_data.used_cnt >= timeslot_data.capacity

    const style = {
      marginRight: 20, marginBottom: 12, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
      borderRadius: 16, fontSize: 14, textAlign: 'center',
    }
    const diabledStyle = {
      borderWidth: 1, borderColor: '#444', color: '#444'
    }
    const nonSelectedStyle = {
      backgroundColor: '#bbb',
      color: '#000'
    }
    const SelectedStyle = {
      backgroundColor: '#a00',
      color: '#fff'
    }

    let item_style = diabledStyle;
    if (disabled == false && isSelected(timeslot_data) == true) {
      item_style = SelectedStyle
    }
    else if (disabled == false && isSelected(timeslot_data) == false) {
      item_style = nonSelectedStyle
    }

    return (
      <div className=" timeslot-item" key={index} onClick={() => onClickTimeSlot(timeslot_data)}>
        <div style={{ ...style, ...item_style }}>
          {start_time + ' - ' + end_time}
        </div>
      </div>)
  }

  const handleAddClick = (e) => {
    if (selectedDates.length > 0) {
      removeCoupon()
      removePoints()
      ApplyBooking({
        id: new Date().getTime().toString(),
        booking_service: service,
        booking_dates: selectedDates
      })
      history.push('/book_service')
    }
    else {
      props.dispatch({ type: SHOW_ALERT, payload: { type: 'warning', msg: "請選擇日期" } })
    }
  };

  return (
    <>
      <ServiceDetailsWrapper className='product-card' dir='ltr'>
        {!isRtl && (
          <ServicePreview>
            <CarouselWithCustomDots
              items={[service.image]}
              type='services'
              deviceType={deviceType}
            />
          </ServicePreview>
        )}

        <ServiceInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ServiceTitlePriceWrapper>
            <ServiceTitle>{service.title}</ServiceTitle>
          </ServiceTitlePriceWrapper>

          <ServicePriceWrapper>
            <ServicePrice>
              {CURRENCY}
              {
                addCommas(getDiscountedPrice(service))
              }
            </ServicePrice>

            {getDiscount(service) ? (
              <SalePrice>
                {CURRENCY}
                {addCommas(service.price)}
              </SalePrice>
            ) : null}
          </ServicePriceWrapper>

          <ServiceDescription>
            <ReadMore character={600}>{service.desc}</ReadMore>
          </ServiceDescription>

          <RelatedItems className="subp_container">
            <h2 style={{ fontSize: 18, textAlign: 'left' }}>選擇日期</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
              <DatePicker start_Date={new Date()} getSelectedDay={onChangeDate} />
            </div>
            <h2 style={{ fontSize: 18, textAlign: 'left', marginTop: 30, }}>選擇時間</h2>
            <div style={{ flexWrap: 'wrap', width: '100%', marginTop: 20, display: 'flex', flexDirection: 'row' }}>
              {
                (curServiceDate.timeslots || []).map((timeslot, index) =>
                  _renderTimeSlot(timeslot, index)
                )
              }
            </div>
          </RelatedItems>

          <ServiceCartWrapper>
            <ServiceCartBtn>
              <Button
                className='cart-button'
                variant='primary'
                size='big'
                onClick={handleAddClick}
              >
                <ButtonText> 確認預約 </ButtonText>
              </Button>
            </ServiceCartBtn>
          </ServiceCartWrapper>
        </ServiceInfo>

      </ServiceDetailsWrapper>

      {/* <RelatedItems>
        <h2>Service Date</h2>
        <ServiceGrid
          type='sub_products'
          pId={product.id} 
          loadMore={false}
          fetchLimit={5}
          // style={{
          //   gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          // }}
        />
      </RelatedItems> */}
    </>
  );
};

const mapstate_props = (state) => {
  return {
    user_profile: state.userReducer.user_profile,
    imp_notes: state.contentReducer.imp_notes
  }
}

export default connect(mapstate_props)(ServiceDetails);
