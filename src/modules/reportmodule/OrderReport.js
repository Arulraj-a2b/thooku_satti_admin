import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import Flex from '../../uikit/Flex/Flex';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR} from '../../uikit/UikitUtils/colors';
import InputText from '../../uikit/InputText/InputText';
import Button from '../../uikit/Button/Button';
import DropDown from '../../uikit/DropDown/DropDown';
import {getDateString} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {orderStatus, reportType} from './mock';
import {generateAdminReportMiddleWare} from './store/reportMiddleware';
import Loader from '../../uikit/Loader/Loader';
import ReportTable from './ReportTable';
import NormalOrderDetailsModal from './NormalOrderDetailsModal';

const styles = StyleSheet.create({
  dateStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  overAll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  margin16: {
    marginBottom: 16,
  },
  btnStyle: {
    marginTop: 30,
  },
});

const OrderReport = () => {
  const [isReport, setReport] = useState('1');
  const [isStatus, setStatus] = useState('1');
  const [isDetails, setDetails] = useState(false);
  const [isOrderId, setOrderId] = useState('');
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
        ReportType: value.reportType,
        FromDate: getDateString(value.fromDate, 'YYYY-MM-DD'),
        Todate: getDateString(value.toDate, 'YYYY-MM-DD'),
        StatusCode: value.status,
        PagenationNo: 1,
        OrderID: '',
        HotelID: '',
      }),
    );
  };

  const formik = useFormik({
    initialValues: {
      reportType: '',
      status: '',
      fromDate: new Date(),
      toDate: new Date(),
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue('reportType', isReport);
  }, [isReport]);

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
  return (
    <>
      {isLoading && <Loader />}
      {isDetails && (
        <NormalOrderDetailsModal
          close={() => setDetails(false)}
          open={isDetails}
          orderId={isOrderId}
        />
      )}
      <ScrollView>
        <Flex overrideStyle={styles.overAll}>
          <View style={styles.margin16}>
            <DropDown
              label={'Report Type'}
              required
              value={isReport}
              setValue={setReport}
              data={reportType}
              searchable={false}
              listMode="FLATLIST"
            />
          </View>
          <View style={styles.margin16}>
            <DropDown
              label={'Order Status'}
              required
              value={isStatus}
              setValue={setStatus}
              data={orderStatus}
              searchable={false}
              listMode="FLATLIST"
            />
          </View>
          <View style={styles.margin16}>
            <LabelWrapper label={'From Date'} required>
              <TouchableOpacity onPress={showFromDate} style={styles.dateStyle}>
                {isEmpty(formik.values.fromDate) ? (
                  <Text color="gray">Please select your date</Text>
                ) : (
                  <Text>
                    {getDateString(formik.values.fromDate, 'DD-MM-YYYY')}
                  </Text>
                )}
              </TouchableOpacity>
            </LabelWrapper>
          </View>
          <View style={styles.margin16}>
            <LabelWrapper label={'To Date'} required>
              <TouchableOpacity onPress={showToDate} style={styles.dateStyle}>
                {isEmpty(formik.values.toDate) ? (
                  <Text color="gray">Please select your date</Text>
                ) : (
                  <Text>
                    {getDateString(formik.values.toDate, 'DD-MM-YYYY')}
                  </Text>
                )}
              </TouchableOpacity>
            </LabelWrapper>
          </View>
          <View style={styles.margin16}>
            <InputText
              height={50}
              label={'Order ID'}
              types="normal"
              keyboardType={'number-pad'}
            />
          </View>
          <Button onClick={formik.handleSubmit} overrideStyle={styles.btnStyle}>
            Generate Report
          </Button>
        </Flex>
        {Array.isArray(data) && data.length !== 0 && (
          <ReportTable
            data={data}
            setOrderId={setOrderId}
            setDetails={setDetails}
          />
        )}
      </ScrollView>
    </>
  );
};

export default OrderReport;
