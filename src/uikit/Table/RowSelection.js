import React, {memo, ReactNode, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconRow: {
    paddingRight: 43,
    paddingLeft: 16,
    width: 32,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const RowSelection = ({rowSelection, disableMultiSelect, item}) => {
  const [style, setStyle] = useState([]);

  useEffect(() => {
    handleContainerStyle();
  }, []);

  const handleContainerStyle = () => {
    const styleArray = [styles.iconRow];
    setStyle(styleArray);
  };
  return (
    <>
      {typeof rowSelection === 'function' && !disableMultiSelect && (
        <View style={style}>{rowSelection(item)}</View>
      )}
    </>
  );
};

export default memo(
  RowSelection,
  (prevProps, nextProps) => prevProps.rowSelection === nextProps.rowSelection,
);
