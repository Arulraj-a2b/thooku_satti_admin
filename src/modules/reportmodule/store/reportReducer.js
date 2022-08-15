import {createSlice} from '@reduxjs/toolkit';
import {
  generateAdminReportMiddleWare,
  getHotelListMiddleWare,
} from './reportMiddleware';

const generateAdminReportState = {
  isLoading: false,
  error: '',
  data: [],
};

const generateAdminReportReducer = createSlice({
  name: 'generateAdminReport',
  initialState: generateAdminReportState,
  reducers: {
    resetReport: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(generateAdminReportMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      generateAdminReportMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(generateAdminReportMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getHotelListState = {
  isLoading: false,
  error: '',
  data: [],
};

const getHotelListReducer = createSlice({
  name: 'getHotelList',
  initialState: getHotelListState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHotelListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getHotelListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getHotelListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const {resetReport} = generateAdminReportReducer.actions;

export const generateAdminReportReducers = generateAdminReportReducer.reducer;
export const getHotelListReducers = getHotelListReducer.reducer;
