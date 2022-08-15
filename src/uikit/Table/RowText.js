import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Text from '../Text/Text';

const styles = StyleSheet.create({
  dataTexts: {
    paddingHorizontal: 16,
  },
});

const RowText = ({right, center, numberOfLines, columnData}) => {
  if (!columnData) {
    return <></>;
  }
  return (
    <Text
      center={center}
      right={right}
      ellipsizeMode="tail"
      size={14}
      numberOfLines={numberOfLines}
      overrideStyle={styles.dataTexts}>
      {columnData}
    </Text>
  );
};

export default memo(RowText);
