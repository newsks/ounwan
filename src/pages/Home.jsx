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
} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import CommentsModal from '../components/CommentsModal';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const ListHeaderComponent = () => {
    return (
      <View>
        <BasicHeader title={'오운완'} />
      </View>
    );
  };
  const renderFeed = ({item, index}) => {
    return (
      <View>
        <View style={styles.feedContainer}>
          <TouchableOpacity style={styles.feedArea}>
            <Image source={{uri: item.profileImg}} style={styles.feedProfile} />
            <Text style={styles.useName}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={moreIcon} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Image
            source={{uri: item.feedImg[0]}}
            style={{
              width: width - 32,
              height: width,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        </View>

        {/* 좋아요 댓글 좋아합니다 */}
        <View style={styles.likeContainer}>
          <View style={styles.likeArea}>
            <TouchableOpacity>
              <Image source={heartIcon} style={styles.likeIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Image source={commentIcon} style={styles.likeIcon} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', position: 'relative'}}>
              <Image
                source={{uri: item.followProfile}}
                style={styles.follow01}
              />
              <Image source={{uri: item.profileImg}} style={styles.follow02} />
            </View>
            <Text style={styles.likeTxt01}>
              <Text style={styles.likeTxt02}>외 {item.like}</Text>
              명이 좋아합니다.
            </Text>
          </View>
        </View>

        {/* 피드 소개 */}
        <View style={styles.contentsArea}>
          <Text style={styles.conName}>{item.name}</Text>
          <Text style={styles.conCon}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.feedTotal}>
      <View style={styles.feedTotalArea}>
        {/* 피드구현 */}
        <FlatList
          data={dummy_feed}
          renderItem={renderFeed}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeaderComponent}
        />
        <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginTop: 8,
  },
  feedArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedProfile: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  useName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 5,
  },
  likeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeIcon: {
    width: 24,
    height: 24,
  },
  follow01: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 15,
    zIndex: 1,
    borderRadius: 50,
  },
  follow02: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 50,
  },
  likeTxt01: {
    fontSize: 13,
    fontWeight: '400',
    color: '#4F4F4F',
  },
  likeTxt02: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  contentsArea: {
    paddingHorizontal: 16,
  },
  conName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  conCon: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F4F4F',
  },
  feedTotal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  feedTotalArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 70,
  },
});

const heartIcon = require('../assets/icons/heart.png');
const commentIcon = require('../assets/icons/comment.png');
const moreIcon = require('../assets/icons/more.png');

const {width} = Dimensions.get('window');

const dummy_feed = [
  {
    id: 1,
    name: '투게더런',
    profileImg:
      'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    followProfile:
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    feedImg: [
      'https://images.unsplash.com/photo-1485727749690-d091e8284ef3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1608138404239-d2f557515ecb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDE2fHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
    ],
    content: '내 하루 일상',
    like: 37,
    likeUsers: [1, 2, 3],
  },
  {
    id: 2,
    name: 'BOM',
    profileImg:
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    followProfile:
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    feedImg: [
      'https://images.unsplash.com/photo-1608138404239-d2f557515ecb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDE2fHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
    ],
    content: '내 하루 일상',
    like: 37,
    likeUsers: [1, 2, 3],
  },
  {
    id: 3,
    name: 'BOM',
    profileImg:
      'https://images.unsplash.com/photo-1599552683573-9dc48255fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
    followProfile:
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    feedImg: [
      'https://images.unsplash.com/photo-1488778578932-0f84d315fcae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDgzfHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
    ],
    content: '내 하루 일상',
    like: 37,
    likeUsers: [1, 2, 3],
  },
  {
    id: 4,
    name: 'BOM',
    profileImg:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA4fHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
    followProfile:
      'https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    feedImg: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA4fHxoZWFsdGh8ZW58MHx8MHx8fDA%3D',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
      'https://picsum.photos/seed/picsum/400/400',
    ],
    content: '내 하루 일상',
    like: 37,
    likeUsers: [1, 2, 3],
  },
];
