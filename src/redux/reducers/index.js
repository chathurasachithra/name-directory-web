import themeReducer from './themeReducer';
import commonReducer from './commonReducer';
import sidebarReducer from './sidebarReducer';
import nameReducer from './nameReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  user: userReducer,
  common: commonReducer,
  names: nameReducer,
  sidebar: sidebarReducer,
});

export {
  rootReducer
};

