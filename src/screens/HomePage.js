import React, { Component } from "react";
import {
  Container,
  List,
  Header,
  Content,
  Title,
  Button,
  Left,
  Body,
  Icon,
  Fab,
  Thumbnail,
} from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { ConversationListItem } from "../components/ConversationListItem";
import { AuthContext } from "../navigation/AuthProvider";
import UserAvatar from "react-native-user-avatar";
import { firebase } from "../firebase/config";

const conversationsRef = firebase.database().ref('conversations/');
const membersRef = firebase.database().ref('members/');
const messagesRef = firebase.database().ref('messages/');

export class HomePage extends Component {
  static contextType = AuthContext;
  _user = () => {
    return this.context.user;
  };

  componentDidMount() {
    // conversationsRef.
  }

  componentWillUnmount() {}

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              {this._user().profilePictureUri ? (
                <Thumbnail
                  style={styles.userThumbnail}
                  source={{ uri: this._user().profilePictureUri }}
                />
              ) : (
                <Thumbnail
                  style={styles.userThumbnail}
                  source={require("../../assets/add_profile_image.png")}
                />
              )}
            </Button>
          </Left>
          <Body>
            <Title>ReMorse</Title>
          </Body>
        </Header>
        <Content>
          <List>
            {/* <ConversationListItem /> */}
          </List>
        </Content>
        <Fab direction="up" style={styles.fab} position="bottomRight">
          <Icon name="message" type="MaterialIcons" />
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
  userThumbnail: {
    width: 50,
    height: 50,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(HomePage);
