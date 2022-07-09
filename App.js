/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {requestUserPermission} from './src/utility/notificationService';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return <Text>hii</Text>;
};

export default App;
