import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Splash from './pages/Splash';
import Home from './pages/Home';
import CustomBottomTab from './components/CustomBottomTab';
import MyPage from './pages/MyPage';
import Chat from './pages/Chat';
import Add from './pages/Add';
import Feed from './pages/Feed';
import SearchList from './pages/SearchList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="이슈" component={Feed} />
      <Tab.Screen name="오운완인증" component={Add} />
      <Tab.Screen name="채팅" component={Chat} />
      <Tab.Screen name="나의 오운완" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="SearchList" component={SearchList} />
    </Stack.Navigator>
  );
};

export default Router;
