import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { formStyle } from '../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';
import { loginApi } from '../../api/user';

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const auth = useAuth(); //devuelve un useContext(AuthContext)
  const { login } = auth; //sacamos la funcion login()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      // console.log('Registro de usuario enviado');
      try {
        const response = await loginApi(formData);
        console.log('the response to LOGIN API the de DataBase is: ', response);
        if (response.statusCode) throw 'Error is username or password';
        //enviamos informacion(props) de un hijo a un 'padre'
        login(response); //'response' cotiene el token y mas informacion

        console.log(response);
        //   changeForm();
      } catch (error) {
        setLoading(false);
        Toast.show('Error while loging the user....'),
          { position: Toast.positions.CENTER };
      }
      setLoading(false);
    },
  });

  // onChangeText={handleChange('password')}

  return (
    <View>
      <TextInput
        label="Email or Username"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue('identifier', text)}
        placeholder="Type your email or username"
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      {formik.touched.identifier && formik.errors.identifier && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.identifier}
        </Text>
      )}
      <TextInput
        label="Password"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue('password', text)}
        // onBlur={handle}
        placeholder="Type your password"
        secureTextEntry={true}
        value={formik.values.password}
        error={formik.errors.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.password}
        </Text>
      )}

      <Button
        mode="contained"
        style={formStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Login
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Register
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    identifier: '',
    password: '',
  };
}
function validationSchema() {
  return {
    identifier: Yup.string().required('A Username or email is required'),
    password: Yup.string().required('A password is required'),
  };
}
