import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const back = require('../assets/icons/back.png');
const share = require('../assets/icons/share.png');
const scrab = require('../assets/icons/scrab.png');

const DetailHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchList')}>
          <Image source={share} style={{width: 28, height: 28}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={scrab} style={{width: 28, height: 28}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  sortButton: {
    width: 14,
    height: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
