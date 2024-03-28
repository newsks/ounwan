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
import LeftBubble from '../components/LeftBubble';
import RightBubble from '../components/RightBubble';
import AddChatInput from '../components/AddChatInput';

const Chat = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <BasicHeader title="채팅하기" />
      <View style={styles.mainContainer}>
        <View style={styles.chattingScreen}>
          <View style={styles.chatDayWrapper}>
            <Text style={styles.chatDay}>2024년 3월 28일</Text>
          </View>
          {/* 상대방 채팅창 */}
          <LeftBubble chatText={'오늘 오운완 한 사람'} />
          {/* 마이 채팅창 */}
          <RightBubble chatText={'저 오늘 아침에 열운했습니다🔥'} />
          {/* 상대방 채팅창 */}
          <LeftBubble chatText={'오 잘하셨어요'} />
        </View>
      </View>
      {/* 채팅인풋영역 */}
      <AddChatInput />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  mainContainer: {
    flex: 1,
  },
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
  backButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19.97,
    textAlign: 'center',
    color: '#000000',
  },
  chattingScreen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
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
