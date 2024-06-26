import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers/reducers'

export default function configureStore(preloadedState) {

//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer) //, preloadedState, composedEnhancers)

  return store
}


