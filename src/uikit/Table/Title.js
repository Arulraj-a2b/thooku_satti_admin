import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../Flex/Flex';
import {BORDER_COLOR} from '../UikitUtils/colors';
import RowSelection from './RowSelection';
import TitleColumns from './TitleColumns';

const defaultTitleProps = {
  columns: [],
  dataSource: [],
};

const styles = StyleSheet.create({
  hrline: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    position: 'relative',
  },
});

const Title = ({
  columns,
  rowSelection,
  dataSource,
  titleBold,
  titleColor,
  titleSize,
  disableMultiSelect,
}) => (
  <Flex testID="titleOverAll" center row middle overrideStyle={styles.hrline}>
    <RowSelection
      rowSelection={rowSelection}
      disableMultiSelect={disableMultiSelect}
      item={dataSource}
    />
    <TitleColumns
      columns={columns}
      titleBold={titleBold}
      titleColor={titleColor}
      titleSize={titleSize}
    />
  </Flex>
);

Title.defaultProps = defaultTitleProps;

export default memo(Title);
