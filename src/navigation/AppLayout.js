import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  localNotificationNavigate,
  notificationListener,
} from '../utility/notificationService';
import MainNavigator from './MainNavigator';

const AppLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  localNotificationNavigate(navigation, dispatch);

  useEffect(() => {
    notificationListener(navigation);
  }, []);

  return <MainNavigator />;
};

export default AppLayout;
