import {createSlice} from '@reduxjs/toolkit';
import {
  getDiningDetailsMiddleWare,
  getDiningMiddleWare,
} from './diningMiddleWare';

const initialState = {
  isLoading: false,
  error: '',
  data: [],
};

const getDiningReducer = createSlice({
  name: 'get_dining',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDiningMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getDiningMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getDiningMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const diningDetailsInitialState = {
  isLoading: false,
  error: '',
  data: [],
};

const getDiningDetailsReducer = createSlice({
  name: 'get_dining_details',
  initialState: diningDetailsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDiningDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getDiningDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getDiningDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const getDiningReducers = getDiningReducer.reducer;
export const getDiningDetailsReducers = getDiningDetailsReducer.reducer;
