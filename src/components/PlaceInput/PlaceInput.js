import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultTextInput from "../UI/DefaultTextInput/DefaultTextInput";

const placeInput = props => (
  <DefaultTextInput
    placeholder="Place Name"
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
  />
);

export default placeInput;
