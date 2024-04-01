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
  TextInput,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BasicHeader from '../components/BasicHeader';
import {usePhotos} from '../context/PhotoContext';
import Toast from 'react-native-toast-message';

const showToast = message => {
  Toast.show({
    type: 'info',
    text1: message,
    position: 'top',
  });
};

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
  CameraRoll.save(tag, {type: type, album: album});
}

const {width} = Dimensions.get('window');

const Add = () => {
  const {setPhotos} = usePhotos();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [title, setTitle] = useState(''); // 타이틀을 위한 상태
  const [content, setContent] = useState(''); // 내용을 위한 상태

  const savePhotoInfo = photoInfo => {
    // setPhotos(prevPhotos => [...prevPhotos, photoInfo]);

    console.log('저장된 사진 정보:', {title, content, selectedPhotos});
    showToast('글이 등록되었습니다.');

    setTitle('');
    setContent('');

    Keyboard.dismiss();
  };

  useEffect(() => {
    requestGalleryPermission();
    loadSelectedPhotos();
  }, []);

  useFocusEffect(
    useCallback(() => {
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
        ]);
      }
    });
  };

  const removePhoto = uriToRemove => {
    setSelectedPhotos(currentPhotos =>
      currentPhotos.filter(photo => photo.uri !== uriToRemove),
    );
    saveSelectedPhotoUris(
      selectedPhotos
        .filter(photo => photo.uri !== uriToRemove)
        .map(photo => photo.uri),
    );
  };

  const confirmRemovePhoto = uri => {
    Alert.alert(
      '사진 삭제',
      '정말 이 사진을 삭제하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {text: '예', onPress: () => removePhoto(uri)},
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <BasicHeader title="오운완 인증하기" />
      <View style={{padding: 20}}>
        <TextInput
          placeholder="타이틀 입력"
          placeholderTextColor={'#777'}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="내용 입력"
          value={content}
          onChangeText={setContent}
          style={styles.input}
          multiline
        />
        <Button title="완료" onPress={savePhotoInfo} />
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedPhotos &&
            selectedPhotos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onLongPress={() => confirmRemovePhoto(photo.uri)} // 길게 눌렀을 때 이벤트
              >
                <Image
                  key={index}
                  source={photo}
                  style={{width: width / 3, height: width / 3}}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: '#000',
  },
});
