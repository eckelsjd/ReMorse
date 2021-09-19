import React, { Component } from "react";
import { Image, StyleSheet, Platform, Alert } from "react-native";
import { Button } from "native-base";
import theme from "../../native-base-theme/variables/custom";
import * as ImagePicker from "expo-image-picker";

export default class ProfilePicturePicker extends Component {
  constructor(props) {
    super(props);
    this.userProfileImageView = React.createRef();
  }


requestMediaLibraryPermissionsAsync = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          'Permission Required',
          'We cannot pick a profile image without media permissions. Enable the camera/media permissions from your app settings', 
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      }
    }
  };

  chooseProfileImage = async () => {

    this.requestMediaLibraryPermissionsAsync();

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result && Platform.OS == "android") {
      result = await ImagePicker.getPendingResultAsync(options);
    }

    if (!result.cancelled) {
      this.props.onImagePicked(result.uri);

      if (Platform.OS == "android") {
        this.userProfileImageView.current.setNativeProps({
          src: [{ uri: result.uri }],
        });
      } else if (Platform.OS == "ios") {
        this.userProfileImageView.current.setNativeProps({
          source: [{ uri: result.uri }],
        });
      }
    }
  };

  render() {
    return (
      <Button
        active={false}
        onPress={this.chooseProfileImage}
        style={styles.userImageButton}
      >
        <Image
          ref={this.userProfileImageView}
          defaultSource={require("../../assets/add_profile_image.png")}
          source={require("../../assets/add_profile_image.png")}
          style={styles.userImage}
        />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 128,
    height: 128,
    borderRadius: 128 / 2,
    overflow: "hidden",
  },
  userImageButton: {
    alignSelf: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 136,
    height: 136,
    borderRadius: 136 / 2,
    borderWidth: 4,
    borderColor: theme.brandInfo,
  },
});
