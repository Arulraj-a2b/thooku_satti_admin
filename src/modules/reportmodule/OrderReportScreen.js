import {useFormik} from 'formik';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {getDateString} from '../../uikit/UikitUtils/helpers';
import {
  generateAdminReportMiddleWare,
  getHotelListMiddleWare,
} from './store/reportMiddleware';
import Loader from '../../uikit/Loader/Loader';
import ReportTable from './ReportTable';
import NormalOrderDetailsModal from './NormalOrderDetailsModal';
import ReportFilter from './ReportFilter';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgFilter from '../../icons/SvgFilter';
import {BORDER_COLOR, PRIMARY} from '../../uikit/UikitUtils/colors';
import ReportFilterModal from './ReportFilterModal';
import MarketOrderDetailsModal from './MarketOrderDetailsModal';
import {useFocusEffect} from '@react-navigation/native';
import {resetReport} from './store/reportReducer';
import SvgRightArrow from '../../icons/SvgRightArrow';
import {GARY_2} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  filterFlex: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  svgLeft: {
    borderWidth: 1,
    borderRadius: 4,
    height: 24,
    width: 30,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    paddingHorizontal: 8,
  },
});

const OrderReportScreen = ({reportType = '1'}) => {
  const [isStatus, setStatus] = useState('1');
  const [isHotelName, setHotelName] = useState('');
  const [isDetails, setDetails] = useState(false);
  const [isOrderId, setOrderId] = useState('');
  const [isFilter, setFilter] = useState(false);
  const [isPage, setPage] = useState(1);
  const dispatch = useDispatch();
  const myRef = useRef();

  const onFabPress = () => {
    if (myRef && myRef.current) {
      myRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (reportType === '1') {
      dispatch(getHotelListMiddleWare({LocationID: '1'}));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetReport());
      setPage(1);
    }, []),
  );

  const {isLoading, data, hotelListLoader, hotelList} = useSelector(
    ({generateAdminReportReducers, getHotelListReducers}) => {
      return {
        isLoading: generateAdminReportReducers.isLoading,
        data: generateAdminReportReducers.data,
        hotelListLoader: getHotelListReducers.isLoading,
        hotelList: getHotelListReducers.data,
      };
    },
  );
  const handleSubmit = value => {
    setPage(1);
    dispatch(
      generateAdminReportMiddleWare({
        ReportType: reportType,
        FromDate: getDateString(value.fromDate, 'YYYY-MM-DD'),
        Todate: getDateString(value.toDate, 'YYYY-MM-DD'),
        StatusCode: value.status,
        PagenationNo: 1,
        OrderID: value.orderID,
        HotelID: value.hotelID,
      }),
    ).then(() => {
      onFabPress();
      setFilter(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      status: '',
      fromDate: new Date(),
      toDate: new Date(),
      orderID: '',
      hotelID: '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue('status', isStatus);
  }, [isStatus]);

  useEffect(() => {
    formik.setFieldValue('hotelID', isHotelName);
  }, [isHotelName]);

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

  const handleIncrementPage = () => {
    setPage(a => a + 1);
    dispatch(
      generateAdminReportMiddleWare({
        ReportType: reportType,
        FromDate: getDateString(formik.values.fromDate, 'YYYY-MM-DD'),
        Todate: getDateString(formik.values.toDate, 'YYYY-MM-DD'),
        StatusCode: formik.values.status,
        PagenationNo: isPage,
        OrderID: formik.values.orderID,
        HotelID: formik.values.hotelID,
      }),
    ).then(() => {
      onFabPress();
    });
  };

  const handleDecrementPage = () => {
    if (isPage > 1) {
      setPage(a => a - 1);
      dispatch(
        generateAdminReportMiddleWare({
          ReportType: reportType,
          FromDate: getDateString(formik.values.fromDate, 'YYYY-MM-DD'),
          Todate: getDateString(formik.values.toDate, 'YYYY-MM-DD'),
          StatusCode: formik.values.status,
          PagenationNo: isPage,
          OrderID: formik.values.orderID,
          HotelID: formik.values.hotelID,
        }),
      ).then(() => {
        onFabPress();
      });
    }
  };
  return (
    <>
      {(isLoading || hotelListLoader) && <Loader />}
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
        setHotelName={setHotelName}
        isHotelName={isHotelName}
        hotelList={hotelList}
        reportType={reportType}
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
      <ScrollView ref={myRef}>
        {checkData && (
          <ReportFilter
            formik={formik}
            showToDate={showToDate}
            showFromDate={showFromDate}
            setStatus={setStatus}
            isStatus={isStatus}
            setHotelName={setHotelName}
            isHotelName={isHotelName}
            hotelList={hotelList}
            reportType={reportType}
          />
        )}
        {!checkData && (
          <Flex>
            <ReportTable
              reportType={reportType}
              data={data}
              handleViewDetails={handleViewDetails}
            />
            <Flex row center middle overrideStyle={{marginBottom: 30}}>
              <TouchableOpacity
                disabled={isPage === 1}
                onPress={handleDecrementPage}
                style={[
                  styles.svgLeft,
                  {borderColor: isPage === 1 ? GARY_2 : PRIMARY},
                ]}>
                <View style={{transform: [{rotate: '180deg'}]}}>
                  <SvgRightArrow fill={GARY_2} />
                </View>
              </TouchableOpacity>
              <Text overrideStyle={styles.countText}>{isPage}</Text>
              <TouchableOpacity
                style={[
                  styles.svgLeft,
                  {borderColor:  PRIMARY},
                ]}
                onPress={handleIncrementPage}>
                <SvgRightArrow fill={GARY_2} />
              </TouchableOpacity>
            </Flex>
          </Flex>
        )}
      </ScrollView>
    </>
  );
};

export default OrderReportScreen;
