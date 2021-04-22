import React, { Component } from "react";
import { List,Container } from "native-base";
import FriendListItem from "./FriendListItem";
import EmptyListPlaceholder from "./EmptyListPlaceholder";
import theme from "../../native-base-theme/variables/custom";
import { StyleSheet } from "react-native";
export default class FriendsTab extends Component {

  startChat = (index) => {
    this.props.navigation.navigate("Chat",{friend: this.props.friends[index]});
  };

  render() {
    return this.props.friends === undefined ||
      this.props.friends.length == 0 ? (
      <EmptyListPlaceholder
        iconName="emoticon-cry-outline"
        iconType="MaterialCommunityIcons"
        mainText="You seem to have no friends..."
        subText="Try adding a new friend by entering their UID above!"
      />
    ) : (
      <Container style={styles.container}>
        <List
          dataArray={this.props.friends}
          keyExtractor={friend => friend.uid}
          renderRow={(friend,_,index) => (
            <FriendListItem
              title={`${friend.firstName} ${friend.lastName}`}
              profilePictureUri={friend.profilePictureUri}
              uid={friend.uid}
              startChat={() => this.startChat(index)}
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
