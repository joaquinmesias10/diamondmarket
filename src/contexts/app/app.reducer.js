export const initialState = {
  searchTerm: '',
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
};

// type ActionType =
//   | { type: 'SET_SEARCH_TERM'; payload }
//   | { type: 'SET_STICKY' }
//   | { type: 'REMOVE_STICKY' }
//   | { type: 'SET_SIDEBAR_STICKY' }
//   | { type: 'REMOVE_SIDEBAR_STICKY' }
//   | { type: 'TOGGLE_DRAWER' };
 

export function appReducer(state , action ) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: action.payload,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: action.payload,
      };
    case 'TOGGLE_DRAWER':
      console.log('TOGGLE_DRAWER')
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
