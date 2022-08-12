import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';
import HomePlaceHolder from '../common/HomePlaceHolder';
import OrderCard from '../common/OrderCard';
import { height } from '../orderwaitingmodule/OrderWaitingScreen';
import {
  getAdminMasterOrderMiddleWare,
  orderStatusUpdateMiddleWare,
} from '../orderwaitingmodule/store/orderWaitingMiddleware';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  overAll: {
    backgroundColor: WHITE,
  },
});

const OrderSuccessScreen = () => {
  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState();
  const [isIntitalLoader, setIntitalLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIntitalLoader(true);
      dispatch(getAdminMasterOrderMiddleWare({code: '3'})).then(() => {
        setIntitalLoader(false);
      });
    }, []),
  );

  const {isLoading, data} = useSelector(({getAdminMasterOrderReducers}) => {
    return {
      isLoading: getAdminMasterOrderReducers.isLoading,
      data: getAdminMasterOrderReducers.data,
    };
  });

  const handleUpdateStatus = (value, id) => {
    setLoader(true);
    dispatch(orderStatusUpdateMiddleWare({code: value, OrderID: id}))
      .then(() => {
        setLoader(false);
        dispatch(getAdminMasterOrderMiddleWare({code: '3'}));
      })
      .catch(() => {
        setLoader(false);
      });
  };

  if (isIntitalLoader) {
    return <HomePlaceHolder />;
  }

  return (
    <Flex overrideStyle={styles.overAll}>
      {(isLoader || isLoading) && <Loader />}
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
          <View style={{marginBottom: index === data.length - 1 ? 40 : 0}}>
            <OrderCard
              isSuccess
              item={item}
              handleUpdateStatus={handleUpdateStatus}
            />
          </View>
        )}
      />
    </Flex>
  );
};

export default OrderSuccessScreen;
