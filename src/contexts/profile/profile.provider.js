import React, { useReducer } from 'react';
import { ProfileContext } from './profile.context';

function reducer(state , action ) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
 

export const ProfileProvider = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData });
  // console.log(state, 'profile provider state');
 
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
