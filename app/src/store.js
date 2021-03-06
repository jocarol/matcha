import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'

import { landingPageFormSubmit } from './pages/landing/saga'
import { signUpFormSubmit } from './pages/authentication/sign-up/saga'
import { signInFormSubmit } from './pages/authentication/sign-in/saga'
import signInReducer from './pages/authentication/sign-in/reducer'
import signUpReducer from './pages/authentication/sign-up/reducer'

const initialState = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}
const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const middlewares = [sagaMiddleware]
  const enhancers = []

  const store = createReduxStore(
    combineReducers({
      form: formReducer.plugin({
        signIn: signInReducer,
        signUp: signUpReducer
      })
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  sagaMiddleware.run(landingPageFormSubmit)
  sagaMiddleware.run(signInFormSubmit)
  sagaMiddleware.run(signUpFormSubmit)
  
  return store
}

export {
  createStore
}