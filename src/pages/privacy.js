import React, {useEffect, useState} from 'react'
import { useMedia } from '../utils/use-media'; 
import {get_privacy} from '../apis/content';

const PrivacyPage = () => {  
  const mobile = useMedia('(max-width: 580px)');
  
  const [content, setContent] = useState('')

  useEffect(()=>{
    get_privacy().then(res => {
      if(res.data() != null) {
        setContent(res.data().text)
      } 
    })
    .catch(err => {
      console.log('privacy', err)
    })
  }, [])

  return (
    <div className="main_container" style={{flexDirection: 'column', textAlign: 'center'}}>   
        <div className="terms_title">私隱政策</div>
        <div className="terms_content">{content}</div>
    </div>
  ); 
};

export default PrivacyPage;
