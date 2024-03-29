import React, { useContext, createContext } from 'react';

export function useCreateContext (
  reducer ,
  initialState 
) {
  const defaultDispatch = () => initialState;
  
  function useStateCtx (property ) {
    const stateCtx = createContext(initialState);
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  }

  function useDispatchCtx() {
    const dispatchCtx = createContext(defaultDispatch);
    return useContext(dispatchCtx);
  }

  function Provider(props ) {
    const [state, dispatch] = React.useReducer (reducer, initialState);
    const stateCtx = createContext(initialState);
    const dispatchCtx = createContext(defaultDispatch);
    return (
      <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>{props.children}</stateCtx.Provider>
      </dispatchCtx.Provider>
    );
  }
  return [useStateCtx, useDispatchCtx, Provider] ;
}

// const [useTextState, useTextDispatch, TextProvider] = useCreateContext(initialState, reducer);
// export const TextContext = ctx;
// export function App() {
//   return (
//     <TextProvider>
//       <Component />
//     </TextProvider>
//   )
// }
// export function Component() {
//   const state = useTextState('state')
//   const dispatch = useTextDispatch()
// const increment = useCallback(() => dispatch({ type: 'increment' }), [dispatch]);
//   return (
//     <div>
//       {state}
//       <button onClick={increment}>Toggle</button>
//     </div>
//   )
// }
