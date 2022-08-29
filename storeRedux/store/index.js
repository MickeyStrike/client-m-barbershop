import { useMemo } from 'react'
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [
  thunk,
];

let store

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

// const middlewares = [
//   thunk,
// ];
// const composeEnhancers = compose;

// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(...middlewares))
// )

// export {
//   store
// };
