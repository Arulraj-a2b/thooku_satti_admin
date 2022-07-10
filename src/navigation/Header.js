import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import SvgBack from '../icons/SvgBack';
import SvgHamburger from '../icons/SvgHamburger';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
import {isEmpty} from '../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  boxStyle: {
    backgroundColor: WHITE,
    marginRight: 16,
    padding: 6,
    borderRadius: 8,
  },
  hamburgerStyle: {
    padding: 12,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  locationStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Header = ({props, isBack, backPath}) => {
  const handleOpenDrawer = () => {
    props.navigation.openDrawer();
  };

  const handleGoBack = () => {
    if (isEmpty(backPath)) {
      props.navigation.goBack();
    } else {
      props.navigation.navigate(backPath);
    }
  };

  return (
    <Flex between row center overrideStyle={styles.overAll}>
      <Flex row center>
        {!isBack && (
          <Pressable style={styles.boxStyle} onPress={handleGoBack}>
            <SvgBack />
          </Pressable>
        )}
        <Text color="white" bold size={20}>
          {props.options.title}
        </Text>
      </Flex>
      <Pressable style={styles.hamburgerStyle} onPress={handleOpenDrawer}>
        <SvgHamburger fill={WHITE} width={14} height={8} />
      </Pressable>
    </Flex>
  );
};

export default Header;
