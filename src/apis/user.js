import {API} from '.';

export const signUp = async (email, password, nickname, phoneNumber) => {
  const res = await API.post('/accounts', {
    email,
    password,
    nickname,
    phoneNumber,
  });

  console.log('회원가입', res);
};
