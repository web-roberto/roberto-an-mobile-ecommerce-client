import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import AuthScreen from './src/screens/Auth';
import AuthContext from './src/context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    //funcion anonima autoejecutable
    (async () => {
      const token = await getTokenApi();

      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []); //se ejecuta solo al cargarse el componente

  const login = (user) => {
    //el user lo pasamos desde LoginForm
    console.log('LOGIN APP.JS: token es: ', user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
    console.log('---valor de auth: ', auth.token);
  };
  const logout = () => {
    if (logout) {
      removeTokenApi();
      setAuth(null);
    }

    console.log('---Tras logout, valor de auth: ', auth);
  };

  //solo pinta cuando cambia el valor del estado
  //es para aumentar el rendimiento: es un useState y useEffect juntos
  const authData = useMemo(
    () => ({
      //todo esto estará dispinible en toda la aplicacion como GLOBALES
      // crearemos un hook mio para leer estos datos desde cualquier componente
      auth,
      login,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvider>
    </AuthContext.Provider>
  );
}
