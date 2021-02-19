import React, { Component } from "react";
import { List } from "native-base";
import FriendRequestListItem from "./FriendRequestListItem";
import EmptyListPlaceholder from "./EmptyListPlaceholder";

export default class FriendRequestTab extends Component {
  render() {
    return this.props.friendRequests === undefined ||
      this.props.friendRequests.length == 0 ? (
      <EmptyListPlaceholder
        iconName="cleaning-services"
        iconType="MaterialIcons"
        mainText="No pending friend requests!"
        subText="Why not speak to your existing ones?"
      />
    ) : (
      <List>
        {this.props.friendRequests.map((friendRequest) => {
          <FriendRequestListItem
            title={friendRequest.title}
            profilePictureUri={friendRequest.profilePictureUri}
          />;
        })}
      </List>
    );
  }
}
