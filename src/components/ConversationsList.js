import React, { Component } from "react";
import { List } from "native-base";
import ConversationListItem from "./ConversationListItem";

export default class ConversationsList extends Component {
  render() {
    return (
      <List>
        {this.props.conversations.map((convo) => {
          <ConversationListItem
            title={convo.title}
            lastMessage={convo.lastMessage}
            timestamp={convo.timestamp}
            notifications={this.props.unreadNotifications[convo.uid]}
          />;
        })}
      </List>
    );
  }
}
