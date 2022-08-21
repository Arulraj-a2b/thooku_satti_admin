import React from 'react';
import {StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 1,
  },
  nameStyle: {
    width: 140,
  },
  valueStyle: {
    width: '60%',
  },
  leftBtn: {
    marginRight: 16,
  },
  linkStyle: {
    marginTop: 8,
  },
});

export const ListText = ({name, value}) => {
  return (
    <Flex row overrideStyle={{marginBottom: 8}}>
      <Text bold overrideStyle={styles.nameStyle}>
        {name}
      </Text>
      <Text overrideStyle={styles.valueStyle}>{value}</Text>
    </Flex>
  );
};

const DiningCard = ({item, handleAccept, handleRejectModal}) => {
  const checkStatus =
    item.BookingStatus.toLowerCase() === 'pending' ? true : false;
  return (
    <Card overrideStyle={styles.overAll}>
      <ListText name="Customer Name" value={item?.Name} />
      <ListText name="Customer Phone" value={item?.Contactno} />
      {!isEmpty(item.Hotelname) && (
        <ListText name="Hotel Name" value={item?.Hotelname} />
      )}
      <ListText name="Booking Date" value={item?.BookingDate} />
      <ListText name="Booking ID" value={item?.BookingID} />
      {!isEmpty(item.NoofAdult) && item.NoofAdult !== 0 && (
        <ListText name="Number of Adult" value={item?.NoofAdult} />
      )}
      {!isEmpty(item.NoofChild) && item.NoofChild !== 0 && (
        <ListText name="Number of Child" value={item?.NoofChild} />
      )}
      {!isEmpty(item.BookingStatus) && (
        <ListText name="Booking Status" value={item?.BookingStatus} />
      )}
      <ListText name="Booking Time" value={item?.BookingTime} />
      {!isEmpty(item?.GooglepayNo) && (
        <ListText name="GooglePay Number" value={item?.GooglepayNo} />
      )}
      {!isEmpty(item?.PhoePayNo) && (
        <ListText name="Phonepe Number" value={item?.PhoePayNo} />
      )}
      {!isEmpty(item?.Notes) && <ListText name="Notes" value={item?.Notes} />}
      {!isEmpty(item.BilluploadStatus) && (
        <ListText name="Bill Status" value={item?.BilluploadStatus} />
      )}
      {!isEmpty(item?.BillRefno) && (
        <ListText name="Bill Number" value={item?.BillRefno} />
      )}
      {!isEmpty(item.Billamount) && item.Billamount !== 0 && (
        <ListText
          name="Total Bill"
          value={INDIAN_RUPEE + isFinancial(item?.Billamount)}
        />
      )}

      {!isEmpty(item.BillImagePath) && (
        <Flex row overrideStyle={{marginBottom: 16}}>
          <Text bold overrideStyle={styles.nameStyle}>
            Download Bill
          </Text>
          <TouchableOpacity
            style={{width: '57%'}}
            onPress={() => Linking.openURL(item.BillImagePath)}>
            <Text color="link" ellipsizeMode={'tail'} numberOfLines={1}>
              {item.BillImagePath}
            </Text>
          </TouchableOpacity>
        </Flex>
      )}
      {checkStatus && (
        <Flex row middle overrideStyle={{marginTop: 16}}>
          <Button
            onClick={() => handleRejectModal(item.BookingID)}
            types={'secondary'}
            overrideStyle={{marginRight: 8}}>
            Reject
          </Button>
          <Button
            overrideStyle={{marginLeft: 8}}
            onClick={() => handleAccept(item.BookingID)}>
            Accept
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default DiningCard;
