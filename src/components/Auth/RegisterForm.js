import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { registerApi } from '../../api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { formStyle } from '../../styles';

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      // console.log('Registro de usuario enviado');
      try {
        await registerApi(formData);
        changeForm();
      } catch (error) {
        setLoading(false);
        Toast.show('Error while recording the user....'),
          { position: Toast.positions.CENTER };
      }
      setLoading(false);
    },
  });

  return (
    <View>
      <TextInput
        label="email"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.email}
        </Text>
      )}
      <TextInput
        label="User's name"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue('username', text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        label="Password"
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue('password', text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.password}
        </Text>
      )}
      <TextInput
        label="Repeat Password"
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      {formik.touched.repeatPassword && formik.errors.repeatPassword && (
        <Text style={{ fontSize: 10, color: 'red' }}>
          {formik.errors.repeatPassword}
        </Text>
      )}
      <Button
        mode="contained"
        style={formStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Register
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Login
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  };
}
function validationSchema() {
  return {
    email: Yup.string().email().required('Type an email, please'),
    username: Yup.string().required("Type an user's name, please"),
    password: Yup.string().required('Type a password, please'),
    repeatPassword: Yup.string()
      .required('Repeat the password, please')
      .oneOf([Yup.ref('password')], "Password don't match"),
  };
}
