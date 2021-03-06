import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER_DETAILS,
  ORDER_STATUS_UPDATE,
} from '../../../actions/actions';
import {
  getAdminMasterOrderApi,
  getOrderDetailsApi,
  orderStatusUpdateApi,
} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const getOrderDetailsMiddleWare = createAsyncThunk(
  GET_ORDER_DETAILS,
  async ({OrderID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getOrderDetailsApi, {
        params: {
          OrderID,
        },
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getAdminMasterOrderMiddleWare = createAsyncThunk(
  GET_ORDERS,
  async ({code}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getAdminMasterOrderApi, {
        params: {
          code,
        },
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const orderStatusUpdateMiddleWare = createAsyncThunk(
  ORDER_STATUS_UPDATE,
  async ({code, OrderID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(orderStatusUpdateApi, {
        code,
        OrderID,
      });
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
