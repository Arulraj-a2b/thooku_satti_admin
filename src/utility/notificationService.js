import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export const handleNotification = message => {
  PushNotification.cancelAllLocalNotifications();
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
  console.log('new fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new fcmToken', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('fcmToken error:', error);
    }
  }
};

export const notificationListener = async navigation => {
  messaging().onNotificationOpenedApp(_remoteMessage => {
    // console.log('_remoteMessage', remoteMessage);
  });
  messaging().onMessage(async remoteMessage => {
    handleNotification(remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(res => {
      if (res) {
        if (res.data) {
          if (res.data?.route) {
            const routePath = res.data?.route;
            if (res && res.data && res.data?.booking_id) {
              navigation.navigate(routePath, {
                booking_id: res.data?.booking_id,
              });
            } else {
              navigation.navigate(routePath);
            }
          }
        }
      }
    });
};
