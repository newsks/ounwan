import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';

const MyPage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <BasicHeader title="마이페이지" />
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flexDirection: 'row',
    position: 'relative',
  },
  productImg: {
    width: 110,
    height: 110,
    borderRadius: 4,
    marginRight: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  subText: {
    fontSize: 14,
    color: '#8C8C8C',
    marginVertical: 4,
  },
  price: {
    fontSize: 18,
    color: '#FF7E36',
    fontWeight: 'bold',
  },
  commentArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: 4,
  },
  writeButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#FF6D1D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});
