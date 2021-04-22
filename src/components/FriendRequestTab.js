import React, { Component } from "react";
import { List, Container } from "native-base";
import FriendRequestListItem from "./FriendRequestListItem";
import EmptyListPlaceholder from "./EmptyListPlaceholder";
import theme from "../../native-base-theme/variables/custom";
import { StyleSheet } from "react-native";

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
      <Container style={styles.container}>
        <List
          dataArray={this.props.friendRequests}
          keyExtractor={friendRequest => friendRequest.uid}
          renderRow={(friendRequest) => (
            <FriendRequestListItem
              title={`${friendRequest.firstName} ${friendRequest.lastName}`}
              profilePictureUri={friendRequest.profilePictureUri}
              uid={friendRequest.uid}
            />
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
  },
});
