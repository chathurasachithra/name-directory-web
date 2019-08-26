import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../redux/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];


const composedEnhancers = compose(
    composeWithDevTools(
        applyMiddleware(...middleware),
        ...enhancers
    )

);


const store = createStore(rootReducer,composedEnhancers);

export default store;
