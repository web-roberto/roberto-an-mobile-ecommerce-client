// todos los hooks deben empezar por 'use'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; //hicimos un createContext

export default () => useContext(AuthContext);
//esto es el tipo que devuelve la funcion cuando se llame
// que es lo que hay dentro de authData del App.js
