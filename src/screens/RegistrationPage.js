import React, { Component } from "react";
import { Image, StyleSheet, Platform } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Text,
  Icon,
  Button,
  Toast,
} from "native-base";
import theme from "../../native-base-theme/variables/custom";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import EmailInputField from "../components/EmailInputField";
import PasswordInputField from "../components/PasswordInputField";
import { AuthContext } from "../navigation/AuthProvider";

export class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.userProfileImageView = React.createRef();
  }

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePictureUri: null,
  };

  static contextType = AuthContext;

  componentDidMount() {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }

  setFirstName = (text) => {
    this.setState({ firstName: text });
  };
  setLastName = (text) => {
    this.setState({ lastName: text });
  };
  setEmail = (text) => {
    this.setState({ email: text });
  };
  setPassword = (text) => {
    this.setState({ password: text });
  };

  chooseProfileImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result && Platform.OS == "android") {
      result = await ImagePicker.getPendingResultAsync(options);
    }

    if (!result.cancelled) {
      this.setState({ profilePictureUri: result.uri });

      if (Platform.OS == "android") {
        this.userProfileImageView.current.setNativeProps({
          src: [{ uri: result.uri }],
        });
      } else if (Platform.OS == "ios") {
        this.userProfileImageView.current.setNativeProps({
          source: [{ uri: result.uri }],
        });
      }
    }
  };

  onLogInPress = () => {
    this.props.navigation.navigate("Login");
  };

  onRegisterPress = () => {
    var email = this.state.email;
    var password = this.state.password;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var profilePictureUri = this.state.profilePictureUri;

    this.context.register(
      email,
      password,
      firstName,
      lastName,
      profilePictureUri
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          iosBarStyle="light-content"
          androidStatusBarColor={theme.brandPrimary}
          transparent
        ></Header>
        <Content>
          <Form>
            <Button
              active={false}
              onPress={this.chooseProfileImage}
              style={styles.userImageButton}
            >
              <Image
                ref={this.userProfileImageView}
                defaultSource={require("../../assets/add_profile_image.png")}
                source={require("../../assets/add_profile_image.png")}
                style={styles.userImage}
              />
            </Button>
            <Item rounded style={styles.formItem}>
              <Icon
                name="person"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="First Name"
                placeholderTextColor="#FFFFFF90"
                style={styles.formIconAndText}
                onChangeText={(text) => this.setFirstName(text)}
              />
            </Item>

            <Item rounded style={styles.formItem}>
              <Icon
                name="person"
                type="MaterialIcons"
                style={styles.formIconAndText}
              />
              <Input
                placeholder="Last Name"
                placeholderTextColor="#FFFFFF90"
                style={styles.formIconAndText}
                onChangeText={(text) => this.setLastName(text)}
              />
            </Item>

            <EmailInputField
              onChangeEmail={(text) => this.setEmail(text)}
              email={this.state.email}
            />

            <PasswordInputField
              onChangePassword={(text) => this.setPassword(text)}
              password={this.state.password}
              isLoginPassword={false}
            />

            <Button
              full
              rounded
              style={styles.signUpButton}
              onPress={this.onRegisterPress}
            >
              <Text>Sign Up</Text>
            </Button>

            <Text style={styles.formIconAndText}>
              Already got an account?&nbsp;
              <Text onPress={this.onLogInPress} style={styles.formLinkText}>
                Log In
              </Text>
            </Text>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  formItem: {
    backgroundColor: "#00000050",
    borderColor: theme.brandInfo,
    marginVertical: 10,
  },
  userImage: {
    width: 128,
    height: 128,
    borderRadius: 128 / 2,
    overflow: "hidden",
  },
  userImageButton: {
    alignSelf: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 136,
    height: 136,
    borderRadius: 136 / 2,
    borderWidth: 4,
    borderColor: theme.brandInfo,
  },
  formIconAndText: {
    color: "#FFFFFF90",
  },
  formLinkText: {
    color: theme.brandLight,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: theme.btnPrimaryBg,
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RegistrationPage);
