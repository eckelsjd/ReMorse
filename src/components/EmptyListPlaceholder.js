import React, { Component } from "react";
import { Container, Text, Icon, View } from "native-base";
import theme from "../../native-base-theme/variables/custom";
import { StyleSheet } from "react-native";

export default class EmptyListPlaceholder extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View>
          <Icon
            name={this.props.iconName}
            type={this.props.iconType}
            style={styles.icon}
          />
          <Text style={styles.mainText}>{this.props.mainText}</Text>
          <Text style={styles.subText}>{this.props.subText}</Text>
        </View>
      </Container>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
    justifyContent: "center",
  },
  icon: {
    fontSize: 50,
    textAlign: "center",
    color: theme.inverseTextColor,
  },
  mainText: {
    fontSize: 25,
    color: theme.inverseTextColor,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 20,
    color: "#FFFFFF95",
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
