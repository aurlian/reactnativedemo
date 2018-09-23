import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultTextInput from "../UI/DefaultTextInput/DefaultTextInput";

class PlaceInput extends Component {
  state = {
    placeName: ""
  };

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <DefaultTextInput
        placeholder="Place Name"
        value={this.state.placeName}
        onChangeText={this.placeNameChangeHandler}
      />
    );
  }
}

export default PlaceInput;
