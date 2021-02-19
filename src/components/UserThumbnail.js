import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Thumbnail } from "native-base";
import { UserAvatar } from "react-native-user-avatar";
export default class FriendsTab extends Component {
  render() {
    return this.props.profilePictureUri ? (
      <Thumbnail
        style={styles.userThumbnail}
        source={{ uri: this.props.profilePictureUri }}
      />
    ) : (
      <UserAvatar style={styles.userThumbnail} name={this.props.title} />
    );
  }
}

const styles = StyleSheet.create({
  userThumbnail: {
    width: 50,
    height: 50,
  },
});
