import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

const RightBubble = ({chatText}) => {
  return (
    <View>
      <View style={[styles.chatRowWrapper, {marginLeft: 'auto'}]}>
        <View style={styles.chatInfoWrapper}>
          <Text style={styles.chatTime}>읽음</Text>
          <View style={styles.microBar} />
          <Text style={styles.chatTime}>2023.03.28</Text>
        </View>

        <View style={styles.myBubbleWrapper}>
          <Text style={styles.myChatText}>{chatText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatDayWrapper: {
    marginTop: 16,
    marginBottom: 8,
  },
  youText: {
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
  myBubbleWrapper: {
    backgroundColor: '#4AABFF',
    padding: 8,
    borderRadius: 8,
    marginLeft: 4,
    maxWidth: 232,
  },
  myChatText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    lineHeight: 22.5,
  },
  microBar: {
    width: 1,
    height: 4,
    backgroundColor: '#D5D5D5',
  },
});

export default RightBubble;
