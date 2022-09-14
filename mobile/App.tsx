import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  GestureResponderEvent,
} from "react-native";
import { useFormik } from "formik";
import axios from "axios";

export const request = axios.create({ withCredentials: true });

const baseUrl = "https://f4b3-105-178-33-217.eu.ngrok.io/api/v1";
export default function App() {
  const [allow, setAllow] = React.useState<boolean>(false);

  const [user, setUser] = React.useState<any>();

  const onSubmitFunc = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await request.post(`${baseUrl}/users/login`, values);
      setAllow(true);
    } catch (error: any) {
      console.log("errorh", error);
    }
  };

  const onLogoutFunc = async ()=> {
    setAllow(false);
   const res = await request.post(`${baseUrl}/users/logout`);
   console.log('res', res.data);
  }
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => onSubmitFunc(values),
  });

  React.useEffect(() => {
    const find = async () => {
      try {
        const res = await request.get(`${baseUrl}/users/me`);
      setUser(res.data.data);
      } catch (error) {
        console.log(error)
      }
    };
    find();
  }, [allow]);

  const { values, handleChange, handleSubmit } = formik;
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={values.username}
          onChangeText={handleChange("username")}
          placeholder="username"
        />
        <TextInput
          value={values.password}
          onChangeText={handleChange("password")}
          placeholder="password"
          secureTextEntry
        />
        <Button title="Login" onPress={(event) => handleSubmit(event as any)} />
      </View>
      {user && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>
            Welcome {user.username}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Email {user.email}
          </Text>
          <Button title="Logout" onPress={onLogoutFunc} color="red" />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
