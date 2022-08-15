import React from 'react';
import { View } from 'react-native';
import Text from '../../uikit/Text/Text';

export const reportType = [
  {label: 'Normal Order', value: '1'},
  {label: 'Market Order', value: '2'},
];

export const orderStatus = [
  {label: 'Pending', value: '1'},
  {label: 'Confirmed', value: '2'},
  {label: 'Cancel', value: '3'},
];

export const TABLE_COLUMN_DATA = [
  {
    title: 'Order ID',
    dataIndex: 'OrderID',
    key: 'OrderID',
    flex: 1,
  },
  {
    title: 'Hotel Name',
    dataIndex: 'HotelName',
    key: 'HotelName',
    flex: 1,
  },
  {
    title: 'Customer Name',
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    flex: 1,
  },

  {
    title: 'Status',
    dataIndex: 'LiveStatus',
    key: 'LiveStatus',
    flex: 1,
  },
  {
    title: 'Ordered Date',
    dataIndex: 'OrderedDate',
    key: 'OrderedDate',
    flex: 1,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'Mobileno',
    key: 'Mobileno',
    flex: 1,
  },
];
