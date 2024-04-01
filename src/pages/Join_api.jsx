import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import LoginHeader from '../components/LoginHeader';

const showToast = message => {
  Toast.show({
    type: 'info',
    text1: message,
    position: 'top',
  });
};

const Join = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const scrollViewRef = useRef();

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const handleInputFocus = inputRef => {
    inputRef.current.measureLayout(
      scrollViewRef.current,
      (x, y, width, height) => {
        scrollViewRef.current.scrollTo({x: 0, y: y - 20, animated: true});
      },
      error => {
        console.log(error);
      },
    );
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source);
      }
    });
  };

  const handleSignUp = async () => {
    if (email === '' || password === '' || nickname === '') {
      showToast('모든 필드를 입력해주세요.');
      // Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      showToast('비밀번호가 일치하지 않습니다.');
      // Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    try {
      const response = await fetch('http://54.180.90.124:8080/accounts', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await response.json();

      if (response.ok) {
        showToast('회원가입이 완료되었습니다.');
        // Alert.alert('성공', '회원가입이 완료되었습니다.');
        // 회원가입 성공 후 처리 로직
      } else {
        Alert.alert('실패', json.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
      showToast('회원가입 중 문제가 발생했습니다.');
      // Alert.alert('회원가입 에러', '회원가입 중 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Toast />
        <ScrollView ref={scrollViewRef} style={{flex: 1}}>
          <LoginHeader title={'회원가입'} />
          <View style={styles.profileContainer}>
            {profileImage && (
              <Image
                source={{uri: profileImage.uri}}
                style={styles.profileImg}
              />
            )}
            <TouchableOpacity style={styles.profileBtn} onPress={pickImage}>
              <Text style={styles.profileBtnTxt}>프로필 사진 등록</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              ref={inputRef1}
              placeholder="이메일 입력"
              placeholderTextColor={'#C3C3C3'}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleInputFocus(inputRef1)}
            />
            <TextInput
              ref={inputRef2}
              placeholder="비밀번호 입력"
              placeholderTextColor={'#C3C3C3'}
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onFocus={() => handleInputFocus(inputRef2)}
            />
            <TextInput
              ref={inputRef3}
              placeholder="비밀번호 재입력"
              secureTextEntry={true}
              placeholderTextColor={'#C3C3C3'}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => handleInputFocus(inputRef3)}
            />
            <TextInput
              ref={inputRef4}
              placeholder="닉네임 입력"
              placeholderTextColor={'#C3C3C3'}
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              onFocus={() => handleInputFocus(inputRef4)}
            />
          </View>
          <View style={styles.joinContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.joinText}>로그인</Text>
            </TouchableOpacity>
            <View style={styles.findContainer}>
              <TouchableOpacity>
                <Text style={styles.findText}>아이디 찾기</Text>
              </TouchableOpacity>
              <View style={styles.sBar} />
              <TouchableOpacity>
                <Text style={styles.findText}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginTxt} onPress={handleSignUp}>
              회원가입
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Join;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loginContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    marginBottom: 10,
    color: '#000',
  },
  joinContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 34,
    paddingHorizontal: 24,
  },
  joinText: {
    color: '#3A3A3A',
    fontSize: 15,
    fontWeight: '400',
  },
  findContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  findText: {
    color: '#7B7B7B',
    fontSize: 15,
    fontWeight: '400',
  },
  sBar: {
    width: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
  },
  loginBtn: {
    backgroundColor: '#4AABFF',
    paddingVertical: 13,
    borderRadius: 4,
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTxt: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  profileBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#4AABFF',
    borderRadius: 4,
    marginTop: 10,
  },
  profileBtnTxt: {
    color: '#4AABFF',
    fontSize: 14,
  },
});
