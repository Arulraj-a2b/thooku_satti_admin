import React, {useState, useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {BORDER_COLOR} from '../UikitUtils/colors';
import Title from './Title';
import Rows from './Rows';

const {height} = Dimensions.get('window');

const defaultProps = {
  columns: [],
  dataSource: [],
  scrollHeight: 110,
  titleSize: 12,
  titleColor: 'theme',
  titleBold: true,
  minWidth: '100%',
  isFlatlist: true,
  disableMultiSelect: false,
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
  },
  padding: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  zeroPadding: {
    paddingHorizontal: 0,
  },
});

const Table = ({
  dataSource,
  columns,
  rowSelection,
  scrollHeight,
  extraData,
  titleSize,
  titleColor,
  titleBold,
  minWidth,
  keyExtractor,
  isFlatlist,
  disableMultiSelect,
  zeroPadding,
}) => {
  const [style, setStyle] = useState([]);
  const [border, setBorder] = useState([styles.mainContainer]);
  useEffect(() => {
    const styleContainer = [styles.mainContainer, {minWidth}];

    if (zeroPadding) {
      styleContainer.push(styles.zeroPadding);
    } else {
      styleContainer.push(styles.padding);
    }

    setStyle(styleContainer);
    setBorder([...border, styles.mainContainer]);
  }, [minWidth, zeroPadding]);

  if (columns.length === 0) {
    return null;
  }

  const RenderRow = ({item, index}) => {
    return (
        <Rows
          rowSelection={rowSelection}
          item={item}
          columns={columns}
          rowIndex={index}
          totalRows={totalRows}
          disableMultiSelect={disableMultiSelect}
        />
    );
  };

  const totalRows = dataSource.length;
  return (
    <View style={StyleSheet.flatten(style)} testID="table">
      <Title
        titleBold={titleBold}
        titleColor={titleColor}
        titleSize={titleSize}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        disableMultiSelect={disableMultiSelect}
      />

      <View
        style={StyleSheet.flatten([
          {maxHeight: height - scrollHeight},
          border,
        ])}>
        <>
          {isFlatlist ? (
            <FlatList
              keyExtractor={keyExtractor}
              extraData={extraData}
              data={dataSource}
              renderItem={RenderRow}
            />
          ) : (
            <View>
              {dataSource.map((item, index) => RenderRow({item, index}))}
            </View>
          )}
        </>
      </View>
    </View>
  );
};

Table.defaultProps = defaultProps;

export default Table;
