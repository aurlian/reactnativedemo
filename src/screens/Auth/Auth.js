import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground
} from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultTextInput from "../../components/UI/DefaultTextInput/DefaultTextInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import sunsetImage from "../../assets/sunset.jpg";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };
  render() {
    return (
      <ImageBackground source={sunsetImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Login</HeadingText>
          </MainText>

          <ButtonWithBackground
            color="#29aaf4"
            onButtonPress={this.loginHandler}
          >
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultTextInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <DefaultTextInput placeholder="Password" style={styles.input} />
            <DefaultTextInput
              placeholder="Confirm Password"
              style={styles.input}
            />
          </View>
          <ButtonWithBackground
            color="#29aaf4"
            onButtonPress={this.loginHandler}
          >
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  }
});

export default AuthScreen;
