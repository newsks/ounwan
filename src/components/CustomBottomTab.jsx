import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const homeOn = require('../assets/icons/Tab/Home_on.png');
const homeOff = require('../assets/icons/Tab/Home_off.png');
const feedOn = require('../assets/icons/Tab/Feed_on.png');
const feedOff = require('../assets/icons/Tab/Feed_off.png');
const addOn = require('../assets/icons/Tab/add_circle_off.png');
const addOff = require('../assets/icons/Tab/add_circle_off.png');
const chatOn = require('../assets/icons/Tab/Chat_on.png');
const chatOff = require('../assets/icons/Tab/Chat_off.png');
const userOn = require('../assets/icons/Tab/User_on.png');
const userOff = require('../assets/icons/Tab/User_off.png');

const CustomBottomTab = ({state, navigation, insets, descriptors}) => {
  const tab1Value = useRef(new Animated.Value(1)).current;
  const tab2Value = useRef(new Animated.Value(1)).current;
  const tab3Value = useRef(new Animated.Value(1)).current;
  const tab4Value = useRef(new Animated.Value(1)).current;
  const tab5Value = useRef(new Animated.Value(1)).current;

  const scaleAnimated = animatedValue => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1, // 약간 확대
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1, // 원래대로
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedValues = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
    4: tab5Value,
  };
  return (
    <View style={styles.bottomTabBarWrapper}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = animatedValues[index];

        const iconFlag = bool => {
          switch (label) {
            case '홈':
              return bool ? homeOn : homeOff;
            case '이슈':
              return bool ? feedOn : feedOff;
            case '오운완인증':
              return bool ? addOn : addOff;
            case '채팅':
              return bool ? chatOn : chatOff;
            default:
              return bool ? userOn : userOff;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          scaleAnimated(animatedOf);
        };
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Animated.Image
              source={iconFlag(isFocused)}
              style={{
                width: 25,
                height: 25,
                transform: [{scale: animatedOf}],
              }}
            />
            <Text style={{color: isFocused ? '#000' : '#888', marginTop: 4}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 10,
  },
});

export default CustomBottomTab;
