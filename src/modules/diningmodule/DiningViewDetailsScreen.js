import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from '../common/HomePlaceHolder';
import {ListText} from './DiningCard';
import RejectModal from './RejectModal';
import {
  getDiningDetailsMiddleWare,
  updateDiningStatusMiddleWare,
} from './store/diningMiddleWare';

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
  const [isStatusLoader, setStatusLoader] = useState(false);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    if (routes && routes.params) {
      dispatch(
        getDiningDetailsMiddleWare({DiningBookingID: routes.params.orderId}),
      );
    }
  }, [routes.params]);

  const {isLoading, data} = useSelector(({getDiningDetailsReducers}) => {
    return {
      isLoading: getDiningDetailsReducers.isLoading,
      data: getDiningDetailsReducers.data,
    };
  });

  const bookingStatus =
    data.length !== 0 && data[0].BookingStatus.toLowerCase() === 'pending'
      ? true
      : false;

  const handleAccept = () => {
    setStatusLoader(true);
    dispatch(
      updateDiningStatusMiddleWare({
        Code: '1',
        BookingID: routes.params.orderId,
      }),
    ).then(() => {
      dispatch(
        getDiningDetailsMiddleWare({DiningBookingID: routes.params.orderId}),
      ).then(() => {
        Toast('Status Updated Successfully');
        setStatusLoader(false);
      });
    });
  };

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.reason)) {
      errors.reason = 'Please fill the reason';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {reason: ''},
    onSubmit: () => handleReject(),
    validate: handleValidate,
  });

  const handleRejectModal = id => {
    setModal(true);
  };

  const handleReject = () => {
    Keyboard.dismiss();
    setStatusLoader(true);
    dispatch(
      updateDiningStatusMiddleWare({
        Code: '2',
        BookingID: routes.params.orderId,
        RejectedReason: formik.values.reason,
      }),
    ).then(() => {
      dispatch(
        getDiningDetailsMiddleWare({DiningBookingID: routes.params.orderId}),
      ).then(() => {
        Toast('Status Updated Successfully');
        setModal(false);
        formik.resetForm();
        setStatusLoader(false);
      });
    });
  };
  const handleCloseModal = () => {
    setModal(false);
    formik.resetForm();
  };

  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return data.length !== 0 ? (
    <>
      {isStatusLoader && <Loader />}
      {isModal && (
        <RejectModal open={isModal} close={handleCloseModal} formik={formik} />
      )}
      <Flex flex={1} overrideStyle={styles.overAll}>
        <ListText name="Customer Name" value={data[0].Name} />
        <ListText name="Customer Phone" value={data[0].Contactno} />
        {!isEmpty(data[0].Hotelname) && (
          <ListText name="Hotel Name" value={data[0].Hotelname} />
        )}
        <ListText name="Booking Date" value={data[0].BookingDate} />
        <ListText name="Booking ID" value={data[0].BookingID} />
        {!isEmpty(data[0].NoofAdult) && data[0].NoofAdult !== 0 && (
          <ListText name="Number of Adult" value={data[0].NoofAdult} />
        )}
        {!isEmpty(data[0].NoofChild) && data[0].NoofChild !== 0 && (
          <ListText name="Number of Child" value={data[0].NoofChild} />
        )}
        {!isEmpty(data[0].BookingStatus) && (
          <ListText name="Booking Status" value={data[0].BookingStatus} />
        )}
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
        {!isEmpty(data[0].BilluploadStatus) && (
          <ListText name="Bill Status" value={data[0].BilluploadStatus} />
        )}
        {!isEmpty(data[0].BillRefno) && (
          <ListText name="Bill Number" value={data[0].BillRefno} />
        )}
        {!isEmpty(data[0].Billamount) && data[0].Billamount !== 0 && (
          <ListText
            name="Total Bill"
            value={INDIAN_RUPEE + isFinancial(data[0].Billamount)}
          />
        )}

        {!isEmpty(data[0].BillImagePath) && (
          <Flex row overrideStyle={{marginBottom: 16}}>
            <Text bold overrideStyle={styles.nameStyle}>
              Download Bill
            </Text>
            <TouchableOpacity
              style={{width: '57%'}}
              onPress={() => Linking.openURL(data[0].BillImagePath)}>
              <Text color="link" ellipsizeMode={'tail'} numberOfLines={1}>
                {data[0].BillImagePath}
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
        {bookingStatus && (
          <Flex row middle overrideStyle={{marginTop: 16}}>
            <Button
              onClick={() => handleRejectModal(data[0].BookingID)}
              types={'secondary'}
              overrideStyle={{marginRight: 8}}>
              Reject
            </Button>
            <Button
              overrideStyle={{marginLeft: 8}}
              onClick={() => handleAccept(data[0].BookingID)}>
              Accept
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  ) : (
    <></>
  );
};

export default DiningViewDetailsScreen;
