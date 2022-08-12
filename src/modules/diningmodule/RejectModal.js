import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import {WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cancelBtn: {
    marginRight: 16,
  },
  btnContainer: {
    marginTop: 24,
  },
  placeText: {
    marginTop: 8,
  },
  inputText: {
    textAlignVertical: 'top',
  },
});

const RejectModal = ({open, close, formik}) => {
  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <Flex>
          <InputText
            overrideStyle={styles.inputText}
            height={90}
            maxLength={1000}
            numberOfLines={3}
            types="normal"
            label={'Reject Reason'}
            required
            value={formik.values.reason}
            onChange={formik.handleChange('reason')}
          />
          <ErrorMessage
            name="reason"
            errors={formik.errors}
            touched={formik.touched}
          />
          <Flex row center middle overrideStyle={{marginTop: 20}}>
            <Button
              types={'secondary'}
              onClick={close}
              overrideStyle={{marginRight: 8}}>
              Close
            </Button>
            <Button
              onClick={formik.handleSubmit}
              overrideStyle={{marginLeft: 8}}>
              Reject
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Modal>
  );
};

export default RejectModal;
