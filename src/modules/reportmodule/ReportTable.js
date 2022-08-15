import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import {
  BORDER_COLOR,
  PRIMARY,
  PRIMARY_TEXT,
} from '../../uikit/UikitUtils/colors';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
  },
  head: {
    height: 40,
  },
  text: {
    margin: 6,
    color: PRIMARY_TEXT,
    fontFamily: 'Poppins-Regular',
  },
  titleText: {
    color: PRIMARY,
    padding: 6,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  idText: {
    margin: 6,
  },
});

const ReportTable = ({data, handleViewDetails, reportType}) => {
  const tableHead =
    reportType === '1'
      ? [
          'Order ID',
          'Hotel Name',
          'Customer Name',
          'Status',
          'Ordered Date',
          'Mobile Number',
        ]
      : [
          'Order ID',
          'Customer Name',
          'Status',
          'Ordered Date',
          'Mobile Number',
        ];

  const orderIdArray = data.map(list => {
    return reportType === '1'
      ? [
          list.OrderID,
          list.HotelName,
          list.CustomerName,
          list.LiveStatus,
          list.OrderedDate,
          list.Mobileno,
        ]
      : [
          list.OrderID,
          list.CustomerName,
          list.LiveStatus,
          list.OrderedDate,
          list.Mobileno,
        ];
  });

  const element = (data, handleViewDetails) => (
    <TouchableOpacity onPress={() => handleViewDetails(data)}>
      <Text color="link" overrideStyle={styles.idText}>
        {data}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overAll}>
      <ScrollView horizontal>
        <Table borderStyle={styles.border} style={{width: 800}}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.titleText}
          />
          {orderIdArray.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 0
                      ? element(cellData, handleViewDetails)
                      : cellData
                  }
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
    </View>
  );
};

export default ReportTable;
