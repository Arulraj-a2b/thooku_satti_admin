import {loginReducers} from '../modules/loginmodule/store/loginReducer';
import {
  getOrderDetailsReducers,
  getAdminMasterOrderReducers,
} from '../modules/orderwaitingmodule/store/orderWaitingReducer';
import {getDiningReducers,getDiningDetailsReducers} from '../modules/diningmodule/store/diningReducer';

export const reducers = {
  loginReducers,
  getOrderDetailsReducers,
  getAdminMasterOrderReducers,
  getDiningReducers,
  getDiningDetailsReducers
};
