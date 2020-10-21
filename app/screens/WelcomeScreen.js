import React from "react";

import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import color from "../config/color";

function WelcomeScreen(props) {
  return (
    <>
      <ImageBackground
        style={styles.background}
        source={require("../assets/68e68dd48832a5f25ab49e0f0a87549c.jpg")}
      >
        <View style={styles.loginButton}></View>
        <View style={styles.regitsterButton}></View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: color.primary,
  },
  regitsterButton: {
    width: "100%",
    height: 70,
    backgroundColor: color.secondary,
  },
});

export default WelcomeScreen;
