import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import OrderReport from '../modules/reportmodule/OrderReport';
import {routesPath} from '../routes/routesPath';
import {WHITE} from '../uikit/UikitUtils/colors';
import BottomTab from './BottomTab';
import DrawerContent from './DrawerContent';
import Header from './Header';

const Drawer = createDrawerNavigator();

const SideNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        sceneContainerStyle: {backgroundColor: WHITE},
      }}
      initialRouteName="BottomTab">
      <Drawer.Screen
        options={{
          header: props => <Header props={props} isBack isMenu />,
        }}
        name="BottomTab"
        component={BottomTab}
      />
      <Drawer.Screen
        options={{
          header: props => <Header props={props} isBack isMenu />,
        }}
        name={routesPath.ORDER_REPORT_SCREEN}
        component={OrderReport}
      />
    </Drawer.Navigator>
  );
};

export default SideNavigation;
