import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useCallback, useRef } from 'react';
import {isEmpty} from './validators';

export const isValidDate = date => {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) === false;
};

/**
 * Return the requested date format
 * @param value Date string or object
 * @param format returns the specified date format
 * @param isUnix converts to unix and returns unix formatted date
 * @param convertToLocal converts and returns to local timezone
 */
export const getDateString = (value, format, isUnix, convertToLocal) => {
  if (
    (typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'object') &&
    !Array.isArray(value) &&
    !isEmpty(format)
  ) {
    if (isUnix) {
      return moment.unix(Number(value)).format(format);
    } else {
      if (convertToLocal) return moment.parseZone(value).local().format(format);
      return moment.parseZone(value).format(format);
    }
  }
  return '';
};

export const isFinancial = x => {
  return Number.parseFloat(x).toFixed(2);
};

export const get = (obj, path) =>
  path.split('.').reduce((p, c) => (p && p[c]) || null, obj);

export const scrollTop = () => {
  const myRef = useRef();
  const onFabPress = () => {
    if (myRef && myRef.current) {
      myRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => onFabPress(), 0);
    }, []),
  );
  return {scrollRef: myRef};
};
