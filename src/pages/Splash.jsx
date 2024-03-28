import React, {useEffect, useState} from 'react';
import {View, Text, Linking, Platform} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTab');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#FF7E36', fontSize: 20, fontWeight: 'bold'}}>
        오운완🔥
      </Text>
    </View>
  );
};

export default Splash;
