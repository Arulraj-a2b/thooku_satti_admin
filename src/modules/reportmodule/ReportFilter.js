import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Button from '../../uikit/Button/Button';
import DropDown from '../../uikit/DropDown/DropDown';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR} from '../../uikit/UikitUtils/colors';
import {getDateString} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {orderStatus} from './mock';

const styles = StyleSheet.create({
  dateStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  overAll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  margin16: {
    marginBottom: 16,
  },
  btnStyle: {
    marginTop: 30,
  },
});
const ReportFilter = ({
  formik,
  showFromDate,
  showToDate,
  setStatus,
  isStatus,
  isHotelName,
  setHotelName,
  hotelList,
  reportType,
}) => {
  return (
    <Flex overrideStyle={styles.overAll}>
      <View style={[styles.margin16, {zIndex: 10}]}>
        <DropDown
          label={'Order Status'}
          required
          value={isStatus}
          setValue={setStatus}
          data={orderStatus}
          searchable={false}
          listMode="FLATLIST"
        />
      </View>
      <View style={styles.margin16}>
        <LabelWrapper label={'From Date'} required>
          <TouchableOpacity onPress={showFromDate} style={styles.dateStyle}>
            {isEmpty(formik.values.fromDate) ? (
              <Text color="gray">Please select your date</Text>
            ) : (
              <Text>{getDateString(formik.values.fromDate, 'DD-MM-YYYY')}</Text>
            )}
          </TouchableOpacity>
        </LabelWrapper>
      </View>
      <View style={styles.margin16}>
        <LabelWrapper label={'To Date'} required>
          <TouchableOpacity onPress={showToDate} style={styles.dateStyle}>
            {isEmpty(formik.values.toDate) ? (
              <Text color="gray">Please select your date</Text>
            ) : (
              <Text>{getDateString(formik.values.toDate, 'DD-MM-YYYY')}</Text>
            )}
          </TouchableOpacity>
        </LabelWrapper>
      </View>
      <View style={styles.margin16}>
        <InputText
          height={50}
          placeholder='Enter Order ID'
          label={'Order ID'}
          types="normal"
          value={formik.values.orderID}
          onChange={formik.handleChange('orderID')}
        />
      </View>
      {reportType === '1' && (
        <View style={[styles.margin16, {zIndex: 10}]}>
          <DropDown
            labelKey="HotelName"
            valueKey="HotelID"
            label={'Hotel Name'}
            value={isHotelName}
            setValue={setHotelName}
            data={hotelList}
            listMode="MODAL"
            placeholder={'Select Hotel Name'}
            searchPlaceholder={"Type Hotel Name..."}
          />
        </View>
      )}
      <Button onClick={formik.handleSubmit} overrideStyle={styles.btnStyle}>
        Generate Report
      </Button>
    </Flex>
  );
};

export default ReportFilter;
