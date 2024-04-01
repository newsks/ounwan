import React, {useState} from 'react';

import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';

const imageUpload = require('../assets/icons/emotion/image_upload.png');

const AddCommentInput = ({onCommentAdded}) => {
  const [commentText, setCommentText] = useState('');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.comWrapper}>
        <TouchableOpacity>
          <Image
            source={imageUpload}
            style={{width: 30, height: 30, marginTop: 5}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="댓글을 입력하세요"
          placeholderTextColor={'#C1C1C1'}
          style={styles.comTextInput}
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity
          onPress={() => {
            onCommentAdded(commentText);
            setCommentText('');
          }}>
          <Text style={styles.comTxt}>등록</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  comWrapper: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  comTextInput: {
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
  comTxt: {
    color: '#C3C3C3',
    fontSize: 15,
    marginLeft: 10,
    marginRight: 7,
    marginVertical: 7,
  },
});

export default AddCommentInput;
