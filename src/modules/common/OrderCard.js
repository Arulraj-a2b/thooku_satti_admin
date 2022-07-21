import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {routesPath} from '../../routes/routesPath';
import {ERROR, SUCCESS} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 1,
  },
  nameStyle: {
    width: 130,
  },
  valueStyle: {
    width: '60%',
  },
  leftBtn: {
    marginRight: 16,
  },
  linkStyle: {
    marginBottom: 16,
    marginTop: 8,
  },
  success: {
    backgroundColor: 'rgba(20, 159, 84, 0.25)',
    borderColor: SUCCESS,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  errorBtn: {
    backgroundColor: 'rgba(254, 34, 34, 0.25)',
    borderColor: ERROR,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
});

const ListText = ({name, value}) => {
  return (
    <Flex row overrideStyle={{marginBottom: 8}}>
      <Text bold overrideStyle={styles.nameStyle}>
        {name}
      </Text>
      <Text overrideStyle={styles.valueStyle}>{value}</Text>
    </Flex>
  );
};

const OrderCard = ({isWaiting, isSuccess, isPickUp, isCancel, item}) => {
  const navigation = useNavigation();
  const handleViewDetails = () => {
    navigation.navigate(routesPath.ORDER_DETAILS_SCREEN, {
      orderId: item?.OrderID,
    });
  };
  return (
    <Card overrideStyle={styles.overAll}>
      <ListText name="Customer Name" value={item?.CustomerName} />
      <ListText name="Customer Phone" value={item?.Mobileno} />
      <ListText name="Customer Address" value={item?.DeliveryAddress} />
      <ListText name="Live Status" value={item?.LiveStatus} />
      <TouchableOpacity onPress={handleViewDetails}>
        <Text
          bold
          color="link"
          align={'center'}
          overrideStyle={styles.linkStyle}>
          View Order Details
        </Text>
      </TouchableOpacity>

      {isWaiting && (
        <Flex row>
          <Button types={'secondary'} flex={1} overrideStyle={styles.leftBtn}>
            REJECT
          </Button>
          <Button flex={1}>ACCEPT</Button>
        </Flex>
      )}
      {isPickUp && (
        <Flex center>
          <Button width={150}>PICKUP</Button>
        </Flex>
      )}
      {isSuccess && (
        <Flex center>
          <Text
            transform={'uppercase'}
            size={12}
            overrideStyle={styles.success}
            bold
            color="success">
            {item?.LiveStatus}
          </Text>
        </Flex>
      )}
      {isCancel && (
        <Flex center>
          <Text
            transform={'uppercase'}
            size={12}
            overrideStyle={styles.errorBtn}
            bold
            color="error">
            {item?.LiveStatus}
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default OrderCard;
