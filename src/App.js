import React, { Component } from "react";
import { registerRootComponent } from "expo";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { HomePage } from "./screens/HomePage";
import { Provider } from "react-redux";
import { getTheme, StyleProvider,Root } from "native-base";
import theme from "../native-base-theme/variables/custom";
import store from "./redux/reducers";
import { LoginPage } from "./screens/LoginPage";
import { RegistrationPage } from "./screens/RegistrationPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";


const Stack = createStackNavigator();

class RemorseApp extends Component {
  state = {
    isAppReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isAppReady: true });
  }

  render() {
    if (!this.state.isAppReady) {
      return <AppLoading />;
    } else {
      return (
        <StyleProvider style={getTheme(theme)}>
          <Provider store={store}>
          <Root>
            <NavigationContainer>
              <Stack.Navigator headerMode="none" screenOptions={{headerTintColor: "#00000000",}}>
                {this.props.user ? (
                  <Stack.Screen name="Home">
                    {(props) => <HomePage {...props} extraData={this.props.user} />}
                  </Stack.Screen>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen
                      name="Registration"
                      component={RegistrationPage}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
            </Root>
          </Provider>
        </StyleProvider>
      );
    }
  }
}

function mapStateToProps(state) {
  return state;
}

registerRootComponent(RemorseApp);
export default connect(mapStateToProps)(RemorseApp);
