import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BasicHeader from '../components/BasicHeader';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

async function savePicture(tag, type = 'photo', album = null) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  // 올바른 사용 예시로 수정
  CameraRoll.save(tag, {type: type, album: album});
}

const {width} = Dimensions.get('window');

const Add = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    requestGalleryPermission();
    loadSelectedPhotos(); // 앱 시작 시 저장된 이미지 불러오기
  }, []);

  // useFocusEffect를 사용하여 탭이 포커스될 때마다 실행될 로직을 정의합니다.
  useFocusEffect(
    useCallback(() => {
      // 이곳에 이미지 선택기를 열기 위한 함수 호출을 추가합니다.
      requestGalleryPermission();
    }, []),
  );

  const loadSelectedPhotos = async () => {
    try {
      const savedPhotoUris = await AsyncStorage.getItem('selectedPhotoUris');
      const parsedUris = JSON.parse(savedPhotoUris);
      if (parsedUris !== null) {
        setSelectedPhotos(parsedUris.map(uri => ({uri})));
      }
    } catch (error) {
      console.log('이미지들을 불러오는데 실패했습니다.', error);
    }
  };

  const saveSelectedPhotoUris = async uris => {
    try {
      const stringifiedUris = JSON.stringify(uris);
      await AsyncStorage.setItem('selectedPhotoUris', stringifiedUris);
    } catch (error) {
      console.log('이미지 URI들을 저장하는데 실패했습니다.', error);
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      console.log('저장소 접근 권한이 없습니다.');
      return;
    }
    openImagePicker();
  };

  const openImagePicker = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('사용자가 이미지 선택을 취소했습니다.');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          '사용자가 커스텀 버튼을 눌렀습니다: ',
          response.customButton,
        );
      } else {
        const source = {uri: response.assets[0].uri};
        setSelectedPhotos(prevPhotos => [...prevPhotos, source]); // 기존 이미지 배열에 새로운 이미지 추가
        saveSelectedPhotoUris([
          ...selectedPhotos.map(photo => photo.uri),
          response.assets[0].uri,
        ]); // 선택된 이미지 URI들 저장
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <BasicHeader title="오운완 인증하기" />

      <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedPhotos.map((photo, index) => (
            <Image
              key={index}
              source={photo}
              style={{width: width, height: width}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flexDirection: 'row',
    position: 'relative',
  },
  productImg: {
    width: 110,
    height: 110,
    borderRadius: 4,
    marginRight: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  subText: {
    fontSize: 14,
    color: '#8C8C8C',
    marginVertical: 4,
  },
  price: {
    fontSize: 18,
    color: '#FF7E36',
    fontWeight: 'bold',
  },
  commentArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: 4,
  },
  writeButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#FF6D1D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});
