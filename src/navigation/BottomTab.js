import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesPath} from '../routes/routesPath';
import SvgWaiting from '../icons/SvgWaiting';
import TabBarIcon from './TabBarIcon';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import SvgOrderPickup from '../icons/SvgOrderPickup';
import SvgOrderSuccess from '../icons/SvgOrderSuccess';
import SvgOrderCancel from '../icons/SvgOrderCancel';
import OrderWaitingScreen from '../modules/orderwaitingmodule/OrderWaitingScreen';
import OrderPickupScreen from '../modules/orderpickupmodule/OrderPickupScreen';
import OrderSuccessScreen from '../modules/ordersuccessmodule/OrderSuccessScreen';
import OrderCancelListScreen from '../modules/ordercancellistmodule/OrderCancelListScreen';
import DiningScreen from '../modules/diningmodule/DiningScreen';
import SvgRestaurant from '../icons/SvgRestaurant';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routesPath.ORDER_WAITING_SCREEN}
        component={OrderWaitingScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgWaiting fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.ORDER_PREPARATION_SCREEN}
        component={OrderPickupScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgOrderPickup fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.ORDER_PICKUP_SCREEN}
        component={OrderSuccessScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgOrderSuccess fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.ORDER_LIST_SCREEN}
        component={OrderCancelListScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgOrderCancel fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.DINING_SCREEN}
        component={DiningScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgRestaurant fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
