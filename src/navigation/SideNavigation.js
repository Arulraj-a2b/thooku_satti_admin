import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import BottomTab from './BottomTab';
import DrawerContent from './DrawerContent';
import Header from './Header';

const Drawer = createDrawerNavigator();

const SideNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{drawerPosition: 'right'}}
      initialRouteName="BottomTab">
      <Drawer.Screen
        options={{
          header: props => <Header props={props} isBack isMenu />,
        }}
        name="BottomTab"
        component={BottomTab}
      />
    </Drawer.Navigator>
  );
};

export default SideNavigation;
