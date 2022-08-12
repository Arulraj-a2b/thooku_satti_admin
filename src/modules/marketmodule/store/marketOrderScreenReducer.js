import {createSlice} from '@reduxjs/toolkit';
import {getMarketOrdersMiddleWare} from './marketOrderScreenMiddleware';

const getMarketOrderState = {
  isLoading: false,
  error: '',
  data: {},
};

const getMarketOrderReducer = createSlice({
  name: 'getMarketOrders',
  initialState: getMarketOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMarketOrdersMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getMarketOrdersMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
    });
    builder.addCase(getMarketOrdersMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getMarketOrderReducers = getMarketOrderReducer.reducer;
