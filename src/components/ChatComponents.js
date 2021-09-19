import React from "react";
import { Button, Icon, Spinner } from "native-base";
import { StyleSheet } from "react-native";
import theme from "../../native-base-theme/variables/custom";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { getColorsAndTextColors } from "./ColorGradientUtil";

export const renderBubble = (props) => {
  return <Bubble {...props}></Bubble>;
};

export const renderSend = (props) => {
  const { text, messageIdGenerator, user, onSend } = props;
  return (
    <Button
      icon
      style={styles.roundedButton}
      onPress={() => {
        if (text && onSend) {
          onSend(
            { text: text.trim(), user: user, _id: messageIdGenerator() },
            true
          );
        }
      }}
      {...props}
    >
      <Icon name="send" type="MaterialIcons" style={styles.icon} />
    </Button>
  );
};

export const renderInputToolbar = (props) => {
  return (
    <InputToolbar
      containerStyle={styles.inputToolbar}
      textInputStyle={styles.inputText}
      disableComposer={true}
      {...props}
    />
  );
};

export const renderActions = (props) => {
  return (
    <Button style={styles.roundedButton} {...props} onPress={props.addAction}>
      <Icon name="add" type="MaterialIcons" style={styles.icon} />
    </Button>
  );
};
export const scrollToBottomComponent = (props) => {
  return (
    <Icon
      name="keyboard-arrow-down"
      type="MaterialIcons"
      style={styles.icon}
      {...props}
    />
  );
};

export const renderLoading = (props) => {
  return <Spinner {...props} />;
};

const styles = StyleSheet.create({
  roundedButton: {
    backgroundColor: theme.btnPrimaryBg,
    color: theme.inverseTextColor,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginEnd: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  inputToolbar: {
    backgroundColor: theme.brandDark,
    borderTopColor: theme.brandInfo,
    borderColor: theme.brandInfo,
    borderTopWidth: 4,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 8,
  },
  inputText: {
    color: theme.inverseTextColor,
  },
});
