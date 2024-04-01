import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import DetailHeader from '../components/DetailHeader';
import AddCommentInput from '../components/AddCommentInput';

const Detail = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 상태 관리를 위해 댓글 리스트 상태를 Detail 컴포넌트에 추가합니다.
  const [comments, setComments] = useState(dummy_commend);

  // 댓글 추가 함수
  const addComment = commentText => {
    const newComment = {
      id: comments.length + 1,
      name: 'newjean',
      time: '방금 전',
      comment: commentText,
      isLike: false,
      likeNum: 145,
      commentNum: 0,
      profileImg:
        'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D', // 현재 로그인한 사용자의 프로필 이미지 경로
    };

    setComments([...comments, newComment]);
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <DetailHeader />
      </View>
    );
  };
  const renderFeed = ({item, index}) => {
    return (
      <View>
        <View style={styles.feedContainer}>
          <TouchableOpacity style={styles.feedArea}>
            <Image source={{uri: item.profileImg}} style={styles.feedProfile} />
            <Text style={styles.useName}>{item.nickname}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={moreIcon} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={{uri: item.feedImg[0]}}
            style={{
              width: width,
              height: width,
            }}
            resizeMode="cover"
          />
        </View>

        {/* 상세 contents */}
        {/* 피드 소개 */}
        <View style={styles.contentsArea}>
          <Text style={styles.conConTime}>5시간 전</Text>
          <Text style={styles.conCon}>{item.content}</Text>
        </View>

        {/* 태그 */}
        <View style={styles.tagContainer}>
          {tagData.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => navigation.navigate(e.page)}
              style={styles.menuContainer}>
              <View style={styles.centerArea}>
                <Text style={styles.tagText}>{e.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 표현하기, 댓글 */}
        <View style={styles.emotionContainer}>
          <View style={styles.emotionWrap}>
            <TouchableOpacity style={styles.emotionArea}>
              <Image source={emotionOutLine} style={{width: 16, height: 16}} />
              <Text style={styles.emotionText}>표현하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={styles.emotionArea}>
              <Image source={comment} style={{width: 16, height: 16}} />
              <Text style={styles.emotionText}>댓글 0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emotionMenu}>
            <TouchableOpacity>
              <Image source={emotionAngry} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={emotionSad} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={emotionSurprise} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={emotionGood} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={emotionFunny} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', top: -20, left: 12, zIndex: 5}}>
            <Image source={emotionBg} style={{width: 200, height: 50}} />
          </View>
        </View>
        {/* 댓글리스트영역 */}
        <View style={styles.commentContainer}>
          {comments.map((e, i) => (
            <View key={e.id}>
              <View style={styles.commentWrap}>
                <View>
                  <Image
                    source={{uri: e.profileImg}}
                    style={styles.commentProfile}
                  />
                </View>
                <View style={styles.commentTextArea}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '80%'}}>
                      <Text style={styles.comName}>{e.name}</Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                      }}>
                      <Text style={styles.comTime}>{e.time}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.comComment}>{e.comment}</Text>
                  </View>
                  <View style={styles.likeContainer}>
                    <View style={styles.likeWrap}>
                      <TouchableOpacity style={styles.likeArea}>
                        {e.isLike ? (
                          <Image source={heartFill} style={styles.likeImg} />
                        ) : (
                          <Image source={heart} style={styles.likeImg} />
                        )}

                        <Text style={styles.likeNum}>{e.likeNum}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.likeArea}>
                        <Image source={commentL} style={styles.likeImg} />
                        <Text style={styles.likeNum}>{e.commentNum}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      <Text style={styles.likeTxt}>신고</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
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
        {/* 댓글인풋영역 */}
        <AddCommentInput
          onCommentAdded={addComment}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default Detail;

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
    flex: 1,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeIconArea: {
    flexDirection: 'row',
    alignItems: 'center',
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
  likeTxt03: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 3,
  },
  contentsArea: {
    paddingHorizontal: 24,
  },
  conName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  conCon: {
    fontSize: 15,
    fontWeight: '400',
    color: '#3A3A3A',
  },
  conConTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#BBBBBB',
    marginVertical: 10,
  },
  feedTotal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  feedTotalArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tagContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#F3F3F3',
    borderRadius: 4,
    marginRight: 8,
    marginTop: 11,
  },
  centerArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 3,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7B7B7B',
  },
  emotionContainer: {
    flexDirection: 'row',
    marginTop: 31,
    paddingVertical: 16,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emotionWrap: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  emotionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 16,
  },
  emotionText: {
    color: '#3A3A3A',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 3,
  },
  emotionMenu: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    top: -12,
    left: 21,
    zIndex: 10,
  },
  commentContainer: {
    marginLeft: 25,
    marginRight: 23,
  },
  commentWrap: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  commentProfile: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  commentTextArea: {
    marginLeft: 6,
    marginRight: 26,
    marginTop: 4,
    position: 'relative',
  },
  comName: {
    color: '#7B7B7B',
    fontSize: 13,
    fontWeight: '400',
  },
  comTime: {
    color: '#A5A5A5',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 'auto',
  },
  comComment: {
    color: '#3A3A3A',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 13,
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeWrap: {
    flexDirection: 'row',
    flex: 1,
    gap: 17,
    marginTop: 10,
  },
  likeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  likeImg: {
    width: 24,
    height: 24,
  },
  likeNum: {
    color: '#7B7B7B',
    fontSize: 15,
    fontWeight: '400',
  },
  likeTxt: {
    color: '#7B7B7B',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 10,
  },
});

const moreIcon = require('../assets/icons/more.png');
const emotionOutLine = require('../assets/icons/emotion/expression_outline.png');
const comment = require('../assets/icons/emotion/comment.png');
const emotionBg = require('../assets/icons/emotion/emotionBg.png');
const emotionAngry = require('../assets/icons/emotion/emotion_angry.png');
const emotionSad = require('../assets/icons/emotion/emotion_sad.png');
const emotionSurprise = require('../assets/icons/emotion/emotion_surprise.png');
const emotionGood = require('../assets/icons/emotion/emotion_good.png');
const emotionFunny = require('../assets/icons/emotion/emotion_funny.png');
const heart = require('../assets/icons/emotion/heart.png');
const heartFill = require('../assets/icons/emotion/heart_fill.png');
const commentL = require('../assets/icons/emotion/comment_large.png');

const {width} = Dimensions.get('window');

const dummy_feed = [
  {
    id: 1,
    nickname: '투게더런',
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
    content:
      '2024년 트렌드 컬러를 반영한 센스있는 톤앤톤 스타일 매치가 돋보이는 WJI님의 스포츠웨어 코디!',
    like: 37,
    likeUsers: [1, 2, 3],
  },
];

const tagData = [
  {
    id: 1,
    title: '#스포츠',
    page: '',
  },
  {
    id: 2,
    title: '#필라테스복',
    page: '',
  },
  {
    id: 3,
    title: '#요가복',
    page: '',
  },
  {
    id: 4,
    title: '#기능성',
    page: '',
  },
  {
    id: 5,
    title: '#언더아머FW컬렉션',
    page: '',
  },
];

const dummy_commend = [
  {
    id: 1,
    name: '대한건아김건아',
    time: '방금',
    profileImg:
      'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    likeNum: 145,
    comment:
      '정확한 자세와 고중량 무게를 들지 않는 선이시면 괜 찮으실 것 같네요 ㅎㅎ',
    commentNum: 0,
    isLike: true,
  },
  {
    id: 2,
    name: '대한건아김건아',
    time: '방금',
    profileImg:
      'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    comment:
      '정확한 자세와 고중량 무게를 들지 않는 선이시면 괜 찮으실 것 같네요 ㅎㅎ',

    likeNum: 145,
    commentNum: 0,
    isLike: true,
  },
  {
    id: 3,
    name: '대한건아김건아',
    time: '방금',
    profileImg:
      'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D',
    comment:
      '정확한 자세와 고중량 무게를 들지 않는 선이시면 괜 찮으실 것 같네요 ㅎㅎ',

    likeNum: 145,
    commentNum: 0,
    isLike: false,
  },
];
