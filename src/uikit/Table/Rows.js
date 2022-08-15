import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {BORDER_COLOR} from '../UikitUtils/colors';
import RowColumns from './RowColumns';
import RowSelection from './RowSelection';

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  empty: {},
});

const Rows = ({
  item,
  columns,
  rowSelection,
  rowIndex,
  totalRows,
  disableMultiSelect,
}) => {
  const [styleColor, setStyleColor] = useState([]);
  const [style, setStyle] = useState([]);
  const [borderStyle, setborderStylee] = useState([]);
  const border = rowIndex + 1 !== totalRows;

  useEffect(() => {
    handleContainerStyle();
  }, []);

  const handleContainerStyle = () => {
    const styleColorArray = [];
    const styleArray = [];
    const borderStyleArray = [];
    if (border) {
      borderStyleArray.push(styles.separator);
    } else {
      borderStyleArray.push(styles.empty);
    }

    styleArray.push(styles.rowContainer);
    styleArray.push({zIndex: totalRows - rowIndex});
    setStyle(styleArray);
    setStyleColor(styleColorArray);
    setborderStylee(borderStyleArray);
  };

  const flattenStyles = StyleSheet.flatten([...styleColor, style, borderStyle]);
  return (
    <View style={flattenStyles}>
      <RowSelection
        rowSelection={rowSelection}
        item={item}
        disableMultiSelect={disableMultiSelect}
      />
      <RowColumns columns={columns} item={item} rowIndex={rowIndex} />
    </View>
  );
};

export default memo(Rows);
