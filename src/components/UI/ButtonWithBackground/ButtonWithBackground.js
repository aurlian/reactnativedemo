import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const buttonWithBackground = props => {
  const content = (
    <View style={[styles.button, { backgroundColor: props.color }]}>
      <Text>{props.children}</Text>
    </View>
  );
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onButtonPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onButtonPress}>
        {content}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  }
});

export default buttonWithBackground;
