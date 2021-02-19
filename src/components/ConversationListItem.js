import React, { Component } from "react";
import { ListItem, Text, Left, Right, Body, Badge } from "native-base";
import UserAvatar from "react-native-user-avatar";
import UserThumbnail from "./UserThumbnail";
export class ConversationListItem extends Component {
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
          <Text note numberOfLines={1}>
            {this.props.lastMessage}
          </Text>
        </Body>
        <Right>
          <Text note>{this.props.timestamp}</Text>
          {this.props.notifications ? (
            <Badge info>
              <Text>{this.props.notifications}</Text>
            </Badge>
          ) : (
            <></>
          )}
        </Right>
      </ListItem>
    );
  }
}

export default ConversationListItem;
