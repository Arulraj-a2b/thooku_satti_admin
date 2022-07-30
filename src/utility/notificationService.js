import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {navigationRef} from '../../App';
import {getAdminMasterOrderMiddleWare} from '../modules/orderwaitingmodule/store/orderWaitingMiddleware';
import {getDiningMiddleWare} from '../modules/diningmodule/store/diningMiddleWare';

export const handleNotification = message => {
  // PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title: message.notification.title,
    message: '',
    userInfo: {
      route: message.data.route,
      booking_id: message.data && message.data.booking_id,
    },
    bigText: message.notification.body,
  });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log('new fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log('new fcmToken', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('fcmToken error:', error);
    }
  }
};

export const notificationListener = async navigation => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage && remoteMessage.data) {
      navigation.navigate(remoteMessage.data?.route, {
        orderId: remoteMessage.data?.booking_id,
      });
    }
  });
  messaging().onMessage(async remoteMessage => {
    handleNotification(remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(res => {
      if (res && res.data) {
        navigation.navigate(res.data?.route, {
          orderId: res.data?.booking_id,
        });
      }
    });
};

export const localNotificationNavigate = (navigation, dispatch) => {
  PushNotification.configure({
    onNotification: function (notification) {
      if (notification && notification.userInteraction) {
        navigation.navigate(notification.data?.route, {
          orderId: notification.data?.booking_id,
        });
      } else if (
        navigationRef.current.getCurrentRoute().name === 'OrderWaitingScreen' &&
        notification &&
        notification.userInteraction === false
      ) {
        dispatch(getAdminMasterOrderMiddleWare({code: '1'}));
      } else if (
        navigationRef.current.getCurrentRoute().name === 'DiningScreen' &&
        notification &&
        notification.userInteraction === false
      ) {
        dispatch(getDiningMiddleWare());
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
