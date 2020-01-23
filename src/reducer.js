import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './reducers/home';
/*import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import repos from './reducers/repos';*/

export default combineReducers({
  /*repos,
  auth,
  common,*/
  home,
  router: routerReducer
});
