import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_HOTEL_REPORT, REPORT} from '../../../actions/actions';
import {
  generateAdminReportApi,
  getHotelListApi,
} from '../../../routes/apiRoutes';
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
      if (data.length === 0) {
        Toast('No Order Found', 'error');
      }
      return data;
    } catch (error) {
      Toast(error.response.data[0].Message, 'error');
      const typedError = error;
      return rejectWithValue(typedError);
    }
  },
);

export const getHotelListMiddleWare = createAsyncThunk(
  GET_HOTEL_REPORT,
  async ({LocationID}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(getHotelListApi, {
        params: {
          LocationID,
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
