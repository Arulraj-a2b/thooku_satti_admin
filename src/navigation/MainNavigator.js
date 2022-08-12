import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WHITE} from '../uikit/UikitUtils/colors';
import {routesPath} from '../routes/routesPath';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import SideNavigation from './SideNavigation';
import OrderDetailsScreen from '../modules/orderdetailsmodule/OrderDetailsScreen';
import Header from './Header';
import DiningViewDetailsScreen from '../modules/diningmodule/DiningViewDetailsScreen';
import MarketOrderViewScreen from '../modules/marketmodule/MarketOrderViewScreen';

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
      <Stack.Screen
        options={{
          header: props => (
            <Header
              backPath={routesPath.ALL_SCREEN}
              props={props}
              isMenu={false}
            />
          ),
        }}
        name={routesPath.ORDER_DETAILS_SCREEN}
        component={OrderDetailsScreen}
      />
      <Stack.Screen
        options={{
          header: props => (
            <Header
              backPath={routesPath.ALL_SCREEN}
              props={props}
              isMenu={false}
            />
          ),
        }}
        name={routesPath.DINING_VIEW_DEAILS_SCREEN}
        component={DiningViewDetailsScreen}
      />
      <Stack.Screen
        options={{
          header: props => (
            <Header
              backPath={routesPath.ALL_SCREEN}
              props={props}
              isMenu={false}
            />
          ),
        }}
        name={routesPath.MARKET_ORDER_VIEW_SCREEN}
        component={MarketOrderViewScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
