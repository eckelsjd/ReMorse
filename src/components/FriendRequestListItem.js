import React, { Component } from "react";
import { ListItem, Text, Left, Right, Body, Button, Icon } from "native-base";
import UserThumbnail from "./UserThumbnail";

export class FriendRequestListItem extends Component {
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
          <Button iconLeft success rounded>
            <Icon name="check-circle-outline" type="MaterialIcons" />
            <Text>Accept</Text>
          </Button>
          <Button iconLeft danger rounded>
            <Icon name="close-circle-outline" type="MaterialCommunityIcons" />
            <Text>Reject</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default FriendRequestListItem;
