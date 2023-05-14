/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Buffer } from '@craftzdog/react-native-buffer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'jotai';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigations/Root';
import { Colors } from './Colors';
const Moralis = require('moralis').default;
import 'react-native-gesture-handler';
// @ts-ignore

(global as any).window.Buffer = Buffer;
const moralisApiKey = 'rseCOf5R9ZKFg1GBgfii3WNKGglHnl3g5lUticr3XVuN1A5SDRlWf0hPeNjWhtYW';

function App(): JSX.Element {
  const connectMoralis = async () => {
    await Moralis.start({
      apiKey: moralisApiKey
    });
  };
  useEffect(() => {
    connectMoralis();
  }, []);
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
