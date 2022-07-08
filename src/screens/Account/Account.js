import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenLoading from '../../components/ScreenLoading';
import { getMeApi } from '../../api/user';
import Menu from '../../components/Account/Menu';
import Search from '../../components/Search';
import useAuth from '../../hooks/useAuth';
import UserInfo from '../../components/Account/UserInfo';
import StatusBar from '../../components/StatusBar';
import colors from '../../styles/colors';

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  /* useEffect(() => {
    async function fetchData() {
      console.log('########################################');

      const response = await getMeApi(auth.token);
      console.log(response);
      setUser(response);
    }
    fetchData();
  }, []);*/

  useFocusEffect(
    useCallback(() => {
      (async () => {
        console.log('############### USE CALL BACK#########################');
        try {
          console.log(auth.token);

          const response = await getMeApi(auth.token);
          console.log(
            '############### despues del  getMeApi #########################'
          );
          console.log(response);
          setUser(response);
        } catch (error) {
          console.log('error es', error);
        }
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
