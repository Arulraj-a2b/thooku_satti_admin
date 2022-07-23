import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDrawerStatus} from '@react-navigation/drawer';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import Button from '../uikit/Button/Button';
import SvgLogout from '../icons/SvgLogout';
import {GRAY_6, WHITE} from '../uikit/UikitUtils/colors';
import SvgClose from '../icons/SvgClose';
import SvgWaiting from '../icons/SvgWaiting';
import {routesPath} from '../routes/routesPath';
import SvgOrderPickup from '../icons/SvgOrderPickup';
import SvgOrderSuccess from '../icons/SvgOrderSuccess';
import SvgOrderCancel from '../icons/SvgOrderCancel';
import SvgRestaurant from '../icons/SvgRestaurant';

const styles = StyleSheet.create({
  listStyle: {
    paddingVertical: 8,
  },
  svgLogout: {
    backgroundColor: WHITE,
    borderRadius: 100,
    padding: 4,
    marginRight: 4,
  },
  btnStyle: {
    width: 130,
  },
  imageStyle: {
    borderRadius: 100,
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  overAll: {
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 30,
    paddingBottom: 40,
  },
  svgClose: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

const DrawerContent = props => {
  const [userDetails, setUserDetails] = useState();
  const isDrawerOpen = useDrawerStatus() === 'open';

  const logout = () => {
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    getUserData();
  }, [isDrawerOpen]);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const dataList = [
    {
      route: () => {
        props.navigation.navigate(routesPath.ORDER_WAITING_SCREEN);
      },
      title: 'Waiting List',
      icon: (
        <View style={{position: 'relative', right: 2}}>
          <SvgWaiting width={20} height={20} fill={GRAY_6} />
        </View>
      ),
    },
    {
      route: () => {
        props.navigation.navigate(routesPath.ORDER_PREPARATION_SCREEN);
      },
      title: 'PickUp List',
      icon: (
        <View style={{position: 'relative', right: 5}}>
          <SvgOrderPickup width={24} height={22} fill={GRAY_6} />
        </View>
      ),
    },
    {
      route: () => {
        props.navigation.navigate(routesPath.ORDER_PICKUP_SCREEN);
      },
      title: 'Delivered List',
      icon: (
        <View style={{position: 'relative', right: 2}}>
          <SvgOrderSuccess width={18} height={18} fill={GRAY_6} />
        </View>
      ),
    },
    {
      route: () => {
        props.navigation.navigate(routesPath.ORDER_LIST_SCREEN);
      },
      title: 'Cancel List',
      icon: (
        <View style={{position: 'relative', right: 2}}>
          <SvgOrderCancel width={18} height={18} fill={GRAY_6} />
        </View>
      ),
    },
    {
      route: () => {
        props.navigation.navigate(routesPath.DINING_SCREEN);
      },
      title: 'Dining List',
      icon: (
        <View style={{position: 'relative', right: 2}}>
          <SvgRestaurant width={18} height={18} fill={GRAY_6} />
        </View>
      ),
    },
  ];

  return (
    <Flex flex={1} between overrideStyle={styles.overAll}>
      <Pressable
        onPress={() => props.navigation.closeDrawer()}
        style={styles.svgClose}>
        <SvgClose />
      </Pressable>
      <Flex overrideStyle={styles.imageContainer}>
        <Image
          source={require('../assests/image/profile.png')}
          style={styles.imageStyle}
        />
        <Text bold size={16}>
          {userDetails && userDetails.Name}
        </Text>
        <Text color="gray">{userDetails && userDetails.MobileNo}</Text>
      </Flex>
      <Flex flex={1}>
        {dataList.length !== 0 &&
          dataList.map((list, index) => {
            return (
              <View
                style={[styles.listStyle]}
                key={index.toString() + list.title}>
                <TouchableOpacity onPress={list.route}>
                  <Flex row center>
                    <View style={{width: 40}}>{list.icon}</View>
                    <Text size={16}>{list.title}</Text>
                  </Flex>
                </TouchableOpacity>
              </View>
            );
          })}
      </Flex>
      <Button round overrideStyle={styles.btnStyle} onClick={logout}>
        <Flex row center>
          <View style={styles.svgLogout}>
            <SvgLogout />
          </View>
          <Text size={16} bold>
            Log Out
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default DrawerContent;
