import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
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
import HomePlaceHolder from '../common/HomePlaceHolder';
import {ListText} from '../diningmodule/DiningCard';
import RejectModal from '../diningmodule/RejectModal';
import {
  getMarketOrdersMiddleWare,
  saveMarketOrderMiddleWare,
} from './store/marketOrderScreenMiddleware';

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
});

const MarketOrderViewScreen = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const [isLoader, setLoader] = useState(true);
  const [isReject, setReject] = useState(false);
  useEffect(() => {
    dispatch(getMarketOrdersMiddleWare({Orderno: params?.orderId}))
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
    dispatch(
      saveMarketOrderMiddleWare({Orderno: params?.orderId, Type: '1'}),
    ).then(() => {
      setLoader(true);
      dispatch(getMarketOrdersMiddleWare({Orderno: params?.orderId}))
        .then(() => {
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    });
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
        Orderno: params?.orderId,
        Type: '2',
        RejectedReason: formik.values.reason,
      }),
    ).then(() => {
      setReject(false);
      setLoader(true);
      dispatch(getMarketOrdersMiddleWare({Orderno: params?.orderId}))
        .then(() => {
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    });
  };

  if (isLoader) {
    return <HomePlaceHolder />;
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
      <ScrollView>
        <Flex overrideStyle={styles.overAll}>
          <ListText name="Customer Name" value={data?.Name} />
          <ListText name="Mobile Number" value={data?.Mobileno} />
          <ListText name="Whatsapp Number" value={data?.Whatsappno} />
          <ListText name="Delivery Address" value={data?.DeliveryAddress} />
          <ListText name="Order Date" value={data?.OrderedDate} />
          <ListText name="Status" value={data?.Status} />
          <LabelWrapper label={'Order List'}>
            <Image style={styles.imageView} source={{uri: data?.Imagepath}} />
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
    </>
  );
};

export default MarketOrderViewScreen;
