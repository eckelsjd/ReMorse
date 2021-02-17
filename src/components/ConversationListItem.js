import React, { Component } from "react";
import { ListItem, Text, Left, Right, Body, Badge } from "native-base";
import UserAvatar from "react-native-user-avatar";

export class ConversationListItem extends Component {
  render() {
    return (
      <ListItem>
        <Left>
          <UserAvatar size={50} name={this.props.username} />
        </Left>
        <Body>
          <Text>{this.props.messageSender}</Text>
          <Text note numberOfLines={1}>
            {this.props.message}
          </Text>
        </Body>
        <Right>
          <Text note>{this.props.messageTimestamp}</Text>
          <Badge info>
            <Text>{this.props.messageNotifications}</Text>
          </Badge>
        </Right>
      </ListItem>
    );
  }
}

export default ConversationListItem;
