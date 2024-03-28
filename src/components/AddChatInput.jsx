import React from 'react';

import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const plusIcon = require('../assets/icons/plus.png');

const AddChatInput = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.chatWrapper}>
        <TouchableOpacity>
          <Image source={plusIcon} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <TextInput
          placeholder="메시지 입력하기"
          placeholderTextColor={'#C1C1C1'}
          autoFocus
          style={styles.chatTextInput}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatWrapper: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 60,
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 20,
    color: '#000',
    flex: 1,
    height: 40,
    marginLeft: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
});

export default AddChatInput;
