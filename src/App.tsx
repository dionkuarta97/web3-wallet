/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Buffer } from '@craftzdog/react-native-buffer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as JotaiProvider } from 'jotai';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigations/Root';
import { Colors } from './Colors';
const Moralis = require('moralis').default;
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MORALIS_API_KEY } from '@env';

// @ts-ignore

(global as any).window.Buffer = Buffer;
const moralisApiKey = MORALIS_API_KEY;

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
      <JotaiProvider>
        <StatusBar backgroundColor={Colors.black} />
        <NativeBaseProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Root />
            </NavigationContainer>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </JotaiProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

export default App;
