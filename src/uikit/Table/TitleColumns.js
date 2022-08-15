import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

const styles = StyleSheet.create({
  column: {
    marginBottom: 16,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
});

const TitleColumns = ({columns, titleBold, titleColor, titleSize}) => {
  const styleArray = [{}];
  return (
    <>
      {columns.map(column => {
        const {renderFilter, renderTitle, ...columnRestData} = column;
        const flex = columnRestData.flex || 1;
        const rightAlignStyle = columnRestData.right ? styles.fullWidth : {};
        const centerAlignStyle = columnRestData.center ? styles.fullWidth : {};
        styleArray.push(styles.column, rightAlignStyle, centerAlignStyle);
        return (
          <Flex row center start flex={flex} key={column.dataIndex}>
            {renderTitle ? (
              renderTitle(column.title)
            ) : (
              <Text
                testID="textTitle"
                transform="capitalize"
                center={columnRestData.center}
                right={columnRestData.right}
                size={titleSize}
                color={titleColor}
                bold={titleBold}
                ellipsizeMode="tail"
                numberOfLines={1}
                overrideStyle={StyleSheet.flatten([styleArray])}>
                {column.title}
              </Text>
            )}
            {typeof renderFilter === 'function' && renderFilter(columnRestData)}
          </Flex>
        );
      })}
    </>
  );
};

export default memo(
  TitleColumns,
  (prevProps, nextProps) => prevProps.columns === nextProps.columns,
);
