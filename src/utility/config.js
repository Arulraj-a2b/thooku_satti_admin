import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect} from 'react';
import {routesPath} from '../routes/routesPath';

// export const BASE_URL = 'https://foodapp.appsure.co.in/api/Mobapi/'; // staging
export const BASE_URL =
  'https://mobileorder.dindigulthookusatti.com/api/Mobapi/'; // production

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');

      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          // console.log('userData', userData.SessionID);
          axios.defaults.headers.common['token'] = userData.SessionID;
          navigation.navigate(routesPath.ALL_SCREEN);
          setLoader(false);
        } else {
          navigation.navigate(routesPath.LOGIN_SCREEN);
          setLoader(false);
        }
      } else {
        navigation.navigate(routesPath.LOGIN_SCREEN);
        setLoader(false);
      }
    } catch (error) {
      navigation.navigate(routesPath.LOGIN_SCREEN);
      setLoader(false);
    }
  };
  useEffect(() => {
    authUser();
  }, []);
};
