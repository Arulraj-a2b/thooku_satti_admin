import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('Mobapi/AdminLogin');
export const getAdminMasterOrderApi=fetchUrl('Mobapi/GetAdminMasterOrder?')
export const getOrderDetailsApi = fetchUrl('Mobapi/GetOrderDetails');

