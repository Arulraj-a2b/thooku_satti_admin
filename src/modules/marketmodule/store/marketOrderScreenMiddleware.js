import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_MARKET_ORDER, SAVE_MARKET_ORDER} from '../../../actions/actions';
import {
  getMarketOrdersApi,
  updateMarketOrderApi,
} from '../../../routes/apiRoutes';

export const getMarketOrdersMiddleWare = createAsyncThunk(
  GET_MARKET_ORDER,
  async ({Orderno}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getMarketOrdersApi, {
        params: {
          Orderno,
        },
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const saveMarketOrderMiddleWare = createAsyncThunk(
  SAVE_MARKET_ORDER,
  async ({Type, Orderno,RejectedReason}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(updateMarketOrderApi, {
        Orderno,
        Type,
        RejectedReason
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
