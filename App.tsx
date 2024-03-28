import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {PhotoProvider} from './src/context/PhotoContext';

function App(): React.JSX.Element {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </PhotoProvider>
  );
}

export default App;
