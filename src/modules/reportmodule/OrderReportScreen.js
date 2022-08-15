import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {getDateString} from '../../uikit/UikitUtils/helpers';
import {generateAdminReportMiddleWare} from './store/reportMiddleware';
import Loader from '../../uikit/Loader/Loader';
import ReportTable from './ReportTable';
import NormalOrderDetailsModal from './NormalOrderDetailsModal';
import ReportFilter from './ReportFilter';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgFilter from '../../icons/SvgFilter';
import {BORDER_COLOR} from '../../uikit/UikitUtils/colors';
import ReportFilterModal from './ReportFilterModal';
import MarketOrderDetailsModal from './MarketOrderDetailsModal';

const styles = StyleSheet.create({
  filterFlex: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
});

const OrderReportScreen = ({reportType = '1'}) => {
  const [isStatus, setStatus] = useState('1');
  const [isDetails, setDetails] = useState(false);
  const [isOrderId, setOrderId] = useState('');
  const [isFilter, setFilter] = useState(false);

  const dispatch = useDispatch();

  const {isLoading, data} = useSelector(({generateAdminReportReducers}) => {
    return {
      isLoading: generateAdminReportReducers.isLoading,
      data: generateAdminReportReducers.data,
    };
  });

  const handleSubmit = value => {
    dispatch(
      generateAdminReportMiddleWare({
        ReportType: reportType,
        FromDate: getDateString(value.fromDate, 'YYYY-MM-DD'),
        Todate: getDateString(value.toDate, 'YYYY-MM-DD'),
        StatusCode: value.status,
        PagenationNo: 1,
        OrderID: value.orderID,
        HotelID: '',
      }),
    ).then(() => {
      setFilter(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      status: '',
      fromDate: new Date(),
      toDate: new Date(),
      orderID: '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue('status', isStatus);
  }, [isStatus]);

  const fromDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    formik.setFieldValue('fromDate', currentDate);
  };

  const showFromDate = () => {
    DateTimePickerAndroid.open({
      value: formik.values.fromDate,
      onChange: fromDateChange,
      mode: 'date',
      is24Hour: false,
    });
  };

  const toDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    formik.setFieldValue('toDate', currentDate);
  };

  const showToDate = () => {
    DateTimePickerAndroid.open({
      value: formik.values.fromDate,
      onChange: toDateChange,
      mode: 'date',
      is24Hour: false,
      maximumDate: new Date(),
    });
  };

  const checkData = Array.isArray(data) && data.length === 0;
  const handleViewDetails = id => {
    setOrderId(id);
    setDetails(true);
  };
  return (
    <>
      {isLoading && <Loader />}
      {isDetails && reportType === '1' && (
        <NormalOrderDetailsModal
          close={() => setDetails(false)}
          open={isDetails}
          orderId={isOrderId}
        />
      )}
      {isDetails && reportType === '2' && (
        <MarketOrderDetailsModal
          close={() => setDetails(false)}
          open={isDetails}
          orderId={isOrderId}
        />
      )}
      <ReportFilterModal
        open={isFilter}
        formik={formik}
        showToDate={showToDate}
        showFromDate={showFromDate}
        setStatus={setStatus}
        isStatus={isStatus}
        close={() => setFilter(false)}
      />

      {!checkData && (
        <Flex row center between overrideStyle={styles.filterFlex}>
          <Text bold size={16}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => setFilter(true)}>
            <SvgFilter />
          </TouchableOpacity>
        </Flex>
      )}
      <ScrollView>
        {checkData && (
          <ReportFilter
            formik={formik}
            showToDate={showToDate}
            showFromDate={showFromDate}
            setStatus={setStatus}
            isStatus={isStatus}
          />
        )}
        {!checkData && (
          <ReportTable data={data} handleViewDetails={handleViewDetails} />
        )}
      </ScrollView>
    </>
  );
};

export default OrderReportScreen;
