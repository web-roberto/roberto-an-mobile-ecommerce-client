import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import colors from '../styles/colors';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AccountStack from './AccountStack';
import Account from '../screens/Account';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen name="home" component={Home} options={{ title: 'Home' }} />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: 'Favorites' }}
        />
        <Tab.Screen name="cart" component={Cart} options={{ title: 'Cart' }} />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: 'My Account,' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = '';
  switch (route.name) {
    case 'home':
      iconName = 'home';
      break;
    case 'favorites':
      iconName = 'heart';
      break;
    case 'cart':
      iconName = 'shopping-cart';
      break;
    case 'account':
      iconName = 'bars';
      break;

    default:
      break;
  }
  return (
    <Text>
      <AwesomeIcon name={iconName} style={[styles.icon]} />
    </Text>
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});
