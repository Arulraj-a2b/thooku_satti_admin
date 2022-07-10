import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesPath} from '../routes/routesPath';
import OrderWaitingScreen from '../modules/homemodule/OrderWaitingScreen';
import SvgWaiting from '../icons/SvgWaiting';
import TabBarIcon from './TabBarIcon';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import OrderPreparationScreen from '../modules/orderpreparationmodule/OrderPreparationScreen';
import SvgOrderPreparation from '../icons/SvgOrderPreparation';
import OrderPickupScreen from '../modules/orderpickupmodule/OrderPickupScreen';
import SvgOrderPickup from '../icons/SvgOrderPickup';
import OrderListScreen from '../modules/orderlistmodule/OrderListScreen';
import SvgOrderList from '../icons/SvgOrderList';

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
        component={OrderPreparationScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgOrderPreparation fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.ORDER_PICKUP_SCREEN}
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
        name={routesPath.ORDER_LIST_SCREEN}
        component={OrderListScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={<SvgOrderList fill={focused ? PRIMARY : GRAY_4} />}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
