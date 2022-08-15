import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import Text from '../../uikit/Text/Text';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {ListText} from '../diningmodule/DiningCard';
import RejectModal from '../diningmodule/RejectModal';
import SvgClose from '../../icons/SvgClose';
import {
  getMarketOrdersMiddleWare,
  saveMarketOrderMiddleWare,
} from '../marketmodule/store/marketOrderScreenMiddleware';
import Card from '../../uikit/Card/Card';
import Loader from '../../uikit/Loader/Loader';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  imageView: {
    width: '100%',
    height: height - 340,
    borderRadius: 10,
  },
  leftBtn: {
    marginRight: 16,
  },
  svgClose: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 99,
  },
});

const MarketOrderDetailsModal = ({orderId, open, close}) => {
  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState(true);
  const [isReject, setReject] = useState(false);

  useEffect(() => {
    dispatch(getMarketOrdersMiddleWare({Orderno: orderId}))
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, []);

  const {data} = useSelector(({getMarketOrderReducers}) => {
    return {
      data: getMarketOrderReducers.data,
    };
  });

  const handleAccepet = () => {
    dispatch(saveMarketOrderMiddleWare({Orderno: orderId, Type: '1'})).then(
      () => {
        setLoader(true);
        dispatch(getMarketOrdersMiddleWare({Orderno: orderId}))
          .then(() => {
            setLoader(false);
          })
          .catch(() => {
            setLoader(false);
          });
      },
    );
  };

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.reason)) {
      errors.reason = 'Please fill the reason';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {reason: ''},
    validate: handleValidate,
    onSubmit: () => handleReject(),
  });

  const handleReject = () => {
    Keyboard.dismiss();
    dispatch(
      saveMarketOrderMiddleWare({
        Orderno: orderId,
        Type: '2',
        RejectedReason: formik.values.reason,
      }),
    ).then(() => {
      setReject(false);
      setLoader(true);
      dispatch(getMarketOrdersMiddleWare({Orderno: orderId}))
        .then(() => {
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    });
  };
  if(isLoader){
    return <Loader/>
  }
  return (
    <>
      <RejectModal
        open={isReject}
        formik={formik}
        close={() => {
          setReject(false);
          formik.resetForm();
        }}
      />
      <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
        <Card overrideStyle={{position: 'relative'}}>
          <TouchableOpacity style={styles.svgClose} onPress={close}>
            <SvgClose />
          </TouchableOpacity>
          <ScrollView>
            <Flex overrideStyle={styles.overAll}>
              <ListText name="Customer Name" value={data?.Name} />
              <ListText name="Mobile Number" value={data?.Mobileno} />
              <ListText name="Whatsapp Number" value={data?.Whatsappno} />
              <ListText name="Delivery Address" value={data?.DeliveryAddress} />
              <ListText name="Order Date" value={data?.OrderedDate} />
              <ListText name="Status" value={data?.Status} />
              <ListText name="Notes" value={data?.Status} />
              <LabelWrapper label={'Order List'}>
                <Image
                  style={styles.imageView}
                  source={{uri: data?.Imagepath}}
                />
                <Flex center overrideStyle={{marginTop: 20}}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(data?.Imagepath)}>
                    <Text color="link" bold>
                      Download list
                    </Text>
                  </TouchableOpacity>
                </Flex>
              </LabelWrapper>
              {data?.Status.toLowerCase() === 'pending' && (
                <Flex row overrideStyle={{marginTop: 30}}>
                  <Button
                    onClick={() => setReject(true)}
                    types={'secondary'}
                    flex={1}
                    overrideStyle={styles.leftBtn}>
                    REJECT
                  </Button>
                  <Button onClick={handleAccepet} flex={1}>
                    ACCEPT
                  </Button>
                </Flex>
              )}
            </Flex>
          </ScrollView>
        </Card>
      </Modal>
    </>
  );
};

export default MarketOrderDetailsModal;
