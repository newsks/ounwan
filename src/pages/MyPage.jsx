import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MyPageHeader from '../components/MyPageHeader';

const MyPage = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MyPageHeader />
      <View style={styles.profileWrap}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={myProfile} style={{width: 40, height: 40}} />
          <Text style={styles.profileText}>블루베리</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileBtnTxt}>프로필 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 게시글, 팔로우, 팔로우확인 */}
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoWarp}>
          <Text style={styles.infoTitle}>게시글</Text>
          <Text style={styles.infoText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoWarp}>
          <Text style={styles.infoTitle}>팔로우</Text>
          <Text style={styles.infoText}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoWarp}>
          <Text style={styles.infoTitle}>팔로워</Text>
          <Text style={styles.infoText}>12</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line10} />

      {/* 이벤트영역 */}
      <View style={styles.eventContainer}>
        <TouchableOpacity style={styles.eventArea}>
          <Image source={newIcon} style={styles.eventNewIcon} />
          <Image source={event} style={styles.eventIcon} />
          <Text style={{color: '#3A3A3A', fontSize: 11}}>이벤트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line10} />

      {/* 서비스소식영역 */}
      <View style={styles.serviceContainer}>
        <Text style={styles.mTitle}>서비스 소식</Text>
        <TouchableOpacity>
          <Text style={styles.mmTitle}>공지사항</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line1} />

      {/* 고객센터 */}
      <View style={styles.serviceContainer}>
        <Text style={styles.mTitle}>고객센터</Text>

        {/* 고객센터메뉴 */}
        <View>
          {menuData.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => navigation.navigate(e.page)}
              style={[
                styles.menuContainer,
                menuData.length - 1 === i && {
                  marginBottom: 0,
                },
              ]}>
              <View style={styles.centerArea}>
                <Text style={styles.mmTitle}>{e.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  profileBtn: {
    backgroundColor: '#eeeeee',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  profileBtnTxt: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  smallTxt: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoWarp: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  infoText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  line10: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  line1: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 24,
  },
  eventContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
    gap: 4,
  },
  eventArea: {
    flexDirection: 'column',
    width: 64,
    alignItems: 'center',
  },
  eventNewIcon: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 6,
    zIndex: 3,
  },
  eventIcon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  serviceContainer: {
    marginHorizontal: 24,
    paddingBottom: 20,
  },
  mTitle: {
    color: '#C3C3C3',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 20,
    marginBottom: 11,
  },
  mmTitle: {
    color: '#3A3A3A',
    fontSize: 16,
    fontWeight: '500',
  },
  visitArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 25,
  },
  menuTxt: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  centerArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const myProfile = require('../assets/icons/images/myProfile.png');
const event = require('../assets/icons/myPage/event.png');
const newIcon = require('../assets/icons/myPage/new.png');

const menuData = [
  {
    id: 1,
    title: '앱건의',
    page: '',
  },
  {
    id: 2,
    title: '1:1문의',
    page: '',
  },
  {
    id: 3,
    title: 'FAQ',
    page: '',
  },
  {
    id: 4,
    title: '이용약관',
    page: '',
  },
];
