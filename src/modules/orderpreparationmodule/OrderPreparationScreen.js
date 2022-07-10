import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';
import OrderCard from '../common/OrderCard';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  overAll: {
    backgroundColor: WHITE,
  },
});

const OrderPreparationScreen = () => {
  const data = [
    {name: 'aa'},
    {name: 'aa'},
    {name: 'aa'},
    {name: 'aa'},
    {name: 'aa'},
  ];
  return (
    <Flex overrideStyle={styles.overAll}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListOverAll}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item}) => <OrderCard isPreparation/>}
      />
    </Flex>
  );
};

export default OrderPreparationScreen;
