import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';

const Feed = () => {
  const {width} = useWindowDimensions();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{borderWidth: 0.5, borderColor: '#FFF', position: 'relative'}}>
        {item.isMulti && (
          <Image
            source={multiPhoto}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: 4,
              right: 4,
              zIndex: 1,
            }}
          />
        )}

        <Image
          source={{uri: item.img}}
          style={{width: width / 3 - 1, height: width / 3 - 1}}
        />
      </TouchableOpacity>
    );
  };
  const ListHeaderComponent = () => {
    return <BasicHeader title={'내피드'} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
        <FlatList
          data={dummy_search}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({});

const searchIcon = require('../assets/icons/search.png');
const multiPhoto = require('../assets/icons/multiPhoto.png');
const dummy_search = [
  {
    id: 1,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: true,
  },
  {
    id: 2,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: true,
  },
  {
    id: 3,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: false,
  },
  {
    id: 4,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: false,
  },
  {
    id: 5,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: true,
  },
  {
    id: 6,
    img: 'https://picsum.photos/seed/picsum/130/130',
    isMulti: true,
  },
];
