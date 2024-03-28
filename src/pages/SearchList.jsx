import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

const searchIcon = require('../assets/icons/search.png');
const closeBtn = require('../assets/icons/close.png');

const SearchList = () => {
  const [keyword, setKeyword] = useState('');

  const handleCancelButton = () => {
    setKeyword('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity>
            <Image source={searchIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <TextInput
            returnKeyType="search"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            value={keyword}
            onChangeText={text => setKeyword(text)}
            allowFontScaling={false}
            style={styles.inputStyle}
            autoFocus
            onSubmitEditing={() => console.log('검색 api 호출')}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleCancelButton()}
          style={styles.cancelArea}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultTile}>
        <Text style={styles.recentlyText}>최근 검색</Text>
        <TouchableOpacity>
          <Text style={styles.totalDel}>전체 삭제</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileArea}>
          <Image
            source={{uri: 'https://avatar.iran.liara.run/public/67'}}
            style={{width: 40, height: 40}}
          />
          <Text style={styles.recentlyText}>LucyMartin_3</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={closeBtn} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileArea}>
          <Image
            source={{uri: 'https://avatar.iran.liara.run/public/67'}}
            style={{width: 40, height: 40}}
          />
          <Text style={styles.recentlyText}>LucyMartin_3</Text>
        </View>
        <TouchableOpacity>
          <Image source={closeBtn} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#333',
    paddingRight: 16,
    paddingVertical: 10,
  },
  cancelArea: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 2,
    paddingVertical: 12,
    marginRight: 16,
  },
  cancelText: {
    color: '#2F80ED',
    fontSize: 16,
    fontWeight: '500',
  },
  resultTile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  recentlyText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
  },
  totalDel: {
    color: '#828282',
    fontSize: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  profileArea: {
    flex: 1,
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
  },
});
