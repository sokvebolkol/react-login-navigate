import React, { useContext, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  Image,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import Users from "../model/users";
import { AuthContext } from "../components/context";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const checkTextInput = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecurityTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    console.log("userName : ", userName);

    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or Password field cannot be empty!!",
        [{ text: "Okay" }]
      );
      return;
    }

    if (foundUser == 0) {
      Alert.alert("Invalid User!", "Username or Password is incorrect!", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {/* ---Username--- */}
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter your username..."
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkTextInput(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" size={20} color="green" />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 6 characters long.
            </Text>
          </Animatable.View>
        )}
        {/*---Password --- */}
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter your password..."
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecurityTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={20} color="gray" />
            ) : (
              <Feather name="eye" size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => loginHandle(data.username, data.password)}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sing In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              { borderColor: "#009397", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sing Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
