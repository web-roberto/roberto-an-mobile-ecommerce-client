import React from 'react';
import Account from '../screens/Account/Account';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import ChangeName from '../screens/Account/ChangeName';

const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: 'Cuenta', headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: 'Cambiar nombre y apellidos' }}
      />
    </Stack.Navigator>
  );
}
