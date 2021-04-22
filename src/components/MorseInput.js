import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Button, Grid, Row, Text, Icon } from "native-base";
import theme from "../../native-base-theme/variables/custom";

export default class MorseInput extends Component {
  state = {
    shiftEnabled: false,
  };
  render() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={styles.morseButtonRow}>
            <Button style={styles.morseButton}>
              <Text style={styles.morseButtonText}>-</Text>
            </Button>
            <Button style={styles.morseButton}>
              <Text style={styles.morseButtonText}>.</Text>
            </Button>
          </Row>
          <Row style={styles.actionButtonRow}>
            <Button
              icon
              rounded
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
            <Button icon rounded style={styles.actionButton}>
              <Icon name="help" type="MaterialIcons" />
            </Button>
            <Button icon rounded style={styles.spaceBarButton}>
              <Icon name="space-bar" type="MaterialIcons" />
            </Button>
            <Button icon rounded style={styles.actionButton}>
              <Icon name="backspace" type="MaterialIcons" />
            </Button>
            <Button icon rounded style={styles.actionButton}>
              <Icon name="keyboard-return" type="MaterialIcons" />
            </Button>
          </Row>
        </Grid>
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
  morseButtonRow: {
    height: 110,
  },
  actionButtonRow: {
    height: 60,

  },
  morseButton: {
    backgroundColor: theme.btnPrimaryBg,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginHorizontal: 20,
  },
  morseButtonText: {
    alignSelf: "center",
    fontSize: 50,
  },
  actionButton: {
    backgroundColor: theme.btnPrimaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  spaceBarButton: {
    backgroundColor: theme.btnPrimaryBg,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginHorizontal: 5,
  },
});
