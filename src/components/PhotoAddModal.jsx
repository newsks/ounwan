import React, {useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const PhotoAddModal = ({visible, onRequestClose, onAddPhoto}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPhoto = () => {
    onAddPhoto({title, content});
    setTitle('');
    setContent('');
    onRequestClose(); // 모달 닫기
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* 타이틀 입력 */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="타이틀을 입력해주세요"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              width: '80%',
              marginBottom: 10,
              color: '#000',
            }}
          />
          {/* 내용 입력 */}
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력해주세요"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              width: '80%',
              marginBottom: 10,
              color: '#000',
            }}
          />
          {/* 완료 버튼 */}
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{color: 'white'}}>완료</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PhotoAddModal;
