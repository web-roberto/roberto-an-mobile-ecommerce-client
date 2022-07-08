import { Alert } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import {
  NavigationContainerRefContext,
  useNavigation,
} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const logoutAccount = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estas seguro de que quieres salir de tu cuenta?',
      [{ text: 'NO' }, { text: 'SI', onPress: logout }],
      { cancelable: false }
    );
  };
  return (
    <>
      <List.Section>
        <List.Subheader>Mi Cuenta</List.Subheader>
        <List.Item
          title="Cambiar nombre"
          description="Cambia el nombre de tu cuenta"
          left={(props) => <List.Icon {...props} icon="smile" />}
          onPress={() => navigation.navigate('change-name')}
        />
        <List.Item
          title="Cambiar email"
          description="Cambia el email de tu cuenta"
          left={(props) => <List.Icon {...props} icon="at" />}
          onPress={() => console.log('Ir a cambiar el email')}
        />
        <List.Item
          title="Cambiar username"
          description="Cambia el nombre de usuario de tu cuenta"
          left={(props) => <List.Icon {...props} icon="sim" />}
          onPress={() => console.log('Ir a cambiar el nombre de usuario')}
        />
        <List.Item
          title="Cambiar contraseña"
          description="Cambia la contraseña de tu cuenta"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => console.log('Ir a cambiar la contraseña')}
        />
        <List.Item
          title="Mis direcciones"
          description="Administra tus direcciones de envío"
          left={(props) => <List.Icon {...props} icon="map" />}
          onPress={() => console.log('Ir a cambiar a direcciones')}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="Pedidos"
          description="Listado de todos los Pedidos"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => console.log('Ir a cambiar a mis pedidos')}
        />
        <List.Item
          title="Favoritos"
          description="Listado de Favoritos"
          left={(props) => <List.Icon {...props} icon="heart" />}
          onPress={() => navigation.navigate('favorites')}
        />
        <List.Item
          title="Cerrar sesión"
          description="Cierra esta sesión y inicia con otra"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}
