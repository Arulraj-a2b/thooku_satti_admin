import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {isEmpty} from '../UikitUtils/validators';
import {get} from '../UikitUtils/helpers';
import RowText from './RowText';

const styles = StyleSheet.create({
  dataText: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    paddingBottom: 16,
    paddingTop: 16,
  },
});

const RowColumns = ({columns, item, rowIndex}) => {
  const [rowRenderStyle, setRowRenderStyle] = useState([]);
  const [rowStyle, setRowStyle] = useState([]);

  useEffect(() => {
    handleContainerStyle();
  }, []);

  const handleContainerStyle = () => {
    const rowRenderStyleArray = [styles.dataText];
    const rowStyleArray = [styles.row];
    setRowRenderStyle(rowRenderStyleArray);
    setRowStyle(rowStyleArray);
  };

  return (
    <>
      {columns.map((column, columnIndex) => {
        const {dataIndex, flex, render, right, center} = column;
        const columnFlex = flex || 1;
        const columnData =
          !isEmpty(dataIndex) && get(item, dataIndex)
            ? get(item, dataIndex)
            : '';
        return (
          <View
            key={`${columnData}_${dataIndex}`}
            style={StyleSheet.flatten([rowStyle, {flex: columnFlex}])}>
            {typeof render === 'function' ? (
              <View style={StyleSheet.flatten(rowRenderStyle)}>
                {render(columnData, item, rowIndex, columnIndex)}
              </View>
            ) : (
              <RowText
                right={right}
                center={center}
                columnData={columnData}
                numberOfLines={column.numberOfLines}
              />
            )}
          </View>
        );
      })}
    </>
  );
};

export default memo(RowColumns);
