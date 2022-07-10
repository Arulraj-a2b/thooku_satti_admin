import {StyleSheet} from 'react-native';
import {ERROR, SECONDARY,SUCCESS} from '../UikitUtils/colors';

export const buttonStyles = StyleSheet.create({
  smallHeight: {
    height: 30,
  },
  mediumHeight: {
    height: 40,
  },
  largeHeight: {
    height: 50,
  },
  common: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: SECONDARY,
    backgroundColor: 'rgba(255, 202, 41, 0.1)',
  },
  primaryBtn: {
    backgroundColor: SECONDARY,
  },
  disabled: {
    opacity: 0.5,
  },
  normal: {
    borderRadius: 4,
  },
  round: {
    borderRadius: 20,
  },
  successBtn: {
    backgroundColor: 'rgba(20, 159, 84, 0.25)',
    borderColor: SUCCESS,
  },
  errorBtn: {
    backgroundColor: 'rgba(254, 34, 34, 0.25)',
    borderColor: ERROR,
    borderWidth: 1,
  },
});
