import React, { Component } from "react";
import { List } from "native-base";
import FriendListItem from "./FriendListItem";
import EmptyListPlaceholder from "./EmptyListPlaceholder";

export default class FriendsTab extends Component {
  render() {
    {console.log(this.props.friends)}
    return this.props.friends === undefined ||
      this.props.friends.length == 0 ? (
      <EmptyListPlaceholder
        iconName="emoticon-cry-outline"
        iconType="MaterialCommunityIcons"
        mainText="You seem to have no friends..."
        subText="Try adding a new friend by entering their UID above!"
      />
    ) : (
      <List>
        {this.props.friends.map((friend) => {
          <FriendListItem
            title={friend.title}
            profilePictureUri={friend.profilePictureUri}
          />;
        })}
      </List>
    );
  }
}
