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
} from "native-base";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { AuthContext } from "../navigation/AuthProvider";
import { firebase } from "../firebase/config";
import EmptyListPlaceholder from "../components/EmptyListPlaceholder";
import UserThumbnail from "../components/UserThumbnail";
import { GiftedChat } from "react-native-gifted-chat";
import {
  renderBubble,
  renderSend,
  scrollToBottomComponent,
  renderInputToolbar,
  renderLoading,
  getGiftedChatMessage,
  getGiftedChatUser,
  renderActions,
} from "../components/ChatComponents";
import MorseInput from "../components/MorseInput";

const messagesRef = firebase.database().ref("/messages");
const membersRef = firebase.database().ref("/members");

export class ChatPage extends Component {
  static contextType = AuthContext;

  state = {
    friend: null,
    messages: [],
  };

  _user = () => {
    return this.context.user;
  };

  _friendTitle = () => {
    return `${this.state.friend?.firstName} ${this.state.friend?.lastName}`;
  };

  _title = () => {
    return `${this._user().firstName} ${this._user().lastName}`;
  };

  componentDidMount() {
    this.setState({ friend: this.props.route.params.friend });
    this.subscribeToMessagesListener();
  }

  componentWillUnmount() {
    //unsubscribe from listeners
  }


  subscribeToMessagesListener = async () => {
    // message added
    messagesRef.child(this._user().uid).on(
      "child_added",
      async (snapshot) => {
        // const friendUid = snapshot.key;
        // console.log(`friend request from: ${friendUid}`);
        // const friend = await getUserFromUid(friendUid);
        // this.setState({
        //   friendRequests: [...this.state.friendRequests, friend],
        // });
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );

    //message removed
    messagesRef.child(this._user().uid).on(
      "child_removed",
      (snapshot) => {
        // console.log(`friend request dismissed: ${snapshot.key}`);
        // const friendUid = snapshot.key;
        // const newFriendRequests = this.state.friendRequests.filter(
        //   (request) => request.uid !== friendUid
        // );
        // this.setState({ friendRequests: newFriendRequests });
      },
      (error) => {
        console.log(`${error.code}: ${error.message}`);
      }
    );
  };

  sendMessage = (messages) => {
    const friendId = this.state.friend.uid;
    messages.forEach((message) => {
      const newMessageRef = messagesRef.child(message._id);
      const messageData = {
        id: message._id,
        text: message.text,
        timestamp: message.createdAt,
        from: message.user.name,
      };

      newMessageRef.update(messageData, (error) => {
        if (error) {
          Toast.show({
            text: `Could not send message`,
            duration: 3000,
            type: "danger",
            position: "bottom",
          });
        }
      });
    });
    GiftedChat.append(this.state.messages, messages);
  };

  addAction = () => {
    console.log("add action");
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          androidStatusBarColor={theme.toolbarDefaultBg}
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent>
              <UserThumbnail
                profilePictureUri={this.state.friend?.profilePictureUri}
                title={this._friendTitle()}
                thumbnailSize={40}
              />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title>{this._friendTitle()}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="more-vert" type="MaterialIcons" />
            </Button>
          </Right>
        </Header>
        {this.state.messages === undefined ||
        this.state.messages.length == 0 ? (
          <EmptyListPlaceholder
            iconName="chat-processing"
            iconType="MaterialCommunityIcons"
            mainText="*crickets*"
            subText="... .- -.-- / ... --- -- . - .... .. -. --."
          />
        ) : (
          <></>
        )}
        <Container>
          <GiftedChat
            minInputToolbarHeight={80}
            placeholder="Say something..."
            messages={this.state.messages}
            user={getGiftedChatUser(this._user())}
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            scrollToBottomComponent={scrollToBottomComponent}
            onSend={(messages) => {
              this.sendMessage(messages);
            }}
            // renderActions={renderActions}
            // addAction={this.addAction}
            showUserAvatar
            scrollToBottom
          />

          {/* <MorseInput /> */}
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
  },
  headerBody: {
    paddingHorizontal: 30,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ChatPage);
