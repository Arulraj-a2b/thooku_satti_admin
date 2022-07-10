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
import {WHITE} from '../uikit/UikitUtils/colors';
import SvgClose from '../icons/SvgClose';

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
    // {
    //   route: () => {
    //     // props.navigation.navigate(routesPath.MY_ORDER_SCREEN);
    //   },
    //   title: 'My Orders',
    //   icon: (
    //     <View style={{position: 'relative', right: 3}}>
    //       {/* <SvgMyorder /> */}
    //     </View>
    //   ),
    // },
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
        {dataList.length !==0 && dataList.map((list, index) => {
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
