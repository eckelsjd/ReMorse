import React, { Component } from "react";
import { ListItem, Text, Left, Right, Body, Button, Icon } from "native-base";
import UserAvatar from "react-native-user-avatar";
import UserThumbnail from "./UserThumbnail";

export class FriendListItem extends Component {
  render() {
    return (
      <ListItem>
        <Left>
          <UserThumbnail
            profilePictureUri={this.props.profilePictureUri}
            title={this.props.title}
          />
        </Left>
        <Body>
          <Text>{this.props.title}</Text>
        </Body>
        <Right>
          <Button rounded>
            <Icon name="messenger" type="MaterialIcons" />
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default FriendListItem;
