import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Left,
  Body,
  Right,
  Icon,
  Fab,
} from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { AuthContext } from "../navigation/AuthProvider";
import { firebase } from "../firebase/config";
import ConversationsList from "../components/ConversationsList";
import EmptyListPlaceholder from "../components/EmptyListPlaceholder";
import UserThumbnail from "../components/UserThumbnail";

const conversationsRef = firebase.database().ref("conversations/");
const membersRef = firebase.database().ref("members/");
const messagesRef = firebase.database().ref("messages/");
const usersRef = firebase.database().ref("users/");
export class HomePage extends Component {
  static contextType = AuthContext;

  state = {
    conversations: [],
    unreadNotifications: null,
  };

  _user = () => {
    return this.context.user;
  };

  componentDidMount() {
    usersRef
      .child(this._user().uid)
      .child("conversations")
      .on(
        "value",
        function (snapshot) {
          if (snapshot.exists()) {
            this.setState({ conversations: snapshot.val() });
          }
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  componentWillUnmount() {
    usersRef.child(this._user().uid).child("conversations").off();
  }

  onAddFriendPress = () => {
    this.props.navigation.navigate("Contacts");
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <UserThumbnail
                profilePictureUri={this._user().profilePictureUri}
                firstName={this._user().firstName}
                lastName={this._user().lastName}
              />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title>ReMorse</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" type="MaterialIcons" />
            </Button>
            <Button transparent onPress={this.onAddFriendPress}>
              <Icon name="person-add" type="MaterialIcons" />
            </Button>
            <Button transparent>
              <Icon name="more-vert" type="MaterialIcons" />
            </Button>
          </Right>
        </Header>
        {console.log(
          this.state.conversations.length == 0 ? "no convos" : "loading convos"
        )}
        {this.state.conversations === undefined ||
        this.state.conversations.length == 0 ? (
          <EmptyListPlaceholder
            iconName="md-sad-outline"
            iconType="Ionicons"
            mainText="No Chats...It's a bit lonely."
            subText="Maybe start a new one using the button below!"
          />
        ) : (
          <ConversationsList
            conversations={this.state.conversations}
            unreadNotifications={this.state.unreadNotifications}
          />
        )}
        <Fab active direction="up" style={styles.fab} position="bottomRight">
          <Icon name="message" type="MaterialIcons" />
          <Button style={styles.logOutButton} onPress={this.context.logout}>
            <Icon name="logout" type="MaterialIcons" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
  },
  fab: {
    backgroundColor: theme.btnPrimaryBg,
  },
  headerBody: {
    paddingHorizontal: 30,
  },
  logOutButton: {
    backgroundColor: theme.btnWarningBg,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(HomePage);
