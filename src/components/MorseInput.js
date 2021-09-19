import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Button,
  Grid,
  Row,
  Text,
  Icon,
  Body,
  Col,
} from "native-base";
import theme from "../../native-base-theme/variables/custom";

export default class MorseInput extends Component {
  state = {
    shiftEnabled: false,
  };
  render() {
    return (
      <Container style={styles.container}>
        <Body>
          <Grid>
            <Row style={styles.livePreviewRow}>
              <Col>
                <Button>
                  <Text>BUTTON</Text>
                </Button>
              </Col>
            </Row>
            <Row style={styles.morseButtonRow}>
              <Col>
                <Button full style={styles.morseButton}>
                  <Text style={styles.morseButtonText}>-</Text>
                </Button>
              </Col>
              <Col>
                <Button full style={styles.morseButton}>
                  <Text style={styles.morseButtonText}>.</Text>
                </Button>
              </Col>
            </Row>
            <Row style={styles.actionButtonRow}>
              <Button
                icon
                style={styles.actionButton}
                onPress={() =>
                  this.setState({ shiftEnabled: !this.state.shiftEnabled })
                }
              >
                {this.state.shiftEnabled ? (
                  <Icon name="arrow-up-bold" type="MaterialCommunityIcons" />
                ) : (
                  <Icon
                    name="arrow-up-bold-outline"
                    type="MaterialCommunityIcons"
                  />
                )}
              </Button>
              <Button icon style={styles.actionButton}>
                <Icon name="help" type="MaterialIcons" />
              </Button>
              <Button icon style={styles.spaceBarButton}>
                <Icon name="space-bar" type="MaterialIcons" />
              </Button>
              <Button icon style={styles.actionButton}>
                <Icon name="backspace" type="MaterialIcons" />
              </Button>
              <Button icon style={styles.actionButton}>
                <Icon name="keyboard-return" type="MaterialIcons" />
              </Button>
            </Row>
          </Grid>
        </Body>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.brandDark,
    borderColor: theme.brandInfo,
    borderLeftWidth: 4,
    borderRightWidth: 4,
  },
  livePreviewRow: {
    height: "20%",
  },
  morseButtonRow: {
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonRow: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  morseButton: {
    backgroundColor: theme.btnPrimaryBg,
    justifyContent: "center",
    alignItems: "center",
    // width: "32%",
    // height: "80%",
    // borderRadius:
    //   Math.round(
    //     Dimensions.get("window").width + Dimensions.get("window").height
    //   ) / 2,
    // marginHorizontal: 20,
  },
  morseButtonText: {
    // alignSelf: "center",
    // fontSize: 50,
  },
  actionButton: {
    backgroundColor: theme.brandPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  spaceBarButton: {
    backgroundColor: theme.brandPrimary,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginHorizontal: 5,
  },
});
