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

const setting = require('../assets/icons/myPage/Settings.png');

const MyPageHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <View style={{flexDirection: 'row', gap: 16}}>
        <TouchableOpacity>
          <Image source={setting} style={{width: 28, height: 28}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyPageHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
