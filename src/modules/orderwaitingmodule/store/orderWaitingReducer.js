import {createSlice} from '@reduxjs/toolkit';
import {
  getAdminMasterOrderMiddleWare,
  getOrderDetailsMiddleWare,
} from './orderWaitingMiddleware';

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

const getAdminMasterOrderState = {
  isLoading: false,
  error: '',
  data: [],
};

const getAdminMasterOrderReducer = createSlice({
  name: 'getAdminMasterOrder',
  initialState: getAdminMasterOrderState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAdminMasterOrderMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      getAdminMasterOrderMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(getAdminMasterOrderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getOrderDetailsReducers = getOrderDetailsReducer.reducer;
export const getAdminMasterOrderReducers = getAdminMasterOrderReducer.reducer;
