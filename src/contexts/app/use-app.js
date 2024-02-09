import React, { useReducer, useContext, createContext } from 'react';
import { appReducer, initialState } from './app.reducer';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleDrawerHandler = () => {
    dispatch({ type: 'TOGGLE_DRAWER', payload: {} });
  };

  const setSearchTermHandler = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  const setStickyHandler = (value) => {
    dispatch({ type: 'SET_STICKY', payload: value });
  };

  const setSidbarStickyHandler = (value) => {
    dispatch({ type: 'SET_SIDEBAR_STICKY', payload: value });
  };

  return (
    <AppContext.Provider
      value={{
        searchTerm: state.searchTerm,
        isSticky: state.isSticky,
        isSidebarSticky: state.isSidebarSticky,
        isDrawerOpen: state.isDrawerOpen,
        toggleDrawer: toggleDrawerHandler,
        setSearchTerm: setSearchTermHandler,
        setSticky: setStickyHandler,
        setSidbarSticky: setSidbarStickyHandler
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
