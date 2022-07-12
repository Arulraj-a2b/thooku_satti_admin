import {createSlice} from '@reduxjs/toolkit';
import {getOrderDetailsMiddleWare} from './orderWaitingMiddleware';

const getOrderDetailsState = {
  isLoading: false,
  error: '',
  data: [],
};

const getOrderDetailsReducer = createSlice({
  name: 'getOrderDetails',
  initialState: getOrderDetailsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrderDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOrderDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getOrderDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getOrderDetailsReducers = getOrderDetailsReducer.reducer;
