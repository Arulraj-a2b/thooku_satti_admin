import {loginReducers} from '../modules/loginmodule/store/loginReducer';
import {
  getOrderDetailsReducers,
  getAdminMasterOrderReducers,
} from '../modules/orderwaitingmodule/store/orderWaitingReducer';
import {
  getDiningReducers,
  getDiningDetailsReducers,
} from '../modules/diningmodule/store/diningReducer';
import {getMarketOrderReducers} from '../modules/marketmodule/store/marketOrderScreenReducer';
import {generateAdminReportReducers,getHotelListReducers} from '../modules/reportmodule/store/reportReducer';

export const reducers = {
  loginReducers,
  getOrderDetailsReducers,
  getAdminMasterOrderReducers,
  getDiningReducers,
  getDiningDetailsReducers,
  getMarketOrderReducers,
  generateAdminReportReducers,
  getHotelListReducers
};
