import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {REPORT} from '../../../actions/actions';
import {generateAdminReportApi} from '../../../routes/apiRoutes';
import Toast from '../../../uikit/Toast/Toast';

export const generateAdminReportMiddleWare = createAsyncThunk(
  REPORT,
  async (
    {ReportType, FromDate, Todate, StatusCode, PagenationNo, OrderID, HotelID},
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.get(generateAdminReportApi, {
        params: {
          ReportType,
          FromDate,
          Todate,
          StatusCode,
          PagenationNo,
          OrderID,
          HotelID,
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
