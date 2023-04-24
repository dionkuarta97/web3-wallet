/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Buffer } from '@craftzdog/react-native-buffer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'jotai';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigations/Root';
import { Colors } from './Colors';

// @ts-ignore

(global as any).window.Buffer = Buffer;

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.main}>
      <Provider>
        <StatusBar backgroundColor={Colors.black} />
        <NativeBaseProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

export default App;
