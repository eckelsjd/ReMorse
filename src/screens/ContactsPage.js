import React, { Component } from "react";
import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Text,
  View,
  Tabs,
  Tab,
  Toast,
} from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { AuthContext } from "../navigation/AuthProvider";
import { firebase } from "../firebase/config";
import {getUserFromUid} from "../firebase/util";
import FriendsTab from "../components/FriendsTab";
import FriendRequestsTab from "../components/FriendRequestTab";

const friendsRef = firebase.database().ref("friends/");
const friendRequestsRef = firebase.database().ref("friendRequests/");

export class ContactsPage extends Component {
  static contextType = AuthContext;

  _user = () => {
    return this.context.user;
  };

  state = {
    friends: [],
    friendRequests: [],
    addingFriendUID: "",
  };

  componentDidMount() {

    subscribeToFriendListeners();
    subscribeToFriendRequestListeners();
  }

  componentWillUnmount() {
    friendsRef.off();
    friendsRef.child(this._user().uid).off();
    friendRequestsRef.off();
    friendRequestsRef.child(this._user().uid).off();
  }

  subscribeToFriendListeners = ()=> {
    // friend added
    friendsRef.child(this._user().uid).on(
      "child_added",
      (snapshot) => {
        console.log(`friend added: ${snapshot.val()}`);
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );


    //friend removed
    friendsRef.child(this._user().uid).on(
      "child_removed",
      (snapshot) => {
        console.log(`friend removed: ${snapshot.val()}`);
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );
  }

  subscribeToFriendRequestListeners = () => {
     // friend request added
     friendRequestsRef.child(this._user().uid).on(
      "child_added",
      (snapshot) => {
        console.log(`friend request from: ${snapshot.val()}`);
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );

    //friend request removed
    friendRequestsRef.child(this._user().uid).on(
      "child_removed",
      (snapshot) => {
        console.log(`friend request dismissed: ${snapshot.val()}`);
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );
  }

  setAddFriendUID = (text) => {
    this.setState({ addingFriendUID: text });
  };

  onAddFriendPress = () => {
    const uidToAdd = this.state.addingFriendUID;

    if (uidToAdd === undefined || uidToAdd.length === 0 || uidToAdd === this._user().uid) {
      Toast.show({
        text: `Invalid friend UID, could not send friend request`,
        duration: 3000,
        type: "danger",
        position: "bottom",
      });
      return;
    }

    if (!this.isAlreadyFriend(uidToAdd)) {
      this.sendFriendRequest(uidToAdd);
    } else {
      Toast.show({
        text: `This UID belongs to an existing friend!`,
        duration: 3000,
        type: "danger",
        position: "bottom",
      });
    }

    this.setAddFriendUID("");
  };

  isAlreadyFriend = (uid) => {
    const filter = this.state.friends.filter((friend) => friend.uid === uid);
    return filter.length !== 0;
  };

  sendFriendRequest = (uidToAdd) => {

    const friendUser = getUserFromUid(uidToAdd);
    if(friendUser){
      friendRequestsRef
      .child(friendUser.uid)
      .set({[this._user().uid]: true}, (error) => {
        if (!error) {
          Toast.show({
            text: `Friend request sent!`,
            duration: 3000,
            type: "success",
            position: "bottom",
          });
        } else {
          console.log(error.message);
        }
      });
    }else{
      Toast.show({
        text: `Invalid friend UID, could not send friend request`,
        duration: 3000,
        type: "danger",
        position: "bottom",
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item rounded style={styles.formItem}>
            <Icon
              name="search"
              type="MaterialIcons"
              style={styles.formIconAndText}
            />
            <Input
              placeholder="Find Friends..."
              placeholderTextColor="#FFFFFF90"
              autoCompleteType="username"
              style={styles.formIconAndText}
            />
            <Icon
              name="people"
              type="MaterialIcons"
              style={styles.formIconAndText}
            />
          </Item>
          <Button transparent rounded>
            <Text style={styles.buttonText}>Search</Text>
          </Button>
        </Header>
        <View style={styles.headerColor}>
          <Item rounded style={styles.formItem}>
            <Icon
              name="person-add"
              type="MaterialIcons"
              style={styles.formIconAndText}
            />
            <Input
              placeholder="Enter Friend UID"
              placeholderTextColor="#FFFFFF90"
              style={styles.friendUIDText}
              onChangeText={(text) => this.setAddFriendUID(text)}
              value={this.state.addingFriendUID}
            />
            <Button transparent rounded onPress={this.onAddFriendPress}>
              <Text style={styles.buttonText}>Add Friend</Text>
            </Button>
          </Item>
        </View>
        <Tabs initialPage={0}>
          <Tab heading="Friends">
            <FriendsTab
            friends={this.state.friends}
            />
          </Tab>
          <Tab heading="Requests">
            <FriendRequestsTab
            friendRequests={this.state.friendRequests}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
  },
  headerColor: {
    backgroundColor: theme.toolbarDefaultBg,
  },
  formIconAndText: {
    color: "#FFFFFF90",
  },
  friendUIDText: {
    color: theme.brandSuccess,
  },
  formItem: {
    backgroundColor: "#00000050",
    borderColor: theme.brandInfo,
    marginVertical: 10,
  },
  buttonText: {
    color: theme.btnPrimaryBg,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ContactsPage);
