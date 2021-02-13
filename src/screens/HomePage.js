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
} from "native-base";
import { View } from "react-native";
import { connect } from "react-redux";
import {ConversationListItem} from "../components/ConversationListItem";
export class HomePage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>ReMorse</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ConversationListItem/>
          </List>

        </Content>
        <View style={{ flex: 1 }}>
          <Fab
            direction="up"
            style={{ backgroundColor: "#5057FF" }}
            position="bottomRight"
          >
            <Icon name="create" />
          </Fab>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps)(HomePage);
