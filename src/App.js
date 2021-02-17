import React, { Component } from "react";
import { registerRootComponent } from "expo";
import { connect } from "react-redux";
import AllAppProviders from "./navigation";

class RemorseApp extends Component {
  render() {
    return <AllAppProviders />;
  }
}

function mapStateToProps(state) {
  return state;
}

registerRootComponent(RemorseApp);
export default connect(mapStateToProps)(RemorseApp);
