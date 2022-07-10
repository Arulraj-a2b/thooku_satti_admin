import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WHITE} from '../uikit/UikitUtils/colors';
import {routesPath} from '../routes/routesPath';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import SideNavigation from './SideNavigation';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesPath.LOGIN_SCREEN}
      screenOptions={{
        headerMode: 'screen',
        contentStyle: {
          backgroundColor: WHITE,
        },
      }}>
      <Stack.Screen
        name={routesPath.LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={routesPath.ALL_SCREEN}
        component={SideNavigation}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
