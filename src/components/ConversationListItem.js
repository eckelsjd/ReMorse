import React, { Component } from "react";
import { ListItem, Text, Left, Right, Body, Badge } from "native-base";
import UserAvatar from "react-native-user-avatar";

export class ConversationListItem extends Component {
  render() {
    return (
      <ListItem avatar>
        <Left>
          <UserAvatar size={40} name="Default" />
        </Left>
        <Body>
          <Text>Default</Text>
          <Text note numberOfLines={1}>Default
          </Text>
        </Body>
        <Right>
          <Text note>00:00</Text>
          <Badge info>
            <Text>0</Text>
          </Badge>
        </Right>
      </ListItem>
    );
  }
}

export default ConversationListItem;
