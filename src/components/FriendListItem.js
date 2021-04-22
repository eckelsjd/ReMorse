import React, { Component } from "react";
import { ListItem, Text, Body, Button, Icon } from "native-base";
import UserThumbnail from "./UserThumbnail";
import theme from "../../native-base-theme/variables/custom";
import { StyleSheet } from "react-native";
export class FriendListItem extends Component {


  render() {
    return (
      <ListItem style={styles.listItem} onPress={this.props.startChat}>
        <UserThumbnail
          profilePictureUri={this.props.profilePictureUri}
          title={this.props.title}
        />
        <Body>
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </Body>
        <Button rounded style={styles.messageButton} onPress={this.props.startChat}>
          <Icon name="messenger" type="MaterialIcons" />
        </Button>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: theme.statusBarColor,
  },
  listItemText: {
    color: theme.inverseTextColor,
  },
  messageButton: {
    alignSelf: "center",
    backgroundColor: theme.brandInfo,
  },
});
export default FriendListItem;
