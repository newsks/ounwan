import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import LoginHeader from '../components/LoginHeader';

const showToast = message => {
  Toast.show({
    type: 'info',
    text1: message,
    position: 'top',
  });
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        console.log('로그인 성공:', json);
        setIsLoggedIn(true);
      } else {
        showToast('로그인 실패');
        // Alert.alert('로그인 실패', json.message);
      }
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
      showToast('로그인 중 문제가 발생했습니다.');
      // Alert.alert('로그인 에러', '로그인 중 문제가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!isLoggedIn ? (
        <>
          <LoginHeader title={'로그인'} />

          <View style={styles.loginContainer}>
            <TextInput
              placeholder="이메일 입력"
              placeholderTextColor={'#C3C3C3'}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="비밀번호 입력"
              placeholderTextColor={'#C3C3C3'}
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.joinContainer}>
            <TouchableOpacity>
              <Text style={styles.joinText}>회원가입</Text>
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
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginTxt}>로그인</Text>
          </TouchableOpacity>
          <Toast />
        </>
      ) : (
        <>
          <LoginHeader title={'로그아웃'} />
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
            <Text style={styles.loginTxt}>로그아웃</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loginContainer: {
    marginTop: 150,
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
});
