import { createContext } from 'react';

const AuthContext = createContext({
  auth: undefined,
  login: () => null, //tras el login, envia al panel como logeado
  logout: () => null, //envia a la pantalla para hacer el login
});
export default AuthContext;