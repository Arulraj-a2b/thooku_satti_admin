import {createSlice} from '@reduxjs/toolkit';
import { generateAdminReportMiddleWare } from './reportMiddleware';

const generateAdminReportState = {
  isLoading: false,
  error: '',
  data: [],
};

const generateAdminReportReducer = createSlice({
  name: 'generateAdminReport',
  initialState: generateAdminReportState,
  reducers: {},
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

export const generateAdminReportReducers = generateAdminReportReducer.reducer;
