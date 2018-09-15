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

          <Button title="Switch to Login" onPress={this.loginHandler} />
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
          <Button title="Submit" onPress={this.loginHandler} />
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
