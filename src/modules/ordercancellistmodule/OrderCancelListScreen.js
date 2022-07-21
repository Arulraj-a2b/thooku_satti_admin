import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import HomePlaceHolder from '../common/HomePlaceHolder';
import OrderCard from '../common/OrderCard';
import {getAdminMasterOrderMiddleWare} from '../orderwaitingmodule/store/orderWaitingMiddleware';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  overAll: {
    backgroundColor: WHITE,
  },
});

const OrderCancelListScreen = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getAdminMasterOrderMiddleWare({code: '4'}));
    }, []),
  );

  const {isLoading, data} = useSelector(({getAdminMasterOrderReducers}) => {
    return {
      isLoading: getAdminMasterOrderReducers.isLoading,
      data: getAdminMasterOrderReducers.data,
    };
  });
  if (isLoading) {
    return <HomePlaceHolder />;
  }
  return (
    <Flex overrideStyle={styles.overAll}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListOverAll}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item}) => <OrderCard isCancel item={item}/>}
      />
    </Flex>
  );
};

export default OrderCancelListScreen;
