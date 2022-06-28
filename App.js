import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthScreen from './src/screens/Auth';


export default function App() {
  const [auth, setAuth] = useState(undefined);
  return (
    <PaperProvider>
      {auth ? <Text>User's place</Text> : <AuthScreen />}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
