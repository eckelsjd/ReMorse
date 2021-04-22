import React, { Component } from "react";
import { ListItem, Text, Body, Button } from "native-base";
import UserThumbnail from "./UserThumbnail";
import theme from "../../native-base-theme/variables/custom";
import { StyleSheet } from "react-native";
import { firebase } from "../firebase/config";
import { AuthContext } from "../navigation/AuthProvider";

const friendRequestsRef = firebase.database().ref("friendRequests/");
const friendsRef = firebase.database().ref("friends/");
const roomMembersRef = firebase.database().ref("room_members/");

export class FriendRequestListItem extends Component {
  static contextType = AuthContext;

  _user = () => {
    return this.context.user;
  };

  acceptRequest = async () => {
    this.addFriend();
    this.createRoom();
    this.removeRequest();
  };

  removeRequest = async () => {
    friendRequestsRef.child(this._user().uid).child(this.props.uid).remove();
  };

  addFriend = async () => {
    friendsRef.child(this._user().uid).update({ [this.props.uid]: true });

    friendsRef.child(this.props.uid).update({ [this._user().uid]: true });
  };

  createRoom = async () => {
    roomMemberKey = (await roomMembersRef.push()).key;
    roomMembersRef
      .child(roomMemberKey)
      .update({ [this._user().uid]: true, [this.props.uid]: true }, (error) => {
        if (error) {
          console.log(error.message);
        }
      });
  };

  render() {
    return (
      <ListItem style={styles.listItem}>
        <UserThumbnail
          profilePictureUri={this.props.profilePictureUri}
          title={this.props.title}
        />
        <Body>
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </Body>
        <Button
          small
          style={styles.successButton}
          rounded
          onPress={this.acceptRequest}
        >
          <Text>Accept</Text>
        </Button>
        <Button
          small
          style={styles.rejectButton}
          rounded
          onPress={this.removeRequest}
        >
          <Text>Reject</Text>
        </Button>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: theme.statusBarColor,
  },
  listItemText: {
    color: theme.inverseTextColor,
  },
  successButton: {
    alignSelf: "center",
    backgroundColor: theme.btnSuccessBg,
    marginEnd: 10,
  },
  rejectButton: {
    alignSelf: "center",
    backgroundColor: theme.btnDangerBg,
  },
});

export default FriendRequestListItem;
