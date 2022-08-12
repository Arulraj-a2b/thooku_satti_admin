import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';
import HomePlaceHolder from '../common/HomePlaceHolder';
import OrderCard from '../common/OrderCard';
import { height } from '../orderwaitingmodule/OrderWaitingScreen';
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
            <OrderCard isCancel item={item} />
          </View>
        )}
      />
    </Flex>
  );
};

export default OrderCancelListScreen;
