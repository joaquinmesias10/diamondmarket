import React, {useEffect, useState} from 'react'
import { useMedia } from '../utils/use-media'; 
import {get_impnotes} from '../apis/content';

const DeliveryPolicyPage = () => {  
  const mobile = useMedia('(max-width: 580px)');
  
  const [content, setContent] = useState('')

  useEffect(()=>{
    get_impnotes().then(res => {
      if(res.data() != null) {
        setContent(res.data().deliveryTime)
      } 
    })
    .catch(err => {
      console.log('privacy', err)
    })
  }, [])

  return (
    <div className="main_container" style={{flexDirection: 'column', textAlign: 'center'}}>   
        <div className="terms_title">送貨時間說明</div>
        <div className="terms_content">{content}</div>
    </div>
  ); 
};

export default DeliveryPolicyPage;

