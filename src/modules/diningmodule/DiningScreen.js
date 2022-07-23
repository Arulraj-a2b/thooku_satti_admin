import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import HomePlaceHolder from '../common/HomePlaceHolder';
import DiningCard from './DiningCard';
import {getDiningMiddleWare} from './store/diningMiddleWare';

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

  if (isLoader) {
    return <HomePlaceHolder />;
  }
  return (
    <Flex overrideStyle={styles.overAll}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListOverAll}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={{marginBottom: index === data.length - 1 ? 40 : 8}}>
            <DiningCard item={item} />
          </View>
        )}
      />
    </Flex>
  );
};

export default DiningScreen;
