import React, { Component } from "react";
import { Thumbnail } from "native-base";
import UserAvatar  from "react-native-user-avatar";
export default class UserThumbnail extends Component {

  state = {
    imageError: false,
  };

  onImageError = () => {
    this.setState({ imageError: true });
  };

  getSize = ()=>{
    if (this.props.thumbnailSize) {
        return this.props.thumbnailSize;
    }else{
        return 50;
    }
  }

  render() {
    return (this.props.profilePictureUri && !this.state.imageError) ? (
      <Thumbnail
        style={{width: this.getSize(), height: this.getSize()}}
        source={{ uri: this.props.profilePictureUri }}
        onError={this.onImageError}
        onLoad={() => {
          if (this.state.imageError) {
            this.setState({ imageError: false });
          }
        }}
      />
    ) : (
      <UserAvatar size={this.getSize()} name={this.props.title} />
    );
  }
}
