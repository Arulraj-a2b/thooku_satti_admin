import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from '../common/HomePlaceHolder';
import {ListText} from './DiningCard';
import {getDiningDetailsMiddleWare} from './store/diningMiddleWare';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    backgroundColor: WHITE,
  },
});
const DiningViewDetailsScreen = () => {
  const routes = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    if (routes && routes.params) {
      dispatch(
        getDiningDetailsMiddleWare({DiningBookingID: routes.params.orderId}),
      );
    }
  }, [routes.params]);
  console.log('routes.params', routes.params);
  const {isLoading, data} = useSelector(({getDiningDetailsReducers}) => {
    return {
      isLoading: getDiningDetailsReducers.isLoading,
      data: getDiningDetailsReducers.data,
    };
  });
  console.log('data', data);
  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return data.length !== 0 ? (
    <Flex overrideStyle={styles.overAll}>
      <ListText name="Customer Name" value={data[0].Name} />
      <ListText name="Customer Phone" value={data[0].Contactno} />
      <ListText name="Booking Date" value={data[0].BookingDate} />
      <ListText name="Booking ID" value={data[0].BookingID} />
      <ListText name="Booking Time" value={data[0].BookingTime} />
      {!isEmpty(data[0].GooglepayNo) && (
        <ListText name="GooglePay Number" value={data[0].GooglepayNo} />
      )}
      {!isEmpty(data[0].PhoePayNo) && (
        <ListText name="Phonepe Number" value={data[0].PhoePayNo} />
      )}
      {!isEmpty(data[0].Notes) && (
        <ListText name="Notes" value={data[0].Notes} />
      )}
    </Flex>
  ) : (
    <></>
  );
};

export default DiningViewDetailsScreen;
