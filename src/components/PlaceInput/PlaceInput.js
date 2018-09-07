import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class PlaceInput extends Component {

	state = {
		placeName: ""
	}

	placeNameChangeHandler = (val) => {
		this.setState({
			placeName: val
		});
	}

	placeSubmitHandler = () => {
		if(this.state.placeName.trim() === "") {
		  return;
		}

		this.props.onPlaceAdded(this.state.placeName);

		this.setState({
			placeName: ""
		});
	  }

	render() {
		return (
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText}
					placeholder="enter text"
					value={this.state.placeName}
					onChangeText={this.placeNameChangeHandler} />

				<Button title="Add" style={styles.inputButton}
				 onPress={this.placeSubmitHandler} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
	},
	inputText: {
		width: "70%"
	},
	inputButton: {
		width: "30%"
	}
});


export default PlaceInput;