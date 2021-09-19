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
  Badge,
  TabHeading,
} from "native-base";
import { AppState,StyleSheet } from "react-native";
import theme from "../../../native-base-theme/variables/custom";
import { AuthContext } from "../../navigation/AuthProvider";
import { getUserFromUid } from "../../model/Users";
import FriendsTab from "../../components/FriendsTab";
import FriendRequestsTab from "../../components/FriendRequestTab";
import { FRIEND_ADDED, FRIEND_REMOVED } from "../../model/Constants";
import {
  subscribeToFriendListeners,
  unsubscribeFromFriendListeners,
  subscribeToFriendRequestListeners,
  unsubscribeFromFriendRequestListeners,
} from "../../model/Friends";

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
    AppState.addEventListener(FRIEND_ADDED, (e) => {
      this.setState({ friends: [...this.state.friends, e.friend] });
    });

    AppState.addEventListener(FRIEND_REMOVED, (e) => {
      const newFriends = this.state.friends.filter(
        (friend) => friend.uid !== e.friendUid
      );

      this.setState({ friends: newFriends });
    });

    subscribeToFriendListeners();
    //subscribeToFriendRequestListeners();
  }

  componentWillUnmount() {
    unsubscribeFromFriendListeners();
    // unsubscribeFromFriendRequestListeners();
  }

  setAddFriendUID = (text) => {
    this.setState({ addingFriendUID: text });
  };

  onAddFriendPress = () => {
    const uidToAdd = this.state.addingFriendUID;
    if (
      uidToAdd === undefined ||
      uidToAdd.length === 0 ||
      uidToAdd === this._user().uid
    ) {
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

  sendFriendRequest = async (uidToAdd) => {
    const friendUser = await getUserFromUid(uidToAdd);
    if (friendUser) {
      friendRequestsRef
        .child(friendUser.uid)
        .update({ [this._user().uid]: true }, (error) => {
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
    } else {
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
        <Header
          searchBar
          rounded
          androidStatusBarColor={theme.toolbarDefaultBg}
          iosBarStyle="light-content"
        >
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
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab
            heading={
              this.state.friendRequests.length !== 0 ? (
                <TabHeading>
                  <Text>Requests</Text>
                  <Badge>
                    <Text>{this.state.friendRequests.length}</Text>
                  </Badge>
                </TabHeading>
              ) : (
                "Requests"
              )
            }
          >
            <FriendRequestsTab friendRequests={this.state.friendRequests} />
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

export default ContactsPage;
