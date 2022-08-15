import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {WHITE} from '../../uikit/UikitUtils/colors';
import Card from '../../uikit/Card/Card';
import ReportFilter from './ReportFilter';
import SvgClose from '../../icons/SvgClose';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 8,
    position:'relative'
  },
  svgClose: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex:11
  },
});

const ReportFilterModal = ({
  open,
  formik,
  showFromDate,
  showToDate,
  setStatus,
  isStatus,
  close,
}) => {
  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <TouchableOpacity style={styles.svgClose} onPress={close}>
          <SvgClose height={16} width={16} />
        </TouchableOpacity>
        <ScrollView>
          <ReportFilter
            formik={formik}
            showToDate={showToDate}
            showFromDate={showFromDate}
            setStatus={setStatus}
            isStatus={isStatus}
          />
        </ScrollView>
      </Card>
    </Modal>
  );
};

export default ReportFilterModal;
