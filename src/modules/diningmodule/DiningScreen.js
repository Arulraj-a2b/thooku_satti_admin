import {useFocusEffect} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useCallback, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from '../common/HomePlaceHolder';
import {height} from '../orderwaitingmodule/OrderWaitingScreen';
import DiningCard from './DiningCard';
import RejectModal from './RejectModal';
import {
  getDiningMiddleWare,
  updateDiningStatusMiddleWare,
} from './store/diningMiddleWare';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overAll: {
    backgroundColor: WHITE,
  },
});

const DiningScreen = () => {
  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState(true);
  const [isStatusLoader, setStatusLoader] = useState(false);
  const [isModal, setModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoader(true);
      dispatch(getDiningMiddleWare()).then(() => {
        setLoader(false);
      });
    }, []),
  );

  const {data} = useSelector(({getDiningReducers}) => {
    return {
      data: getDiningReducers.data,
    };
  });

  const handleAccept = id => {
    setStatusLoader(true);
    dispatch(updateDiningStatusMiddleWare({Code: '1', BookingID: id})).then(
      () => {
        dispatch(getDiningMiddleWare()).then(() => {
          Toast('Status Updated Successfully');
          setStatusLoader(false);
        });
      },
    );
  };

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.reason)) {
      errors.reason = 'Please fill the reason';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {reason: '', id: ''},
    onSubmit: () => handleReject(),
    validate: handleValidate,
  });

  const handleRejectModal = id => {
    setModal(true);
    formik.setFieldValue('id', id);
  };

  const handleReject = () => {
    Keyboard.dismiss();
    setStatusLoader(true);
    dispatch(
      updateDiningStatusMiddleWare({
        Code: '2',
        BookingID: formik.values.id,
        RejectedReason: formik.values.reason,
      }),
    ).then(() => {
      dispatch(getDiningMiddleWare()).then(() => {
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

  if (isLoader) {
    return <HomePlaceHolder />;
  }

  return (
    <>
      {isModal && (
        <RejectModal open={isModal} close={handleCloseModal} formik={formik} />
      )}
      <Flex overrideStyle={styles.overAll}>
        {isStatusLoader && <Loader />}
        <FlatList
          ListEmptyComponent={() => (
            <Flex center middle overrideStyle={{height: height - 200}}>
              <Text color="gray">Not found</Text>
            </Flex>
          )}
          onEndReachedThreshold={0.1}
          style={styles.flatListOverAll}
          data={typeof data === 'string' ? [] : data}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{marginBottom: index === data.length - 1 ? 40 : 8}}>
              <DiningCard
                item={item}
                handleAccept={handleAccept}
                handleRejectModal={handleRejectModal}
              />
            </View>
          )}
        />
      </Flex>
    </>
  );
};

export default DiningScreen;
