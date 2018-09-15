import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import placeImage from "../../assets/profile.jpg";

class SharePlaceScreen extends Component {
  constructor(prosp) {
    super(prosp);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
  };

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName, placeImage);
  };
  render() {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, placeImage) =>
      dispatch(addPlace(placeName, placeImage))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
