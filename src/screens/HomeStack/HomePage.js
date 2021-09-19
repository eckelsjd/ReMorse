import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Body,
  Right,
  Icon,
  Fab,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import theme from "../../../native-base-theme/variables/custom";
import { AuthContext } from "../../navigation/AuthProvider";
import ConversationsList from "../../components/ConversationsList";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import UserThumbnail from "../../components/UserThumbnail";


export class HomePage extends Component {
  static contextType = AuthContext;

  state = {
    conversations: [],
    unreadNotifications: null,
    fabActive: false,
  };

  _user = () => {
    return this.context.user;
  };

  componentDidMount() {
  }

  componentWillUnmount() {}


  openContacts = () => {
    this.props.navigation.navigate("Contacts");
  };

  createNewGroup = () => {};

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
                profilePictureUri={this._user().profilePictureUri}
                title={`${this._user().firstName} ${this._user().lastName}`}
                thumbnailSize={30}
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
            <Button transparent onPress={this.openContacts}>
              <Icon name="person-add" type="MaterialIcons" />
            </Button>
            <Button transparent>
              <Icon name="more-vert" type="MaterialIcons" />
            </Button>
          </Right>
        </Header>
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
        <Fab
          active={this.state.fabActive}
          direction="up"
          style={styles.fab}
          position="bottomRight"
          onPress={() => {
            this.setState({ fabActive: !this.state.fabActive });
          }}
        >
          <Icon name="message" type="MaterialIcons" />
          <Button style={styles.logOutButton} onPress={this.context.logout}>
            <Icon name="logout" type="MaterialIcons" />
          </Button>
          <Button style={styles.chatButton} onPress={this.openContacts}>
            <Icon name="person-add" type="MaterialIcons" />
          </Button>
          <Button style={styles.groupChatButton} onPress={this.createNewGroup}>
            <Icon name="group-add" type="MaterialIcons" />
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
  chatButton: {
    backgroundColor: theme.btnInfoBg,
  },
  groupChatButton: {
    backgroundColor: theme.btnSuccessBg,
  },
});


export default HomePage;
