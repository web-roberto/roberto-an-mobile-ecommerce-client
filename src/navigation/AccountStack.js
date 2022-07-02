import { View, Text } from 'react-native';
import React from 'react';
import Account from '../screens/Account';
import { createStackNavigator, StackView } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: 'Cuenta', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
