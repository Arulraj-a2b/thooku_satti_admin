import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_ALL_DINING, GET_DINING_DETAILS} from '../../../actions/actions';
import {getDiningApi, getDiningDetailsApi} from '../../../routes/apiRoutes';

export const getDiningMiddleWare = createAsyncThunk(
  GET_ALL_DINING,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getDiningApi);
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getDiningDetailsMiddleWare = createAsyncThunk(
  GET_DINING_DETAILS,
  async ({DiningBookingID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getDiningDetailsApi, {
        params: {DiningBookingID},
      });
      return data;
    } catch (error) {
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);
