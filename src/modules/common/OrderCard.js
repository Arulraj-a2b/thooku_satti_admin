import React from 'react';
import {StyleSheet} from 'react-native';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';

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

const OrderCard = ({isWaiting, isPreparation, isPickUp, isList}) => {
  return (
    <Card overrideStyle={styles.overAll}>
      <ListText name="Customer Name" value="Arul" />
      <ListText name="Customer Phone" value="9944251010" />
      <ListText name="Customer Address" value="123, abcd. 636363" />
      <Text bold color="link" align={'center'} overrideStyle={styles.linkStyle}>
        View Order Details
      </Text>
      {isWaiting && (
        <Flex row>
          <Button types={'secondary'} flex={1} overrideStyle={styles.leftBtn}>
            REJECT
          </Button>
          <Button flex={1}>ACCEPT</Button>
        </Flex>
      )}
      {isPreparation && (
        <Flex center>
          <Button width={150}>PICKUP</Button>
        </Flex>
      )}
      {isPickUp && (
        <Flex center>
          <Button width={150}>DELIVERED</Button>
        </Flex>
      )}
      {isList && (
        <Flex center>
          <Button width={150} types={'error'}>
            SUCCESS
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default OrderCard;
