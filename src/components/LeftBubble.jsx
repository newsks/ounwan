import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';

const profileImg = require('../assets/icons/images/myProfile.png');

const LeftBubble = ({chatText}) => {
  return (
    <View style={styles.chatRowWrapper}>
      <Image source={profileImg} style={{width: 40, height: 40}} />

      <View style={{marginLeft: 8}}>
        <Text style={styles.userName}>신수경</Text>
        <View style={styles.bubbleContainer}>
          <View style={styles.bubbleWrapper}>
            <Text style={styles.chatContent}>{chatText}</Text>
          </View>
          <View style={styles.chatTimeWrapper}>
            <Text style={styles.chatTime}>2024.03.28</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    lineHeight: 16.22,
  },
  chatContent: {
    color: '#414141',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22.5,
  },
  chatDay: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17.47,
    color: '#828282',
    textAlign: 'center',
  },
  chatRowWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 8,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bubbleWrapper: {
    backgroundColor: 'white',
    color: '#414141',
    padding: 8,
    borderRadius: 8,
    maxWidth: 224,
  },
  chatTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 4,
  },
  chatInfoWrapper: {
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  chatTime: {
    fontSize: 12,
    color: '#737373',
  },
});

export default LeftBubble;
