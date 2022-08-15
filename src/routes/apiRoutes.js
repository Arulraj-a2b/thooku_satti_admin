import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('AdminLogin');
export const getAdminMasterOrderApi = fetchUrl('GetAdminMasterOrder?');
export const getOrderDetailsApi = fetchUrl('GetOrderDetails');

export const orderStatusUpdateApi = fetchUrl('OrderStatusUpdate');
export const getDiningApi = fetchUrl(`GetAllDining`);
export const getDiningDetailsApi = fetchUrl(`GetSpecificDining`);

export const updateDiningStatusApi = fetchUrl(`UpdateDiningStatus`);
export const getMarketOrdersApi = fetchUrl('GetMarketOrders');
export const updateMarketOrderApi = fetchUrl('UpdateMarketOrder');
export const generateAdminReportApi = fetchUrl('GenerateAdminReport');
