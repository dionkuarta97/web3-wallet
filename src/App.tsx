/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet } from 'react-native';
import { Buffer } from '@craftzdog/react-native-buffer';
import { Provider as JotaiProvider } from 'jotai';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigations/Root';
import { Colors } from './Colors';

import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// @ts-ignore

(global as any).window.Buffer = Buffer;

function App(): JSX.Element {
  return (
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
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

export default App;
