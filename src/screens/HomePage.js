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
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import theme from "../../native-base-theme/variables/custom";
import { ConversationListItem } from "../components/ConversationListItem";
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
            <ConversationListItem />
          </List>
        </Content>
        <View style={{ flex: 1 }}>
          <Fab direction="up" style={styles.fab} position="bottomRight">
            <Icon name="message" type="MaterialIcons" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    color: theme.brandPrimary,
  },
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
